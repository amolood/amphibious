export const getData = async () => {
	const response = await fetch("../data.json");
	const data = await response.json();
	window.HOTSPOT_DATA = data;
};

export const getTimeOfDay = () => {
	const currentTime = new Date();

	const currentHour = currentTime.getHours();

	let timeOfDay;

	if (currentHour >= 3 && currentHour < 10) {
		timeOfDay = "pagi";
	} else if (currentHour >= 10 && currentHour < 15) {
		timeOfDay = "siang";
	} else if (currentHour >= 15 && currentHour <= 17) {
		timeOfDay = "sore";
	} else {
		timeOfDay = "malam";
	}

	return timeOfDay;
};

export const formatRupiah = nominal => {
	const reverse = nominal.toString().split("").reverse().join("");
	const ribuan = reverse.match(/\d{1,3}/g);
	const result = ribuan.join(".").split("").reverse().join("");
	return result;
};

export const createWhatsAppMessage = (orderType, options) => {
	if (orderType === "voucher") {
	} else if (orderType === "pulsa") {
	} else if (orderType === "listrik") {
	}
	return "";
};

/**
 *
 * @param {string} htmlString
 * @returns
 */
export const createElementFromHTML = htmlString => {
	const div = document.createElement("div");
	div.innerHTML = htmlString.trim();
	return div.firstElementChild;
};

// For packages page (packages.html)
/**
 *
 * @param {boolean} isLaris
 * @param {string} quotaAmount
 * @param {string} activePeriod
 * @param {string} price
 * @returns HTMLDivElement
 */
export const createPackageCard = (
	isLaris,
	quotaAmount,
	activePeriod,
	price,
	modalId
) => {
	const packageCard = createElementFromHTML(
		`<div class="card w-full h-full flex flex-col gap-3 justify-between"></div>`
	);

	const heading = createElementFromHTML(`<div></div>`);

	if (isLaris) {
		const badge = createElementFromHTML(
			`<span class="rounded-full bg-[#dc3545] text-white text-xs px-3 py-2 mb-3 block w-max">Terlaris</span>`
		);
		heading.appendChild(badge);
	}

	const title = createElementFromHTML(
		`<p class="pb-1 text-slate-900 text-lg font-semibold">Yang Bikin Mantul</p>`
	);
	packageCard.appendChild(title);

	const quota = createElementFromHTML(
		`<div class="flex text-blue-500"></div>`
	);

	const quotaAmountElement = createElementFromHTML(
		`<p class="text-3xl font-bold leading-none">${quotaAmount}</p>`
	);

	const quotaDivider = createElementFromHTML(
		`<div class="bg-blue-500 mx-3 w-[2px]"></div>`
	);

	const quotaActivePeriod = createElementFromHTML(
		`<p class="leading-none flex items-end pb-1"><span class="">${activePeriod}</span></p>`
	);

	quota.appendChild(quotaAmountElement);
	quota.appendChild(quotaDivider);
	quota.appendChild(quotaActivePeriod);

	const priceElement = createElementFromHTML(
		`<p class="text-slate-900 text-2xl font-semibold">Rp ${formatRupiah(
			price
		)}</p>`
	);

	heading.appendChild(title);
	heading.appendChild(quota);
	heading.appendChild(priceElement);
	packageCard.appendChild(heading);

	const infoList = createElementFromHTML(
		`<ul class="flex flex-col gap-2 text-slate-900 font-medium"></ul>`
	);

	for (let i = 0; i <= 1; i++) {
		const infoListItem = createElementFromHTML(
			`<li class="flex gap-2"></li>`
		);

		const infoItemIcon = createElementFromHTML(`<svg
	version="1.0"
	xmlns="http://www.w3.org/2000/svg"
	height="16"
	viewBox="0 0 512.000000 512.000000"
	preserveAspectRatio="xMidYMid meet"
	class="h-4 min-[480px]:h-5 sm:h-6 fill-blue-500"
	>
	<g
	transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
		stroke="none"
	>
		<path
			d="M4605 4386 c-105 -33 -109 -36 -1445 -1372 l-1315 -1314 -595 595
c-553 551 -600 596 -662 625 -159 74 -328 51 -454 -63 -100 -90 -149 -234
-125 -364 25 -134 9 -117 839 -944 726 -724 771 -767 832 -794 78 -34 185 -44
257 -25 122 33 70 -16 1629 1543 1614 1616 1522 1517 1547 1660 34 199 -91
392 -292 453 -56 17 -162 17 -216 0z"
/>
	</g>
	</svg>
	`);
		const infoItemText = createElementFromHTML(
			`<p>${i === 0 ? `Kuota ${quotaAmount}` : "Untuk penggunaan"}</p>`
		);
		const infoItemTextSpan = createElementFromHTML(
			`<span class="text-amber-500">${
				i === 0 ? ` ${activePeriod}` : " 1 perangkat"
			}</span>`
		);

		infoItemText.appendChild(infoItemTextSpan);

		infoListItem.appendChild(infoItemIcon);
		infoListItem.appendChild(infoItemText);

		infoList.appendChild(infoListItem);
	}
	packageCard.appendChild(infoList);

	const button = createElementFromHTML(
		`<button data-micromodal-trigger="${modalId}" class="button button-primary">Beli Sekarang</button>`
	);
	packageCard.appendChild(button);

	return packageCard;
};

