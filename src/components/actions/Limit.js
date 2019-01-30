import React from 'react';

export function Limit(props){
  function setPostsLimit(val){
    props.apiMethod({
      limit: val,
      page: props.page,
      order: props.order,
      searchVal: props.searchVal,
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