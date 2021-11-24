window.addEventListener('DOMContentLoaded', () => {
  
  const ALL_POSTS = Array.from(document.getElementsByClassName("post"))
  if(ALL_POSTS !== null) {
    ALL_POSTS.forEach( (post) => {
      const LIKE_BUTTON = post.lastElementChild
      LIKE_BUTTON.addEventListener('click', () => {
        const LIKE_COUNTER = LIKE_BUTTON.previousElementSibling
        console.log(LIKE_COUNTER)
        if(LIKE_COUNTER !== null) {
          LIKE_COUNTER.innerHTML = String(Number(LIKE_COUNTER.innerHTML) + 1)
        }
      });
    })
  }
})