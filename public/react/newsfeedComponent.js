'use strict';

class NewsfeedComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div id="full_newsfeed">
        <PostListComponent />
      </div>
    );
  }
}

ReactDOM.render(<NewsfeedComponent />, document.body);
