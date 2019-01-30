import React from 'react';
import {getPhotos} from '../api'
import {Photos} from "../components/Photos";
import {Search} from "../components/actions/Search";
import {Order} from "../components/actions/Order";
import {Limit} from "../components/actions/Limit";
import {Pagination} from "../components";

export default class AlbumsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      pagination: {
        limit: 6,
        page: 1
      },
      totalCount: null,
      sortPhotosOrder: 'asc',
      searchVal: ''
    }
    this.onClickPagination = this.onClickPagination.bind(this);
    this.setPhotosOrder = this.setPhotosOrder.bind(this);
    this.setPhotosLimit = this.setPhotosLimit.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    getPhotos({
      limit: this.state.pagination.limit,
      page: this.state.pagination.page,
      order: this.state.sortPhotosOrder,
      searchVal: this.state.searchVal,
    }).then(data => {
      this.setState({
        photos: data.photos,
        totalCount: data.totalCount
      })
    })
  }

  setPhotosOrder(data, val) {
    this.setState({
      sortPhotosOrder: val,
      photos: data.photos
    })
  };

  setPhotosLimit(data, val) {
    this.setState({
      pagination: {
        limit: val,
        page: 1,
      },
      photos: data.photos
    })
  }

  onClickPagination(current) {
    getPhotos({
      limit: this.state.pagination.limit,
      page: current,
      order: this.state.sortPhotosOrder,
      searchVal: this.state.searchVal,
    })
      .then(data => {
        this.setState({
          pagination: {
            limit: this.state.pagination.limit,
            page: current,
            order: this.state.sortPhotosOrder
          },
          photos: data.photos
        })
      })
  }

  onSearch(data, query) {
    this.setState({
      photos: data.photos,
      searchVal: query,
      totalCount: data.totalCount
    })
  }

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex">
        <Search limit={this.state.pagination.limit}
                page={this.state.pagination.page}
                order={this.state.sortPhotosOrder}
                onSearch={this.onSearch}
                apiMethod={getPhotos}/>
        {/*<Order limit={this.state.pagination.limit}*/}
               {/*page={this.state.pagination.page}*/}
               {/*setItemsOrder={this.setPhotosOrder}*/}
               {/*apiMethod={getPhotos}/>*/}
        {/*<Limit order={this.state.sortPhotosOrder}*/}
               {/*page={this.state.pagination.page}*/}
               {/*setItemsLimit={this.setPhotosLimit}*/}
               {/*apiMethod={getPhotos}/>*/}
      </div>
      {this.state.photos.length ? <Photos onClickPagination={this.onClickPagination}
                                          pagination={this.state.pagination}
                                          order={this.state.order}
                                          photos={this.state.photos}
                                          totalCount={this.state.totalCount}/> : 'Loading'}
      <Pagination
        onClickPagination={this.onClickPagination}
        totalCount={this.state.totalCount}
        pagination={this.state.pagination}/>
    </div>
  }
}
