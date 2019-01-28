import React from 'react'
import { BrowserRouter as Router, Route, browserHistory, Switch, IndexRoute, Link } from "react-router-dom";
import PostPage from '../pages/Post';
import AlbumPage from '../pages/Album';
import AlbumsPage from '../pages/Albums';
import PostsPage from '../pages/Posts';
import {Navigation} from "./Navigation";
import {Breadcrumbs} from "./Breadcrumbs";

export function App() {
  return <Router>
            <div>
              <Navigation/>
              <Breadcrumbs/>
              <main className="uk-main">
                <div className="uk-section">
                  <div className="uk-container">
                    <Switch>
                      <Route path={'/posts'} exact component={PostsPage}/>
                      <Route path={'/albums'} exact component={AlbumsPage}/>
                      <Route path={'/posts/:id'} component={PostPage}/>
                      <Route path={'/albums/:id'} component={AlbumPage}/>
                    </Switch>
                  </div>
                </div>
              </main>
            </div>
          </Router>
}

