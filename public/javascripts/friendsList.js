const divEl = document.querySelector('#friends');
const friends = divEl.getAttribute("friends").split(',');
friends.forEach(friend => {
  const friendDivEl = document.createElement('div');
  friendDivEl.innerText = friend;
  divEl.append(friendDivEl);
})