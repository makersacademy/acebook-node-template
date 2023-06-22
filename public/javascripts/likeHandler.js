import { postJson } from "./api.js";

export const handleLikeButtonClick = async (event) => {
  event.preventDefault();
  console.log("hello");

  const likeForm = event.target.closest("form");
  const dataObject = Object.fromEntries(new FormData(likeForm));

  try {
    const data = await postJson(likeForm.action, likeForm.method, dataObject);
    const likesContainer = likeForm.parentElement.parentElement;
    const postLikes = likesContainer.querySelector(".post-likes");

    postLikes.querySelector(
      ".like-count"
    ).innerText = `${data.likesCount} likes`;

    const likedByTooltipDiv = postLikes.querySelector(".liked-by-tooltip");
    if (likedByTooltipDiv) {
      likedByTooltipDiv.textContent = data.likedBy.join(", ");
    }
  } catch (error) {
    console.error(error);
  }
};
