import React from 'react'
import { Album } from './Album'
import { Pagination } from './Pagination'

export function Albums(props) {
  let pages = Math.ceil(props.totalCount / props.pagination.limit);

  return <div>
            <table className="uk-table uk-table-justify uk-table-divider">
              <tbody>
              {props.albums.map((album) => <Album key={album.id} data={album}/>)}
              </tbody>
            </table>
            <div className={`uk-grid uk-child-width-1-2@s
                                          ${props.view === 'grid' ? 'uk-child-width-1-3@m' : false}
                                          ${props.view === 'list' ? 'uk-child-width-1-2@m' : false}`}>
            </div>
            <Pagination
              onClickPagination={props.onClickPagination}
              pages={pages}
              pagination={props.pagination}/>
          </div>
}