export const createPackageCardWithoutButton = (
	isLaris,
	quotaAmount,
	activePeriod,
	price,
	modalId
) => {
	const card = createPackageCard(
		isLaris,
		quotaAmount,
		activePeriod,
		price,
		modalId
	);

	card.querySelector("button").remove();

	return card;
};

export const createPackageModal = (id, packageCardElement, voucherIndex) => {
	const modal =
		createElementFromHTML(`<div id="${id}" aria-hidden="true" class="modal-slide">
		<div tabindex="-1" data-micromodal-close class="modal__overlay">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledBy="${id}-title"
				class="modal__container p-0 flex flex-col overflow-hidden bg-neutral-200 mx-4"
			>
				<div class="card flex flex-col overflow-hidden bg-neutral-200 p-4 min-[480px]:p-6 sm:p-8">
					<header class="modal__header border-b border-slate-600">
						<h2
							id="${id}-title"
							class="modal__title text-lg min-[480px]:text-xl sm:text-2xl text-slate-900 font-bold"
						>
							Detail Voucher
						</h2>
	
						<button
							aria-label="Close modal"
							data-micromodal-close
							class="modal__close"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								class="fill-black"
								viewBox="0 0 16 16"
							>
								<path
									d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
								/>
							</svg>
						</button>
					</header>
	
					<main
						id="${id}-content"
						class="modal__content m-0 py-2 overflow-y-auto"
					>
						<!-- package card -->
	
						<form action="" method="post" class="py-4">
							<div class="mui-input-outline">
								<input
									type="text"
									id="name"
									name="name"
									class="mui-input-outline__input"
									value=""
								/>
	
								<label for="name" class="mui-input-outline__label"
									>Nama</label
								>
	
								<div class="mui-input-outline__bg">
									<span class="">Nama</span>
								</div>
							</div>
	
							<button type="submit" class="button button-primary mt-4">
								Beli sekarang
							</button>
						</form>
						<button
							data-micromodal-close
							aria-label="Close this dialog window"
							class="button button-secondary"
						>
							Cancel
						</button>
					</main>
				</div>
			</div>
		</div>
	</div>
	
	`);

	modal.querySelector("main").prepend(packageCardElement);
	const nameInput = modal.querySelector(".mui-input-outline__input");
	nameInput.addEventListener("input", event => {
		event.target.setAttribute("value", event.target.value);
	});

	const buyButton = modal.querySelector(".button-primary");
	buyButton.addEventListener("click", event => {
		event.preventDefault();

		// Guard clause
		if (nameInput.value.length <= 0) {
			return alert("Isi namanya!");
		} else if (nameInput.value.length <= 2) {
			return alert(
				`Isi yang benar!\nTidak ada orang yang namanya cuma ${nameInput.value.length} huruf!`
			);
		} else if (!isValidName(nameInput.value)) {
			return alert("Nama tidak valid!");
		}

		const message = `*ORDER*: Voucher
*Nama*: ${nameInput.value}
*Voucher*: ${HOTSPOT_DATA.packages[voucherIndex].quota} | ${
			HOTSPOT_DATA.packages[voucherIndex].activePeriod
		}
*Harga*: ${rupiah(HOTSPOT_DATA.packages[voucherIndex].price)}
`;

		window.open(
			`https://wa.me/%2B628991799916/?text=${encodeURI(message)}`
		);
	});

	return modal;
};

export const isValidName = name =>
	/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(
		name
	);

export const rupiah = number =>
	new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);

export const randomIntBetween = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min);

/* module.exports = {
	getTimeOfDay,
}; */
