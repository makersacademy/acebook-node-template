class NewsfeedPostsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
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
        })
      })
  }
  render() {
    const {posts} = this.state;
    return (
			// <p>{users.body}</p>
      <ul>  
          {posts.map((post) => {   //javascript
            return  (							 //javascript
              <li key={post.body}>  
                 <p>{post.body}</p>
              </li>
              )
            }
          )}
      </ul>
    );
  }
}
ReactDOM.render(<NewsfeedPostsComponent />, document.getElementById('posts'))