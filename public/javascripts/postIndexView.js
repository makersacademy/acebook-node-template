class postIndexView {
  constructor(posts) {
    this.mainContainer = document.querySelector('#main-container');
    this.posts = posts
  }

  displayPosts() {
    this.posts.forEach((post) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';

      const text = document.createElement('p');
      text.innerText = post.message;
      postDiv.append(text);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      postDiv.append(deleteButton); 

      this.mainContainer.append(postDiv);
    })

  }
}

module.exports = postIndexView;
