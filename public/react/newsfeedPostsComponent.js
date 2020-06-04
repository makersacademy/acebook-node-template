
class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      crisps: []
    }
  }

  render() {
    return(<p>hello</p>);
  }
}

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
  //'I met a lovely dog today - by Jimothy Saladberg - Posted on 03/06/2020'
  render() {
    const {posts} = this.state;
    return (
      <ul>  
          {posts.map((post) => {   //javascript
            return (							 //javascript
              <li key={post.id}> 
                 <p>{post.body} - by {post.name} on {post.datePosted}</p>
                 <Post />
              </li>
              )
            }
          )}
      </ul>
    );
  }
}

ReactDOM.render(<NewsfeedPostsComponent />, document.getElementById('posts'))