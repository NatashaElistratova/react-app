import React from 'react';

export function Todos(props) {
  return <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-match" data-uk-grid>
          {props.todos.map((todo) => {
            return (<div key={todo.id}>
                <div className="uk-card uk-card-default uk-card-body">
                  <div className={`uk-label ${!todo.completed ? 'uk-label-danger' : ''}`}>
                    {todo.completed ? 'Completed' : 'Actived'}
                  </div>
                  <h3 className="uk-card-title uk-margin-small">{todo.title}</h3>
                </div>
              </div>
              )
            })
          }
          </div>
}