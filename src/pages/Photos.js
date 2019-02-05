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
      prefetchPhotos:[],
      searchVal: '',
      albumId:'all',
      start: 0,
      end: 6,
      load: 3,
      selectOptions:[
        {value:'all', title:'All'},
        {value:'1', title:'Album 1'},
        {value:'2', title:'Album 2'},
        {value:'3', title:'Album 3'},
      ]
    }

    this.onSearch = this.onSearch.bind(this);
    this.setPhotosAlbum = this.setPhotosAlbum.bind(this);
    this.getMorePhotos = this.getMorePhotos.bind(this);
  }

  componentDidMount() {
    getData({
      path:'photos',
      start:this.state.start,
      end:this.state.end + this.state.load,
      searchVal: this.state.searchVal,
      albumId: this.state.albumId,
    }).then(data => {
      let photos = data.json.slice(0,this.state.end);
      let prefetchPhotos = data.json.slice(this.state.end, this.state.end + this.state.load);

      this.setState({
        prefetchPhotos: prefetchPhotos,
        photos: photos,
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
    console.log(end)
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
    getData({
      path:'photos',
      start: newStart + this.state.load,
      end: newEnd + this.state.load,
      searchVal: this.state.searchVal,
      albumId: this.state.albumId,
    }).then(response => {
      this.setState({
        prefetchPhotos: response.json,
        start: newStart,
        end: newEnd,
      })
    });
  }

  render() {
    return <div>
      <div className="uk-margin-medium-bottom uk-flex">

        <Search onSearch={this.onSearch}
                apiPath={'photos'}
                searchVal={this.state.searchVal}
                albumId={this.state.albumId}/>
        <SelectFilter setSelectMethod={this.setPhotosAlbum}
                      apiPath={'photos'}
                      searchVal={this.state.searchVal}
                      albumId={this.state.albumId}
                      selectOptions={this.state.selectOptions}/>
      </div>
      {this.state.photos.length ? <Photos photos={this.state.photos}
                                          getMorePhotos={this.getMorePhotos}
                                          apiMethod={getData}
                                          start={this.state.start}
                                          end={this.state.end}
                                          load={this.state.load}
                                          searchVal={this.state.searchVal}
                                          albumId={this.state.albumId}/> : 'Loading'}
    </div>
  }
}
