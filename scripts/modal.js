/* class Modal {
	constructor(modalContainerElement) {
		this.modalElement = modalContainerElement;
		this.isShown = false;
	}

	open() {
		this.modalElement.classList.remove("hidden");
		this.isShown = true;
	}

	close() {
		this.modalElement.classList.add("hidden");
		this.isShown = false;
	}

	toggle() {
		if (this.isShown) {
			this.close();
		} else {
			this.open();
		}
	}
} */

const modalInit = () => {
	// Dapatkan semua elemen yang ada attribute "data-modal-target" nya
	document.querySelectorAll("[data-modal-target]").forEach((el, index) => {
		el.addEventListener("click", event => {
			// Target modal nya
			const modal = document.querySelector(
				"#" + el.getAttribute("data-modal-target")
			);

			modal.style.display =
				modal.style.display === "none" ? "block" : "none";
		});
	});
};

// export default Modal;
