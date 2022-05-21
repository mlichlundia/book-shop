const sliderContainer = document.querySelector(".books__slider-wrapper")
const sliderCardsContainer = document.querySelector(".books__slider")
const sliderCards = document.querySelectorAll(".books__card-wrapper")

const prev = document.querySelector(".books__slider-arrow_prev")
const next = document.querySelector(".books__slider-arrow_next")

let sliderWidth = sliderContainer.offsetWidth

let count = 0

isPrevDisabled(count)

next.addEventListener("click", showNext)
prev.addEventListener("click", showPrev)

window.addEventListener("resize", onresize)

function onresize() {
	sliderWidth = sliderContainer.offsetWidth
	swipe(count)
	isNextDisabled(count)
	isPrevDisabled(count)
}

function swipe(count) {
	console.log(count)
	sliderCardsContainer.style.transform = `translate(${-count * sliderWidth}px)`

	isNextDisabled(count)
	isPrevDisabled(count)
}

function isNextDisabled(count) {
	if (window.outerWidth > 768) {
		console.log((sliderCards.length - 1) / 3, sliderCards.length)
		next.disabled =
			count <= (sliderCards.length - 1) / 3 &&
			count > (sliderCards.length - 1) / 3 - 1
				? true
				: false
	} else if (window.outerWidth > 600) {
		next.disabled =
			count <= (sliderCards.length - 1) / 2 &&
			count > (sliderCards.length - 1) / 2 - 1
				? true
				: false
	} else {
		next.disabled = count === sliderCards.length - 1 ? true : false
	}
}

function isPrevDisabled(count) {
	prev.disabled = count === 0 ? true : false
}

function showNext() {
	count++
	swipe(count)
}

function showPrev() {
	count--
	swipe(count)
}
