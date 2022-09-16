function deleteOnClick(path, id) {
  fetch(`/${path}s/delete/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((result) => {
      if (result.ok && result.ok === 1 && result.deletedCount === 1) {
        const containerDivEl = document.querySelector(`#${path}-${id}`);
        const containerDivElChildren = containerDivEl.getElementsByTagName("*");
        for (let i = 0; i < containerDivElChildren.length; i++) {
          containerDivElChildren[i].remove();
        }
        if (document.querySelector(`#new-comment-link-${id}`))
          document.querySelector(`#new-comment-link-${id}`).remove();
        document.querySelector(`#button-${id}`).remove();
        containerDivEl.append(
          Object.assign(document.createElement("p"), {
            className: `${path}-delete-message`,
            id: `${path}-delete-message-${id}`,
            textContent: `This ${path} has been deleted`,
          })
        );
      }
    });
}

function likeOnClick(path, id) {
  console.log(id.toString());
  fetch(`/likes/new/${path}s/${id}`, { method: "PUT" })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById(`counter-${id}`).textContent = result.counter;
      let likedButtonState = "false"; // // if currently blue, make white
      const likeButtonEl = document.getElementById(`button-${id}`);
      if (likeButtonEl.className.split(" ")[1] === "liked-false")
        // if currently white, make blue
        likedButtonState = "true";
      likeButtonEl.className = `${path}-like-button liked-${likedButtonState}`;
    });
}

// profiles

function addFriend(fetchUrl) {
  fetch(fetchUrl.toString(), { method: "PUT" })
    .then((response) => response.json())
    .then((result) => {
      if (result.newFriendAdded) {
        document.querySelector("#add-friend-button").remove();
        document.querySelector("#friend-button-status-div").append(
          Object.assign(document.createElement("p"), {
            id: "current-friend-message",
            textContent: "friends ✔️",
          })
        );
      }
    });
}

// users

function submitNewUserForm() {
  // creates new object out of form data to submit in fetch request body
  console.log("I am inside the submitNewUserForm");
  const formDataObj = {};
  new FormData(document.forms["new-user-form"]).forEach(
    (value, key) => (formDataObj[key] = value)
  );
  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObj),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.credentialsExist) {
        if (document.querySelector("div#sign-up-error-div"))
          document.querySelector("div#sign-up-error-div").remove();
        const signUpErrorDivEl = Object.assign(document.createElement("div"), {
          id: "sign-up-error-div",
        });
        signUpErrorDivEl.append(
          Object.assign(document.createElement("p"), {
            textContent: "This username or email is already being used.",
          })
        );
        signUpErrorDivEl.append(
          Object.assign(document.createElement("p"), {
            textContent: "Emails and usernames must be unique.",
          })
        );
        document.querySelector("#new-user-form-div").append(signUpErrorDivEl);
      } else if (result.ok) {
        window.location.assign("/");
      }
    });
}

// new
