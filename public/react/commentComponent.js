'use stict';

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  myChangeHandler = (event) => {

    this.setState({
      body: event.target.value,
      postId: this.props.data._id
    })
  }

  mySubmitHandler = (event) => {

    event.preventDefault();

    let newComment = {
      body: this.state.body,
      id: this.state.postId
      }

    fetch('/newsfeed/comments/new', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newComment)
    })
    .then((response) => {
      this.props.updatemethod();
    })

    this.cancelCourse()
  }

  cancelCourse = () => { 
    document.getElementById(`comment-form-${this.props.data._id}`).reset();
  }



    formatTime(comment) {
      let date = new Date(comment.timePosted)
      return date.toLocaleString()
    }

    render() {
      return(
        <div>
        { this.props.data.comments.map((comment) => {
        return (
          <div class="commentBox">
            <div class="individualComments">
              <p class="commentText">{comment.body} </p>
              <p class="commentInfo">{comment.commentUserName} - <span class="posted">Posted on: {this.formatTime(comment)}</span></p>
            </div>
          </div>
          )
        })
      }
        <form id={`comment-form-${this.props.data._id}`} onSubmit={this.mySubmitHandler}>
          <input id="new-comment" class="commentInput" type="text" placeholder="Type your comment here" onChange={this.myChangeHandler}></input>
          <input type="submit" id="commentButton" class="button" value="Submit"></input>
        </form>
      </div>
    );
  }
}
