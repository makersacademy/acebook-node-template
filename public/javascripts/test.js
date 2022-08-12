console.log('Client-side code running');
// const FriendsController = require("../controllers/friends");

window.onload = function () {
    const button = document.querySelector('#request-button')
    const button_value = button.value;

    button.addEventListener('click', function () {
        console.log('button was clicked');
        // FriendsControlller.Add
        fetch('/friends', { method: 'POST', content: button_value })
            .then(function (response) {
                if (response.ok) {
                    console.log('Click was recorded');
                    return;
                }
                throw new Error('Request failed.');
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}