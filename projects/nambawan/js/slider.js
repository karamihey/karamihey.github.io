  const handleLeadingZero = number => {
	if (number < 10) {
		return '0' + number;
	}

	return number;
};

  window.onload = function () {
    var mySwiper = new Swiper ('.swiper-container', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
			formatFractionCurrent: handleLeadingZero,
			formatFractionTotal: handleLeadingZero,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})
  };
