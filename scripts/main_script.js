const body = document.querySelector("body")
const appWrapper = document.querySelector(".app-wrapper")

let books = []

class AddToBag {
	constructor(text) {
		this.text = text
	}

	createElem() {
		const addToBag = document.createElement("button")
		addToBag.insertAdjacentText("beforeend", `${this.text}`)
		addToBag.addEventListener("click", this.click)
		return addToBag
	}
}

class ShowInfo {
	constructor(text) {
		this.text = text
	}

	createElem() {
		const showInfo = document.createElement("button")
		showInfo.insertAdjacentText("beforeend", `${this.text}`)
		showInfo.addEventListener("click", this.click)
		return showInfo
	}
}

class Book {
	constructor(book) {
		this.info = book
		this.title = book.title
		this.descr = book.description
		this.author = book.author
		this.image = book.imageLink
		this.hover = book.hoverImage
		this.price = book.price
		this.class = "books__card-wrapper"
		this.addToBag = "add to order"
		this.showInfo = "show more"
	}

	createElem() {
		const bookContainer = document.createElement("li")
		const bookWrapper = document.createElement("div")
		const mainImg = document.createElement("img")
		const hoverImg = document.createElement("img")
		const imageWrapper = document.createElement("div")
		const title = document.createElement("h3")
		const author = document.createElement("h4")
		const price = document.createElement("p")
		const buttonContainer = document.createElement("div")
		const addToBag = new AddToBag("add to order").createElem()
		const showInfo = new ShowInfo("show more").createElem()

		bookContainer.dataset.name = this.title
		bookContainer.setAttribute("draggable", true)
		bookWrapper.classList.add(this.class)
		mainImg.setAttribute("src", this.image)
		hoverImg.setAttribute("src", this.hover)
		hoverImg.classList.add("books__image_visible")
		imageWrapper.classList.add("books__image-wrapper")
		buttonContainer.classList.add("books__buttons-container")

		title.insertAdjacentText("beforeend", this.title)
		author.insertAdjacentText("beforeend", this.author)
		price.insertAdjacentText("beforeend", `$${this.price}`)
		imageWrapper.append(mainImg)
		imageWrapper.append(hoverImg)
		buttonContainer.append(addToBag)
		buttonContainer.append(showInfo)

		bookWrapper.append(buttonContainer)
		bookWrapper.append(imageWrapper)
		bookWrapper.append(author)
		bookWrapper.append(title)
		bookWrapper.append(price)

		bookContainer.append(bookWrapper)

		bookContainer.addEventListener("dragstart", e =>
			this.bookDragStart(e, this.title)
		)
		addToBag.addEventListener("click", () => this.addBookHandler(this.info))
		showInfo.addEventListener("click", () => this.showInfoHandler(this.title))

		return bookContainer
	}

	addBookHandler(info) {
		let store = localStorage.getItem("cart")
			? JSON.parse(localStorage.getItem("cart"))
			: []
		store.push(info)
		localStorage.setItem("cart", JSON.stringify(store))
		document.querySelector(".bag").prepend(new BagPoint(info).createElem())

		const totalPrice = document.querySelector(".bag__total h3")
		let price = +totalPrice.innerHTML.slice(1)
		price += this.price

		totalPrice.innerHTML = "$" + price

		document
			.querySelector(".menu__list>:last-child a")
			.classList.add("bagIsFull")
	}

	showInfoHandler(title) {
		const currentPopUp = document.querySelector(`div[data-book ="${title}"]`)
		currentPopUp.classList.add("open")
	}

	bookDragStart(e, name) {
		e.dataTransfer.setData("name", name)
	}
}

class PopUp {
	constructor(info) {
		this.title = info.title
		this.author = info.author
		this.description = info.description
		this.image = info.hoverImage
		this.price = info.price
	}

	createElem() {
		const popUp = document.createElement("div")
		const popUpContent = document.createElement("div")
		const mainImg = document.createElement("img")
		const infoWrapper = document.createElement("div")
		const title = document.createElement("h3")
		const author = document.createElement("h4")
		const description = document.createElement("p")
		const price = document.createElement("p")
		const cross = document.createElement("button")

		popUp.classList.add("pop-up")
		popUpContent.classList.add("pop-up__content")
		mainImg.setAttribute("src", this.image)
		infoWrapper.classList.add("pop-up__content-info")
		price.classList.add("pop-up__price")
		title.insertAdjacentText("beforeend", this.title)
		author.insertAdjacentText("beforeend", this.author)
		price.insertAdjacentText("beforeend", `Price: $${this.price}`)
		description.insertAdjacentText("beforeend", this.description)
		cross.classList.add("cross")

		infoWrapper.append(author)
		infoWrapper.append(title)
		infoWrapper.append(price)
		infoWrapper.append(description)
		popUpContent.append(mainImg)
		popUpContent.append(infoWrapper)
		popUpContent.append(cross)
		popUp.append(popUpContent)

		popUp.addEventListener("click", e => {
			e.stopPropagation()
			this.closePopUp.call(e.target.closest(".pop-up"))
		})

		cross.addEventListener("click", e => {
			e.stopPropagation()
			this.closePopUp.call(e.target.closest(".cross"))
		})

		return popUp
	}

