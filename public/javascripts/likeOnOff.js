document.querySelectorAll(".likeUnlike").forEach(button => {
  button.addEventListener('click', event => { 
  if(button.value === "Like") {
    button.value = "Unlike" 
  console.log(event.target)
  console.log(event.target.getAttribute("postId"))
  console.log(event.target.getAttribute("username"))
const username = event.target.getAttribute("username")
const postId = event.target.getAttribute("postId")
    const data = {username, postId}
    const options = {
          method: 'POST',
          headers: {
                  'Content-Type': 'application/json',
                },
            body: JSON.stringify(data)
          }
    
          fetch('/test', options);

    //create like in database
    // createNote(newNote, callback) {
    //   fetch('http://localhost:3000/notes', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newNote),    
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     callback(data);
    //     console.log(data);
    //   })
  } else {
    button.value = "Like"
    //delete like in database
  }
  })
})
