import React from 'react';


export default class AlbumPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: props.match.params.id,
      post:{}
    }

  }

  componentDidMount(){

  }
  render() {
    return <div>
              <h1>Album</h1>
            </div>
  }
}
