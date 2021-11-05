var addLike = (id) => {
  if(document.getElementById("like-"+id).querySelector(".like-text").innerText == "Like") {
    //send like to DB
    document.getElementById("like-"+id).querySelector(".like-text").innerText = "Liked";
    let count = document.getElementById("like-"+id).querySelector(".like-number").innerText;
    document.getElementById("like-"+id).querySelector(".like-number").innerText = Number(count) + 1;
  } else {
    //remove like from DB
    document.getElementById("like-"+id).querySelector(".like-text").innerText = "Like";
    let count = document.getElementById("like-"+id).querySelector(".like-number").innerText;
    document.getElementById("like-"+id).querySelector(".like-number").innerText = Number(count) - 1;
  }
};