document.addEventListener("DOMContentLoaded", function () {
	const ramenMenu = document.querySelector("#ramen-menu");
	const ramenDetailImg = document.querySelector("img.detail-image");
	const ramenName = document.querySelector("h2.name");
	const restaurant = document.querySelector("h3.restaurant");
	const ratingDisplay = document.querySelector("#rating-display");
	const commentDisplay = document.querySelector("#comment-display");
	const newRamenForm = document.querySelector("form#new-ramen");

	fetch("http://localhost:3000/ramens")
		.then((response) => response.json())
		.then((ramenObjects) => {
			ramenObjects.forEach((ramen) => {
				displayImgsInMenu(ramen);
			});
			displayRamenDetail(ramenObjects[0]);
		});

	function displayImgsInMenu(ramen) {
		const img = document.createElement("img");
		img.setAttribute("src", ramen.image);
		img.addEventListener("click", () => {
			displayRamenDetail(ramen);
		});
		ramenMenu.appendChild(img);
	}

	function displayRamenDetail(ramen) {
		ramenDetailImg.setAttribute("src", ramen.image);
		ramenName.textContent = ramen.name;
		restaurant.textContent = ramen.restaurant;
		ratingDisplay.textContent = ramen.rating;
		commentDisplay.textContent = ramen.comment;
	}

	newRamenForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const newRamen = {
			name: event.target.name.value,
			restaurant: event.target.restaurant.value,
			image: event.target.image.value,
			rating: event.target.rating.value,
			comment: event.target.comment.value,
		};
		const configObject = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(newRamen),
		};
		fetch("http://localhost:3000/ramens", configObject)
			.then((response) => response.json())
			.then((ramenObject) => {
				displayRamenDetail(ramenObject);
				displayImgsInMenu(ramenObject);
			});
		newRamenForm.reset();
	});
});
