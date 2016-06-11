personData = [];

function getpersonData(xml){
	var dealers = [];
	var personList = {};
	var i = 0;
	$(xml).find("dealer").each(function(){
		zombie = ({
			id: $(this).find("id").text(),
			name: $(this).find("name").text(),
			region: $(this).find("region").text(),
			from: $(this).find("city").text(),
			address: $(this).find("address").text(),
			contacts: $(this).find("contacts").text(),
			site: $(this).find("site").text(),
			lat: $(this).find("lat").text(),
			lng: $(this).find("lng").text(),
			warehouse: $(this).find("warehouse").text(),
			laying: $(this).find("laying").text(),
			design: $(this).find("design").text()
		});
		personData.push(zombie);
	});
}

function loadRegions(personList) {
	var people = personList;
	var regions = [];
	for( i=0; i < people.length; i++ ) {
		var person = people[i];
		if (person.id !== '' && person.region !== 'Москва' && person.region !== 'Санкт-Петербург') {
			if (regions.indexOf(person.region) === -1 && person.region !== '') {
				regions.push(person.region);
			}
		}
	}
	regions.sort(function(a, b) {
		var nameA = a.toLowerCase(), nameB = b.toLowerCase()
		if (nameA < nameB) 
			return -1 
		if (nameA > nameB)
			return 1
		return 0 
	})
	$('.region-select').append('<option value="Москва">Москва</option>');
	$('.region-select').append('<option value="Санкт-Петербург">Санкт-Петербург</option>');
	for( i=0; i < regions.length; i++ ) {
		$('.region-select').append('<option value="' + regions[i] + '">' + regions[i] + '</option>');
	}
}

function loadDilers(personList) {
	var people = personList;
	$('.dilers-list').html('');

	people.sort(function(a, b) {
		var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
		if (nameA < nameB) 
			return -1 
		if (nameA > nameB)
			return 1
		return 0 
	})

	for( i=0; i < people.length; i++ ) {
		var person = people[i];
		var content = ['<div class="diler" data-id="', person.id,'"><div class="diler-name">', person.name, '</div><p><b>Адрес:</b> ', person.address, '</p><p><b>Контакты:</b> ', person.contacts, '</p>'].join('');
		if (person.site !== '') {
			var content_site = ['<p><b>Сайт:</b> ', person.site, '</p>'].join('');
			content = content + content_site;
		}
		content = content + '<ul class="diler-services"><li class="diler-services-item"><i title="Склад" class="warehouse"></i></li><li class="diler-services-item"><i title="Дизайн-проект" class="design"></i></li><li class="diler-services-item"><i title="Укладка" class="laying"></li></ul></div>';

		$('.dilers-list').append(content);

		if (person.warehouse === "да") {
			$(".diler[data-id='" +person.id+ "'] .warehouse").addClass('warehouse-active');
		}
		if (person.design === "да") {
			$(".diler[data-id='" +person.id+ "'] .design").addClass('design-active');
		}
		if (person.laying === "да") {
			$(".diler[data-id='" +person.id+ "'] .laying").addClass('laying-active');
		}
	}
}


