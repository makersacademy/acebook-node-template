
document.addEventListener('DOMContentLoaded', () => {
  console.log('Feed loaded')
  const socket = io()
  const userId = document.getElementsByName("user_id")[0].content
  const postsFeed = document.querySelector('.posts')

  addLikeButtons(socket, userId, postsFeed)

  socket.on('add like', (postId) => {
    console.log('adding 1 like to ' + postId)
    const post = document.getElementById(postId)
    const likes = post.querySelector('.post_likes').querySelector('#likes_count')
    currentLikes = parseInt(likes.textContent)
    likes.innerText = currentLikes + 1
    console.log(currentLikes)
  })

  socket.on('remove like', (postId) => {
    console.log('removing 1 like from ' + postId)
    const post = document.getElementById(postId)
    const likes = post.querySelector('.post_likes').querySelector('#likes_count')
    currentLikes = parseInt(likes.textContent)
    likes.innerText = currentLikes - 1
    console.log(currentLikes)
  })

  const newPostButton = document.querySelector('.new_post_button')
  const newPostTextArea = document.querySelector("#new_post_text")
  newPostButton.addEventListener('click', () => {
    console.log('NEW POST')
    const text = newPostTextArea.value
    socket.emit('newPostAdded', {message: text, author: userId})
    newPostTextArea.value = ""
  })

  socket.on('addNewPost', (post) => {

    const newPost = post.post
    const newPostId = newPost._id
    const newChild = document.createElement('div')
    newChild.setAttribute('class', 'post')
    newChild.setAttribute('id', newPostId)

    const authorName = document.createElement('div')
    authorName.setAttribute('class', 'post_author')
    authorName.innerText = `${newPost.authorFirstName} ${newPost.authorSurname}`

    const postMessage = document.createElement('div')
    postMessage.setAttribute('class', 'post_content')
    postMessage.innerText = newPost.message

    const postDate = document.createElement('div')
    postDate.setAttribute('class', 'post_date')
    postDate.innerText = newPost.created_at

    const likesRow = document.createElement('div')
    likesRow.setAttribute('class', 'post_likes')
    const likesId = document.createElement('span')
    likesId.setAttribute('id', 'post_id')
    likesId.hidden = true
    likesId.innerText = newPostId
    const likesCount = document.createElement('span')
    likesCount.setAttribute('id', 'likes_count')
    likesCount.innerText = "0"
    const likeButton = document.createElement('button')
    likeButton.setAttribute('class', 'like_button')
    likeButton.innerText = "Like"
    likeButton.addEventListener('click', (event) => {
      likeikeEvent(socket, event, userId)
    })

    nestItems(likesRow, [likesId, likesCount, likeButton])

    const deleteRow = document.createElement('div')
    deleteRow.setAttribute('class', 'delete_button_container')
    const deleteForm = document.createElement('form')
    deleteForm.setAttribute('action', `/posts/delete/${newPostId}`)
    deleteForm.setAttribute('method', 'post')
    const hiddenFormInput = document.createElement('input')
    hiddenFormInput.setAttribute('type', 'hidden')
    hiddenFormInput.setAttribute('name', 'userId')
    hiddenFormInput.setAttribute('value', userId)
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('id', 'delete_post')
    deleteButton.innerText = "Delete post"
    deleteForm.appendChild(hiddenFormInput)
    deleteForm.appendChild(deleteButton)
    deleteRow.appendChild(deleteForm)

    nestItems(newChild, [authorName, postMessage, postDate, likesRow, deleteRow])

    postsFeed.insertBefore(newChild, postsFeed.firstChild)
  })

})

const addLikeButtons = (socket, userId, postsFeed) => {
  const likeButtons = document.querySelectorAll('.like_button')
  for (i = 0; i < likeButtons.length; i++ ) {
    console.log('found like button')
    likeButtons[i].addEventListener('click', (event) => {
      likeikeEvent(socket, event, userId)
    })
  }
}

const likeikeEvent = (socket, event, userId) => {
  console.log('LIKE')
  const parent = event.target.parentElement.parentElement
  const postId = parent.getAttribute('id')
  socket.emit('newLike', {postId: postId, userId: userId})
}

const nestItems = (parent, childArray) => {
  for (i = 0; i < childArray.length; i++) {
    parent.appendChild(childArray[i])
  }
}
