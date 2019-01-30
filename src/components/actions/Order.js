import React from 'react';

export function Order(props){
  function setPostsOrder(val){
    props.apiMethod({
      limit: props.limit,
      page: props.page,
      order: val,
      searchVal: props.searchVal,
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