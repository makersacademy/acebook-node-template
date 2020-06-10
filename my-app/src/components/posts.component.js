import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';

// Components are like functions that return HTML elements.
export default class Posts extends React.Component{

  // component properties should be kept in an object called state
  constructor() {
    super();
    this.state = {
      post: '',
      posts: [],
      updateMessage: '',
      isInEditMode: false
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
      message: this.state.post,
      date: moment().format("YYYY-MM-DD HH:mm")
    };

    axios({
      url: '/api/posts',
      method: 'POST',
      data: post
    })

    .then(() => {
      console.log('Data has been sent to ther server');
    })
    .finally(()=> {
      this.resetUserInputs();
      this.getBlogPost();
      this.displayPosts(this.state.posts);
    })

    .catch(() => {
      console.log('Error');
    });
  }

  update = (event) => {
    event.preventDefault();
    this.setState({isInEditMode: true})
    const post_id = {
      id: event.target.dataset.id
    }

    axios({
      url: '/api/posts/retrieve',
      method: 'POST',
      data: post_id
    })

    .then((response) => {
      console.log(response.data)
      this.setState({updateMessage: response.data.message, updateID: response.data._id})
      console.log(this.state.updateMessage)
      console.log(this.state.updateID)
    })
    .catch(() => {
      console.log('Error')
    })
  }

  save = (event) => {
    event.preventDefault();
    this.setState({isInEditMode: false})
    const post = {
      id: this.state.updateID,
      message: this.state.updateMessage,
      date: new Date(Date.now())
    }

    axios({
      url: '/api/posts/update',
      method: 'POST',
      data: post
    })
    .then((response) => {
      console.log(response.data)
    })
    .finally(()=> {
      this.resetUserInputs();
      this.getBlogPost();
      this.displayPosts(this.state.posts);
    })
    .catch(() => {
      console.log('Error')
    })

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
      console.log('Data has been sent to be deleted');
    })
    .finally(()=> {
      this.getBlogPost();
      this.displayPosts(this.state.posts);
    })
    .catch(() => {
      console.log('Error');
    });
  }

  resetUserInputs = () => { 
    this.setState({ 
      post: '',
      updateMessage: '',
      updateID: ''
    }); 
  }; 

  displayPosts = (posts) => {
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index} className="post_display">
        <h4>{post.message}</h4>
          {console.log(typeof post.date)}
        <h6> Posted at {post.date} </h6>
        <form data-id={post._id} onSubmit={ this.delete }>
          <input type="submit" value="Delete"/>
        </form>
        <form data-id={post._id} onSubmit={ this.update}>
          <input type="submit" value="Edit"/>
        </form>
      </div>
    ));
  };

// purpose of render is to display the specified HTML code inside the specified HTML element
  render(){
    console.log('State: ', this.state)
    if(this.state.isInEditMode === false) {
      $("#edit-posts").hide()
    }else{
      $("#edit-posts").show()
    }
    return(
      <div>
        <center>
        <h2> Welcome to Acebook </h2>
        <h4> Create a post... </h4>
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
        <div id="edit-posts">
        <h4> Edit your post below... </h4>
        <form onSubmit={this.save}>
          <div className="form-input">
            <textarea
            name="updateMessage"
            placeholder="Edit your post"
            cols="30"
            rows="10"
            value={this.state.updateMessage}
            onChange={this.handleChange}>
            </textarea>
          </div>

          <button>Submit</button>
        </form>
        </div>
        </center>
      </div>
    );
  }
}
