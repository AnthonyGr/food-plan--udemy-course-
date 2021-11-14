import {
	getResource
} from '../services/services';

function cards() {
	const menuField = document.querySelector('.menu__field .container');

	class MenuCard {
		constructor(header, description, price, imgSrc, imgAlt, parentSelector, ...classes) {
			this.header = header;
			this.description = description;
			this.price = price;
			this.imgSrc = imgSrc;
			this.imgAlt = imgAlt;
			this.transfer = 27;
			this.changeToUAH();
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			}

			this.classes.forEach(className => element.classList.add(className));
			element.innerHTML = `
				<img src=${this.imgSrc} alt=${this.a=this.imgAlt}>
				<h3 class="menu__item-subtitle">${this.header}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>`;
			this.parent.append(element);
		}
	}

	//Устаревший метод
	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));

	// function createCard(data) {
	// 	data.forEach(({
	// 		title,
	// 		descr,
	// 		price,
	// 		img,
	// 		altImg
	// 	}) => {
	// 		const element = document.createElement('div');
	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 		<img src=${img} alt=${altImg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 			</div>
	// 		`;
	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({
				img,
				altImg,
				title,
				descr,
				price
			}) => {
				new MenuCard(title, descr, price, img, altImg, '.menu__field .container').render();
			});
		});
}

export default cards;