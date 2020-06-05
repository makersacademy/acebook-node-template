'use strict';

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {}
  };

  render() {
    return (
      <form id="new-post-form" action="/newsfeed/post" method="post">
        <input id="new-post" type="text" placeholder="Type your post here"></input>
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}

ReactDOM.render(<FormComponent />, document.body);
