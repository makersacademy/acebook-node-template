'use strict';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  formatDate() {
    let date = new Date(this.props.data.datePosted)
    return date.toLocaleDateString()
  }

  myChangeHandler = (event) => {
    // saving body & post ID into the state
    // fetch to post data to server - newsfeed/comments/new controller
    // new controller postscontroller.comments
    //   we are sending res.body & res.id
    // findOne when res.id === post.id
    // findOne
    // var comment = new Post({comment: {body: res.body, userId: req.session.user.id, userName: }})
    // update post with comment data

    this.setState({body: event.target.value})

  }


  mySubmitHandler = (event) => {
    event.preventDefault();
    // console.log("hello")
    // console.log(this.state.body)

  }


  render() {
    let data = this.props.data
    return(
      <div>
        <p class="postContent">{data.body} - by {data.name} - <span class="posted">Posted on {this.formatDate()}</span></p>
        <p><span class="fa fa-comments fa-2x"></span></p>

        <form id={`comment-form-${data._id}`} onSubmit={this.mySubmitHandler}>
          <input id="new-comment" class="commentInput" type="text" placeholder="Type your comment here" onChange={this.myChangeHandler}></input>
          <input type="submit" id="commentButton" class="button" value="Submit"></input>
        </form>

        { data.comments.map((comment) => {
          return (
            <div class="commentBox">
              <p>{comment.body} - by {comment.commentUserName}</p>
            </div>
          )
        })
        }
        </div>
    );
  }
}
