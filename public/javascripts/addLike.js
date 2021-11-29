window.addEventListener('DOMContentLoaded', () => {
  
  const ALL_POSTS = Array.from(document.getElementsByClassName("post"))
  if(ALL_POSTS !== null) {
    ALL_POSTS.forEach( (post) => {
      const LIKE_BUTTON = post.querySelector("#like-btn")
      LIKE_BUTTON.addEventListener('click', () => {
        const LIKE_COUNTER = post.querySelector(".like-counter")
        if(LIKE_COUNTER !== null) {
          LIKE_COUNTER.innerHTML = String(Number(LIKE_COUNTER.innerHTML) + 1)
        }
      });
    })
  }
})