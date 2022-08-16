console.log("comment js is loaded");

window.onload = function () {
  [...document.querySelectorAll(".submit-comment")].forEach(function (button) {
    button.addEventListener("click", function () {
      const button_value = button.getAttribute("id");
      const input = document.getElementById(button_value);

      const options = {
        method: "POST",
        body: JSON.stringify({ content: input.value, post_id: button.value }),
        headers: { "Content-Type": "application/json" },
      };

      fetch("posts/comments", options)
        .then(function (response) {
          if (response.ok) {
            console.log("click was recorded!");
            return;
          }
          throw new Error("Request failed.");
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  });
};
