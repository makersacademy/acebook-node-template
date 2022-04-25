
document.addEventListener('DOMContentLoaded', () => {
  const socket = io()
  const userId = document.getElementsByName("user_id")[0].content
  const postsFeed = document.querySelector('.posts')

  const newPostButton = document.querySelector('.new_post_button')
  const newPostTextArea = document.querySelector("#new_post_text")
  newPostButton.addEventListener('click', (event) => {
    console.log('NEW POST')
    const text = newPostTextArea.value
    socket.emit('newPostAdded', {message: text, author: userId})
    
})

  socket.on('addNewPost', (post) => {
    const newPost = post.post
    const newChild = document.createElement('div')
    newChild.setAttribute('class', 'post')

    const authorName = document.createElement('div')
    authorName.setAttribute('class', 'post_author')
    authorName.innerText = `${newPost.authorFirstName} ${newPost.authorSurname}`

    const postMessage = document.createElement('div')
    postMessage.setAttribute('class', 'post_content')
    postMessage.innerText = newPost.message

    const postDate = document.createElement('div')
    postDate.setAttribute('class', 'post_date')
    postDate.innerText = newPost.created_at

    newChild.appendChild(authorName)
    newChild.appendChild(postMessage)
    newChild.appendChild(postDate)
    postsFeed.insertBefore(newChild, postsFeed.firstChild)
    console.log(newPost)
  })
})