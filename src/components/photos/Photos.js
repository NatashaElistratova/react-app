import React from 'react'
import {Photo} from './Photo'

export function Photos(props) {
  function getMorePhotos(){
      props.getMorePhotos();
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