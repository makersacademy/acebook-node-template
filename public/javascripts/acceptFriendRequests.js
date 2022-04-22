const friendRequestsDivEl = document.querySelector('#friendRequests');
const requests = friendRequestsDivEl.getAttribute("friendRequests").split(",");

if(requests == "") {
  friendRequestsDivEl.innerHTML = 'You have no friend requests!';
} else {
  requests.forEach(request => {
    const acceptButtonEl = document.createElement('button');
    acceptButtonEl.className = "acceptFriendButton";
    acceptButtonEl.innerText = "Accept " + request; 
    const brEl = document.createElement('br')
    friendRequestsDivEl.append(brEl);
    friendRequestsDivEl.append(acceptButtonEl);
     acceptButtonEl.addEventListener('click', event => {
      console.log('click');
      const sessionUsername = friendRequestsDivEl.getAttribute("sessionUsername");
      const data = {request, sessionUsername}
      const options = {
          method: 'POST',
          headers: {
                    'Content-Type': 'application/json',
                   },
                    body: JSON.stringify(data)
                   }
                   
      fetch('/acceptFriendRequest', options);
      acceptButtonEl.remove()
      // const theFriendsList = document.querySelector('#friends')
      // const friendToAdd = createElement('div')
      // friendToAdd.innerText = 
    })
  })
}