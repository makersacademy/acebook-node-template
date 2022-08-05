console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

// let likeBtn = document.querySelector(".like__btn");
// let likeIcon = document.querySelector("#icon"),
//   count = document.querySelector("#count");

// let clicked = false;


const likehandler = (event) =>  {
    
  
  console.log(event.target.children[0])
  event.target.children[1].textContent++;

  this_.likes
//     if (!clicked) {
//     clicked = true;
//     likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
//     count.textContent++;
//   } else {
//     clicked = false;
//     likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
//     count.textContent--;
//   }
};

