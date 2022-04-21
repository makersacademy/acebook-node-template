
document.addEventListener('DOMContentLoaded', () => {
  console.log('Feed loaded')

  var likesAdded = []

  const userId = document.getElementsByName("user_id")[0].content
  console.log(userId)

  const updateLikesText = (alreadyLiked, likesCount) => {
    let numberOfLikes = parseInt(likesCount.textContent)
    if(alreadyLiked) {
      numberOfLikes--
    } else {
      numberOfLikes++
    }
    likesCount.innerText = numberOfLikes
    console.log(`New Likes: ${numberOfLikes}`)
  }

  const updateLikesCount = (postId, likesCount) => {
    let alreadyLiked = likesAdded.includes(postId)
    if (alreadyLiked) {
      for (j = 0; j < likesAdded.length; j++) {
        if (likesAdded[j] === postId) { likesAdded.splice(j, 1) }
      }
    } else {
      likesAdded.push(postId)
    }
    updateLikesText(alreadyLiked, likesCount)
  }

  
  
  const likeButtons = document.querySelectorAll('.like_button')
  
  for (i = 0; i < likeButtons.length; i++ ) {
    console.log("found like button")
    likeButtons[i].addEventListener('click', (event) => {
      console.log("LIKE")
      const parent = event.target.parentElement
      const postId = parent.children[0].textContent
      const likesCount = parent.children[1]
      updateLikesCount(postId, likesCount)

      console.log(likesCount.textContent)
      console.log(postId)
      console.log(likesAdded)
    });
  }

});