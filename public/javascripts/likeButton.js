
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Feed loaded')
      const socket = io()
      const userId = document.getElementsByName("user_id")[0].content
      const postsFeed = document.querySelector('.posts')
      const likeButtons = document.querySelectorAll('.like_button')

      for (i = 0; i < likeButtons.length; i++ ) {
        console.log('found like button')
        likeButtons[i].addEventListener('click', (event) => {
          console.log('LIKE')
          const parent = event.target.parentElement
          const postId = parent.children[0].textContent
          socket.emit('newLike', {postId: postId, userId: userId} )

        })
      }

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

    })