	closePopUp() {
		this.closest(".pop-up").classList.toggle("open")
	}
}

class Droppable {
	constructor() {}

	createElem() {
		const droppable = document.createElement("div")
		const text = document.createElement("p")
		const icon = document.createElement("div")

		droppable.classList.add("droppable")
		text.classList.add("droppable__text")
		icon.classList.add("droppable__icon")

		text.insertAdjacentText("beforeend", "Drop to add book to the order")

		droppable.append(icon)
		droppable.append(text)

		droppable.addEventListener("dragover", e => this.allowDrop(e))
		droppable.addEventListener("dragleave", e => this.dropLeave(e))
		droppable.addEventListener("drop", e => this.drop(e))

		return droppable
	}

	allowDrop(e) {
		e.preventDefault()
		const droppable = document.querySelector(".droppable")
		const text = document.querySelector(".droppable__text")
		const icon = document.querySelector(".droppable__icon")

		text.classList.add("over")
		icon.classList.add("over")
		droppable.classList.add("over")
	}

	dropLeave() {
		const droppable = document.querySelector(".droppable")
		const text = document.querySelector(".droppable__text")
		const icon = document.querySelector(".droppable__icon")

		icon.classList.remove("over")
		text.classList.remove("over")
		droppable.classList.remove("over")
	}

	drop(e) {
		const droppable = document.querySelector(".droppable")
		const draggable = document.querySelector(
			`[data-name ='${e.dataTransfer.getData("name")}']`
		)
		const text = document.querySelector(".droppable__text")
		const icon = document.querySelector(".droppable__icon")

		const click = new Event("click")
		const addBook = draggable.querySelector("button")

		setTimeout(this.addSuccess, 0)
		setTimeout(this.removeSuccess, 1500)

		addBook.dispatchEvent(click)

		droppable.classList.remove("over")
		icon.classList.remove("over")
		text.classList.remove("over")
	}

	addSuccess() {
		const text = document.querySelector(".droppable__text")
		const icon = document.querySelector(".droppable__icon")

		icon.classList.add("droppable__icon_success")
		text.classList.add("droppable__text_success")

		text.innerText = "Success!"
	}

	removeSuccess() {
		const text = document.querySelector(".droppable__text")
		const icon = document.querySelector(".droppable__icon")

		icon.classList.remove("droppable__icon_success")
		text.classList.remove("droppable__text_success")

		text.innerText = "Drop to add book to the order"
	}
}

//bag
class Bag {
	constructor() {
		this.list = localStorage.getItem("cart")
			? JSON.parse(localStorage.getItem("cart"))
			: []
	}

	createElem() {
		const bag = document.createElement("div")
		const total = document.createElement("div")
		const totalWrapper = document.createElement("div")
		const totalText = document.createElement("p")
		const totalPrice = document.createElement("h3")
		const confirmButton = document.createElement("a")

		bag.classList.add("bag")
		total.classList.add("bag__total")
		confirmButton.classList.add("confirm")

		confirmButton.setAttribute("href", "../form/form.html")

		totalPrice.insertAdjacentText("beforeend", this.calcTotal())
		totalText.insertAdjacentText("beforeend", "total:")
		confirmButton.insertAdjacentText("beforeend", "confirm order")

		totalWrapper.append(totalText)
		totalWrapper.append(totalPrice)
		total.append(totalWrapper)
		total.append(confirmButton)
		bag.append(total)

		for (let book of this.list) {
			bag.prepend(new BagPoint(book).createElem())
		}

		bag.addEventListener("click", e => e.stopPropagation())

		window.addEventListener("mousedown", e => {
			if (!e.target.closest(".bag")) {
				bag.classList.remove("bag_open")
			}
		})

		return bag
	}

	calcTotal() {
		let total = 0

		for (let item of this.list) {
			total += item.price
		}

		return "$" + total
	}
}

class BagPoint {
	constructor(book) {
		this.image = book.hoverImage
		this.author = book.author
		this.title = book.title
		this.price = book.price
	}

