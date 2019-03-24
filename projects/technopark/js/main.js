$(window).ready(function() {
	$('.mobile-menu-icon').click(function() {
		if (!($('.mobile-menu-icon').hasClass('mobile-menu-icon_active'))) {
			openMenu();
		}
		else {
			closeMenu();
		}
	});

	function openMenu() {
		$('body').css('position', 'fixed');
		$('.overlay').show();
		$('.mobile-menu-icon').addClass('mobile-menu-icon_active');
		$('.mobile-menu-wrap').addClass('mobile-menu-wrap_active');
		if ($('.mobile-search').hasClass('mobile-search_active')) {
			$('.mobile-search').removeClass('mobile-search_active');
		}
	}

	function closeMenu() {
		$('body').css('position', 'static');
		$('.overlay').hide();
		$('.mobile-menu-icon').removeClass('mobile-menu-icon_active');
		$('.mobile-menu-wrap').removeClass('mobile-menu-wrap_active');
	}

	$('.catalog-search-icon, .mobile-search__close').click(function() {
		if (!($('.mobile-search').hasClass('mobile-search_active'))) {
			openSearch();
		}
		else {
			closeSearch();
		}
	});

	function openSearch() {
		$('body, html').scrollTop(0);
		$('.mobile-search').addClass('mobile-search_active');
		$('.wrapper').addClass('search-open');
		$('.overlay').show();
	}

	function closeSearch() {
		$('.mobile-search').removeClass('mobile-search_active');
		$('.wrapper').removeClass('search-open');
		$('.overlay').hide();
	}

	$('.overlay').click(function() {
		if ($('.mobile-menu-icon').hasClass('mobile-menu-icon_active')) {
			closeMenu();
		}
		if ($('.mobile-search').hasClass('mobile-search_active')) {
			closeSearch();
		}
	});

	onResize = function() {
		if ($(window).width() > 939) {
			addSelect();
		}
		else {
			mobileMenu();
		}
	}

	$(document).ready(onResize);
	$(window).resize(onResize);

	function addSelect() {
		$('.select').each(function() {
			if (!($('.select__item_current', this).text().length)) {
				var defaultElem = $('.select__dropdown', this).find('.select__item').first();
				var defaultVaue = defaultElem.text();
				var selectWidth = $(this).innerWidth();
				$('.select__item_current', this).text(defaultVaue);
				$(this).css('width', $(this).innerWidth());
				defaultElem.remove();
			}
		});
	}

	function mobileMenu() {
		if (!($('.mobile-menu-wrap').html())) {
			$('.mobile-menu-wrap').html($('.top-menu').html());
		}
	}

	$('.select').click(function() {
		if (!($(this).hasClass('select_current'))) {
			var currenSelect = $(this);
		}
		$('.select_current').each(function() {
			$(this).removeClass('select_current');
		});
		if (currenSelect) {
			currenSelect.addClass('select_current');
		}
	});

	$('.select__item').click(function() {
		$(this).parents('.select').find('.select__item_current').text($(this).text());
	});

	$(document).click(function(e) {
		var elem = $('.select_current');
		if (e.target != elem[0] && !elem.has(e.target).length) {
			elem.removeClass('select_current');
		}
	});

	$(document).on('keyup', '.price-field', function() {
		if ($(this).val()) {
			$(this).val(formatNumber($(this).val()));
		}
	});

	function formatNumber(number) {
		num = number.toString().split('.');
		number = parseInt(num[0].replace(/ /g, ''));
		if (isNaN(number))
			return '0';
		var text = (number % 1000).toString();
		number = parseInt(number / 1000);
		while(number > 0) {
			while ((text.length + 1) % 4 > 0) {
				text = "0" + text;
			}
			text = (number % 1000).toString() + " " + text;
			number = parseInt(number / 1000);
		}
		if (num[1]) {
			text = text + "." + num[1];
		}
		return text;
	}

	$('.product-popup__close, .overlay_popup').click(function() {
		$('.product-popup').hide();
		$('.overlay_popup').removeClass('overlay_popup');
	});
});