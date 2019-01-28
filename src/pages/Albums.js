import React from 'react';
import { getData } from '../api'
import { Albums } from "../components/Albums";
import {Search} from "../components/actions/Search";
import {Order} from "../components/actions/Order";
import {Limit} from "../components/actions/Limit";

export default class AlbumsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albums: [],
      pagination: {
        limit: 6,
        page: 1
      },
      totalCount: null,
      sortPostsOrder: 'asc',
      searchVal: ''
    }

  }

  componentDidMount(){
    getData({
      resources:'albums',
      limit: this.state.pagination.limit,
      page: this.state.pagination.page,
      order: this.state.sortPostsOrder,
      searchVal: this.state.searchVal,
    }).then(data => {
        this.setState({
          albums:data.albums,
          totalCount: data.totalCount
        })
      })
  }
  render() {
    return <div>
              <div className="uk-margin-medium-bottom uk-flex">
                <Search resources={'albums'}
                        limit={this.state.pagination.limit}
                        page={this.state.pagination.page}
                        order={this.state.sortPostsOrder}
                        search={this.search}/>
                <Order resources={'albums'}
                       limit={this.state.pagination.limit}
                       page={this.state.pagination.page}
                       setPostsOrder={this.setPostsOrder}/>
                <Limit resources={'albums'}
                       order={this.state.sortPostsOrder}
                       page={this.state.pagination.page}
                       setPostsLimit={this.setPostsLimit}/>
              </div>
              {this.state.albums.length ? <Albums onClickLimit={this.onClickLimit}
                                                onClickPagination={this.onClickPagination}
                                                pagination={this.state.pagination}
                                                order={this.state.order}
                                                albums={this.state.albums}
                                                totalCount={this.state.totalCount}
                                                view={this.state.view}/> : 'Loading'}
            </div>
  }
}