var myMap = function() {

	var	options = {
		zoom: 3,
		center: new google.maps.LatLng(50.810821,27.993711),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	/*
		Load the map then markers
		@param object settings (configuration options for map)
		@return undefined
	*/
	function init(settings) {
		map = new google.maps.Map(document.getElementById( settings.idSelector ), options);
		markerLocation = settings.markerLocation;
		loadMarkers();
	}
	/*
		=======
		MARKERS
		=======
	*/
	markers = {};
	markerList = [];

	/*
		Load markers onto the Google Map from a provided array or demo personData (data.js)
		@param array personList [optional] (list of people to load)
		@return undefined
	*/
	function loadMarkers(personList) {
				// optional argument of person

				var people = ( typeof personList !== 'undefined' ) ? personList : personData;

				var j = 1; // for lorempixel

				for( i=0; i < people.length; i++ ) {
					var person = people[i];

					// if its already on the map, dont put it there again
					if( (markerList.indexOf(person.id) !== -1) || (person.id === '')) continue;

					var lat = person.lat,
						lng = person.lng,
						markerId = person.id;

					var infoWindow = new google.maps.InfoWindow({
						maxWidth: 400
					});

					var marker = new google.maps.Marker({
						position: new google.maps.LatLng( lat, lng ),
						title: person.name,
						markerId: markerId,
						icon: markerLocation,
						map: map
					});

					markers[markerId] = marker;
					markerList.push(person.id);

					var content = ['<div class="iw-text"><strong>', person.name,
						'</strong><br>Адрес: ', person.address, '<br>Контакты: ', person.contacts].join('');
					if (person.site !== '') {
						var content_site = ['<br>Сайт: ', person.site].join('');
						content = content + content_site;
					}
					content = content + ['<br>Склад: ', person.warehouse, '<br>Дизайн-проект: ', person.design, '<br>Укладка: ', person.laying,'</div>'].join('');

					google.maps.event.addListener(marker, 'click', (function (marker, content) {
						return function() {
							infoWindow.setContent(content);
							infoWindow.open(map, marker);
						}
					})(marker, content));
				}
	}

	/*
		Remove marker from map and our list of current markers
		@param int id (id of the marker element)
		@return undefined
	*/
	function removePersonMarker(id) {
		if( markers[id] ) {
			markers[id].setMap(null);
			loc = markerList.indexOf(id);
			if (loc > -1) markerList.splice(loc, 1);
			delete markers[id];
		}
	}

	/*
		======
		FILTER
		======
	*/

	// default all filters off
	var filter = {
		followers: 0,
		warehouse: 0,
		design: 0,
		laying: 0,
		from: 0,
		region: 0
	}
	var filterMap;

	/*
		Helper function
		@param array a (array of arrays)
		@return array (common elements from all arrays)
	*/
	function reduceArray(a) {
		r = a.shift().reduce(function(res, v) {
			if (res.indexOf(v) === -1 && a.every(function(a) {
				return a.indexOf(v) !== -1;
			})) res.push(v);
			return res;
		}, []);
		return r;
	}

	/*
		Helper function
		@param string n
		@return bool
	*/
	function isInt(n) {
	    return n % 1 === 0;
	}


	/*
		Decides which filter function to call and stacks all filters together
		@param string filterType (the property that will be filtered upon)
		@param string value (selected filter value)
		@return undefined
	*/
	function filterCtrl(filterType, value) {
		// result array
		var results = [];

		if( isInt(value) ) {
			filter[filterType] = parseInt(value);
		} else {
			filter[filterType] = value;
		}
		
		for( k in filter ) {
			if( !filter.hasOwnProperty(k) && !( filter[k] !== 0 ) ) {
				// all the filters are off
				loadMarkers();
				return false;
			} else if ( filter[k] !== 0 ) {
				// call filterMap function and append to r array
				results.push( filterMap[k]( filter[k] ) );
			} else {
				// fail silently
			}
		}

		if( filter[filterType] === 0 ) results.push( personData );
		
		/*
			if there is 1 array (1 filter applied) set it,
			else find markers that are common to every results array (pass every filter)
		*/
		if( results.length === 1 ) {
			results = results[0];
		} else {
			results = reduceArray( results );
		}
		
		loadMarkers( results );

		if(filter['region'] !== '' && ($(".region-select option:selected").text() !== 'Все')) {
			if (results.length > 0) {
				$('.dilers-list-wrap').show();
				loadDilers(results);
			}
			else {
				$('.dilers-list-wrap').hide();
			}
		}
		else if ($(".region-select option:selected").text() === 'Все') {
			$('.dilers-list-wrap').hide();
		}

	}
	
	/* 
		The keys in this need to be mapped 1-to-1 with the keys in the filter variable.
	*/
	filterMap = {
		followers: function( value ) {
			return filterIntsLessThan('followers', value);
		},
		
		warehouse: function( value ) {
			return filterByString('warehouse', value);
		},
		
		design: function( value ) {
			return filterByString('design', value);
		},
		
		laying: function( value ) {
			return filterByString('laying', value);
		},

		from: function( value ) {
			return filterByString('from', value);
		},

		region: function( value ) {
			return filterByString('region', value);
		}
	}

	/*
		Filters marker data based upon a string match
		@param string dataProperty (the key that will be filtered upon)
		@param string value (selected filter value)
		@return array (people that made it through the filter)
	*/
	function filterByString( dataProperty, value ) {
		var people = [];

		for( var i=0; i < personData.length; i++ ) {
			var person = personData[i];
			if( (person[dataProperty] == value) && (person.id !== '') ) {
				people.push( person );
			} else {
				removePersonMarker( person.id );
			}
		}
		return people;
	}

	/*
		Filters out integers that are under the provided value
		@param string dataProperty (the key that will be filtered upon)
		@param int value (selected filter value)
		@return array (people that made it through the filter)
	*/
	function filterIntsLessThan( dataProperty, value ) {
			var people = [];

			for( var i=0; i < personData.length; i++ ) {
				var person = personData[i];
				if( person[dataProperty] > value ) {
					people.push( person )
				} else {
					removePersonMarker( person.id );
				}
			}
			return people;
	}

	// Takes all the filters off
	function resetFilter() {
		filter = {
			followers: 0,
			warehouse: 0,
			design: 0,
			laying: 0,
			from: 0,
			region: 0
		}
		$('input[type=checkbox]').attr('checked',false);
		$('.dilers-list-wrap').hide();
	}

	return {
		init: init,
		loadMarkers: loadMarkers,
		filterCtrl: filterCtrl,
		resetFilter: resetFilter
	};
}();

$(function() {
	$.ajax({
		url: "js/dealers.xml",
		async: false,
		cache: false,
		dataType: "xml",
		success: function(xml){
			getpersonData(xml);
		}
	});

	loadRegions(personData);

	var mapConfig = {
		idSelector: 'map-canvas',
		markerLocation: 'images/icon-dealer-marker.png'
	}

	myMap.init( mapConfig );

	$('.load-btn').on('click', function(){
		var $this = $(this);
		// reset everything
		$('select').val(0);
		myMap.resetFilter();
		myMap.loadMarkers();
		if( $this.hasClass('is-success') ) {
			$this.removeClass('is-success').addClass('is-default');
		}
	});

	$('.warehouse-select').on('click', function() {
		if ($(this).prop('checked')) {
			myMap.filterCtrl('warehouse', this.value);
		}
		else {
			myMap.filterCtrl('warehouse', 0);
		}
	});

	$('.design-input').on('click', function() {
		if ($(this).prop('checked')) {
			myMap.filterCtrl('design', this.value);
		}
		else {
			myMap.filterCtrl('design', 0);
		}
	});

	$('.laying-input').on('click', function() {
		if ($(this).prop('checked')) {
			myMap.filterCtrl('laying', this.value);
		}
		else {
			myMap.filterCtrl('laying', 0);
		}
	});

	$('.from-select').on('change', function() {
		myMap.filterCtrl('from', this.value);
	});

	$('.region-select').on('change', function() {
		myMap.filterCtrl('region', this.value);
	});
});