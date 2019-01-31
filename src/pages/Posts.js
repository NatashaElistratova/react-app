import React from 'react'

import {Posts} from '../components/posts/Posts'
import {getPosts} from '../api'
import {Search} from "../components/actions/Search";
import {Order} from "../components/actions/Order";
import {Limit} from "../components/actions/Limit";
import {Pagination} from "../components";

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
    this.onSearch = this.onSearch.bind(this);
    this.setPostsView = this.setPostsView.bind(this);

  }

  componentDidMount() {
    getPosts({
      limit: this.state.pagination.limit,
      page: this.state.pagination.page,
      order: this.state.sortPostsOrder,
      searchVal: this.state.searchVal
    }).then(data => {
        this.setState({
          posts: data.posts,
          totalCount: data.totalCount
        });
      })
  }

  setPostsOrder(data, val) {
    this.setState({
      sortPostsOrder: val,
      posts: data.posts
    })
  };

  setPostsLimit(data, val) {
    this.setState({
      pagination: {
        limit: val,
        page: 1,
      },
      posts: data.posts
    })
  }

  onClickPagination(current) {
    getPosts({
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

  onSearch(data, query) {
    this.setState({
      posts: data.posts,
      searchVal: query,
      totalCount: data.totalCount
    })
  }

  setPostsView(val) {
    this.setState({view: val});
  }

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex">
        <Search resources={'posts'}
                limit={this.state.pagination.limit}
                page={this.state.pagination.page}
                order={this.state.sortPostsOrder}
                searchVal={this.state.searchVal}
                onSearch={this.onSearch}
                apiMethod={getPosts}/>
        <Order resources={'posts'}
               limit={this.state.pagination.limit}
               page={this.state.pagination.page}
               searchVal={this.state.searchVal}
               setItemsOrder={this.setPostsOrder}
               apiMethod={getPosts}/>
        <Limit resources={'posts'}
               order={this.state.sortPostsOrder}
               page={this.state.pagination.page}
               searchVal={this.state.searchVal}
               setItemsLimit={this.setPostsLimit}
               apiMethod={getPosts}/>
        <div className="uk-button-group uk-margin-left">
          <button className={`uk-button uk-button-default ${this.state.view === 'grid' ? 'uk-active' : false}`}
                  onClick={() => this.setPostsView('grid')}>
            <span uk-icon="icon: grid"></span>
          </button>
          <button className={`uk-button uk-button-default ${this.state.view === 'list' ? 'uk-active' : false}`}
                  onClick={() => this.setPostsView('list')}>
            <span uk-icon="icon: list"></span>
          </button>
        </div>
      </div>
      {(this.state.posts && this.state.posts.length) ? <Posts order={this.state.order}
                                        posts={this.state.posts}
                                        view={this.state.view}
                                        setPostsView={this.setPostsView}/> : 'Loading'}
      <Pagination
        onClickPagination={this.onClickPagination}
        totalCount={this.state.totalCount}
        pagination={this.state.pagination}/>
    </div>

  }
}