	createElem() {
		const bagContent = document.createElement("div")
		const mainImg = document.createElement("img")
		const infoWrapper = document.createElement("div")
		const title = document.createElement("h3")
		const author = document.createElement("h4")
		const price = document.createElement("p")
		const deleteButton = document.createElement("button")

		bagContent.classList.add("bag__point")
		deleteButton.classList.add("cross")

		mainImg.setAttribute("src", this.image)
		title.insertAdjacentText("beforeend", this.title)
		author.insertAdjacentText("beforeend", this.author)
		price.insertAdjacentText("beforeend", `$${this.price}`)

		infoWrapper.append(author)
		infoWrapper.append(title)
		infoWrapper.append(price)
		bagContent.append(mainImg)
		bagContent.append(infoWrapper)
		bagContent.append(deleteButton)

		deleteButton.addEventListener("click", () => {
			const indexToDelete = JSON.parse(localStorage.getItem("cart")).findIndex(
				item => item.title === this.title
			)
			const filtered = JSON.parse(localStorage.getItem("cart")).filter(
				(item, index) => index !== indexToDelete
			)

			localStorage.setItem("cart", JSON.stringify(filtered))

			const totalPrice = document.querySelector(".bag__total h3")

			let price = +totalPrice.innerHTML.slice(1)
			price -= this.price

			totalPrice.innerHTML = "$" + price

			if (JSON.parse(localStorage.getItem("cart")).length === 0) {
				document.querySelector(".confirm").classList.add("disabled")
			} else {
				document.querySelector(".confirm").classList.remove("disabled")
			}

			bagContent.remove()
		})

		return bagContent
	}
}

//fetch data
function getData() {
	fetch("./data/books.json")
		.then(res => res.json())
		.then(data => books.push(...data))
		.then(() => appWrapper.append(createLayout()))
}
getData()

//creating header
function createHeader() {
	const navLinks = [{ name: "main", path: "#" }, { name: "my bag" }]
	const header = document.createElement("header")
	const nav = document.createElement("nav")
	const menuList = document.createElement("ul")

	menuList.classList.add("menu__list")

	for (let item of navLinks) {
		const menuPoint = document.createElement("li")
		const menuLink = document.createElement("a")

		if (item.name === "main") {
			menuLink.setAttribute("href", item.path)
		}

		menuLink.insertAdjacentText("beforeend", item.name)

		menuPoint.append(menuLink)
		menuList.append(menuPoint)

		if (item.name === "my bag") {
			menuPoint.append(
				new Bag(JSON.parse(localStorage.getItem("cart"))).createElem()
			)
			JSON.parse(localStorage.getItem("cart"))?.length === 0 ||
			localStorage.getItem("cart") === null
				? menuPoint.firstChild.classList.remove("bagIsFull")
				: menuPoint.firstChild.classList.add("bagIsFull")

			menuPoint.firstChild.addEventListener("click", e => {
				e.stopPropagation()
				document.querySelector(".bag").classList.toggle("bag_open")
				menuPoint.firstChild.classList.remove("bagIsFull")
			})

			menuPoint.firstChild.addEventListener("click", isEmpty)
		}
	}

	nav.append(menuList)
	header.append(nav)
	return header
}

function isEmpty() {
	const confirm = document.querySelector(".confirm")
	localStorage.getItem("cart") === null ||
	JSON.parse(localStorage.getItem("cart"))?.length === 0
		? confirm.classList.add("disabled", true)
		: confirm.classList.remove("disabled")
}

//creating main
function createMain() {
	const main = document.createElement("main")
	main.append(createMainScreen())
	main.append(bookSlider())
	main.append(new Droppable().createElem())

	for (let item of books) {
		const popUp = new PopUp(item).createElem()
		popUp.setAttribute("data-book", item.title)
		main.append(popUp)
	}

	return main
}

//main screen
function createMainScreen() {
	const titleText = ["do ", "not ", "trust ", "the ", "cover "]
	const mainScreen = document.createElement("section")
	const title = document.createElement("h1")
	title.classList.add("title")
	for (let item of titleText) {
		const word = document.createElement("span")
		word.insertAdjacentText("beforeend", item)
		word.classList.add("title__word")
		title.append(word)
	}

	mainScreen.append(title)

	return mainScreen
}

//book slider
function bookSlider() {
	class Arrow {
		constructor(direction) {
			this.class =
				direction === "prev"
					? "books__slider-arrow_prev"
					: "books__slider-arrow_next"
			this.direction = direction === "prev" ? "❮" : "❯"
		}

		createElem() {
			const button = document.createElement("button")
			button.insertAdjacentText("beforeend", this.direction)
			button.classList.add(this.class)
			button.classList.add("books__slider-arrow")
			return button
		}

		click() {}
	}

	const catalog = document.createElement("div")
	const booksList = document.createElement("ul")
	const arrowsContainer = document.createElement("div")

	catalog.classList.add("books__slider-wrapper")
	booksList.classList.add("books__slider")
	arrowsContainer.classList.add("books__arrow-container")

	for (let item of books) {
		booksList.append(new Book(item).createElem())
	}

	arrowsContainer.append(new Arrow("prev").createElem())
	arrowsContainer.append(new Arrow("next").createElem())

	catalog.append(booksList)
	catalog.append(arrowsContainer)
	return catalog
}

//creating a layout
function createLayout() {
	const fragment = new DocumentFragment()

	fragment.append(createHeader())
	fragment.append(createMain())

	return fragment
}

function addScript(src) {
	const script = document.createElement("script")
	script.setAttribute("src", src)
	return body.insertAdjacentElement("beforeend", script)
}

//add slider functionality
addScript("../scripts/slider.js")
