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
	var slider = $('.js-slider').bxSlider({
		controls: false,
		minSlides: 1,
		maxSlides: 1,
		slideWidth: 590
	});

	onResize = function() {
		if ($('.js-slider').length) {
			slider.reloadSlider({
				controls: false,
				minSlides: 1,
				maxSlides: 1,
				slideWidth: 590
			});
		}
	}

	$(window).load(onResize);
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

	// Card images
	$('.js-load-big-img').click(function() {
		$('.s-good-image-thumb').removeClass('current');
		$(this).addClass('current');
		$('.good-images__main').attr('src', $(this).data('src'));
		return false;
	});

	// Order Form
	var formFields = $('.form-wrap');
	var formResultMessage = $('.form-result');
	var formClose = $('.form-close');

	$('.js-order').click(function() {
		$('.js-order-form, .overlay').show();
	});

	$('.js-close, .overlay').click(function() {
		$('.js-order-form, .overlay').hide();
		$('input[type=text]', formFields).val("");
		formFields.show();
		formClose.removeClass('form-close_result');
		formResultMessage.hide();
	});

	$('.js-order-form').submit(function(event) {
		formFields.hide();
		formClose.addClass('form-close_result');
		formResultMessage.show();
	});
});

// Counter
function counter(date_year, date_month, date_day, date_hours, date_min) {
	if (date_month > 0) {
		date_month = date_month - 1;
	}
	var date = new Date(date_year, date_month, date_day);
	var date_current = new Date();
	if (date > date_current) {
		var day = 60*60*1000*24;
		var hour = 60*60*1000;
		var min = 60*1000;
		var sec = 1000;
		count = date - date_current;

		if (date_hours) {
			count = count + date_hours*hour;
		}
		if (date_min) {
			count = count + date_min*min;
		}

		days = parseInt(count/(day));
		hours = parseInt((count-(day*days))/hour);
		minutes = parseInt((count-(day*days+hour*hours))/min);
		seconds = parseInt((count-(day*days+hour*hours+min*minutes))/sec);

		days_params = days.toFixed().split("");
		hours_params = hours.toFixed().split("");
		minutes_params = minutes.toFixed().split("");
		seconds_params = seconds.toFixed().split("");

		if (!seconds_params[1]) {
			seconds_params = [0, seconds_params[0]];
		}
		if (!hours_params[1])  {
			hours_params = [0, hours_params[0]];
		}
		if (!minutes_params[1]) {
			minutes_params = [0, minutes_params[0]];
		}
		if (!days_params[1]) {
			days_params = [0, days_params[0]];
		}

		var daysLeft = days_params[0] + days_params[1] + "д";
		var hoursLeft = hours_params[0] + hours_params[1] + "ч";
		var minutesLeft = minutes_params[0] + minutes_params[1] + "мин";
		var secondsLeft = seconds_params[0] + seconds_params[1] + "с";

		$('.js-counter').text(daysLeft + " " + hoursLeft + " " + minutesLeft + " " + secondsLeft);
	}
}

function set_counter() {
	date = new Date();
	year = date.getFullYear();
	month = date.getMonth();
	counter(year, month + 2, 01, 00, 00);
}

setInterval(set_counter, 1000);