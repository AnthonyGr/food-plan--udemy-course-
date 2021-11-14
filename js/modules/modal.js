function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	//Forbid scroll
	document.body.style.overflow = 'hidden';
	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}

}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	//Allow scroll
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

	const modal = document.querySelector(modalSelector),
		modalTriggers = document.querySelectorAll(triggerSelector);

	modalTriggers.forEach(item => {
		item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			removeEventListener('scroll', showModalByScroll);
		}
	}


	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
	openModal,
	closeModal
};