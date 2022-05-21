const houseInput = document.querySelector("#house")
const houseError = document.querySelector("[data-house-error]")

const flatInput = document.querySelector("#flat")
const flatError = document.querySelector("[data-flat-error]")

//house

houseInput.addEventListener("input", e => {
	if (!isNaN(+e.target.value) || +e.target.value > 0) {
		hideNumError("house")
	}
})

houseInput.addEventListener("blur", e => {
	if (
		isNaN(+e.target.value) ||
		+e.target.value < 1 ||
		e.target.value.indexOf(".") !== -1
	) {
		throwNumError("house")
	} else {
		hideNumError("house")
	}
})

//flat

flatInput.addEventListener("input", () => {
	const reg = /^(((\d)+-??)+)?(\d)+$/g
	if (reg.test(flatInput.value)) {
		hideNumError("flat")
	}
	console.log(flatInput)
})

flatInput.addEventListener("blur", () => {
	const reg = /^(((\d)+-??)+)?(\d)+$/g
	if (!reg.test(flatInput.value)) {
		throwNumError("flat")
	} else {
		hideNumError("flat")
	}
})

//error

function throwNumError(str) {
	if (str === "house") {
		houseInput.classList.add("form__input_invalid")
		houseError.classList.add("form__error_visible")
	} else {
		flatInput.classList.add("form__input_invalid")
		flatInput.setCustomValidity("Wrong flat form")
		flatError.classList.add("form__error_visible")
	}
}

function hideNumError(str) {
	if (str === "house") {
		houseInput.classList.remove("form__input_invalid")
		houseError.classList.remove("form__error_visible")
	} else {
		flatInput.setCustomValidity("")
		flatInput.classList.remove("form__input_invalid")
		flatError.classList.remove("form__error_visible")
	}
}
