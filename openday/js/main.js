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

	var slider = $('.js-slider').bxSlider({
		controls: false,
		maxSlides: 1,
		slideWidth: 590
	});

	onResize = function() {
		slider.reloadSlider({
			controls: false,
			pager: false,
			maxSlides: 1,
			slideWidth: 590
		});
	}

	$(window).resize(onResize);

	// Mobile Menu
	$('.j-mobile-menu-btn').sidr({
		name: 'mobile-menu-content',
		source: '.s-main, .s-catalog-goods, .s-catalog-services, .s-catalog, .s-top-menu'
	});

	$('.j-mobile-menu-btn').click(function() {
		$('.mobile-menu-close').show();
	});

	$('.sidr-overlay, .mobile-menu-close').click(function() {
		$.sidr('close', 'mobile-menu-content');
		$('.mobile-menu-close').hide();
	});

	$('.sidr-class-catalog-menu-link, .sidr-class-catalog-menu-dropdown-submenu').click(function() {
		$(this)
			.toggleClass('submenu-opened')
			.next().toggle();
	});

	$(window).scroll(function() {
		var left = $(document).scrollLeft();
		if (left >= 265) {
			$.sidr('close', 'mobile-menu-content');
			$('.mobile-menu-close').hide();
		}
	});
});