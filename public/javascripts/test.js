console.log('Client-side code running');


window.onload = function () {
    const button = document.querySelector('#request-button')
    const button_value = button.value;

    button.addEventListener('click', function () {
        console.log('button was clicked');
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