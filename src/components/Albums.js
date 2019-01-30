import React from 'react'
import { Album } from './Album'

export function Albums(props) {
  let pages = Math.ceil(props.totalCount / props.pagination.limit);

  return <div>
            <table className="uk-table uk-table-justify uk-table-divider">
              <tbody>
              {props.albums.map((album) => <Album key={album.id} data={album}/>)}
              </tbody>
            </table>
          </div>
}