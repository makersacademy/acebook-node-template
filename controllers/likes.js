


application.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/posts')
    .then(resource => resource.json())
    .then((post) => {
      addPostToPage(post)
    })
  });
  function addPostToPage(post) {

    const likeCounter = application.querySelector('.likes')
    likeCounter.innerText =  `${post.likes} likes`
    
    const likeButton = application.querySelector('.like-button')

    likeButton.addEventListener('click', function() {
      likesCounter.innerText = incrementLikes(data)
    })

  } // above is new logic for the like count display + button

  function incrementLikes(post){
    let likes = 0
    fetch(`http://localhost:3000/posts/${post.id}`)
    .then(resource => resource.json())
    .then((data) => {
        likes = data.likes
    })

    let newLikes = likes + 1

    fetch ('http://localhost:3000/posts/', {
      method: 'PATCH',
      headers: {
          "Content-Type": "application/json",
          Accept: "application/"
        },
        body: JSON.stringify({
          "likes": newLikes
        })
    })
    let likesText = `${newLikes} likes`
    return likesText


}
console.log(post)
