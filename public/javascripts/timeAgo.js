document.querySelectorAll(".timeAgo").forEach(date => {
  date.innerText = moment(date.innerText).fromNow();
  console.log(moment(date.innerText).fromNow());
})



