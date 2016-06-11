/**
*	JS для пользователя (НЕ ДЛЯ АДМИНКИ)
*/
function show_fancy_order(data){
	$.fancybox(data,{
		autoResize  : false,
		scrollingY	: 'yes',
		beforeClose	: function(){hideTip();},
		tpl: {
				wrap	:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-outer"><div class="fancybox-inner"></div></div><a title="Закрыть" class="fancybox-close b-order-form-close fancybox-form-close" href="#"></a></div>'
			}
	});
}

function send_order_form(context) {
	$.post(context.attr('action'), context.serialize(), function(text) {
		context.parent('.j-ajax_form').html(text);
	});
	return false;
}

function send_form_to_user_mail(context) {
	$.post(context.attr('action'), context.serialize(), function(text) {
		show_fancy_order(text);
	});
	return false;
}

jQuery(function(){

	//$( "#checkboxes" ).buttonset();
	$( "#tabs" ).tabs();

	/**
	*	форматирует числов (100000 в 100 000)
	*/

	function FormatInt(n)
	{
		n = parseInt(n);
		var text = (n % 1000).toString();
		n = parseInt(n / 1000);
		while(n > 0)
		{
			while((text.length+1) % 4 > 0) text = "0" + text;
			text = (n % 1000).toString() + " " + text;
			n = parseInt(n / 1000);
		}
		return text;
	}


	
//Display hidden blocks
	$( ".j-open-prev_block" ).click(function() {
		$(this).parent().prev( ".d-n" ).slideToggle( "middle" );
		var text = $(this).data('toggle-text');
		$(this).data('toggle-text', $(this).html());
		$(this).html(text);
		return false;
	});
	$( ".j-open-next_block-wrapper" ).live('click',function() {
		$(this).parent().next( ".d-n" ).slideToggle( "middle" );
		var this_child = $(this).children('.j-open-next_block-inner');
		var text = this_child.data('toggle-text');
		this_child.data('toggle-text', this_child.html());
		this_child.html(text);
		return false;
	});
	$( ".j-close-filter" ).live('click',function() {
		$(this).parent().next( ".b-filterWr" ).slideToggle( "middle" );
		return false;
	});
	$( ".j-toggle_class" ).live('click',function() {
		$(this).toggleClass( "b-white_arr-active" );
		return false;
	});

	$(".s-show-all-foto").click(function(){
		$(".s-hidden-foto").removeClass("hide_element");
		$(".s-show-all-foto").hide();
		$(".s-hide-foto").removeClass("hide_element").show();
		return false;
	});

	$(".s-hide-foto").click(function(){
		$(".s-hidden-foto").addClass("hide_element");
		$(".s-show-all-foto").show();
		$(".s-hide-foto").hide();
		return false;
	});

// Changing vacancies
	$('select.j-vacancy').change(function() {
		var vacancy_text = ".j-vacancy-"+$( this ).val();
		$('[class ^= j-vacancy-]').css("display","none");
		$(vacancy_text).css("display","block");
	});

// Auto Submit Form
$('.j-auto_submit').on('change', function(){
	var form_context = $(this).parents('form');
	$('.j-auto_submit-button', form_context).click();
});

//Fancybox-images
	$(".j-fancybox").fancybox({
		prevEffect : 'fade',
		nextEffect : 'fade',
		loop : false,
		helpers	: {
			title	: {
				type	: 'inside'
			},
			thumbs : {
				width : 70,
				height : 70,
				position: 'bottom'
			}
		},
		zoom : false
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

	$('.fancybox-close').live('click',function(){
		$.fancybox.close();
		return false;
	});

//Fancybox-forms
	$('.j-order-good').click(function() {
		$.ajaxSetup({ async: false });
		$.post('/order-good/',{
				'good_id'	:	$(this).data("good_id")
			},function(data){
				show_fancy_order(data);
				//$( "#checkboxes" ).buttonset();
		});
		return false;
	});
	
	$('.j-order-krylco').click(function() {
		$.ajaxSetup({ async: false });
		$.post('/order-krylco/',{
				'cat_id'	:	$(this).data("cat_id")
			},function(data){
				show_fancy_order(data);
				//$( "#checkboxes" ).buttonset();
		});
		return false;
	});
	
	$('.j-calc-order').click(function() {
		var context = $(this).parents(".b-calc_pattern");
		$.ajaxSetup({ async: false });
		$.post('/calc-order/',{
				'good_id'	:	$(this).data("good_id"),
				'square' :	$(".s-calc-square-show", context).html(),
				'image_id' :	$(this).data("image_id")
			},function(data){
				show_fancy_order(data);
				//$( "#checkboxes" ).buttonset();
		});
		return false;
	});
	
	$('.j-call').click(function() {
		$.ajaxSetup({ async: false });
		$.post('/zakaz_zvonka/',function(data){
			show_fancy_order(data);
		});
		return false;
	});
	
	$('.j-select-region').click(function() {
		$.ajaxSetup({ async: false });
		$.post('/regions/',function(data){
			$('.s-region-confirm').hide();
			show_fancy_order(data);
		});
		return false;
	});

	$('.j-region a').live('click',function() {
		var region = $(this).data('region');
		SetCookie("region",region,false,"/");
		window.location.reload();
		return false;
	});

	$('.js-select').styler({selectSmartPositioning: false});

	$('.js-select-objects').styler({
		selectSmartPositioning: false,
		selectPlaceholder: 'Применяемая продукция:'
	});

	$(".s-region-change").change(function(){
		SetCookie("region",$("option:selected",$(this)).val(),false,"/");
		window.location.reload();
	});

	//Обработчики фильтра
	$("input[type=checkbox]",$(".s-filter-block-conteiner")).live("click",function(){
		//alert($(".b-filter_r .b-filter_inner").scrollTop());
		$(".b-loader").show();

		if ($(this).hasClass("s-main-level"))
		{
			if ($(this).is(":checked"))
			{
				$(".s-second-level-"+$(this).data("main_level_key")+":enabled").attr("checked","checked");
			}
			else
				$(".s-second-level-"+$(this).data("main_level_key")).removeAttr("checked");
		}
		
		$("input[type=checkbox]",$(".s-filter-block-conteiner")).removeAttr("disabled");
		$.ajaxSetup({ async: false });
		$.get('/search/search/',
		$(this).parents("form").serialize()+"&get_filter_template=1&scroll_r="+$(".b-filter_r .b-filter_inner").scrollTop()+"&scroll_l="+$(".b-filter_l .b-filter_inner").scrollTop()+"&current_clk_value="+$(this).val(),
			function(data) {
				$(".s-filter-block-conteiner").html(data);
		});

		if ($("form",$(".s-filter-block-conteiner")).data("scroll_l"))
			$(".b-filter_l .b-filter_inner").scrollTop($("form",$(".s-filter-block-conteiner")).data("scroll_l"));

		if ($("form",$(".s-filter-block-conteiner")).data("scroll_r"))
			$(".b-filter_r .b-filter_inner").scrollTop($("form",$(".s-filter-block-conteiner")).data("scroll_r"));



		return false;
	});
	
	
	/*if (document.location.href.indexOf("block_id")<0)
	{
		$.get('/search/search/',
		$("form",$(".s-filter-block-conteiner")).serialize()+"&get_filter_template=1&this_base_filter_up=1",
			function(data) {
				$(".s-filter-block-conteiner").html(data);
		});
	}*/
	
	$(".j-open-filter").live('click',function(){
		$.get('/search/search/',
		$("form",$(".s-filter-block-conteiner")).serialize()+"&get_filter_template=1&this_base_filter_up=1",
			function(data) {
				$(".s-filter-block-conteiner").html(data);
		});
	});

	$('.j-slider').bxSlider({
		auto			: true,
		pager			: true,
		controls		: false,
		moveSlides		: 1
	});

	$('.j-region-close').live('click',function() {
		$('.s-region-confirm').hide();
		return false;
	});

	$('.j-region-confirm').live('click',function() {
		$('.s-region-confirm').hide();
		SetCookie("region",encodeURIComponent($('.region-place b').text()),false,"/");
		return false;
	});
	
	$('.print_tile_image_block').click(function(){
		var context = $(this).parent().parent().parent();
		$('.to_print',context).printThis({
		      debug: false,              
		      importCSS: true,           
		      printContainer: true,
		      loadCSS: "/css/print.css"    
		  });
	});
	
	$(".s-calc-image").click(function(){
		var context = $(this).parent().parent().parent().parent();
		var square = $(".s-calc-square",context).val();
		var result = 0;
		$(".s-calc-square-show",context).html(square);
		$(".s-square-input",context).val(square);
		$(".s-model-percent",context).each(function(){
			cur_model = $(this).data("model");
			cur_percent = $(this).data("percent");
			
			result = roundPlus((square*(cur_percent/100)),1);
			
			$(".s-calc-image-result",context).each(function(){
				if ($(this).data("model")==cur_model)
				{
					$(this).html(result+" м. кв.");
				}
			});
			
			
			
		});
		
		$(".s-calc-image-block",context).removeClass("hide_element");
	});
	
});