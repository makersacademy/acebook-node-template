function deletePostOnClick(id) {
  fetch(`/posts/delete/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((result) => {
      if (result.ok && result.ok === 1 && result.deletedCount === 1) {
        const postDivEl = document.querySelector(`#post-div-container-${id}`);
        const postDivElChildren = postDivEl.getElementsByTagName("*");
        for (let i = 0; i < postDivElChildren.length; i++) {
          postDivElChildren[i].remove();
        }
        postDivEl.append(
          Object.assign(document.createElement("p"), {
            className: "post-delete-message",
            id: `post-delete-message-${id}`,
            textContent: "This post has been deleted",
          })
        );
      }
    });
}
