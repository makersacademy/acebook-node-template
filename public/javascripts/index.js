
var likeElements = document.querySelectorAll('#likeCounter');
likeElements.forEach(function(navElement) {
  console.log('navElement: ', navElement);
  })


window.onload = function() {
  var likeCounters = document.querySelectorAll("#like-counter");
  var likeButtons = document.querySelectorAll("#like-button");

likeButtons.forEach(function(likeButton, i) {
  var counter = 1;
    likeButton.addEventListener("click", function(){
      likeCounters[i].innerHTML = counter++;
    })
  });
}
