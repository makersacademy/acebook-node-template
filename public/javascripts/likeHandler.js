import { postJson } from "./api.js";

export const handleLikeButtonClick = async (event) => {
  event.preventDefault();

  const likeForm = event.target.closest("form");
  const dataObject = Object.fromEntries(new FormData(likeForm));

  try {
    const data = await postJson(likeForm.action, likeForm.method, dataObject);
    const postLikes = likeForm.nextElementSibling;
    postLikes.textContent = `${data.likesCount} likes`;
  } catch (error) {
    console.error(error);
  }
};
