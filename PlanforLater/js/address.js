var captureplus_api_key = 'HY94-HY76-FM99-YW99';
var postal_code_timer;
var postal_code_value = '';

$(document).ready(function() {
	postal_code_value = $('textarea[name=address_finder]').val();
});

$(document).on('keydown', 'textarea[name=address_finder]', function(event) {
	if ( event.keyCode === 9 ) {
		event.stopPropagation();
                $('.address_finder_dropdown').hide();
                $('input[name=address]').val( $('textarea[name=address_finder]').val() );
		return true;
	}
	else if ( event.keyCode === 10 || event.keyCode === 13 ) {
		event.preventDefault();
		return false;
	}
});

$(document).on('change input paste', 'textarea[name=address_finder]', function(event, fake_click) {

	if ( typeof fake_click === 'undefined' ) {
		fake_click = false;
	}

	if ( fake_click == true ) {
		return;
	}

	console.log('event.type: ' + event.type);

	var postal_code = $(this).val();
	if ( postal_code != '' && postal_code_value != postal_code ) {

		postal_code_value = postal_code;
		clearTimeout(postal_code_timer);
		var that = this;
	
		postal_code_timer = setTimeout(function() {
			console.log('Searching postal_code: ' + postal_code);
			CapturePlus_Interactive_Find_v2_10(postal_code, null);
		}, 200);
	
	}

	resizeForm();

});

$(document).on('click', '', function(event) {
	if ( $(event.target).closest('textarea[name=address_finder], .address_finder_dropdown').length == 0 ) {
		$('.address_finder_dropdown').hide();
		$('input[name=address]').val( $('textarea[name=address_finder]').val() );
	}
});

$(document).on('click', '.change_address', function() {
	var postal_code_field = $('textarea[name=address_finder]');
	CapturePlus_Interactive_Find_v2_10(postal_code_field.val(), null);
	//$('.address_display').hide();
	//$('textarea[name=address_finder]').show();
	postal_code_field.focus();
});

$(document).on('click', '.address_finder_my_address', function() {
	$('.address_finder_dropdown').hide();
	$('input[name=address]').val( $('textarea[name=address_finder]').val() );
	//$('.address_display').text( $('textarea[name=address_finder]').val() );
	//$('textarea[name=address_finder]').hide();
	//$('.address_display').show();
	//$('.change_address').show();
});

function fix_width() {

	var maxWidth = Math.max.apply( null, $('.address_finder_postal_text').map( function () {
		return $( this ).outerWidth( true );
	}).get() );

console.log('Max width: ' + maxWidth);
	$('.address_finder_postal_text').css('width', maxWidth);
}


function address_row_click(clicked_row) {

	clearTimeout(postal_code_timer);

	var row_data = clicked_row.data;

	$('.address_finder_dropdown').html(''); //<img src="/img/2.gif">

	console.log(clicked_row);

	if ( row_data['Next'] == 'Find' ) {
		$('textarea[name=address_finder]').val( row_data['Text'] );
		resizeForm();
		CapturePlus_Interactive_Find_v2_10(row_data['Text'], row_data['Id']);
		console.log('updating postal code to: ' + row_data['Text']);
	}
	else if ( row_data['Next'] == "Retrieve" ) {
		$('.address_finder_dropdown').hide();
		CapturePlus_Interactive_Retrieve_v2_10Begin(row_data['Id'])
	}
}

function update_address(address_result) {

	console.log(address_result);
	var address_values = [];
	var address_db = [];
	for ( var i = 1; i <= 5; i++ ) {
		if ( address_result[ 'Line' + i ] != '' ) {
			address_values.push(address_result[ 'Line' + i ]);
			address_db.push(address_result[ 'Line' + i ]);
		}
		else {
			break;
		}
	}
	
	if ( address_result['City'] != '' ) {
		address_values.push(address_result['City']);
	}
	if ( address_result['ProvinceName'] != '' ) {
		address_values.push(address_result['ProvinceName']);
	}
	address_values.push(address_result['PostalCode']);
	
	//$('.address_display').text( address_values.join(', ') );
	$('textarea[name=address_finder]').val( address_values.join(', ') );
	resizeForm();
	$('input[name=address]').val( address_db.join(', ') );
	$('input[name=city]').val( address_result['City'] );
	//$('input[name=country]').val( address_result['CountryName'] );
	$('.address_display').addClass('adress_display_show');
	$('input[name=postal_code]').val( address_result['PostalCode'] );
	$('textarea[name=address_finder]').trigger('change', [true]);
	if ( window.update_element_valid_state ) {
		update_element_valid_state($('textarea[name=address_finder]'), {'success': true}, true, false);
	}
	//$('.change_address').show();
	//$('.address_display').show();
	//$('textarea[name=address_finder]').hide();
	

	
	
}

