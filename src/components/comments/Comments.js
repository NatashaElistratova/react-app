import React from 'react'
import Comment from './Comment'
import { getComments } from '../../api'


export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments:[],
      comment:{
        name:'',
        email:'',
        body:''
      }
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount(){
    getComments(1)
    .then(comments => {
      this.setState({comments:comments})
    })
  }

  changeHandler(e){
    let comment = Object.assign({}, this.state.comment);
    comment[e.target.name] = e.target.value;
    comment.id = this.state.comments.length + 1;
    this.setState({comment: comment});
  }

  addComment(e){
    e.preventDefault();
    let comments = [...this.state.comments];
    comments.unshift(this.state.comment);
    this.setState({comments: comments});
    this.setState({
      comment:{
        name:'',
        email:'',
        body:''
      }
   });
  }

  render(){
      return (<div>
                <h3 className="uk-margin-remove-top">Comments:</h3>
                <div className="uk-comments">
                    {this.state.comments
                      .sort((a,b) => b.id - a.id)
                      .map((comment, index) => <Comment key={comment.id} data={comment}/>)}
                </div>
                <hr />
                <form action="#" className="uk-comment-form uk-margin-medium-top">
                <fieldset className="uk-fieldset">
                    <legend className="uk-legend">Add Comment</legend>
                    <div className="uk-margin">
                    <textarea className="uk-textarea"
                      rows={5}
                      placeholder="Comment"
                      required
                      name="body"
                      value={this.state.comment.body}
                      onChange={this.changeHandler} />
                    </div>
                    <div className="uk-margin">
                    <input className="uk-input"
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={this.state.comment.name}
                      onChange={this.changeHandler}/>
                    </div>
                    <div className="uk-margin">
                    <input className="uk-input"
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={this.state.comment.email}
                      onChange={this.changeHandler}/>
                    </div>
                    <div className="uk-margin">
                    <button className="uk-button uk-button-primary" onClick={(e)=> this.addComment(e)}>Post Comment</button>
                    </div>
                </fieldset>
                </form>
            </div>)
  }
}
