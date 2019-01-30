import React from 'react';

export function Search(props){
  function onSearch(e) {
    if(e.keyCode === 13){
      let query = e.target.value;
      e.preventDefault();
      props.apiMethod({
        limit: props.limit,
        page: props.page,
        order: props.order,
        searchVal: query
      })
        .then(data => {
          props.onSearch(data, query)
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
