import React from 'react';
import {getData} from '../../api'

export function SelectFilter(props){
  function setSelectItem(val){
    let start = 0;
    let end = 6;
    let load = 3;
    getData({
      path: props.apiPath,
      start: start,
      end: end + load,
      searchVal: props.searchVal,
      albumId: val
    })
      .then(data => {
        props.setSelectMethod(data, val, start, end)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-left" onChange={(e) => setSelectItem(e.target.value)}>
            {props.selectOptions.map((option, id) => <option key={id} value={option.value}>{option.title}</option>)}
         </select>
}