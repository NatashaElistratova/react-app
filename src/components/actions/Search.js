import React from 'react';
import {getData} from '../../api'

export function Search(props){
  function onSearch(e) {
    if(e.keyCode === 13){
      let query = e.target.value;
      let start = 0;
      let end = 6;
      let load = 3;
      e.preventDefault();
      getData({
        path: props.apiPath,
        limit: props.limit,
        page: props.page,
        order: props.order,
        searchVal: query,
        start: start,
        end: end + load,
        albumId: props.albumId
      })
        .then(data => {
          props.onSearch(data, query, end)
        });
    }
  }

  return <form className="uk-width-medium uk-margin-right">
            <input className="uk-input"
                   type="search"
                   placeholder="Search..."
                   onKeyDown={(e) => onSearch(e)}/>
          </form>
}
