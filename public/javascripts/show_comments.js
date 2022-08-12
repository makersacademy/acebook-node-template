// eslint-disable-next-line
const showComments = () => {
  const buttonEl = document.querySelector("#show-comments");
  buttonEl.addEventListener("click", () => {
    document.querySelector(".comments").classList.remove("d-none");
    document.querySelector(".comments").classList.add("d-block");
  });
};

