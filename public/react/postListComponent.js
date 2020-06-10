'use strict';
// import Post from './postComponent';

class PostListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      session: {},
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    this.fetchData('/newsfeed/posts');
    this.fetchSession('/newsfeed/session');
  }

  fetchData = (apiToFetch) => {
    fetch(apiToFetch)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          posts: data,
        });
      });
  }

  fetchSession = (apiToFetch) => {
    fetch(apiToFetch)
     .then(response => response.json())
     .then((data) => {
       console.log(data.user.firstName);
       this.setState({
        session: data,
        isLoggedIn: true,
      });
    });
  }

  getPostsSortedByNewest() {
    return this.state.posts.sort(function(postA, postB) {
      var dateA = new Date(postA.datePosted);
      var dateB = new Date(postB.datePosted);
      return dateB - dateA;
    });
  }


  updateState = () => {
    this.fetchData('/newsfeed/posts')
  }

  render() {
    return (
      <div id="posts">
        { this.state.isLoggedIn ?
            <h1 id="login-message">Welcome {this.state.session.user.firstName}</h1>
            : <h1></h1>
         }
        <div class="container">
        <FormComponent updatemethod={this.updateState} />
        <ul>
            {this.getPostsSortedByNewest().map((post) => {   //javascript
              return (							 //javascript
                <li class="card" key={post.id}>
                  <Post data={post}/>
                </li>
                );
              }
            )}
        </ul>
        </div>
        <form action="signup/log-out">
          <input id="log-out" type="submit" class="button" value="Log Out"></input>
        </form>
      </div>
    );
  }
}
