import React from 'react';

export function PhotosSelect(props){
  function setPhotosAlbum(val){
    console.log(222)
    props.apiMethod({
      start:props.start,
      end:props.end,
      searchVal: props.searchVal,
      albumId: val
    })
      .then(data => {
        props.setPhotosAlbum(data, val)
      });
  }

  return <select className="uk-select uk-width-small uk-margin-left" onChange={(e) => setPhotosAlbum(e.target.value)}>
          <option value="all">All</option>
          <option value="1">Album 1</option>
          <option value="2">Album 2</option>
          <option value="3">Album 3</option>
        </select>
}