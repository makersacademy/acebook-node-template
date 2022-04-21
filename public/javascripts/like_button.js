
document.addEventListener('DOMContentLoaded', () => {
  console.log('Feed loaded')

  var likesAdded = []

  const userId = document.getElementsByName("user_id")[0].content
  console.log(userId)
  
  const likeButtons = document.querySelectorAll('.like_button')
  
  for (i = 0; i < likeButtons.length; i++ ) {
    console.log("found like button")
    likeButtons[i].addEventListener('click', (event) => {
      console.log("LIKE")
      const parent = event.target.parentElement
      const postId = parent.children[0].textContent
      const likesCount = parent.children[1]
      console.log(likesCount.textContent)
      console.log(postId)
      likesAdded.push(postId)
      console.log(likesAdded)
    });
  }

});