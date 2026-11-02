document.getElementById('year').textContent = new Date().getFullYear();
const items = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });

	items.forEach((item) => observer.observe(item));
} else {
	items.forEach((item) => item.classList.add('visible'));
}

const imageLightbox = document.querySelector('.image-lightbox');

if (imageLightbox instanceof HTMLDialogElement) {
	const lightboxImage = imageLightbox.querySelector('.image-lightbox-image');
	const closeButton = imageLightbox.querySelector('.image-lightbox-close');

	if (lightboxImage instanceof HTMLImageElement && closeButton instanceof HTMLButtonElement) {
		document.querySelectorAll('.project-image-trigger').forEach((trigger) => {
			trigger.addEventListener('click', () => {
				const image = trigger.querySelector('img');

				if (!(image instanceof HTMLImageElement)) {
					return;
				}

				lightboxImage.src = image.currentSrc || image.src;
				lightboxImage.alt = image.alt;
				imageLightbox.showModal();
			});
		});

		closeButton.addEventListener('click', () => imageLightbox.close());
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape' && imageLightbox.open) {
				imageLightbox.close();
			}
		});
		imageLightbox.addEventListener('click', (event) => {
			if (event.target === imageLightbox) {
				imageLightbox.close();
			}
		});
	}
}
