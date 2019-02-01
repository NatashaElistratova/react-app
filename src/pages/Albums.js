import React from 'react';
import {getAlbums, getPhotos} from '../api'
import {Albums} from "../components/albums/Albums";
import {Search} from "../components/actions/Search";
import {Order} from "../components/actions/Order";
import {Limit} from "../components/actions/Limit";
import {Pagination} from "../components";
import UIkit from 'uikit';

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
      sortAlbumsOrder: 'asc',
      searchVal: ''
    }
    this.onClickPagination = this.onClickPagination.bind(this);
    this.setAlbumsOrder = this.setAlbumsOrder.bind(this);
    this.setAlbumsLimit = this.setAlbumsLimit.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    getAlbums({
      resources: 'albums',
      limit: this.state.pagination.limit,
      page: this.state.pagination.page,
      order: this.state.sortAlbumsOrder,
      searchVal: this.state.searchVal,
    }).then(data => {
      this.setState({
        albums: data.albums,
        totalCount: data.totalCount
      })
    })
  }

  setAlbumsOrder(data, val) {
    this.setState({
      sortAlbumsOrder: val,
      albums: data.albums
    })
  };

  setAlbumsLimit(data, val) {
    this.setState({
      pagination: {
        limit: val,
        page: 1,
      },
      albums: data.albums
    })
  }

  onClickPagination(current) {
    getAlbums({
      limit: this.state.pagination.limit,
      page: current,
      order: this.state.sortAlbumsOrder,
      searchVal: this.state.searchVal,
    })
      .then(data => {
        this.setState({
          pagination: {
            limit: this.state.pagination.limit,
            page: current,
            order: this.state.sortAlbumsOrder
          },
          albums: data.albums
        })
      })
  }

  onSearch(data, query) {
    this.setState({
      albums: data.albums,
      searchVal: query,
      totalCount: data.totalCount
    })
  }

  openPopup(e, albumId){
    e.preventDefault();

    getPhotos({
      params: {
        albumId: albumId
      }
    })
      .then(data => {
        const photos = data.photos

        UIkit.lightboxPanel({
          // items: [
          //     {source: 'https://getuikit.com/assets/uikit/tests/images/size1.jpg', caption: 'Caption 1'},
          //     {source: 'https://getuikit.com/assets/uikit/tests/images/size2.jpg', caption: 'Caption 2'},
          // ]

          items: photos.map((photo, index) => {
            return {
              source: `${photo.url}.jpg`,
              caption: `${index} - ${photo.title}`
            }
          })

        }).show();

      })

  }

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex">
        <Search limit={this.state.pagination.limit}
                page={this.state.pagination.page}
                order={this.state.sortAlbumsOrder}
                onSearch={this.onSearch}
                apiMethod={getAlbums}/>
        <Order limit={this.state.pagination.limit}
               page={this.state.pagination.page}
               setItemsOrder={this.setAlbumsOrder}
               apiMethod={getAlbums}/>
        <Limit order={this.state.sortAlbumsOrder}
               page={this.state.pagination.page}
               setItemsLimit={this.setAlbumsLimit}
               apiMethod={getAlbums}/>
      </div>
      {this.state.albums.length ? <Albums onClickPagination={this.onClickPagination}
                                          pagination={this.state.pagination}
                                          order={this.state.order}
                                          albums={this.state.albums}
                                          totalCount={this.state.totalCount}
                                          openPopup={this.openPopup}/> : 'Loading'}
      <Pagination
        onClickPagination={this.onClickPagination}
        totalCount={this.state.totalCount}
        pagination={this.state.pagination}/>
    </div>
  }
}
