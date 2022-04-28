function showPopUp(title, message, type, next) {
  const popup = document.getElementById('popup');
  popup.classList = [`popup-show ${type}`];
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-message").innerText = message;
  document.getElementById("ok-btn").onclick = next;
}

function hidePopUp() {
  const popup = document.getElementById('popup');
  popup.classList = [`popup-hide`];
}