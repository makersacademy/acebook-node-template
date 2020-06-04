class Post extends React.Component {
  constructor() {
    super();
  }
  formatDate() {
    var date = new Date(this.props.data.datePosted)
    return date.toLocaleDateString()
  }
  render() {
    let data = this.props.data
    return(
        <p>{data.body} - by {data.name} - Posted on {this.formatDate()}</p>
    );
  }
}
