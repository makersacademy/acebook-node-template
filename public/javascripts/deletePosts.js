document.querySelectorAll(".delete-post").forEach((div) => {
  if (div.attributes.username.value === "diego") {
    div.style.display = "block";
  } else {
    div.style.display = "none";
  }
});
