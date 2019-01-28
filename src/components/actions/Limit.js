import React from 'react';
import { getData } from '../../api'

export function Limit(props){
  function setPostsLimit(val){
    getData({
      resources: props.resources,
      limit: val,
      page: props.page,
      order: props.order,
    })
      .then(data => {
        props.setPostsLimit(data, val)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-left" onChange={(e) => setPostsLimit(e.target.value)}>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
}