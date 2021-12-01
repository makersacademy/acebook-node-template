window.addEventListener('DOMContentLoaded', () => {
  
  const ALL_POSTS = Array.from(document.getElementsByClassName("post"))
  if(ALL_POSTS !== null) {
    ALL_POSTS.forEach( (post) => {
      const COMMENT_BUTTON = post.querySelector("#comment-btn")
      COMMENT_BUTTON.addEventListener('click', () => {
        const COMMENT_FORM = post.querySelector("#comment-form")
        console.log(COMMENT_FORM.classList)
        if(COMMENT_FORM.classList.contains("invisible")){
          COMMENT_FORM.classList.remove("invisible");
          console.log(COMMENT_FORM);
        }
      });
    })
  }
})