jQuery(function(){
	// Series Slider
	$('.j-series-slider').bxSlider({
		controls: false,
		slideWidth: 1200,
		pagerCustom: '.j-series-slider-pager'
	});

	// Fancybox close
	$('.fancybox-close, .j-fancybox-close').live('click', function() {
		$.fancybox.close();
		return false;
	});

	// Select FormStyler
	$('.js-select').styler({
		selectSmartPositioning: false,
		selectPlaceholder: 'Все'
	});
});