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

    this.setState({
      body: event.target.value,
      postId: this.props.data._id
    })
  }

  mySubmitHandler = (event) => {

    // saving body & post ID into the state   vvv
    // fetch to post data to server - newsfeed/comments/new controller
    // new controller postscontroller.comments
    //   we are sending res.body & res.id
    // findOne when res.id === post.id
    // findOne
    // var comment = new Post({comment: {body: res.body, userId: req.session.user.id, userName: }})
    // update post with comment data

    event.preventDefault();

    let newComment = {
      body: this.state.body
     }

    let postId = {
      postId: this.state.postId
    }

    fetch('/newsfeed/comments/new', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newComment, postId)
    })
    .then((response) => {
      console.log(newComment.body, postId.postId)
      //update method to fetch updated posts
    })
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
