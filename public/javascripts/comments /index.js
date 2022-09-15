function likeCommentOnClick(id) {
	fetch(`/likes/new/comments/${id}`, { method: "PUT" })
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

/* <script type="text/javascript">
document.getElementById("button-{{this._id}}").addEventListener('click',
() => { fetch( "/likes/new/" + "{{this._id}}", {method: 'PUT'})
.then(response => response.json()) .then(result =>
document.getElementById("counter-{{this._id}}").textContent =
result.counter) })
</script> */
