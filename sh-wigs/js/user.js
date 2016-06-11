jQuery(function(){
	// Slider on main
	$('.j-slider').bxSlider({
		auto: true,
		controls: true,
		nextText: '',
		prevText: '',
		pager: false
	});

	// Select, checkbox and radio FormStyler
	$('.j-language, .j-goods-count, .js-checkbox, .js-radio').styler();

	// Language change
	$('.j-language').bind('change', function() {
		var url = $(this).val();
		if (url != '') {
			window.location = url;
		}
		return false;
	});

	// Fancybox in good card
	$('.j-gallery').fancybox({
		prevEffect	: 'none',
		nextEffect	: 'false',
		loop : false,
		helpers	: {
			title	: {
				type	: 'inside'
			},
			thumbs	: {
				width	: 50,
				height	: 50,
				position: 'bottom'
			}
		}
	});

	// Fancybox close
	$('.fancybox-close, .j-fancybox-close').live('click', function() {
		$.fancybox.close();
		return false;
	});

	// Slider in good card
	$('.j-good-slider').slides({
		effect: 'fade',
		crossfade: true,
		fadeSpeed: 500,
		generateNextPrev: true,
		generatePagination: false,
		paginationClass: 'good-slider-thumbs'
	});

	$(window).ready(function() {
		var moveSlide = 0;
		var width = $(window).width();
		if (width < 580) {
			moveSlide = 1;
			$('.good-slider-thumbs li').hide();
			$('.good-slider-thumbs li:first').show();
		}
		else {
			moveSlide = 3;
		}

		// Additional image processing in good card
		if ($('.good-slider-thumbs').html()) {
			var count = 0;
			count = $('.good-slider-thumbs').children().length;
			$('.prev').hide();
			if (count <= moveSlide) {
				$('.next').hide();
			}
			else {
				$('.next').click(function() {
					$('.prev').show();
					if ($('.current').next('li').is(':hidden')) {
						if (moveSlide > 1) {
							$('.current').next('li').show();
						}
						else {
							$('.current').show();
						}
						$('li:visible:first', $('.good-slider-thumbs')).hide();
					}
					else if (!$('.current').next('li').html()) {
						$('.next').hide();
						if (moveSlide == 1) {
							$('.current').show();
							$('li:visible:first', $('.good-slider-thumbs')).hide();
						}
					}
				});

				$('.prev').click(function() {
					if ($('.current').prev('li').is(':hidden')) {
						if (moveSlide > 1) {
							$('.current').prev('li').show();
						}
						else {
							$('.current').show();
						}
						$('li:visible:last', $('.good-slider-thumbs')).hide();
					}
					if (!$('.current').prev('li').html()) {
						$('.prev').hide();
						if (moveSlide == 1) {
							$('.current').show();
							$('li:visible:last', $('.good-slider-thumbs')).hide();
						}
					}
					$('.next').show();
				});

				if (moveSlide > 1) {
					$('li:visible', $('.good-slider-thumbs')).live('click', function() {
						if ($('.current').prev('li').is(':hidden')) {
							$('.current').prev('li').show();
							$('li:visible:last', $('.good-slider-thumbs')).hide();
						}
						if (!$('.current').prev('li').html()) {
							$('.prev').hide();
						}
						$('.next').show();
					});
				}
			}
		}
		$('.j-good-slider-thumb').click(function() {
			if (moveSlide > 1) {
				var count = 0;
				count = $('.good-slider-thumbs').children().length;
				if (count > moveSlide) {
					if (!$('.current').prev('li').html()) {
						$('.prev').hide();
					}
					else {
						$('.prev').show();
					}
					if (!$('.current').next('li').html()) {
						$('.next').hide();
					}
					else {
						$('.next').show();
					}
					if ($('.current').prev('li').is(':hidden')) {
						$('.current').prev('li').show();
						$('li:visible:last', $('.good-slider-thumbs')).hide();
					}
					else if ($('.current').next('li').is(':hidden')) {
						$('.current').next('li').show();
						$('li:visible:first', $('.good-slider-thumbs')).hide();
					}
				}
			}
			return false;
		});
	});

	// Select color
	$('input.s-color').live('change', function() {
		if ($(this).is(':checked')) {
			$(this).parent().prev().addClass('color-image_current');
			$(this).parent().parent().next().css('display', 'block');
		}
		else {
			$(this).parent().prev().removeClass('color-image_current');
			$(this).parent().parent().next().hide();
		}
		var context = $(this).parents('.s-elem');
		var good_id = $(this).parents('.s-elem').find('.goods-count-wrap input').data('good_id');
		update_goods_total(context);
		change_goods_count(context, good_id);
	});

	// Changing goods count
	$('.decrease').live('click', function() {
		var input = $(this).parent().find('input');
		var count = parseInt(input.val()) - 1;
		count = count < 1 ? 1 : count;
		input.val(count);
		update_goods_total($(this).parents('.s-elem'));
		input.trigger('change');
	});
	$('.increase').live('click', function() {
		var input = $(this).parent().find('input');
		var count = parseInt(input.val()) + 1;
		input.val(count);
		update_goods_total($(this).parents('.s-elem'));
		input.trigger('change');
	});

	// Change goods count in basket
	$('.s-cart-count').live('change', function() {
		var context = $(this).parents('.s-elem');
		var good_id = $(this).data('good_id');
		change_goods_count(context, good_id);
	});

	// Add to basket
	$('.s-add-basket').live('click', function() {
		$('.loading').show();
		var good_id = $(this).data('good_id');

		var color = color_check($(this).parents('.s-elem'));
		if ($.isEmptyObject(color)) {
			color[$(this).data('default_color')] = '1';
		}

		var count = 0;
		$.each(color, function(i, val) {
			count += parseInt(val);
		});

		$(this).addClass('hide_element');
		$(this).next().removeClass('hide_element');

		$('.loading').hide();

		return false;
	});

	// Check selected colors
	function color_check(context) {
		var colors = {};
		$('input.s-color:checked', context).each(function() {
			var name = $.trim($(this).parent().parent().text());
			colors[name] = $(this).parent().parent().next().find('input').val();
		});
		return colors;
	}

	function update_goods_total(context) {
		var count = 0;
		$('input.s-color:checked', context).each(function() {
			var input = $(this).parent().parent().next().find('input');
			count = count + parseInt(input.val());
		});
		if (count > 0) {
			$('.s-goods-total', context).parent().show();
			$('.s-goods-total', context).text(count);
		}
		else {
			$('.s-goods-total', context).text('');
			$('.s-goods-total', context).parent().hide();
		}
	}

	function update_basket_price(context, count) {
		var price = ($('.s-good-price', context).text()).replace(/\s+/g, '');
		$('.s-basket-price', context).html(FormatInt(count * price));
		$('.s-basket-total').html($('.s-cart-total').text());
	}

	// Change goods count in basket
	function change_goods_count(context, good_id) {
		$('.loading').show();

		var color = color_check(context);
		if ($.isEmptyObject(color)) {
			color[context.data('default_color')] = '1';
		}

		var count = 0;
		$.each(color, function(i, val) {
			count += parseInt(val);
		});

		update_basket_price(context, count);

		$('.loading').hide();

		return false;
	}

	function FormatInt(n) {
		n = parseInt(n);
		var text = (n % 1000).toString();
		n = parseInt(n / 1000);
		while(n > 0) {
			while((text.length+1) % 4 > 0) text = "0" + text;
			text = (n % 1000).toString() + " " + text;
			n = parseInt(n / 1000);
		}
		return text;
	}

	// Mobile Menu
	$('.j-mobile-menu-btn').sidr({
		name: 'mobile-menu-content',
		source: '.j-top-menu'
	});

	// Mobile Button Up
	$(window).scroll(function() {
		if ($(this).scrollTop() > 130) {
			$('.j-mobile-menu-up').addClass('f-mobile-menu-up_active');
		}
		else {
			$('.j-mobile-menu-up').removeClass('f-mobile-menu-up_active');
		}
	});
	$('.j-mobile-menu-up').click(function() {
		$('html, body').animate({ scrollTop: 0 }, 500);
		return false;
	});
});