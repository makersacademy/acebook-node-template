console.log('layout.js')

const likeEl = document.querySelector("#like-event")

if (likeEl) {
  likeEl.addEventListener('click', () => {
    liked()
  })
}

const liked = () => {
  console.log(document.session)
  console.log('liked')
}