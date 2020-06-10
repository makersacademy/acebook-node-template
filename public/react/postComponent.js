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

  myChangeHandler(){
    this.setState({body: event.target.value})
  }


  mySubmitHandler(){
    console.log("submit")
  }


  render() {
    let data = this.props.data
    console.log(data)
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
