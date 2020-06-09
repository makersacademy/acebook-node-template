'use strict';

class Post extends React.Component {
  constructor() {
    super();
  }
  formatDate() {
    let date = new Date(this.props.data.datePosted)
    return date.toLocaleDateString()
  }
  render() {
    let data = this.props.data
    console.log(data)
    return(
      <div>
        <p class="postContent">{data.body} - by {data.name} - <span class="posted">Posted on {this.formatDate()}</span></p>
        <p><span class="fa fa-comments fa-2x"></span></p>
        { data.comments.map((comment) => {
          return (
            <div class="commentBox">
              <p>{comment._id} said:</p>
              <p>{comment.body}</p>
            </div>
          )
        })
        }
        </div>
    );
  }
}
