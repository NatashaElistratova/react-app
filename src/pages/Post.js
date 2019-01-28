import React from 'react';
import { SinglePost } from '../components/SinglePost';
import  Comments from '../components/comments/Comments';
import { getPost } from '../api'

export default class PostPage extends React.Component {
     constructor(props) {
        super(props);

        this.state = {
            postId: props.match.params.id,
            post:{}
        }

    }

    componentDidMount(){
      getPost(this.state.postId)
        .then(post => {
          this.setState({post:post})
        })
    }
    render() {
        return <div>
                  <SinglePost post={this.state.post}/>
                  <Comments postId={this.state.post.id}/>
               </div>
    }
}
