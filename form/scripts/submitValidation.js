const submit = document.querySelector('[type="submit"')
const inputs = document.querySelectorAll('[type="text"')

const check = document.querySelector(".check")
const output = document.querySelectorAll(".output")
const cross = document.querySelector(".cross")

inputs.forEach(item => {
	item.addEventListener("input", e => isEmpty(e))
})

inputs.forEach(item => {
	item.addEventListener("blur", e => isEmpty(e))
})

function isEmpty(e) {
	const invalid = Array.from(inputs).filter(item => {
		return (
			item.nextElementSibling.classList.contains("form__error_visible") ||
			item.value === ""
		)
	})
	if (!invalid.length) {
		submit.removeAttribute("disabled")
	} else {
		submit.setAttribute("disabled", true)
	}
}

const form = document.querySelector("form")

form.addEventListener("submit", e => {
	e.preventDefault()
	fillCheck()
	showCheck()
	deleteBooks()
})

cross.addEventListener("click", e => closeCheck(e))
check.addEventListener("click", e => closeCheck(e))

function fillCheck() {
	output.forEach(item => {
		if (item.classList.contains("name")) {
			item.insertAdjacentText(
				"beforeend",
				form.elements.name.value + " " + form.elements.surname.value
			)
		} else if (item.classList.contains("street")) {
			item.insertAdjacentText("beforeend", form.elements.street.value)
		} else if (item.classList.contains("house")) {
			item.insertAdjacentText("beforeend", form.elements.house.value)
		} else if (item.classList.contains("flat")) {
			item.insertAdjacentText("beforeend", form.elements.flat.value)
		} else if (item.classList.contains("delivery")) {
			item.insertAdjacentText("beforeend", form.elements.date.value)
		} else if (item.classList.contains("payment")) {
			item.insertAdjacentText("beforeend", form.elements.payment.value)
		} else if (item.classList.contains("add")) {
			if (form.elements.package.checked) {
				item.insertAdjacentText("beforeend", "gift package; ")
			}
			if (form.elements.postcard.checked) {
				item.insertAdjacentText("beforeend", "postcard; ")
			}
			if (form.elements.discount.checked) {
				item.insertAdjacentText("beforeend", "2% discount to the next time; ")
			}
			if (form.elements.pen.checked) {
				item.insertAdjacentText("beforeend", "branded pen; ")
			}
		}
	})
}

function showCheck() {
	check.classList.add("open")
}

function closeCheck(e) {
	e.stopPropagation()
	check.classList.remove("open")
	output.forEach(item => (item.innerText = ""))
}

function deleteBooks() {
	localStorage.removeItem("cart")
}
