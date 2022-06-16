/* eslint-disable */

posts = document.querySelectorAll('.post')
posts.forEach((post) => {
  like_forms = post.querySelectorAll('.like-form')
  like_forms.forEach((like_form) => {
    
    like_form.addEventListener('submit', (eventObj) => {
      
      eventObj.preventDefault()
      
      options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          post_id: like_form.id
        })
      }
  
      fetch('http://localhost:3000/posts/add_like', options).then((data) => console.log(data)).catch((err) => console.log(err))
      
      like_button = like_form.querySelector(".add-like-button")
      like_icon = like_form.querySelector('.fa-thumbs-up')
  
      if(like_button.value === "Like") {
        like_button.value = "Unlike"
        like_icon.classList.remove("fa-regular")
        like_icon.classList.add("fa-solid")
        like_count_number = parseInt(post.querySelector('.likes-count').textContent)
        like_count_number += 1
        like_count_string = like_count_number.toString()
        post.querySelector('.likes-count').textContent = like_count_string
      } else if (like_button.value === "Unlike") {
        like_icon.classList.remove("fa-solid")
        like_icon.classList.add("fa-regular")
        like_count_number = parseInt(post.querySelector('.likes-count').textContent)
        like_button.value = "Like"
        like_count_number -= 1
        like_count_string = like_count_number.toString()
        post.querySelector('.likes-count').textContent = like_count_string
      }
  })
    
  })
})
