document.querySelectorAll(".friendRequestButton").forEach(button => {
    button.addEventListener('click', event => { 
    console.log("hi")
        const username = event.target.getAttribute("username")
        const sessionUsername = event.target.getAttribute("sessionUsername")
        console.log(username)
        console.log(sessionUsername)
        
        const data = {username, sessionUsername}
        const options = {
            method: 'POST',
            headers: {
                      'Content-Type': 'application/json',
                     },
                      body: JSON.stringify(data)
                     }

        fetch('/sendFriendRequest', options);
        window.location.reload();
    })
});
