jQuery(function() {
	// Fixed top navigation
	$(window).scroll(function() {
		var top = $(document).scrollTop();

		if ($(window).width() > 939) {
			var fixedElem = $('.navigation-fixed');
		}
		else {
			var fixedElem = $('.top-menu');
		}
		if (top < 80) {
			fixedElem.css({top: '0', position: 'relative'});
		}
		else {
			fixedElem.css({top: '0', position: 'fixed'});
		}
	});

	// Select FormStyler
	$('.js-select').styler({
		selectSmartPositioning: false,
		selectPlaceholder: 'Все области'
	});

	// Slider
	$('.js-slider').bxSlider({
		controls: false,
		maxSlides: 1,
		slideWidth: 590
	});
});