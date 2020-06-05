'use strict';

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {}
  };

  mySubmitHandler = (event) => {
    event.preventDefault();
    PostListComponent.state .push({body: "I am new!"})
    
    console.log(PostListComponent.state.posts)
    // sending the body over to server > route > controller  
    // when it arrives at controller > Model > DB
    // Reload and render the post lists to show new posts 
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



// mySubmitHandler = (event) => {
//   event.preventDefault();
//   alert("You are submitting " + this.state.username);
// }
// myChangeHandler = (event) => {
//   this.setState({username: event.target.value});
// }
// render() {
//   return (
//     <form onSubmit={this.mySubmitHandler}>
//     <h1>Hello {this.state.username}</h1>
//     <p>Enter your name, and submit:</p>
//     <input
//       type='text'
//       onChange={this.myChangeHandler}
//     />
//     <input
//       type='submit'
//     />
//     </form>

