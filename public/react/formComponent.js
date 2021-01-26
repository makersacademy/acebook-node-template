'use strict';

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  };

  mySubmitHandler = (event) => {
    event.preventDefault();

    let newPost = {body: this.state.body};

    fetch("/newsfeed/create", {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
    .then((response) => {
      this.props.updatemethod();
    });
    
    this.cancelCourse()
  }


  cancelCourse = () => { 
    document.getElementById("new-post-form").reset();
  }

  myChangeHandler = (event) => {
    this.setState({body: event.target.value});
  }

  render() {
    return (
      <form id="new-post-form" class="card" onSubmit={this.mySubmitHandler}>
        <input id="new-post" class="postInput" type="text" placeholder="Type your post here" onChange={this.myChangeHandler}></input>
        <input type="submit" id="postButton" class="button" value="Submit"></input>
      </form>
    );
  }
}
