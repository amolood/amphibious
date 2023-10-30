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
	// Auto fill both username & password inputs
	const usernameInput = document.querySelector("input#username");
	const passwordInput = document.querySelector("input#password");

	usernameInput.addEventListener("input", () => {
		passwordInput.value = usernameInput.value;
	});

	// usernameInput.focus();

	const anims = isOnLoad => {
		const img = document.querySelector("img");
		const card = document.querySelector(".card");

		if (window.innerWidth < 640) {
			img.classList.toggle("animate-float", false);
			img.classList.toggle("animate-fade-in-down", isOnLoad);

			card.classList.toggle("animate-fade-in-down", isOnLoad);
		} else {
			img.classList.toggle("animate-float", true);
			img.classList.toggle("animate-fade-in-down", false);

			card.classList.toggle("animate-fade-in-left", isOnLoad);
		}
	};

	// Wait for 1 milisecond, then attach the listener
	setTimeout(() => anims(true), 1);
	window.addEventListener("resize", () => anims(false));
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

// services.html
else if (window.location.href.includes("services")) {
	const cards = document.querySelectorAll(".card");

	cards.forEach((card, index) => {
		card.style.setProperty("--anim-delay", index + 1);
		card.classList.add("anim-delay-200");

		if (window.innerWidth < 480) {
			if (index !== 1) {
				card.classList.add("animate-fade-in-left");
			} else {
				card.classList.add("animate-fade-in-right");
			}
		} else if (window.innerWidth < 768) {
			if (index !== 1) {
				card.classList.add("animate-fade-in-left");
			} else {
				card.classList.add("animate-fade-in-right");
			}
		} else {
			// left
			if (index === 0) {
				card.classList.add("animate-fade-in-left");
			}

			// middle
			else if (index === 1) {
				card.classList.add("animate-fade-in-up");
			}

			// right
			else {
				card.classList.add("animate-fade-in-right");
			}
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
		packageCard.id = `package-card-${index + 1}`;

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

	let cards = document.querySelectorAll(".card");
	cards = Array.from(cards).filter((card, index) =>
		card.id.includes("package-card")
	);

	cards.forEach((card, index) => {
		card.style.setProperty("--anim-delay", index + 1);
		card.classList.add("anim-delay-200", "animate-fade-in-left");
	});
}

// logout.html
else if (window.location.href.includes("logout")) {
	const img = document.querySelector("img");
	img.src = `/images/logged-out-${randomIntBetween(1, 3)}.webp`;
}
