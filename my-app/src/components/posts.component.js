import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import moment from 'moment';

export default class Posts extends React.Component{

  constructor() {
    super();
    this.state = {
      post: '',
      posts: [],
      updateMessage: '',
      isInEditMode: false,
      updateID:'',
      firstName:''
    };

  }

  componentDidMount = () => {
    this.takeUserid();
    console.log(this.state.firstName)
    this.getBlogPost();

  }

  getBlogPost = () => {
    axios.get('/api/posts')
    .then((response) => {
      const data = response.data
      this.setState({posts: data})
      console.log('Data has been received');
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
    const { match: { params } } = this.props;

    const post = {
      message: this.state.post,
      date: moment().format("YYYY-MM-DD HH:mm"),
      userId: params.id,
      userName: this.state.firstName
    };

    axios({
      url: '/api/posts',
      method: 'POST',
      data: post
    })

    .then(() => {
      console.log('Data has been sent to there server');
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
      this.setState({updateMessage: response.data.message, updateID: response.data._id})
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
      date: moment().format("YYYY-MM-DD HH:mm"),
      userName: this.state.firstName
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
    const { match: { params } } = this.props;
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index} className="card shadow-sm p-3 mb-5 bg-white rounded">
        <div className="card-body">
        <h4>{post.message}</h4>
        <p>{post.userName} posted at {post.date} </p>
        {(() => {
          if (post.userId !== params.id) {
            return null
          } else {
            return(
            <div className="row float-right">
              <form data-id={post._id} onSubmit={ this.delete }>
                <input className="btn btn-dark btn-sm custom-btn" type="submit" value="Delete"/>
              </form>
              <form data-id={post._id} onSubmit={ this.update}>
                <input className="btn btn-dark btn-sm custom-btn" type="submit" value="Edit"/>
              </form>
            </div>)
          }
        })()}
        </div>
      </div>
    ));

  };

  takeUserid = () => {
    const { match: { params } } = this.props;
    console.log("hey we are in takeUserid function and we are getting ")
    console.log(params.id)
    axios({
      url: '/api/user/find',
      method: 'POST',
      data: params
    }).then((response) => {
      var firstName = response.data.firstName
      this.setState({firstName: firstName})
      console.log(this.state.firstName)
    })
  }



// purpose of render is to display the specified HTML code inside the specified HTML element

  render(){
    console.log('State: ', this.state)
    if(this.state.isInEditMode === false) {
      $("#edit-posts").hide()
    }else{
      $("#edit-posts").show()
    }
    return(
      <div className="posts-page">
        <div className="col-md-6 offset-md-3"> 
          <div className="container">

          <div className="shadow-sm p-3 mb-5 bg-light rounded">
          <center>
            <h2> Hi {this.state.firstName}! </h2>
            </center>
            <div className="card-body  main-post">
              <h4> Create a post... </h4>
              <form onSubmit={this.submit}>
                <div className="form-input">
                  <textarea
                    name="post"
                    placeholder="Enter your post"
                    className="form-control"
                    cols="30"
                    rows="3"
                    value={this.state.post}
                    onChange={this.handleChange}>
                  </textarea>
                </div>
                <div className="text-right">
                  <input className=" btn btn-dark btn-small custom-btn" type= "submit" value="Submit"/>
                </div>    
              </form>
            </div>
          
          </div>

          <br></br>

          <div className="newsfeed wrapper-main shadow-sm p-3 mb-5 bg-white rounded">
            <div className="container">
              <h2>Timeline</h2>
              {this.displayPosts(this.state.posts)}
            </div>
          </div>

          <div id="edit-posts">
        
            <form onSubmit={this.save}>
              <div className="form-input card shadow-sm p-3 mb-5 bg-white rounded">
                <div className="card-body container">
                <h4> Edit your post below... </h4>
                  <textarea
                  name="updateMessage"
                  placeholder="Edit your post"
                  className="form-control"
                  cols="30"
                  rows="3"
                  value={this.state.updateMessage}
                  onChange={this.handleChange}>
                  </textarea>
                </div>

                <div className="text-right">
                  <input className=" btn btn-dark btn-small custom-btn" type="submit" value="Submit"/>
                </div>    
              </div>
            </form>
          </div>
        </div>
          </div>
          
      </div>
        
    );
  }
}
