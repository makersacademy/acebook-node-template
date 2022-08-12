console.log('comment js is loaded');


window.onload = function () {
    const button = document.querySelector('#submit-comment')


    button.addEventListener('click', function () {
        const input = document.querySelector('#comment');
        const input_value = input.value;
        console.log('submit button was clicked');
        console.log("Input value:", input_value);
        console.log("post id:", button.value);
        //input_value = '';
    })

}
        // console.log(`BUTTON VALUE: ${button.value}`)

    // options = {
    //     method: "POST",
    //     body: JSON.stringify({ content: button_value }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // }
    // fetch('/friends', options)
    //     .then(function (response) {
    //         if (response.ok) {
    //             console.log('Click was recorded');
    //             return;
    //         }
    //         throw new Error('Request failed.');
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
// });

