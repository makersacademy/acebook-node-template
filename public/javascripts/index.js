

window.onload = function() {

  var commentToggles = document.querySelectorAll(".comment-toggle");

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
