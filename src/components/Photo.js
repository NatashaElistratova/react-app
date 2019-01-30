import React from 'react';


export function Photo(props) {
  let data = props.data

  return (props.data.id % 2 === 0) ?
    <div>
      <div className="uk-inline uk-width-1-1">
        <img src="https://picsum.photos/600/300" className="uk-width-1-1" alt=""/>
        <div className="uk-overlay uk-overlay-primary uk-position-bottom">
          <p>{data.title}</p>
        </div>
      </div>
    </div> :

    <div>
      <div className="uk-inline uk-width-1-1">
        <img src="https://picsum.photos/600/400" className="uk-width-1-1" alt=""/>
        <div className="uk-overlay uk-overlay-primary uk-position-bottom">
          <p>{data.title}</p>
        </div>
      </div>
    </div>


}