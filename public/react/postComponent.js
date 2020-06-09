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
        <p>{data.body} - by {data.name} - Posted on {this.formatDate()}</p>
        { data.comments.map((comment) => {
          return (
            <p>{comment.body} by {comment._id}</p>
          )
        })
        }
        </div>
    );
  }
}
