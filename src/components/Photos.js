import React from 'react'
import {Photo} from './Photo'
import {Pagination} from './Pagination'

export function Photos(props) {
  let pages = Math.ceil(props.totalCount / props.pagination.limit);

  return <div>
          <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-2@m" data-uk-grid="masonry: true">
              {props.photos.map((photo) => <Photo key={photo.id} data={photo}/>)}
          </div>
        </div>

}