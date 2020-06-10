'use strict';
// import Post from './postComponent';

class PostListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      session: {},
      isLoggedIn: false,
      redirect: false
    };
  }

  componentDidMount() {
    this.fetchData('/newsfeed/posts');
    //this.fetchSession('/user/login');
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
       // console.log(data.user.firstName);
       this.setState({
        session: data,
        isLoggedIn: true,
      });
    });
  }

  setRedirectLogout = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirectLogout = () => {
    if (this.state.redirect) {
      // console.log("test log out")
      this.session.data.clear()
      return <Redirect to='https://localhost:3000' />
    }
    // console.log("log out!")
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
            <h1>Welcome {this.state.session.user.firstName}</h1>
            : <h1></h1>
         }
        {this.renderRedirectLogout()}

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
        <button class="button" onClick={this.setRedirectLogout}> Logout </button>

      </div>
    );
  }
}
