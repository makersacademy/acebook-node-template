console.log('comment js is loaded');

// [...document.querySelectorAll('.breakdown')].forEach(function(item) {
//     item.addEventListener('click', function() {
//       console.log(item.innerHTML);
//     });
//      });


// window.onload = function () {
//     [...document.querySelectorAll('.submit-comment')].forEach(function (button) {
//         button.addEventListener('click', function () {
//             [...document.querySelectorAll('.comment')].forEach(function (input) {
//                 const input_value = input.value;
//                 console.log('submit button was clicked');
//                 console.log("input value", input_value);
//                 console.log("post id:", button.value);

//                 options = {
//                     method: "POST",
//                     body: JSON.stringify({ content: input_value, post_id: button.value }),
//                     headers: { 'Content-Type': 'application/json' }
//                 }

//                 fetch('posts/comments', options)
//                     .then(function (response) {
//                         if (response.ok) {
//                             console.log("click was recorded!")
//                             return;
//                         }
//                         throw new Error('Request failed.');
//                     })
//                     .catch(function (error) {
//                         console.log(error);
//                     });
//             }

//             )
//         }
//         )
//     }
//     )
// }
window.onload = function () {
    [...document.querySelectorAll('.submit-comment')].forEach(function (button) {
        button.addEventListener('click', function () {

            const button_value = button.getAttribute('id');
            console.log("button value:", button_value);
            const input = document.getElementById(button_value);
            console.log('input:', input);
            console.log('submit button was clicked');
            console.log('button vcalue', button.value);
            console.log("input value", input.value);

            options = {
                method: "POST",
                body: JSON.stringify({ content: input.value, post_id: button.value }),
                headers: { 'Content-Type': 'application/json' }
            }

            fetch('posts/comments', options)
                .then(function (response) {
                    if (response.ok) {
                        console.log("click was recorded!")
                        return;
                    }
                    throw new Error('Request failed.');
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }
    )
}
