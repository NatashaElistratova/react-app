import React from 'react'

import {Posts} from '../components/posts/Posts'
import {getData} from '../api'
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
      sort: 'id',
      searchVal: ''
    }

    this.onClickPagination = this.onClickPagination.bind(this);
    this.setPostsOrder = this.setPostsOrder.bind(this);
    this.setPostsLimit = this.setPostsLimit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setPostsView = this.setPostsView.bind(this);

  }

  componentDidMount() {
    getData('/posts',{
      params : {
        _limit: this.state.pagination.limit,
        _page: this.state.pagination.page,
        _sort: this.state.sort,
        _order: this.state.sortPostsOrder,
        searchVal: this.state.searchVal
      }
    }).then(data => {
        this.setState({
          posts: data.json,
          totalCount: data.headers.total
        });
      })
  }

  setPostsOrder(data, val) {
    this.setState({
      sortPostsOrder: val,
      posts: data.json
    })
  };

  setPostsLimit(data, val) {
    this.setState({
      pagination: {
        limit: val,
        page: 1,
      },
      posts: data.json
    })
  }

  onClickPagination(current) {
    getData('/posts',{
      params: {
        _limit: this.state.pagination.limit,
        _page: current,
        _sort: this.state.sort,
        _order: this.state.sortPostsOrder,
        q: this.state.searchVal,
      }
    })
      .then(data => {
        this.setState({
          pagination: {
            limit: this.state.pagination.limit,
            page: current,
            order: this.state.sortPostsOrder
          },
          posts: data.json
        })
      })
  }

  onSearch(data, query) {
    this.setState({
      posts: data.json,
      searchVal: query,
      totalCount: data.headers.total
    })
  }

  setPostsView(val) {
    this.setState({view: val});
  }

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex">
        <Search resources={'/posts'}
                limit={this.state.pagination.limit}
                page={this.state.pagination.page}
                sort={this.state.sort}
                order={this.state.sortPostsOrder}
                searchVal={this.state.searchVal}
                onSearch={this.onSearch}
                apiPath={'/posts'}/>
        <Order limit={this.state.pagination.limit}
               page={this.state.pagination.page}
               sort={this.state.sort}
               searchVal={this.state.searchVal}
               setItemsOrder={this.setPostsOrder}
               apiPath={'/posts'}/>
        <Limit order={this.state.sortPostsOrder}
               page={this.state.pagination.page}
               sort={this.state.sort}
               searchVal={this.state.searchVal}
               setItemsLimit={this.setPostsLimit}
               apiPath={'/posts'}/>
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
