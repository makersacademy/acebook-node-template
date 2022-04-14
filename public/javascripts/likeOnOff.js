document.querySelectorAll(".likeUnlike").forEach(button => {
  button.addEventListener('click', () => { 
  if(button.value === "Like") {
    button.value = "Unlike" 
  } else {
    button.value = "Like"
  }
  })
})