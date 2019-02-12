import React from 'react'
import {Link} from "react-router-dom";

export function Menu() {
  return <ul className="uk-navbar-nav">
          <li><Link to={"/posts"}>Posts</Link></li>
          <li><Link to={"/users"}>Users</Link></li>
          <li><Link to={"/photos"}>Photos</Link></li>
          <li><Link to={"/albums"}>Albums</Link></li>
          <li><Link to={"/todos"}>Todos</Link></li>
      </ul>
}

