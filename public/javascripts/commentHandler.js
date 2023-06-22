import { postJson } from "./api.js";

export const handleCommentFormSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(event.currentTarget);
  const dataObject = Object.fromEntries(formData);
  const commentsContainer = event.currentTarget.closest("ul");
  const ulId = commentsContainer.id;
  const postId = ulId.replace("comments-", "");
  dataObject.postId = postId;

  try {
    const data = await postJson(
      event.currentTarget.action,
      event.currentTarget.method,
      dataObject
    );

    const newComment = document.createElement("li");
    newComment.classList.add("comment-item");

    const deleteString = `
      <form
        action="/comments/${data.comment._id}/delete"
        method="POST"
        onsubmit="return confirm('Are you sure you want to delete this post?')"
      >
        <input type="hidden" name="_method" value="DELETE"/>
        <button type="submit" class="delete-button">Delete</button>
      </form>
    `;

    newComment.innerHTML = `${data.html}${deleteString}`;
    const postsList = document.querySelector(`#comments-${postId}`);
    postsList.insertAdjacentElement("afterbegin", newComment);
  } catch (error) {
    console.error(error);
  } finally {
    form.reset();
  }
};
