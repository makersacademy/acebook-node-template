import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

export default class Posts extends Component {

  constructor(props){
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {posts: []};
  }

// will run before the page is rendered and add the exercises to the list
  componentDidMount(){
    fetch('/posts')
    .then(response => { return response })
    .then(function(data){
      console.log(data)
      window.data = data
    })
    .catch((error) => {
      console.log(error);
    })
  }


  render() {
    return (
      <div>
        <p>these are my posts</p>
      </div>
    )
  }
}
