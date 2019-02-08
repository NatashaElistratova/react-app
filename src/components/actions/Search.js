import React from 'react';
import {getData} from '../../api'

export function Search(props){
  function onSearch(e) {
    if(e.keyCode === 13){
      let query = e.target.value;

      e.preventDefault();
      getData(props.apiPath,{
        params: {
          _limit: props.limit,
          _page: props.page,
          _order: props.order,
          q: query,
          _start: props.start,
          _end: props.end + props.load,
          [props.propName]: props.propValue
        }
      })
        .then(data => {
          props.onSearch(data, query, props.end)
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
