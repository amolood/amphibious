const navbar = document.querySelector("#navbar");
const hamburgerButton = navbar.querySelector("#hamburger-button");
const links = navbar.querySelector("#navbar-links");
hamburgerButton.addEventListener("click", event => {
	links.style.display = links.style.display === "none" ? "flex" : "none";
	// Hamburger icon
	/* hamburgerButton.firstElementChild.style.display =
		links.style.display === "none" ? "block" : "none"; */
	// X icon
	/* hamburgerButton.lastElementChild.style.display =
		links.style.display === "flex" ? "block" : "none"; */

	hamburgerButton.firstElementChild.classList.toggle("is-active");

	event.stopPropagation();
});

// document.addEventListener("click", event => {
// 	if (
// 		event.target !== links &&
// 		event.target !== hamburgerButton /*  &&
// 		event.target.parentElement !== links */
// 	) {
// 		if (links.style.display === "flex") {
// 			links.style.display = "none";
// 		}
// 	}
// });
document.addEventListener("click", event => {
	if (!event.target.closest(".navbar")) {
		links.style.display = "none";
		// Hamburger icon
		// hamburgerButton.firstElementChild.style.display = "block";
		// X icon
		// hamburgerButton.lastElementChild.style.display = "none";

		hamburgerButton.firstElementChild.classList.remove("is-active");
	}
});
