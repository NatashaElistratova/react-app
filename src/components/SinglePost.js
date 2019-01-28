import React from 'react'

export function SinglePost(props) {

  return <div>
          <h1 className="uk-heading-bullet uk-margin-medium-bottom">
            <span>{props.post.title}</span>
          </h1>
          <div className="uk-article uk-dropcap uk-margin-large-bottom">
            <p>{props.post.body}</p>
          </div>
          <hr />
        </div>
}
