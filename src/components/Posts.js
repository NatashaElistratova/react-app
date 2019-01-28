import React from 'react'
import { Post } from './Post'
import { Pagination } from './Pagination'

export function Posts(props) {
  let pages = Math.ceil(props.totalCount / props.pagination.limit);

  return <div>
          <div className={`uk-grid uk-child-width-1-2@s
                                  ${props.view === 'grid' ? 'uk-child-width-1-3@m' : false}
                                  ${props.view === 'list' ? 'uk-child-width-1-2@m' : false}`}>
            {props.posts.map((post) => <div key={post.id}><Post data={post} view={props.view}/></div>)}
          </div>
          <Pagination
            onClickPagination={props.onClickPagination}
            pages={pages}
            pagination={props.pagination}/>
        </div>
}