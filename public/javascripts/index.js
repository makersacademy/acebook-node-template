

window.onload = function() {
  var likeCounters = document.querySelectorAll("#like-counter");
  var likeButtons = document.querySelectorAll("#like-button");
  var dislikeButtons = document.querySelectorAll("#dislike-button");
  var dislikeCounters = document.querySelectorAll("#dislike-counter");
  var commentToggles = document.querySelectorAll(".comment-toggle");

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

  commentToggles.forEach(function(commentToggle) {
    commentToggle.addEventListener("click", function(e){
     var form = document.getElementById(`commentform-${e.target.id}`)
      if (form.style.display == "block") {
        form.style.display = "none"
      } else {
        form.style.display = "block"
      }
    })
  })
}
