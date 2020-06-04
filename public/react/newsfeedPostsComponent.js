
class Post extends React.Component {
  constructor() {
    super();
  }
  formatDate(message) {
    var date = new Date(message)
    console.log(date.toLocaleDateString())
    return date.toLocaleDateString()
  }


  render() {
    return(
        <p>{this.props.data.body} - by {this.props.data.name} - Posted on {this.formatDate(this.props.data.datePosted)}</p>
    
    );
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
                 <Post data={post}/>
              </li>
              )
            }
          )}
      </ul>
    );
  }
}

ReactDOM.render(<NewsfeedPostsComponent />, document.getElementById('posts'))
