import {
	formatRupiah,
	getTimeOfDay,
	getData,
	createPackageCard,
	createElementFromHTML,
	createPackageModal,
	createPackageCardWithoutButton,
	randomIntBetween,
} from "./utils.js";

if (typeof HOTSPOT_DATA === "undefined" || !HOTSPOT_DATA) {
	await getData();
}

// Contact button
const contactButtons = document.querySelectorAll(
	"[data-contact-button='true']"
);
contactButtons.forEach(button => {
	button.addEventListener("click", event => {
		window.open(
			"https://wa.me/%2B628991799916/?text=Halo%20kak.",
			"_blank"
		);
	});
});

// alogin.html
if (window.location.href.includes("alogin")) {
}
// login.html
else if (window.location.href.includes("login")) {
	const usernameInput = document.querySelector("input#username");
	const passwordInput = document.querySelector("input#password");

	usernameInput.addEventListener("input", () => {
		passwordInput.value = usernameInput.value;
	});
}
// status.html
else if (window.location.href.includes("status")) {
	const welcomeMessage = document.querySelector("#welcome");
	welcomeMessage.textContent = "Selamat " + getTimeOfDay();

	const speedTestButton = document.querySelector("#speedtest-button");
	speedTestButton.addEventListener("click", event => {
		console.log("Diklik!");
	});
}
// packages.html
else if (window.location.href.includes("packages")) {
	const ul = document.querySelector("ul#packages");

	HOTSPOT_DATA.packages.forEach((paket, index) => {
		const li = createElementFromHTML(`<li></li>`);

		const packageCard = createPackageCard(
			paket.isLaris,
			paket.quota,
			paket.activePeriod,
			paket.price,
			`modal-${index + 1}`
		);

		const packageCardWithoutButton = createPackageCardWithoutButton(
			paket.isLaris,
			paket.quota,
			paket.activePeriod,
			paket.price
		);

		const modal = createPackageModal(
			`modal-${index + 1}`,
			packageCardWithoutButton,
			index
		);
		packageCard.appendChild(modal);

		li.appendChild(packageCard);
		ul.appendChild(li);
	});

	MicroModal.init({
		awaitCloseAnimation: true,
		disableFocus: true,
		disableScroll: true,
	});
}
// logout.html
else if (window.location.href.includes("logout")) {
	const img = document.querySelector("img");
	img.src = `./images/logged-out-${randomIntBetween(1, 3)}.webp`;
}
