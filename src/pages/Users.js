import React from 'react';
import {getData} from '../api'
import {Users} from "../components/users/Users";
import {Pagination} from "../components";

export default class UsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      pagination: {
        limit: 4,
        page: 1
      },
      totalCount: null,
    }
    this.onClickPagination = this.onClickPagination.bind(this);
  }

  componentDidMount() {
    getData('/users',{
      params: {
        _limit: this.state.pagination.limit,
        _page: this.state.pagination.page,
        }
    }).then(data => {
        this.setState({
          users: data.json,
          totalCount: data.headers.total
        })
      });
  }

  onClickPagination(current) {
    getData('/users',{
      params: {
        _limit: this.state.pagination.limit,
        _page: current,
      }
    })
      .then(data => {
        this.setState({
          pagination: {
            limit: this.state.pagination.limit,
            page: current,
          },
          users: data.json
        })
      })
  }

  render() {
    return <div>
                {this.state.users.length ? <Users users={this.state.users}
                                             totalCount={this.state.totalCount}/> : 'Loading'}
      <Pagination
        onClickPagination={this.onClickPagination}
        totalCount={this.state.totalCount}
        pagination={this.state.pagination}/>
            </div>
      }
};