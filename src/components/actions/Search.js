import React from 'react';
import { getData } from '../../api'

export function Search(props){
  function onSearch(e) {
    if(e.keyCode === 13){
      let query = e.target.value;
      e.preventDefault();
      getData({
        resources: props.resources,
        limit: props.limit,
        page: props.page,
        order: props.order,
        searchVal: query
      })
        .then(data => {
          props.search(data, query)
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
