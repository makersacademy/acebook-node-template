import { attachFormListeners } from "./eventListeners.js";
import { handleLikeButtonClick } from "./likeHandler.js";
import { handleCommentFormSubmit } from "./commentHandler.js";
import { handleNewPostFormSubmit } from "./postHandler.js";
import { handleEditButtonClick } from "./editHandler.js";
import { handleUpdateSubmit } from "./updateHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  attachFormListeners(".like-button", "click", handleLikeButtonClick);
  attachFormListeners(".comment-form", "submit", handleCommentFormSubmit);
  handleEditButtonClick();
  handleUpdateSubmit();

  const newPostForm = document.getElementById("new-post-form");
  newPostForm.removeEventListener("submit", handleNewPostFormSubmit);
  newPostForm.addEventListener("submit", handleNewPostFormSubmit);
});
