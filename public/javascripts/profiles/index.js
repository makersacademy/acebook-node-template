function addFriend(fetchUrl) {
	console.log("onclick working");
	console.log(fetchUrl);
	console.log(typeof fetchUrl);

	fetch(fetchUrl.toString(), { method: "PUT" })
		.then((response) => response.json())
		.then((result) => {
			console.log("dynamic script running");
			console.log(result.newFriendAdded);
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
