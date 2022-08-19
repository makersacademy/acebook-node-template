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

      input.value = '';
    });
  });


  // LIKE FUNCITONALITY START

  [...document.querySelectorAll(".add-like")].forEach(function (button) {
    button.addEventListener("click", function () {
      const button_value = button.getAttribute("value");
      // const input = document.getElementById(button_value);
      console.log("BUTTON VALUE", button_value)

      const options = {
        method: "POST",
        body: JSON.stringify({ post_id: button_value }),
        headers: { "Content-Type": "application/json" },
      };

      fetch("posts/like", options)
        .then((response) =>
          response.json())
        .then(({ likes }) => {
          document.getElementById('like-' + button_value).innerHTML = likes + " 👍"
        });

    });
  });
  // LIKE FUNCTIONALITY END

}
