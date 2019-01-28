import React from 'react';
import {Link} from "react-router-dom";

export function Album(props) {
  let data = props.data

  return  <tr>
            <td><span uk-icon="icon: album; ratio: 2" /></td>
            <td>{data.title}</td>
            <td><Link to={`/albums/${data.id}`} className="uk-button uk-button-primary js-lightbox" style={{whiteSpace: 'nowrap'}}>Open album</Link></td>
          </tr>

}