const navbar = document.querySelector("#navbar");
const hamburgerButton = navbar.querySelector("#hamburger-button");
const links = navbar.querySelector("#navbar-links");
hamburgerButton.addEventListener("click", event => {
	links.style.display = links.style.display === "none" ? "flex" : "none";

	hamburgerButton.firstElementChild.classList.toggle("is-active");

	event.stopPropagation();
});

document.addEventListener("click", event => {
	if (!event.target.closest(".navbar")) {
		links.style.display = "none";

		hamburgerButton.firstElementChild.classList.remove("is-active");
	}
});
