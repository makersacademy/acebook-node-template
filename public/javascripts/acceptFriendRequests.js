const divEl = document.querySelector('#friendRequests');
const requests = divEl.getAttribute("friendRequests").split(",");
console.log('here');
console.log(requests);

if(requests == "") {
  divEl.innerHTML = 'You have no friend requests!';
} else {
  requests.forEach(request => {
    const acceptButtonEl = document.createElement('button');
    acceptButtonEl.className = "acceptFriendButton";
    acceptButtonEl.innerText = "Accept " + request; 
    acceptButtonEl.addEventListener('click', event => {
      console.log('click');
      const sessionUsername = divEl.getAttribute("sessionUsername");
      const data = {request, sessionUsername}
      const options = {
          method: 'POST',
          headers: {
                    'Content-Type': 'application/json',
                   },
                    body: JSON.stringify(data)
                   }
  
      fetch('/acceptFriendRequest', options);

    })
    const brEl = document.createElement('br')
    divEl.append(brEl);
    divEl.append(acceptButtonEl);
  })
}