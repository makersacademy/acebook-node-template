document.querySelectorAll(".delete-post").forEach((div) => {
  if (!div.attributes.username.value === div.attributes.postuser.value) {
    div.style.display = "none";
  } else {
    div.style.display = "block";
  }
});
