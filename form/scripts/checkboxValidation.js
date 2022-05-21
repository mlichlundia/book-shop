const checkFields = {
	count: 0,
	fields: document.querySelectorAll(
		".form__gifts-wrapper .form__input-container"
	),

	validNum(operator, index) {
		if (this.count >= 2 && operator === "sum") {
			this.disableCheckboxes(index)
		} else if (this.count >= 2 && operator !== "sum") {
			this.enableCheckboxes()
		}

		if (operator === "sum") {
			this.count++
		} else {
			this.count--
		}
	},

	disableCheckboxes(index) {
		this.count--
		this.fields.forEach((item, idx) => {
			if (idx === index) {
				item.removeAttribute("isActive")
			}
			if (!item.hasAttribute("isActive")) {
				item.firstElementChild.setAttribute("disabled", true)
			}
		})
	},

	enableCheckboxes() {
		this.fields.forEach(item => {
			if (item.firstElementChild.hasAttribute("disabled")) {
				item.firstElementChild.removeAttribute("disabled")
			}
		})
	},
}

checkFields.fields.forEach((item, idx) =>
	item.addEventListener("mouseup", () => {
		if (item.getAttribute("isActive")) {
			item.removeAttribute("isActive")
			checkFields.validNum("substr")
		} else {
			item.setAttribute("isActive", true)
			checkFields.validNum("sum", idx)
		}
	})
)
