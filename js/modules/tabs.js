function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	const tabsContent = document.querySelectorAll(tabsContentSelector),
		tabs = document.querySelectorAll(tabsSelector),
		tabsParent = document.querySelector(tabsParentSelector);



	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, index) => {
				if (item == target) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');
		});
		for (let item of tabs) {
			item.classList.remove(activeClass);
		}
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
		tabs[i].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();
}

export default tabs;