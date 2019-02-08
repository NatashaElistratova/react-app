import React from 'react';
import {getData} from '../../api'

export function SelectFilter(props){
  function setSelectItem(val){
    let start = 0;
    let end = 6;
    let load = 3;
    getData(props.apiPath,{
      params: {
        _start: start,
        _end: end + load,
        q: props.searchVal,
      }

      // `${props.propName}`: val
    })
      .then(data => {
        props.setSelectMethod(data, val, start, end)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-left" onChange={(e) => setSelectItem(e.target.value)}>
            <option value="all">All</option>
            {props.selectOptions.map((option) => <option key={option.id} value={option.id}>{option[props.selectOptionName]}</option>)}
         </select>
}