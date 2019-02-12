import React from 'react';
import {getData} from '../api'
import {Todos} from "../components/todos/Todos";
import {Pagination} from "../components";
import {SelectFilter} from "../components/actions/SelectFilter";

export default class TodosPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      pagination: {
        limit: 12,
        page: 1
      },
      totalCount: null,
      userId: null,
      selectOptions:[],
    }
    this.onClickPagination = this.onClickPagination.bind(this);
    this.setTodoUser = this.setTodoUser.bind(this);
  }

  componentDidMount() {
    getData('/todos',{
      params: {
        _limit: this.state.pagination.limit,
        _page: this.state.pagination.page,
      }
    }).then(data => {
      this.setState({
        todos: data.json,
        totalCount: data.headers.total
      })
    });

    getData('/users')
      .then(data => {
        this.setState({
          selectOptions: data.json,
        })
      })
  }

  onClickPagination(current) {
    getData('/todos',{
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
          todos: data.json
        })
      })
  }

  setTodoUser(data, val){
    this.setState({
      todos: data.json,
      totalCount: data.headers.total,
      pagination: {
        limit: 12,
        page: 1
      },
      userId: val
    })
  };

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex uk-flex-middle">
        <div class="uk-flex-center uk-margin-auto-right"></div>
        <SelectFilter setSelectMethod={this.setTodoUser}
                      apiPath={'/todos'}
                      limit={this.state.pagination.limit}
                      page={1}
                      selectOptionName={'name'}
                      propName={'userId'}
                      selectOptions={this.state.selectOptions}/>
      </div>
      {this.state.todos.length ? <Todos todos={this.state.todos}
                                        totalCount={this.state.totalCount}/> : 'Loading'}
      <Pagination
        onClickPagination={this.onClickPagination}
        totalCount={this.state.totalCount}
        pagination={this.state.pagination}/>
    </div>
  }
};