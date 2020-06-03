let posts = document.getElementById('posts');
fetch('newsfeed/posts').then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(data) {
    console.log(data);
    let name = document.createElement("p")
    name.innerText = data.name;
    posts.appendChild(name);
  })
