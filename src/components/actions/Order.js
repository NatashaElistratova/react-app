import React from 'react';
import { getData } from '../../api'

export function Order(props){
  function setPostsOrder(val){
    getData({
      resources: props.resources,
      limit: props.limit,
      page: props.page,
      order: val,
    })
      .then(data => {
        props.setPostsOrder(data, val)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-auto-left" onChange={(e) => setPostsOrder(e.target.value)}>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
}