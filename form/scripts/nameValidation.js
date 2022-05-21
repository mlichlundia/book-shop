//name
const nameInput = document.querySelector("#name")
const nameError = document.querySelector("[data-name-error]")

nameInput.addEventListener("input", () => {
	const reg = /^[A-Za-z]{4,}$/
	if (reg.test(nameInput.value)) {
		hideNameError("name")
	}
})

nameInput.addEventListener("blur", () => {
	const reg = /^[A-Za-z]{4,}$/
	if (!reg.test(nameInput.value)) {
		throwNameError("name")
	} else {
		hideNameError("name")
	}
})

//surname

const surnameInput = document.querySelector("#surname")
const surnameError = document.querySelector("[data-surname-error]")

surnameInput.addEventListener("input", () => {
	const reg = /^[A-Za-z]{5,}$/
	if (reg.test(surnameInput.value)) {
		hideNameError("surname")
	}
})

surnameInput.addEventListener("blur", () => {
	const reg = /^[A-Za-z]{5,}$/
	if (!reg.test(surnameInput.value)) {
		throwNameError("surname")
	} else {
		hideNameError("surname")
	}
})

//errors

function throwNameError(str) {
	if (str === "name") {
		nameInput.classList.add("form__input_invalid")
		nameError.classList.add("form__error_visible")
	} else {
		surnameInput.classList.add("form__input_invalid")
		surnameError.classList.add("form__error_visible")
	}
}

function hideNameError(str) {
	if (str === "name") {
		nameInput.classList.remove("form__input_invalid")
		nameError.classList.remove("form__error_visible")
	} else {
		surnameInput.classList.remove("form__input_invalid")
		surnameError.classList.remove("form__error_visible")
	}
}
