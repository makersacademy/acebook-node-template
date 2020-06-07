import React from 'react';
import axios from 'axios';

class App extends React.Component{

  state = {
    post: ''
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  submit = (event) => {
    event.preventDefault();

    const post = {
      message: this.state.post
    };

    axios({
      url: '/api/posts',
      method: 'POST',
      data: post
    })

    .then(() => {
      console.log('Data has been sent to ther server');
    })
    .catch(() => {
      console.log('Error');
    });
  }

  render(){
    console.log('State: ', this.state)
    return(
      <div>
      <h2> Welcome to my app </h2>
      <form onSubmit={this.submit}>
        <div className="form-input">
          <textarea
          name="post"
          placeholder="Enter your post"
          cols="30"
          rows="10"
          value={this.state.post}
          onChange={this.handleChange}>
          </textarea>
        </div>

        <button>Submit</button>
      </form>
      </div>
    );
  }
}

export default App;