var current_lines = 1;
var $addressFinder = $('textarea[name=address_finder]');
if($addressFinder[0]){
	var $desktopForm = $('.desktop-form');
	if(!$desktopForm.length) $desktopForm = $('form'); //Just take first form
	var $tyStep = $('.thank-you-next-step');
	var $resizeDiv = $('<div>')
		.hide()
		.css({
			width : $addressFinder[0].offsetWidth,
			paddingLeft : $addressFinder.css('padding-left'),
			paddingTop : $addressFinder.css('padding-top'),
			paddingRight : $addressFinder.css('padding-right'),
			paddingBottom : $addressFinder.css('padding-bottom'),
			fontSize : $addressFinder.css('font-size'),
			fontWeight : $addressFinder.css('font-weight'),
			letterSpacing : $addressFinder.css('letter-spacing'),
			wordSpacing : $addressFinder.css('word-spacing'),
			lineHeight : $addressFinder.css('line-height'),
			whiteSpace : $addressFinder.css('white-space'),
			border : '1px solid red',
			position : 'fixed',
			left : 100,
			top : 100,
			zIndex : 99999999999,
			background : 'yellow'
		})
		.appendTo(document.body);
}
function resizeForm(current_top) {
	if(!$desktopForm.hasClass('desktop-form')) {
		resizeFormNew();
		return;
	}
	setTimeout(function() {
		if ( !$addressFinder[0] ) { return; }
		
		$resizeDiv.css('width', $addressFinder[0].offsetWidth);
		$resizeDiv.text($addressFinder.val())
		
		var addressHeight = $resizeDiv.height() - 16;
		
		if(addressHeight > 30){
			// resize address
			$addressFinder.height( addressHeight );
			// move form
			$desktopForm.css('top',  2 - ( addressHeight / 2) );
			$tyStep.css('top', addressHeight / 2 - 20 );			
		} else {
			// resize address
			$addressFinder.css('height', '');
			// move form
			$desktopForm.css('top',  -4 );
			$tyStep.css('top', 0 );
		}
		
	}, 20);
}

function resizeFormNew() {
	var initial_bottom = parseInt($desktopForm[0].style.bottom, 10);
	setTimeout(function() {
		if ( !$addressFinder[0] ) { return; }
		
		$resizeDiv.css('width', $addressFinder[0].offsetWidth);
		var text = $addressFinder.val();
		$resizeDiv.text(text)
		var addressHeight = $resizeDiv.height() + 4;
		
		if(addressHeight > 30){
			// resize address
			$addressFinder.height( addressHeight );
			// move form
			//$desktopForm.css('top',  2 - ( addressHeight / 4) );
			if ( ! $desktopForm.hasClass('mobile_ppi') ) {
				$desktopForm.css('bottom',  initial_bottom - ( addressHeight / 2) );
			}
			//$tyStep.css('top', addressHeight / 2 - 20 );			
		} else {
			// resize address
			$addressFinder.css('height', '');
			// move form
			if ( ! $desktopForm.hasClass('mobile_ppi') ) {
				$desktopForm.css('bottom',  67);
			}
			//$tyStep.css('top', 0 );
		}
		
	}, 20);
}

