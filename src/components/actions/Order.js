import React from 'react';
import {getData} from '../../api'

export function Order(props){
  function setPostsOrder(val){
    getData(props.apiPath,{
      params: {
        _limit: props.limit,
        _page: props.page,
        _sort: props.sort,
        _order: val,
        q: props.searchVal,
      }
    })
      .then(data => {
        props.setItemsOrder(data, val)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-auto-left" onChange={(e) => setPostsOrder(e.target.value)}>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
}