'use strict';

class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
   this.state = { status: 'Delete' };
  }

  addDelete = () => {
    this.setState({ status: 'Delete successful' });
  };

   // lifecyle method
   
  componentDidMount() {
    fetch(`/posts/deletepost/${this.props.postId}`, { method: 'POST' })
      .then(() => this.setState({
         status: 'Delete successful' 
      }));
  }

  render() {
    const { status } = this.state;
    return (
      <button onClick={this.addDelete}>
       { status }
      </button>
    );
  }
}


// state data set



let domContainer = document.querySelector('#delete-button-container');
ReactDOM.render(<DeleteButton {...domContainer.dataset} />, domContainer);