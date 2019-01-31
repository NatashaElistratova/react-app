import React from 'react';
import {Link} from "react-router-dom";


export function Post(props) {
  let data = props.data

  return  props.view ==='list' ?
          <Link to={`/posts/${data.id}`}>
                <div>
                  <div className="uk-card uk-card-default uk-margin-medium-bottom uk-child-width-1-2@s uk-grid-collapse uk-margin" uk-grid={"true"}>
                    <div className="uk-card-media-left uk-cover-container">
                      <img src="https://picsum.photos/600/400" alt={""} uk-cover={"true"} />
                      <canvas width={600} height={400} />
                    </div>
                    <div>
                      <div className="uk-card-body">
                        <h3 className="uk-card-title">{data.id} {data.title}</h3>
                        <p>{data.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
          </Link> :


              <div className="uk-card uk-card-default uk-margin-medium-bottom">
                  <div className="uk-card-header">
                    <h3 className="uk-card-title uk-margin-remove-bottom">{data.id}: {data.title}</h3>
                  </div>
                  <div className="uk-card-body">
                    <p>{data.body}</p>
                  </div>
                  <div className="uk-card-footer">
                    <Link to={`/posts/${data.id}`} className="uk-button uk-button-text">
                      Read more </Link>
                  </div>
                </div>

}
