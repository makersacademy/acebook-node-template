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

    // sending the body over to server > route > controller
    // when it arrives at controller > Model > DB
    // Reload and render the post lists to show new posts √√√√
  }

  myChangeHandler = (event) => {
    this.setState({body: event.target.value});
  }

  render() {
    return (
      <form id="new-post-form" onSubmit={this.mySubmitHandler}>
        <input id="new-post" type="text" placeholder="Type your post here" onChange={this.myChangeHandler}></input>
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}
