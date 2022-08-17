console.log("Client-side code running");

window.onload = function () {
  const button = document.querySelector("#request-button");
  const button_value = button.value;

  button.addEventListener("click", function () {
    console.log("button was clicked");
    console.log(`BUTTON VALUE: ${button.value}`);
    button.style.display = 'none';
    const options = {
      method: "POST",
      body: JSON.stringify({ content: button_value }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/friends", options)
      .then(function (response) {
        if (response.ok) {
          console.log("Click was recorded");
          return;
        }
        throw new Error("Request failed.");
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