function CapturePlus_Interactive_Find_v2_10(postal_code, LastId) {
	$.getJSON("http://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Find/v2.10/json3.ws?callback=?",
	{
		Key: captureplus_api_key,
		SearchTerm: postal_code,
		LastId: LastId,
		MaxResults: 100,
	},
	function (data) {
		// Test for an error
		if (data.Items.length == 1 && typeof(data.Items[0].Error) != "undefined") {
			// Show the error message
			//alert(data.Items[0].Description);
		}
		else {
			// Check if there were any items found
			if (data.Items.length == 0) {
				
				var address_finder_dropdown = $('.address_finder_dropdown');
				address_finder_dropdown.html('');
				$('<div class="address_finder_error">Sorry, no results found.<div class="address_finder_my_address_div"><input type="button" class="address_finder_my_address" value="Ok"></div></div>').appendTo(address_finder_dropdown);
			}
			else {
				// PUT YOUR CODE HERE
				// http://www.pcapredict.com/support/webservice/captureplus/interactive/find/2.1/

				var address_finder_dropdown = $('.address_finder_dropdown');
				address_finder_dropdown.html('');
				
				$('<div>Keep typing to display more results...</div>').addClass('address_finder_keep_typing').appendTo(address_finder_dropdown);
				$.each(data.Items, function(index, row) {
					var address_row = $('<div></div>');
					address_row.addClass('address_finder_row');
					address_row.data('address_id', row.Id);
					address_row.data('row_data', row);
					address_row.appendTo(address_finder_dropdown);
					var blue_text = row.Text;
					var grey_text = row.Description;
					if ( row.Next == 'Retrieve' ) {
						text = row.Text.split(',');
						blue_text = text.shift();
						grey_text = text.join();
						address_row.addClass('checkmark');
					}
					address_row.html('<span class="address_finder_postal_text">' + blue_text + '</span> ' + grey_text);
					address_row.bind('click', row, address_row_click);
				});
				address_finder_dropdown.show();
				
			}
		}
	});
}

function CapturePlus_Interactive_Retrieve_v2_10Begin(Id) {
	var script = document.createElement("script"),
		head = document.getElementsByTagName("head")[0],
		url = "http://services.postcodeanywhere.co.uk/CapturePlus/Interactive/Retrieve/v2.10/json3.ws?";

	// Build the query string
	url += "&Key=" + encodeURIComponent(captureplus_api_key);
	url += "&Id=" + encodeURIComponent(Id);
	url += "&callback=CapturePlus_Interactive_Retrieve_v2_10End";

	script.src = url;

	// Make the request
	script.onload = script.onreadystatechange = function () {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
			script.onload = script.onreadystatechange = null;
			if (head && script.parentNode)
				head.removeChild(script);
		}
	}

	head.insertBefore(script, head.firstChild);
}


function CapturePlus_Interactive_Retrieve_v2_10End(response) {
	// Test for an error
	if (response.Items.length == 1 && typeof(response.Items[0].Error) != "undefined") {
		// Show the error message
		//alert(response.Items[0].Description);
	}
	else {
		// Check if there were any items found
		if (response.Items.length == 0)
			$('.address_finder_dropdown').text("Sorry, there were no results");
		else {
			// PUT YOUR CODE HERE
			// http://www.pcapredict.com/support/webservice/captureplus/interactive/retrieve/2.1/
			//FYI: The output is an array of key value pairs (e.g. response.Items[0].Id), the keys being:

			update_address(response.Items[0]);
			//Id
			//DomesticId
			//Language
			//LanguageAlternatives
			//Department
			//Company
			//SubBuilding
			//BuildingNumber
			//BuildingName
			//SecondaryStreet
			//Street
			//Block
			//Neighbourhood
			//District
			//City
			//Line1
			//Line2
			//Line3
			//Line4
			//Line5
			//AdminAreaName
			//AdminAreaCode
			//Province
			//ProvinceName
			//ProvinceCode
			//PostalCode
			//CountryName
			//CountryIso2
			//CountryIso3
			//CountryIsoNumber
			//SortingNumber1
			//SortingNumber2
			//Barcode
			//POBoxNumber
			//Label
			//Type
			//DataLevel
		}
	}
}

function getTextWidthDOM(text, font) {
  var f = font || '12px arial',
      o = $('<span>' + text + '</span>')
            .css({'font': f, 'float': 'left', 'white-space': 'nowrap'})
            .css({'visibility': 'hidden'})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}
