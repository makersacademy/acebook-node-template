"use strict";

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "Delete" };
  }

  addDelete = () => {
    fetch(`/posts/deletepost/${this.props.postId}`, {
      method: "DELETE",
    });
    return this.setState({ status: "Delete successful" });
  };

  render() {
    const { status } = this.state;
    return <button onClick={this.addDelete}>{status}</button>;
  }
}


document
  .querySelectorAll(".delete-button-container")
  .forEach((domContainer) => {
    ReactDOM.render(<DeleteButton {...domContainer.dataset} />, domContainer);
  });
