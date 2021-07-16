window.onload = function() {
    var counter = 1;
    var likeCounter = document.getElementById("like-counter");
    var likeButton = document.getElementById("like-button");
    likeCounter.innerHTML = ""

    likeButton.addEventListener("click", function(){
      console.log(sessionStorage.clickcount)
        sessionStorage.clickcount = Number(sessionStorage.clickcount) + counter;
        likeCounter.innerHTML = sessionStorage.clickcount;
    });
}
