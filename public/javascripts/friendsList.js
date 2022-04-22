const friendsEl = document.querySelector('#friends');
const friends = friendsEl.getAttribute("friends").split(',');
friends.forEach(friend => {
  const friendDivEl = document.createElement('div');
  friendDivEl.innerText = friend;
  friendsEl.append(friendDivEl);
})