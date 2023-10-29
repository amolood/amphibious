import {
	getTimeOfDay,
	getData,
	createPackageCard,
	createElementFromHTML,
	createPackageModal,
	createPackageCardWithoutButton,
	randomIntBetween,
	formatUnit,
} from "./utils.js";

const getDatas = async () => {
	if (typeof HOTSPOT_DATA === "undefined" || !HOTSPOT_DATA) {
		await getData();
	}
};
await getDatas();

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
	// Auto fill both username & password inputs
	const usernameInput = document.querySelector("input#username");
	const passwordInput = document.querySelector("input#password");

	usernameInput.addEventListener("input", () => {
		passwordInput.value = usernameInput.value;
	});

	// usernameInput.focus();
}

// status.html
else if (window.location.href.includes("status")) {
	const welcomeMessage = document.querySelector("#welcome");
	welcomeMessage.textContent = "Selamat " + getTimeOfDay();

	// Format upload & download unit size to normal/common size unit (KB, MB, GB, etc..)
	const uploadDownload = document.querySelectorAll("#upload, #download");
	uploadDownload.forEach((element, index) => {
		// Check if not byte unit
		const unit = element.innerText.split(" ")[1];
		if (unit.length > 1 && unit !== "B") {
			element.innerText = formatUnit(element.innerText, 2);
		}
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
	img.src = `/images/logged-out-${randomIntBetween(1, 3)}.webp`;
}
