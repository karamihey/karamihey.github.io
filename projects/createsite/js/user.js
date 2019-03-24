jQuery(function() {
	// In-Field Labels
	$('label.infield').inFieldLabels({fadeOpacity: 0.2});

	$('.fancybox-close').live('click',function(){
		$.fancybox.close();
		return false;
	});

	$('.fancybox-zoom').fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		loop : false,
		helpers	: {
			title	: {
				type	: 'inside'
			}
		},
		zoom	: true
	});

	$('.j-slider').bxSlider({
		auto: true,
		controls: true,
		pager: false
	});

	$(window).ready(function(){
		var moveSlide,
			width = $(window).width();
		if (width < 580) {
			slideMargin = 0;
			slideWidth = 280;
		} else {
			slideMargin = 20;
			slideWidth = 546;
		}
		$('.j-slider-portfolio').bxSlider({
			auto: true,
			controls: true,
			maxSlides: 2,
			slideWidth: slideWidth,
			slideMargin: slideMargin
		});
	});


	$('.j-slider-clients').bxSlider({
		infiniteLoop: false,
		hideControlOnEnd: true,
		slideMargin: 0,
		pager: false,
		maxSlides: 5,
		slideWidth: 208
	});

	$('.j-mobile_menu-button').sidr({
		name: 'b-mobile_menu-content',
		source: '.j-top_menu',
		renaming : false
	});

	// Mobile Button Up
	$(window).scroll(function(){
		if ($(this).scrollTop() > 130) {
			$('.j-mobile_menu-up').addClass("f-mobile_menu-up-active");
		} else {
			$('.j-mobile_menu-up').removeClass("f-mobile_menu-up-active");
		}
	});
	$('.j-mobile_menu-up').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
		return false;
	});
});