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

	$('.catalog-menu-dropdown > li').mouseover(function() {
		var menuWidth = $('.catalog-navigation').width() - $(this).innerWidth() - 1;
		$('.catalog-menu-submenu', this).css({width: menuWidth});
	});

	$('.catalog-menu-dropdown > li').mouseleave(function() {
		$('.catalog-menu-submenu', this).css({width: 0});
	});

	// Select FormStyler
	$('.js-select').styler({
		selectSmartPositioning: false,
		selectPlaceholder: 'Все области'
	});

	$('.js-select-brand').styler({
		selectSmartPositioning: false,
		selectPlaceholder: 'Выберите каталог бренда'
	});

	// Slider
	var slider = $('.js-slider').bxSlider({
		auto: true,
		controls: false,
		minSlides: 1,
		maxSlides: 1,
		slideWidth: 590
	});

	onResize = function() {
		if ($('.js-slider').length) {
			slider.reloadSlider({
				auto: true,
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
		event.preventDefault();
	});

	// Add image
	$('.j-add-image').click(function() {
		$('.s-add-file').trigger('click');
	});
});

// Counter
function counter() {
	var date_current = new Date();
	var day = 60*60*1000*24;
	var hour = 60*60*1000;
	var min = 60*1000;
	var sec = 1000;

	$('.js-counter').each(function() {
		var actionDate = $(this).data('time').split("/");
		if (actionDate[1] > 0) {
			actionDate[1] = actionDate[1] - 1;
		}
		var date = new Date(actionDate[2], actionDate[1], actionDate[0], 0, 0);
		if (date > date_current) {
			count = date - date_current;

			if (actionDate[3]) {
				count = count + actionDate[3]*hour;
			}
			if (actionDate[4]) {
				count = count + actionDate[4]*min;
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
			if (!days_params[2]) {
				if (!days_params[1]) {
					days_params = ['', 0, days_params[0]];
				}
				else {
					days_params = ['', days_params[0], days_params[1]];
				}
			}
			
			var daysLeft = days_params[0] + days_params[1] + days_params[2] + "д";
			var hoursLeft = hours_params[0] + hours_params[1] + "ч";
			var minutesLeft = minutes_params[0] + minutes_params[1] + "мин";
			var secondsLeft = seconds_params[0] + seconds_params[1] + "с";

			$(this).text(daysLeft + " " + hoursLeft + " " + minutesLeft + " " + secondsLeft);
		}
	});
}

setInterval(counter, 1000);