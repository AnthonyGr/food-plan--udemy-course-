'use strict';
import tabs from './modules/tabs';
import cards from './modules/cards';
import calculator from './modules/calculator';
import forms from './modules/forms';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import {
	openModal
} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	cards();
	calculator();
	forms('form', modalTimerId);
	timer('.timer', '2021-12-14');
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '.offer__slider-counter #total',
		currentCounter: '.offer__slider-counter #current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	modal('[data-modal]', '.modal', modalTimerId);
});