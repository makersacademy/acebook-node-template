let posts = document.getElementById('posts');
fetch('/newsfeed/posts').then(function(response) {
    return response.json();
  }).then(function(data) {
    //new Post(data.body, data.user_id, data.datePosted);
    const element = <h1>Hello, world!</h1>;
    let name = React.createElement('p', {}, data.name);
    ReactDOM.render(element, posts);
  })
