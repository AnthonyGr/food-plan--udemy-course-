function slider({
	container,
	slide,
	nextArrow,
	prevArrow,
	totalCounter,
	currentCounter,
	wrapper,
	field
}) {
	let currentSlideNumber = document.querySelector(currentCounter),
		totalSlideNumber = document.querySelector(totalCounter);
	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		nextSlideBtn = document.querySelector(nextArrow),
		prevSlideBtn = document.querySelector(prevArrow),
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
		width = window.getComputedStyle(slidesWrapper).width;

	let currentSlide = 1,
		offset = 0;

	if (slides.length < 10) {
		totalSlideNumber.textContent = `0${slides.length}`;
	} else {
		totalSlideNumber.textContent = slides.length;
	}
	updateSlideNumbers();

	slidesField.style.width = slides.length * 100 + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.style.cssText = `
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 15;
	display: flex;
	justify-content: center;
	margin-right: 15%;
	margin-left: 15%;
	list-style: none;
`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5;
		transition: opacity .6s ease;
	`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	nextSlideBtn.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (currentSlide == slides.length) {
			currentSlide = 1;
		} else {
			currentSlide++;
		}

		updateSlideNumbers();
		updateDots();
	});

	prevSlideBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (currentSlide == 1) {
			currentSlide = slides.length;
		} else {
			currentSlide--;
		}

		updateSlideNumbers();
		updateDots();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (event) => {
			const slideTo = event.target.getAttribute('data-slide-to');
			currentSlide = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			updateSlideNumbers();
			updateDots();
		});
	});

	function updateDots() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[currentSlide - 1].style.opacity = 1;
	}

	function updateSlideNumbers() {
		if (slides.length < 10) {
			currentSlideNumber.textContent = `0${currentSlide}`;
		} else {
			currentSlideNumber.textContent = currentSlide;
		}
	}

	function deleteNotDigits(string) {
		return +string.replace(/\D/ig, '');
	}
}

export default slider;