

window.onload = function() {
  var likeCounters = document.querySelectorAll("#like-counter");
  var likeButtons = document.querySelectorAll("#like-button");
  var dislikeButtons = document.querySelectorAll("#dislike-button");
  var dislikeCounters = document.querySelectorAll("#dislike-counter");

likeButtons.forEach(function(likeButton, i) {
  var counter = 1;
    likeButton.addEventListener("click", function(){
      likeCounters[i].innerHTML = counter++;
    })
  });

  dislikeButtons.forEach(function(dislikeButton, i) {
    var counter = 1;
    dislikeButton.addEventListener("click", function(){
      dislikeCounters[i].innerHTML = counter++;
    })
  });

}
