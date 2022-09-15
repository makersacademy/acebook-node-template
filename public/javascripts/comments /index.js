// function likeCommentOnClick(id) {
// 	fetch(`/likes/new/${id}`, { method: "PUT" })
// 		.then((response) => response.json())
// 		.then((result) => {
// 			document.getElementById(`counter-${id}`).textContent = result.counter;
// 			let likedButtonState = "false"; // // if currently blue, make white
// 			const likeButtonEl = document.getElementById(`button-${id}`);
// 			if (likeButtonEl.className.split(" ")[1] === "liked-false")
// 				// if currently white, make blue
// 				likedButtonState = "true";
// 			likeButtonEl.className = `post-like-button liked-${likedButtonState}`;
// 		});
// }
