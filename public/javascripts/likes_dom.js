/* eslint-disable */

elements = document.querySelectorAll('.like-form')
elements.forEach((element) => {
  element.addEventListener('submit', (eventObj) => {
    console.log(element.id)
    eventObj.preventDefault()
    
    options = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        post_id: element.id
      })
    }
    fetch('http://localhost:3000/posts/add_like', options).then((data) => console.log(data))
    like_button = element.querySelector(".add-like-button")
    if(like_button.value === "Like") {
      like_button.value = "Unlike"
    } else if (like_button.value === "Unlike") {
      like_button.value = "Like"
    }
  })
})
