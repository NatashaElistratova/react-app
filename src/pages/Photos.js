import React from 'react';
import {getPhotos} from '../api'
import {Photos} from "../components/photos/Photos";
import {Search} from "../components/actions/Search";
import {AlbumSelect} from "../components/actions/AlbumSelect";

export default class PhotosPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      prefetchPhotos:[],
      searchVal: '',
      albumId:'all',
      start: 0,
      end: 9,
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
      let photos = data.photos.slice(0,6);
      let prefetchPhotos = data.photos.slice(6,10);

      this.setState({
        prefetchPhotos: prefetchPhotos,
        photos: photos,
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

  getMorePhotos(){
    let photos = [...this.state.photos, ...this.state.prefetchPhotos];
    this.setState({
      photos: photos,
    });

    let newStart = this.state.end + 1;
    let newEnd = this.state.end + 4;
    getPhotos({
      start: newStart,
      end: newEnd,
      searchVal: this.state.searchVal,
      albumId: this.state.albumId,
    }).then(response => {
      this.setState({
        prefetchPhotos: response.photos,
        start: newStart,
        end: newEnd,
      })
    });
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
        <AlbumSelect setPhotosAlbum={this.setPhotosAlbum}
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
