'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You reacted, we use react';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'REACT'
    );
  }
}

const domContainer = document.querySelector('#react-button-container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));