/* eslint-disable */

function openForm() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("WelcomePage").style.opacity = "0.2";
  document.getElementById("LogIn").style.opacity = "0.2";
  document.getElementById("body").style.background = "gray";
  document.getElementById("HeaderBox").style.background = "gray";
  document.getElementById("WelcomePage").style.background = "gray";
  document.getElementById("LogIn").style.background = "gray";
  document.getElementById("SignUpBox").style.background = "gray";
  document.getElementById("new-user-form").style.background = "gray";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("WelcomePage").style.opacity = "1";
  document.getElementById("LogIn").style.opacity = "1";
  document.getElementById("body").style.background = "white";
  document.getElementById("HeaderBox").style.background = "white";
  document.getElementById("WelcomePage").style.background = "white";
  document.getElementById("LogIn").style.background = "white";
  document.getElementById("SignUpBox").style.background = "white";
  document.getElementById("new-user-form").style.background = "white";
}