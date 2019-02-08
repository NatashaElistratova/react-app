import React from 'react';
import {getData} from '../../api'

export function Limit(props){
  function setPostsLimit(val){
    getData(props.apiPath,{
      params: {
        _limit: val,
        _page: 1,
        _sort: props.sort,
        _order: props.order,
        q: props.searchVal,
      }
    })
      .then(data => {
        props.setItemsLimit(data, val)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-left" onChange={(e) => setPostsLimit(e.target.value)}>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
}