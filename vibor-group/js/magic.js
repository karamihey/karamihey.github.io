jQuery(function($)
{
	// In-Field Labels
	$('label.infield').inFieldLabels({fadeOpacity: 0.2});

	// Image splash
	$('a.splash-image').live('click', function()
	{
		$.splash('splash-image-container')
			.html('<img src='+$(this).attr('href')+' id="splash-image">')
			.hide()
			.click(function() { $(this).trigger('close'); });
		var title = $(this).attr('title');
		if (title)
		{
			$('#splash-image-container').append('<div class="splash-title">' + title + '</div>');
		}
		$('#splash-image').load(function()
		{
			$('#splash-image-container').show().trigger('reposition');
		});
		return false;
	});

	// URL splash
	$('a.splash-url').live('click', function()
	{
		$.splash('splash-url-container').load($(this).attr('href'), function()
		{
			$('#splash-url-container').trigger('reposition');
			$('#splash-url-container .splash-close').click(function()
			{
				$('#splash-url-container').trigger('close');
			});
		});
		return false;
	});

	// form validation
	$("form.validate").submit(function(){
	
		var form_context = $(this);
		var is_valid = validation(form_context);
	
		if(is_valid===true)
		{
			$('input[type=submit]',this).attr('disabled', 'disabled');
			$(this).append('<in'+'put ty'+'pe="hi'+'dden" na'+'me="anti'+'bot" va'+'lue="ya'+'neb'+'ot!">');
		}
		return (is_valid===true)?true:false;
	});

	// form validation (button click)
	$(".validate_and_submit_this_form").live("click", function(){
		
		var form_context = $(this).parents("form");
		var is_valid = validation(form_context);
		
		if(is_valid===true)
		{
			$(form_context).append('<in'+'put ty'+'pe="hi'+'dden" na'+'me="anti'+'bot" va'+'lue="ya'+'neb'+'ot!">');
			var callback_function = $(form_context).data('callback');
			if(callback_function)
				window[callback_function](form_context);
			//return true;
		}
		return false;
	});
	getGoodInfo();
	
/**
*	передача одноразовых параметров на др.страницу
*/
	$('.s-set-params-for-other-page').click(function()
	{
		href = $(this).data('href');
		if(!href)
			href = $(this).attr('href');
			
		if(!href || !$(this).data('callback'))
			return false;
		
		var context = $(this);
		var params = {};
		$.each(this.attributes, function() {
			if(this.specified && ( this.name.indexOf('data-param') ===0 || this.name.indexOf('data-callback')===0 ) )
				params[this.name] = this.value;
		});

		if($.isEmptyObject(params))
			return false;
			
		setCookie( get_cookie_name(), $.param(params), false, '/' );
		window.location.href = href;
		return false;
	});
	
	if( getCookie( get_cookie_name(),false ) )
	{
		var params = getCookie( get_cookie_name(),false );
		deleteCookie( get_cookie_name() ,'/');
		params = url_params_string_to_json(urldecode(params));
		
		if(params['data-callback']  && typeof(window[params['data-callback']]) === "function" )
			window[params['data-callback']](params);
	}
	
	function get_cookie_name()
	{
		return 'disposable_params';
	}
});


function url_params_string_to_json(params) 
{            
	var pairs = params.split('&');
	var result = {};
	$.each(pairs, function(key, pair) {
		pair = pair.split('=');
		result[pair[0]] = (pair[1] || '');
	});

	return result;
}


function urldecode(str) 
{
	return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}


function deleteCookie( name, path, domain ) 
{
	document.cookie = name + "=" +
	  ((path) ? ";path="+path:"")+
	  ((domain)?";domain="+domain:"") +
	  ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}


function setCookie (name, value, expires, path, domain, secure)
{
	var curCookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "; expires=0, 01-01-2050 00:00:00 GMT") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
	if ((name + "=" + escape(value)).length <= 4000) document.cookie = curCookie;
}


function getCookie(name, defval) 
{
	var prefix = name + "=";
	var cookieStartIndex = document.cookie.indexOf(prefix);
	if (cookieStartIndex == -1) return defval;
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}


/*
	0- поле не валидно
	1- поле валидно
	2- поле не пустое, но и не валидно
	false - произошла ошибка, по умолчанию заменит false на 0
*/
function validator_callback_handler(element)
{
	set_val = element.val();
	callback_function = element.data('validation-callback');

	if($.trim( set_val ) === '')
		input_valid = 0;
	else
	{
		if(callback_function)
			input_valid =  window[callback_function](element);
		else
			input_valid = 1;
	}
	input_valid = (input_valid === false ? 0 : input_valid);
	return input_valid;
}


