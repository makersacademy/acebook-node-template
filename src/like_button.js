"use strict";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { likes: null };
  }

  addLike = () => {
    let newCount = this.state.likes + 1;
    this.setState({
      likes: newCount,
    });
    // Retrieve Likes
    fetch(`/posts/updatelikes/${this.props.postId}`, {
      method: "POST",
    });
  };

  // lifecyle method
  componentDidMount = () => {
    fetch(`/posts/viewlikes/${this.props.postId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ likes: responseJson.likes });
      });
  };

  render() {
    return <button onClick={this.addLike}>Likes: {this.state.likes}</button>;
  }
}

// Add comments explaining this
let domContainer = document.querySelector("#like-button-container");
ReactDOM.render(<LikeButton {...domContainer.dataset} />, domContainer);

// Updating likes
// Need a new route, post request, mongodb
// comments, form and button and
