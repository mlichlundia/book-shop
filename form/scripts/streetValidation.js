const streetInput = document.querySelector("#street")
const streetError = document.querySelector("[data-street-error]")

streetInput.addEventListener("input", () => {
	const reg = /^(([A-Za-z0-9]+\s)+)?[A-Za-z0-9]+$/

	if (reg.test(streetInput.value) && streetInput.value.length >= 5) {
		hideStreetError()
	}
})

streetInput.addEventListener("blur", () => {
	const reg = /^(([A-Za-z0-9]+\s)+)?[A-Za-z0-9]+$/
	if (reg.test(streetInput.value) && streetInput.value.length >= 5) {
		hideStreetError()
	} else {
		throwStreetError()
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
