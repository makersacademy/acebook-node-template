import { postJson } from "./api.js";

export const handleLikeButtonClick = async (event) => {
  event.preventDefault();

  const likeForm = event.target.closest("form");
  const dataObject = Object.fromEntries(new FormData(likeForm));

  try {
    const data = await postJson(likeForm.action, likeForm.method, dataObject);
    const post = likeForm.nextElementSibling;
    post.querySelector(
      ".post-likes .like-count"
    ).innerText = `${data.likesCount} likes`;
    post.querySelector(".post-likes .liked-by-tooltip").textContent =
      data.likedBy;
  } catch (error) {
    console.error(error);
  }
};
