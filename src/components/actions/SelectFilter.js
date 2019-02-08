import React from 'react';
import {getData} from '../../api'

export function SelectFilter(props){
  function setSelectItem(val){

    getData(props.apiPath,{
      params: {
        _start: props.start,
        _end: props.end + props.load,
        _limit: props.limit,
        _page: props.page,
        q: props.searchVal,
        [props.propName]: val
      }
    })
      .then(data => {
        props.setSelectMethod(data, val, props.start, props.end)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-left" onChange={(e) => setSelectItem(e.target.value)}>
            <option value="all">All</option>
            {props.selectOptions.map((option) => <option key={option.id} value={option.id}>{option[props.selectOptionName]}</option>)}
         </select>
}