/* eslint-disable */

posts = document.querySelectorAll('.post')
posts.forEach((post) => {
  comment_forms = post.querySelectorAll('.comment-form')
  comment_forms.forEach((comment_form) => {
    
    comment_form.addEventListener('submit', (eventObj) => {

      let message = comment_form.querySelector(".comment-input").value
      let username = comment_form.querySelector(".comment-input").getAttribute('data-username')

      
      eventObj.preventDefault()
      
      options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          message: message,
          post_id: post.id
        })
      }
  
      fetch('http://localhost:3000/posts/create_comment', options)
      
      comment_button = comment_form.querySelector(".submit-comment")
      new_comment_container = document.createElement('div')
      new_comment_container.classList.add('comment-container')
      new_comment_container.innerHTML = `
      <div class="comment">
      <div class="username">${username}</div>
      <div class="message">${message}</div>`
  })
    
  })
})
