import React from 'react';
import axios from 'axios';

// Components are like functions that return HTML elements.
class App extends React.Component{

  // component properties should be kept in an object called state
  constructor() {
    super();
    this.state = {
      post: '',
      posts: []
    };
  }

  componentDidMount = () => {
    this.getBlogPost();
  }

  getBlogPost = () => {
    axios.get('/api/posts')
    .then((response) => {
      const data = response.data
      this.setState({posts: data})
      console.log('Data has been recieved');
    })
    .catch(() => {
      console.log('Error')
    })
  }

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

  delete = (event) => {
    event.preventDefault();
    const post_id = {
      id: event.target.dataset.id
    }

    axios({
      url: '/api/posts/delete',
      method: 'POST',
      data: post_id
    })

    .then(() => {
      console.log();
      console.log('Data has been sent to be deleted');
    })
    .catch(() => {
      console.log('Error');
    });
  }

  displayPosts = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post_display">
      <h4>{post.message}</h4>
      <form data-id={post._id} onSubmit={ this.delete }>
      <input type="submit" value="Delete"/>
      </form>
      </div>
    ));
  };

// purpose of render is to display the specified HTML code inside the specified HTML element
  render(){
    console.log('State: ', this.state)
    return(
      <div>
        <h2> Welcome to Acebook </h2>
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

        <div className="newsfeed">
          <h2>Timeline</h2>
          {this.displayPosts(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
