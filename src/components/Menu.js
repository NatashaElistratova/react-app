import React from 'react'
import {Link} from "react-router-dom";

export function Menu() {
  return <ul className="uk-navbar-nav">
          <li><Link to={"/posts"}>Posts</Link></li>
          <li><a href="users.html">Users</a></li>
          <li><Link to={"/photos"}>Photos</Link></li>
          <li><Link to={"/albums"}>Albums</Link></li>
          <li><a href="todos.html">Todos</a></li>
      </ul>
}

