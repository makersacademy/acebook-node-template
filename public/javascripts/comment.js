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
        .then(function (response) {
          if (response.ok) {
            console.log("like was recoreded!");
            return;
          }
          throw new Error("Like Request failed.");
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  });

  // LIKE FUNCTIONALITY END

};
