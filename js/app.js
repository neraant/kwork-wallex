document.addEventListener('DOMContentLoaded', () => {
	// Анимация линии и кругов
	const callback = (entries, observer, index) => {
		entries.forEach(entry => {
			if (
				entry.isIntersecting &&
				!entry.target.classList.contains('_activated') &&
				step < 6
			) {
				// Отображение блоков
				entry.target.classList.remove('_non-active')
				entry.target.classList.add('_activated')

				// Закрашивание линии
				if (window.innerWidth <= 660) {
					document.querySelector(
						'.__mobile .main-svg-line'
					).style.strokeDashoffset = mobileDashOffsetValues[step]

					// Появление кружочков
					const circles = document.querySelectorAll('.__mobile .circle')
					const [start, end] = circleRanges[step - 1]

					for (let i = start; i <= end; i++) {
						const circle = circles[i]
						if (circle) {
							circle.setAttribute('fill', '#69B9F6')
							circle.setAttribute('stroke', '#236AFC')
						}
					}
				} else if (window.innerWidth >= 1620) {
					document.querySelector(
						'.__desktop .main-svg-line'
					).style.strokeDashoffset = desktopDashOffsetValues[step]

					// Появление кружочков
					const circles = document.querySelectorAll('.__desktop .circle')
					const [start, end] = circleRanges[step - 1]

					for (let i = start; i <= end; i++) {
						const circle = circles[i]
						if (circle) {
							circle.setAttribute('fill', '#69B9F6')
							circle.setAttribute('stroke', '#236AFC')
						}
					}
				}

				step++
			}
		})
	}

	let step = 1
	const desktopDashOffsetValues = [8400, 7400, 6400, 5350, 4200, 0]
	const mobileDashOffsetValues = [8900, 8400, 7900, 7350, 6800, 0]

	const circleRanges = [
		[4, 7],
		[4, 10],
		[4, 14],
		[4, 19],
		[4, 24],
	]

	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 1,
	}

	const observer = new IntersectionObserver(callback, options)

	const phaseBlockElements = document.querySelectorAll('.phase__block')

	phaseBlockElements.forEach(phaseBlock => {
		if (phaseBlock && phaseBlock.classList.contains('_non-active')) {
			observer.observe(phaseBlock)
		}
	})

	// Аккордеон
	const accrodeonRows = document.querySelectorAll('.faq__list__item')

	accrodeonRows.forEach(accrodeonRow => {
		accrodeonRow.addEventListener('click', () => {
			const isOpened = accrodeonRow.classList.contains('opened')

			accrodeonRows.forEach(row => row.classList.remove('opened'))

			if (!isOpened) {
				accrodeonRow.classList.add('opened')
			}
		})
	})

	// Гамбургер меню
	const listItemElements = document.querySelectorAll('.menu__item')
	const openMenuBtn = document.getElementById('menu__toggle')

	listItemElements.forEach(listItem => {
		listItem.addEventListener('click', () => {
			listItemElements.forEach(listItem => {
				if (listItem.classList.contains('active')) {
					listItem.classList.remove('active')
				}
			})

			listItem.classList.add('active')

			openMenuBtn.checked = false
		})
	})
})
