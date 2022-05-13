// const PostsController = require("../../controllers/posts");
// {/* <script src="https://unpkg.com/axios/dist/axios.min.js"></script> */ }

class LikesView {
  constructor() {
    const updateLikeStats = {
      Like: function (postId) {
                document.querySelector('#likes-count-' + postId).textContent++;
            },
            Unlike: function(postId) {
                document.querySelector('#likes-count-' + postId).textContent--;
            }
        };

        const toggleButtonText = {
                Like: function(button) {
                button.textContent = "Unlike";
            },
            Unlike: function(button) {
                button.textContent = "Like";
            }
        }

    document.querySelectorAll("#like-button").forEach((btn) => {
      btn.addEventListener("click", (event) => { 
        const postId = event.target.className
        const action = event.target.textContent.trim();
        console.log(event.target)
            toggleButtonText[action](event.target);
        updateLikeStats[action](postId);
        // eslint-disable-next-line no-use-before-define
        /*eslint-disable */

        //suppress all warnings between comments
        axios.post('posts/' + postId + '/likes', { action: action });

        /*eslint-enable */
          
      });
    });
  }
}
new LikesView();

