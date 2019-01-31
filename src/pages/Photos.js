import React from 'react';
import {getPhotos} from '../api'
import {Photos} from "../components/photos/Photos";
import {Search} from "../components/actions/Search";
import {PhotosSelect} from "../components/actions/PhotosSelect";

export default class AlbumsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      searchVal: '',
      albumId:'all',
      start: 0,
      end: 6,
    }

    this.onSearch = this.onSearch.bind(this);
    this.setPhotosAlbum = this.setPhotosAlbum.bind(this);
    this.getMorePhotos = this.getMorePhotos.bind(this);
  }

  componentDidMount() {
    getPhotos({
      start:this.state.start,
      end:this.state.end,
      searchVal: this.state.searchVal,
      albumId: this.state.albumId,
    }).then(data => {
      this.setState({
        photos: data.photos,
      })
    })
  }

  setPhotosAlbum(data, val){
    this.setState({
      photos: data.photos,
      albumId: val,
    })
  }

  onSearch(data, query) {
    this.setState({
      photos: data.photos,
      searchVal: query,
    })
  }

  getMorePhotos(photos, newStart, newEnd){
    let morePhotos = this.state.photos.concat(photos);
      this.setState({
        photos: morePhotos,
        start: newStart,
        end: newEnd,
      })
  }

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex">

        <Search onSearch={this.onSearch}
                apiMethod={getPhotos}
                start={this.state.start}
                end={this.state.end}
                searchVal={this.state.searchVal}
                albumId={this.state.albumId}/>
        <PhotosSelect setPhotosAlbum={this.setPhotosAlbum}
                      apiMethod={getPhotos}
                      start={this.state.start}
                      end={this.state.end}
                      searchVal={this.state.searchVal}
                      albumId={this.state.albumId}/>
      </div>
      {this.state.photos.length ? <Photos photos={this.state.photos}
                                          getMorePhotos={this.getMorePhotos}
                                          apiMethod={getPhotos}
                                          start={this.state.start}
                                          end={this.state.end}
                                          searchVal={this.state.searchVal}
                                          albumId={this.state.albumId}/> : 'Loading'}
    </div>
  }
}
