import React from 'react'
import { Post } from './Post'

export function Posts(props) {
  return <div>
          <div className={`uk-grid uk-child-width-1-2@s
                                  ${props.view === 'grid' ? 'uk-child-width-1-3@m' : false}
                                  ${props.view === 'list' ? 'uk-child-width-1-2@m' : false}`}>
            {props.posts.map((post) => <div key={post.id}><Post data={post} view={props.view}/></div>)}
          </div>
        </div>
}