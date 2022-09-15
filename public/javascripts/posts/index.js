function deletePostOnClick(id) {
	fetch(`/posts/delete/${id}`, { method: "DELETE" })
		.then((response) => response.json())
		.then((result) => {
			if (result.ok && result.ok === 1 && result.deletedCount === 1) {
				const postDivEl = document.querySelector(`#post-div-container-${id}`);
				const postDivElChildren = postDivEl.getElementsByTagName("*");
				for (let i = 0; i < postDivElChildren.length; i++) {
					postDivElChildren[i].remove();
				}
				postDivEl.append(
					Object.assign(document.createElement("p"), {
						className: "post-delete-message",
						id: `post-delete-message-${id}`,
						textContent: "This post has been deleted",
					})
				);
			}
		});
}

function likePostOnClick(id) {
	fetch(`/likes/new/${id}`, { method: "PUT" })
		.then((response) => response.json())
		.then((result) => {
			document.getElementById(`counter-${id}`).textContent = result.counter;
			let likedButtonState = "false"; // // if currently blue, make white
			const likeButtonEl = document.getElementById(`button-${id}`);
			if (likeButtonEl.className.split(" ")[1] === "liked-false")
				// if currently white, make blue
				likedButtonState = "true";
			likeButtonEl.className = `post-like-button liked-${likedButtonState}`;
		});
}
