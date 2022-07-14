window.onload = function() {
  var counter = 1;
  var likeCounter = document.getElementById("like-counter");
  var likeButton = document.getElementById("like-button");


  likeButton.addEventListener("click", function(){
    likeCounter.innerHTML = counter ++;
    console.log("You CLicked On Me")
  });
}