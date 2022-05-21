const today = new Date()

const tommorow = new Date(today)
tommorow.setDate(tommorow.getDate() + 1)

const dateInput = document.querySelector("#date")
const dateError = document.querySelector("[data-date-error]")

dateInput.addEventListener("blur", () => {
	isValid(dateInput.value)
})

function isValid(str) {
	console.log(str)
	const dateArr = str.toString().split(".")
	const dateStr = `${+dateArr[2]}/${+dateArr[1]}/${+dateArr[0]}`

	if ((tommorow - new Date(dateStr)) / 1000 / 60 / 60 > 24) {
		throwDateError()
		return
	}

	if (+dateArr.length !== 3) {
		throwDateError()
		return
	}

	if (+dateArr[1] > 12) {
		throwDateError()
		return
	}

	if (
		+dateArr[0].length !== 2 ||
		+dateArr[1].length !== 2 ||
		+dateArr[2].length !== 4
	) {
		throwDateError()
		return
	}

	//validation on correct numbers of day, month
	if (
		(+dateArr[0] > 31 && !(+dateArr[1] % 2) && +dateArr[1] < 8) ||
		(+dateArr[0] > 31 && +dateArr[1] % 2 === 0 && +dateArr[1] >= 8)
	) {
		throwDateError()
		return
	}
	if (
		(+dateArr[0] > 30 && +dateArr[1] % 2 === 0 && +dateArr[1] < 8) ||
		(+dateArr[0] > 30 && !(+dateArr[1] % 2) && +dateArr[1] >= 8)
	) {
		throwDateError()
		return
	}

	if (+dateArr[0] > 29 && +dateArr[1] === 2 && +dateArr[2] % 4 === 0) {
		throwDateError()
		return
	} else if (+dateArr[0] > 28 && +dateArr[1] === 2 && +dateArr[2] % 4 !== 0) {
		throwDateError()
		return
	}
	console.log(dateArr)

	hideDateError()
}

function throwDateError() {
	dateInput.setCustomValidity("Wrong date form")
	dateInput.classList.add("form__input_invalid")
	dateError.classList.add("form__error_visible")
}

function hideDateError() {
	dateInput.setCustomValidity("")
	dateInput.classList.remove("form__input_invalid")
	dateError.classList.remove("form__error_visible")
}
