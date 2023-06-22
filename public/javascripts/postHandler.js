import { postFormData } from "./api.js";
import { attachFormListeners } from "./eventListeners.js";
import { handleLikeButtonClick } from "./likeHandler.js";
import { handleCommentFormSubmit } from "./commentHandler.js";
import { updateEditModalAndForm } from "./editHandler.js";
import { handleNewUpdateForm } from "./updateHandler.js";

export const handleNewPostFormSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(event.target);

  try {
    const data = await postFormData(
      event.target.action,
      event.target.method,
      formData
    );

    const newPost = document.createElement("div");
    newPost.classList.add("post-container");
    newPost.innerHTML = data.html;
    const postsList = document.querySelector(".timeline-section");
    postsList.insertAdjacentElement("afterbegin", newPost);

    let postComment = newPost.querySelector(".post-comment");
    let fullId = postComment.id;
    let splitId = fullId.split("-");
    let postId = splitId[1];

    let likeString = `
      <div class="post-likes">
        <div class="like-count">0 likes</div>
      </div>
    `;

    newPost.querySelector(".post-likes").innerHTML = likeString;

    let hiddenInput = newPost.querySelector("#like-form input[name='postId']");
    hiddenInput.value = postId;
    updateEditModalAndForm(newPost, postId);
    handleNewUpdateForm(newPost);
  } catch (error) {
    console.error(error);
  } finally {
    form.reset();
  }

  attachFormListeners(".like-button", "click", handleLikeButtonClick);
  attachFormListeners(".comment-form", "submit", handleCommentFormSubmit);
};
