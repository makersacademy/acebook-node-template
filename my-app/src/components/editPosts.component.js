import React from 'react';
import axios from 'axios';

export default class EditPosts extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      post: ''
    }
  }
  render(){
    return(
      <div>
      <center>
        <h4> Edit your post below... </h4>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <textarea
            name="post"
            placeholder="Enter your post"
            cols="30"
            rows="10"
            value={this.state.post}
            onChange={2}>
            </textarea>
          </div>

          <button>Submit</button>
        </form>
      </center>
      </div>
    )
  }
}
