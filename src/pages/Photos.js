import React from 'react';
import {getData} from '../api'
import {Photos} from "../components/photos/Photos";
import {Search} from "../components/actions/Search";
import {SelectFilter} from "../components/actions/SelectFilter";

export default class PhotosPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      prefetchPhotos: [],
      searchVal: '',
      albumId: 'all',
      start: 0,
      end: 6,
      load: 3,
      selectOptions: [],
      totalCount: null,
    }

    this.onSearch = this.onSearch.bind(this);
    this.setPhotosAlbum = this.setPhotosAlbum.bind(this);
    this.getMorePhotos = this.getMorePhotos.bind(this);
  }

  componentDidMount() {
    getData('/photos', {
      params: {
        _start:this.state.start,
        _end:this.state.end + this.state.load,
        q: this.state.searchVal,
        albumId: this.state.albumId,
      }
    }).then(data => {
      let photos = data.json.slice(0,this.state.end);
      let prefetchPhotos = data.json.slice(this.state.end, this.state.end + this.state.load);

      this.setState({
        prefetchPhotos: prefetchPhotos,
        photos: photos,
        totalCount: data.headers.total
      })
    });

    getData('/albums')
      .then(data => {
      this.setState({
        selectOptions: data.json,
      })
    })
  }

  setPhotosAlbum(data, val, start, end){
    let photos = data.json.slice(0, end);
    let prefetchPhotos = data.json.slice(end, end+this.state.load);

    this.setState({
      photos: photos,
      prefetchPhotos: prefetchPhotos,
      albumId: val,
      start: start,
      end: end
    })
  }

  onSearch(data, query, end) {
    let photos = data.json.slice(0, end);
    let prefetchPhotos = data.json.slice(end, end+this.state.load);

    this.setState({
      photos: photos,
      prefetchPhotos: prefetchPhotos,
      searchVal: query,
    })
  }

  getMorePhotos(){
    let photos = [...this.state.photos, ...this.state.prefetchPhotos];
    this.setState({
      photos: photos,
    });

    let newStart = this.state.end + 1;
    let newEnd = newStart + this.state.load;
    getData('/photos',{
      params: {
        _start: newStart + this.state.load,
        _end: newEnd + this.state.load,
        q: this.state.searchVal,
        albumId: this.state.albumId,
      }
    }).then(response => {
      this.setState({
        prefetchPhotos: response.json,
        start: newStart,
        end: newEnd,
        totalCount: response.headers.total
      })
    });
  }

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex">

        <Search onSearch={this.onSearch}
                apiPath={'/photos'}
                searchVal={this.state.searchVal}
                propName={'albumId'}
                propValue={this.state.albumId}
                end={6}
                start={0}
                load={this.state.start}/>
        <SelectFilter setSelectMethod={this.setPhotosAlbum}
                      end={6}
                      start={0}
                      load={this.state.start}
                      apiPath={'/photos'}
                      propName={'albumId'}
                      selectOptionName={'title'}
                      searchVal={this.state.searchVal}
                      selectOptions={this.state.selectOptions}/>
      </div>
      {this.state.photos.length ? <Photos photos={this.state.photos}
                                          getMorePhotos={this.getMorePhotos}
                                          apiMethod={getData}
                                          start={this.state.start}
                                          end={this.state.end}
                                          load={this.state.load}
                                          searchVal={this.state.searchVal}
                                          albumId={this.state.albumId}
                                          totalCount={this.state.totalCount}/> : 'Loading'}
    </div>
  }
}
