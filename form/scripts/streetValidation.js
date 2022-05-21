const streetInput = document.querySelector("#street")
const streetError = document.querySelector("[data-street-error]")

streetInput.addEventListener("input", () => {
	const reg = /[A-Za-z]{5,}\s{0,}[0-9]{0,}/
	if (reg.test(streetInput.value)) {
		hideStreetError()
	}
})

streetInput.addEventListener("blur", () => {
	const reg = /[A-Za-z]{5,}\s{0,}[0-9]{0,}/
	if (!reg.test(streetInput.value)) {
		throwStreetError()
	} else {
		hideStreetError()
	}
})

//error

function throwStreetError() {
	streetInput.setCustomValidity("Wrong street number")
	streetInput.classList.add("form__input_invalid")
	streetError.classList.add("form__error_visible")
}

function hideStreetError() {
	streetInput.setCustomValidity("")
	streetInput.classList.remove("form__input_invalid")
	streetError.classList.remove("form__error_visible")
}
