'use strict';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  formatDate() {
    let date = new Date(this.props.data.datePosted)
    return date.toLocaleString()
  }

  render() {
    let data = this.props.data
    return(
      <div>
      <div>
        <p class="postContent">{data.body} - by {data.name} - <span class="posted">Posted on {this.formatDate()}</span></p>
      </div>
      <Comment data={data} updatemethod={this.props.updatemethod}/>
      </div>
    );
  }
}