function validation(form_context)
{
	var is_valid = true;
	var is_first_invalid = false;
	var groups = [];
	
	$("input,select,textarea",form_context).each(function(){
		var cur_gr = $(this).data("group");
		var is_required = $(this).data("required");
		var set_val = $(this).val();
		var callback_function = $(this).data('validation-callback');
		var input_valid = validator_callback_handler($(this));
	
		if((input_valid === 1 || input_valid > 1) && is_required && cur_gr)
			groups[cur_gr] = true;
	});
	
	$("input,select,textarea",form_context).each(function(){
		var set_val = $(this).val();
		var is_required = $(this).data("required");
		var cur_gr = $(this).data("group");
		var callback_function = $(this).data('validation-callback');
		var input_valid = validator_callback_handler($(this));
		
		if(is_required)
		{
			if(((input_valid === 0 || input_valid > 1) && !groups[cur_gr]) ||
				(groups[cur_gr] && input_valid > 1)
			)
			{
				is_valid = false;
				is_first_invalid = set_error($(this), is_first_invalid, input_valid);
			}
			else if((groups[cur_gr] && input_valid === 0) || input_valid === 1) 
				unset_error($(this));
		}
		else
		{
			if(( input_valid === 1 || input_valid > 1) && callback_function)
			{
				if(input_valid > 1)
				{
					is_valid = false;
					is_first_invalid = set_error($(this), is_first_invalid, input_valid);
				}
				else
					unset_error($(this));
			}
		}
	});
	return is_valid;
}


function unset_error(element)
{
	if(element.is('select'))
	{
		if(element.parent().hasClass("wrapped_select"))
			element.unwrap();
	}
	else
		element.removeClass("form_el_invalid");
}


function set_error(element, is_first_invalid, input_valid)
{
	if(element.is('select'))
	{
		if(element.parent().hasClass("wrapped_select")==false) 
			element.wrap('<span class="wrapped_select"></span>');
		
		if(!is_first_invalid)
		{
			showTip(element, get_error_message(input_valid));
			is_first_invalid = true;
		}
	}
	else
	{
		element.addClass("form_el_invalid ");
		if(!is_first_invalid)
		{
			showTip(element, get_error_message(input_valid));
			is_first_invalid = true;
		}
	}
	
	return is_first_invalid;
}


// Count the number of substring occurrences
function substr_count(haystack, needle, offset, length) { 

	var pos = 0, cnt = 0;

	if(isNaN(offset)) offset = 0;
	if(isNaN(length)) length = 0;
	offset--;
	 
	while((offset = haystack.indexOf(needle, offset+1)) != -1){
		if(length > 0 && (offset+needle.length) > length){
			return false;
		} else{
			cnt++;
		}
	}
	 
	return cnt;
}


function showTip(context,supCont)
{
	var tipFrame = '<div class="lightTip"><div class="content"></div><div class="bottom">&nbsp;</div></div>';
	var animSpeed = 300;
	var tinyTip;
	$('body').append(tipFrame);
	var divTip = 'div.lightTip';
	tinyTip = $(divTip);
	tinyTip.hide();
	if (supCont === 'title') {
		var tipCont = $(context).attr('title');
	} else if (supCont !== 'title') {
		var tipCont = supCont;
	}
	$(divTip + ' .content').html(tipCont);
	var yOffset = tinyTip.height() + 2;
	var xOffset = (tinyTip.width() / 2) - ($(context).width() / 2);
	var pos = $(context).offset();
	var nPos = pos;
	nPos.top = pos.top - yOffset;
	nPos.left = pos.left - xOffset;
	tinyTip.css('position', 'absolute').css('z-index', '1000');
	tinyTip.css(nPos).fadeIn(animSpeed);
}


function hideTip()
{
	var animSpeed = 300;
	var divTip = 'div.lightTip';
	tinyTip = $(divTip);
	tinyTip.fadeOut(animSpeed, function() {
		$(this).remove();
	});
}
$("body").live("click",function(event)
{
	if ($(event.target).closest(".lightTip").length) return;
	else hideTip();
});


function getGoodInfo()
{
	fields='';
	ssylka = location.href.split('#');
	good_id = 0;
	good_id = ssylka[1];
	if (good_id>0)
	{
		$('.set-data').each(function(){
			if($(this).data("set_data"))
			{
				fields = fields+$(this).data("set_data")+",";
			}
		});
		
		$.post('/ajaxloader', 
			{
				class_name: 'CatalogBasic',
				method: 'get_ajax_good_info',
				good_id: good_id,
				fields: fields
			},  
			function (data)
			{
				$('.set-data').each(function(){
					if($(this).data("set_data"))
					{
						if ($(this).is('input'))
							$(this).val(data[$(this).data("set_data")]);
						else
							$(this).html(data[$(this).data("set_data")]);
					}
				});
			},"json"
		);
	}
}
