'use strict';

class Post extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  //componentDidMount --> Ajax request to the server fetches data
  // by send the this.props.data.userID --> returns an image with the profile
  //image datta that corersponds to that user

  componentDidMount() {
    fetch(`/newsfeed/profilepicture?imguserid=${this.props.data.userID}`)
    .then(response => response.json())
    .then((data) => {
      this.setState({

        profilePic: data
      })
    })
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
          {this.state.profilePic ? <img src={`data:image/png;base64,${ this.state.profilePic.binary }`}></img> : " "}

          <p class="postContent">{data.body} - by {data.name} - <span class="posted">Posted on {this.formatDate()}</span></p>
        </div>
      <Comment data={data} updatemethod={this.props.updatemethod}/>
      </div>
    );
  }
}
