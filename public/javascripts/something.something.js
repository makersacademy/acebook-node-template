let posts = document.getElementById('posts');
fetch('/newsfeed/posts').then(function(response) {
    return response.json();
  }).then(function(data) {
    //new Post(data.body, data.user_id, data.datePosted);
    let name = React.createElement('p', {}, data.name);
    ReactDOM.render(name, posts);
  })
