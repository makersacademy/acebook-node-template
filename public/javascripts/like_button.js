
document.addEventListener('DOMContentLoaded', () => {
  console.log('Feed loaded')
  
  const likeButtons = document.querySelectorAll('.like_button')
  
  for (i = 0; i < likeButtons.length; i++ ) {
    console.log("found like button")
    likeButtons[i].addEventListener('click', (event) => {
      console.log("LIKE")
      const parent = event.target.parentElement
      console.log(parent.children[0].textContent)
    });
  }

});