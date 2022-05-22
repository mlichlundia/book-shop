const checkboxes = document.querySelectorAll(
	'.form__gifts-wrapper .form__input-container > [type="checkbox"]'
)

checkboxes.forEach(item => item.addEventListener("change", isValidNum))

function isValidNum() {
	const checked = document.querySelectorAll(
		'.form__gifts-wrapper .form__input-container > [type="checkbox"]:checked'
	)
	const unchecked = document.querySelectorAll(
		'.form__gifts-wrapper .form__input-container > [type="checkbox"]:not(:checked)'
	)

	checked.length === 2
		? unchecked.forEach(item => item.setAttribute("disabled", true))
		: unchecked.forEach(item => item.removeAttribute("disabled"))
}
