window.addEventListener('DOMContentLoaded', () => {
  let title = document.getElementById("title"); 
  title = title.innerHTML;

  const SIGN_IN_PAGE = document.getElementById("sign-in");
  const SIGN_UP_PAGE = document.getElementById("sign-up");


  if(title === "Sign-in" || title === "Sign-up") {
    if(title === "Sign-in"){
      SIGN_IN_PAGE.classList.add("active")
    } else {
      SIGN_UP_PAGE.classList.add("active");
    }
  }
})