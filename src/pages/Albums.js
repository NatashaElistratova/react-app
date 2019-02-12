import React from 'react';
import {getData} from '../api'
import {Albums} from "../components/albums/Albums";
import {Search} from "../components/actions/Search";
import {Pagination} from "../components";
import UIkit from 'uikit';
import {SelectFilter} from "../components/actions/SelectFilter";

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
      searchVal: '',
      selectOptions:[],
      userId: null,
    }
    this.onClickPagination = this.onClickPagination.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.setAlbumUser = this.setAlbumUser.bind(this);
  }

  componentDidMount() {
    getData('/albums',{
      params: {
        _limit: this.state.pagination.limit,
        _page: this.state.pagination.page,
        q: this.state.searchVal,
      }
    }).then(data => {
      this.setState({
        albums: data.json,
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
  setAlbumUser(data, val){
    this.setState({
      albums: data.json,
      totalCount: data.headers.total,
      pagination: {
        limit: 6,
        page: 1
      },
      userId: val
    })
  };


  onClickPagination(current) {
    getData('/albums',{
      params: {
        _limit: this.state.pagination.limit,
        _page: current,
        q: this.state.searchVal,
      }
    })
      .then(data => {
        this.setState({
          pagination: {
            limit: this.state.pagination.limit,
            page: current,
          },
          albums: data.json
        })
      })
  }

  onSearch(data, query) {
    this.setState({
      albums: data.json,
      searchVal: query,
      totalCount: data.headers.total
    })
  }

  openPopup(e, albumId){
    e.preventDefault();

    getData('/photos',{
      params: {
        albumId: albumId
      }
    })
      .then(data => {
        const photos = data.json

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
                page={1}
                propName={'userId'}
                propValue={this.state.userId}
                onSearch={this.onSearch}
                apiPath={'/albums'}/>
        <SelectFilter setSelectMethod={this.setAlbumUser}
                      apiPath={'/albums'}
                      limit={this.state.pagination.limit}
                      page={1}
                      selectOptionName={'name'}
                      searchVal={this.state.searchVal}
                      propName={'userId'}
                      selectOptions={this.state.selectOptions}/>
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
