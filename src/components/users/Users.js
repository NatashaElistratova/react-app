import React from 'react';
import UIkit from 'uikit';

export function Users(props) {

  return <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-2@m" data-uk-grid>
          {props.users.map((user) => {
            return (<div key={user.id}>
              <div className="uk-card uk-card-default">
                <div className="uk-card-header">
                  <div className="uk-grid-small uk-flex-middle">
                    <div className="uk-width-auto">
                      <img className="uk-border-circle" width={40} height={40} src="https://picsum.photos/400/400"/>
                    </div>
                    <div className="uk-width-expand">
                      <h3 className="uk-card-title uk-margin-remove-bottom">{user.name}</h3>
                      <p className="uk-text-meta uk-margin-remove-top">
                        <time dateTime="2016-04-01T19:00">April 01, 2016</time>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="uk-card-body">
                  <ul className="uk-list uk-list-divider">
                    <li><b>Email</b>:{user.email}</li>
                    <li><b>Phone</b>: {user.phone}</li>
                    <li><b>Company</b>: {user.company.name}</li>
                  </ul>
                </div>
                <div className="uk-card-footer">
                  <a href="#" className="uk-button uk-button-text">Read more</a>
                </div>
              </div>
            </div>)
            })
          }
        </div>
}