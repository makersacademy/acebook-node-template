window.onload = function() {
    var counter = 1;
    // var likeCounter = document.getElementById("like-counter");
    var likeCounters = document.getElementsByClassName("like-counter")
    // var likeButton = document.getElementById("like-button");
    var likeButtons = document.getElementsByClassName("like-button")
    // console.log(likeCounters);

    for(var k = 0; k < likeCounters.length; k++) {
      likeCounters[k] = ""
    }

    for(var i = 0; i < likeButtons.length; i++) {
      likeButtons[i].addEventListener("click", function(){
        for(var j = 0; j < likeCounters.length; j++) {
          // if (i === j) {
            likeCounters[i] = counter++;
            console.log(likeCounters[i]);
            likeCounters[i].innerHTML;
          // }
        }





        // hold onto this code as contains the sessionStorage code
        // if (sessionStorage.clickcount) {
        //   sessionStorage.clickcount = Number(sessionStorage.clickcount) + counter;
        //   likeCounters[i].innerHTML = sessionStorage.clickcount;
        // } else {
        //   sessionStorage.clickcount = counter;
        //   likeCounters[i].innerHTML = sessionStorage.clickcount;
        // }
      });
    }



}
