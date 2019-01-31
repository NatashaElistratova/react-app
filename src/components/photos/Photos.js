import React from 'react'
import {Photo} from './Photo'
import {getPhotos} from "../../api";

export function Photos(props) {
  function getMorePhotos(){
    let newStart = props.start + 6;
    let newEnd = props.end + 6;
    getPhotos({
      start: newStart,
      end: newEnd,
      searchVal: props.searchVal,
      albumId: props.albumId,
    }).then(response => {
      props.getMorePhotos(response.photos, newStart, newEnd);
    })
  }
  return <div>
          <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-2@m" data-uk-grid="masonry: true">
              {props.photos.map((photo) => <Photo key={photo.id} data={photo}/>)}
          </div>
          <ul className="uk-more uk-text-center uk-margin-medium-top">
            <button className="uk-button uk-button-primary" onClick={getMorePhotos}>
              Load more
            </button>
          </ul>
        </div>

}