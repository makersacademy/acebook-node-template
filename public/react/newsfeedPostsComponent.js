'use strict';
// import Post from './postComponent';

class NewsfeedPostsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.fetchData('/newsfeed/posts');
  }

  fetchData = (apiToFetch) => {
    fetch(apiToFetch)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          posts: data
        });
      });
  }

  render() {
    const {posts} = this.state;
    return (
      <ul>
          {posts.map((post) => {   //javascript
            return (							 //javascript
              <li key={post.id}>
                 <Post data={post}/>
              </li>
              );
            }
          )}
      </ul>
    );
  }
}

ReactDOM.render(<NewsfeedPostsComponent />, document.getElementById('posts'))
