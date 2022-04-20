document.querySelectorAll(".likeUnlike").forEach(button => {
  button.addEventListener('click', event => { 
  console.log(button)
  console.log(event.target)
    if(button.value === "Like") {
      
    //makes the Button display unlike to show the post is liked
    
    button.value = "Unlike" 

    const username = event.target.getAttribute("username")
    const postId = event.target.getAttribute("postId")
    //saves the username and postID so it can be sent in the fetch request
    const data = {username, postId}
    const options = {
          method: 'POST',
          headers: {
                    'Content-Type': 'application/json',
                   },
                    body: JSON.stringify(data)
                   }
          
          //makes the fetch request to the specified path with the options object
          fetch('/like', options);

  } else {
 
    //delete like in database

    //makes the Button display like to show the post has been unliked

    button.value = "Like"


    const username = event.target.getAttribute("username")
    const postId = event.target.getAttribute("postId")
    //saves the username and postID so it can be sent in the fetch request
    const data = {username, postId}

    const options = {
          method: 'POST',
          headers: {
                    'Content-Type': 'application/json',
                   },
                    body: JSON.stringify(data)
                   }
  //makes the fetch request to the specified path with the options object
  fetch('/unlike', options);
 
  }
  })
})
