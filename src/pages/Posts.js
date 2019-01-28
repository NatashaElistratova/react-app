import React from 'react'

import { Posts } from '../components/Posts'
import { getData, searchPosts } from '../api'
import {Search} from "../components/actions/Search";
import {Order} from "../components/actions/Order";
import {Limit} from "../components/actions/Limit";

export default class PostsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      pagination: {
        limit: 6,
        page: 1
      },
      totalCount: null,
      sortPostsOrder: 'asc',
      view: 'list',
      searchVal: ''
    }

    this.onClickPagination = this.onClickPagination.bind(this);
    this.setPostsOrder = this.setPostsOrder.bind(this);
    this.setPostsLimit = this.setPostsLimit.bind(this);
    this.search = this.search.bind(this);
    this.setPostsView = this.setPostsView.bind(this);

  }

  componentDidMount() {
    getData({
        resources: 'posts',
        limit: this.state.pagination.limit,
        page: this.state.pagination.page,
        order: this.state.sortPostsOrder,
        searchVal: this.state.searchVal,
    })
    .then(data => {
        this.setState({
            posts: data.posts,
            totalCount: data.totalCount
        })
    });

  }

    setPostsOrder(data, val) {
      this.setState({
        sortPostsOrder: val,
        posts: data.posts
      })
    };

    setPostsLimit(data, val){
      this.setState({
          pagination: {
              limit: val,
              page: 1,
          },
          posts: data.posts
      })
    }

  onClickPagination(current) {
    getData({
        limit: this.state.pagination.limit,
        page: current,
        order: this.state.sortPostsOrder,
        searchVal: this.state.searchVal,
    })
    .then(data => {
        this.setState({
            pagination: {
                limit: this.state.pagination.limit,
                page: current,
                order: this.state.sortPostsOrder
            },
            posts: data.posts
        })
    })
  }

  search(data, query){
      this.setState({
        posts: data.posts,
        searchVal: query,
        totalCount: data.totalCount
      })
  }

  setPostsView(val){
    this.setState({view: val});
  }

  render() {
    return   <div>
                <div className="uk-margin-medium-bottom uk-flex">
                  <Search resources={'posts'}
                          limit={this.state.pagination.limit}
                          page={this.state.pagination.page}
                          order={this.state.sortPostsOrder}
                          method={this.search}/>
                  <Order resources={'posts'}
                          limit={this.state.pagination.limit}
                          page={this.state.pagination.page}
                          setPostsOrder={this.setPostsOrder}/>
                  <Limit resources={'posts'}
                         order={this.state.sortPostsOrder}
                         page={this.state.pagination.page}
                         setPostsLimit={this.setPostsLimit}/>
                  <div className="uk-button-group uk-margin-left">
                    <button className={`uk-button uk-button-default
                          ${this.state.view === 'grid' ? 'uk-active' : false}`} onClick={() => this.setPostsView('grid')}>
                      <span uk-icon="icon: grid"></span>
                    </button>
                    <button className={`uk-button uk-button-default
                          ${this.state.view === 'list' ? 'uk-active' : false}`} onClick={() => this.setPostsView('list')}>
                      <span uk-icon="icon: list"></span>
                    </button>
                  </div>
                </div>
                {this.state.posts.length ? <Posts onClickLimit={this.onClickLimit}
                                                    onClickPagination={this.onClickPagination}
                                                    pagination={this.state.pagination}
                                                    order={this.state.order}
                                                    posts={this.state.posts}
                                                    totalCount={this.state.totalCount}
                                                    view={this.state.view}
                                                    setPostsView={this.setPostsView}/> : 'Loading'}
              </div>

  }
}
