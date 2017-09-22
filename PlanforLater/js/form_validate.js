var use_data8 = true;

if ( typeof use_data8_override !== 'undefined' ) {
	use_data8 = use_data8_override;
}

var validation = {
	'unsecured_debt': {
		'type': 'number',
		'min_value': 5000,
		'error': 'Sorry, you must have a minimum of £5,000 to qualify.'
	},
    'birthdate_day': {
        'type': 'select',
        'required': true,
        'error': 'Please enter your day of birth.'
    },
    'birthdate_month': {
        'type': 'select',
        'required': true,
        'error': 'Please enter your month of birth.'
    },
    'birthdate_year': {
        'type': 'select',
        'required': true,
        'error': 'Please enter your year of birth.'
    },
	'number_of_debts': {
		'type': 'number',
		'min_value': 2,
		'error': 'Sorry, you must have 2 or more creditors to qualify.'
	},
	'repay_per_month': {
		'type': 'number',
		'min_value': 75,
		'error': 'Sorry, you must be able to pay £75 or more per month.'
	},
	'type_of_debts[]': {
		'type': 'checkbox',
		'min_values': 1,
		'max_values': 0,
		'required': true,
		'error': 'Please select at least one type of debt to proceed.'
	},
	'Behind_On_Bills': {
		'type': 'checkbox',
		'min_values': 1,
		'max_values': 1,
		'required': true,
		'error': 'Please select an option to proceed.'
	},
	'Credit_Rating': {
		'type': 'checkbox',
		'min_values': 1,
		'max_values': 1,
		'required': true,
		'error': 'Please select an option to proceed.'
	},
	'employment_status': {
		'type': 'checkbox',
		'min_values': 1,
		'max_values': 1,
		'required': true,
		'error': 'Please select an option to proceed.'
	},
	'residency_status': {
		'type': 'checkbox',
		'min_values': 1,
		'max_values': 1,
		'required': true,
		'error': 'Please select an option to proceed.'
	},
	'country': {
		'type': 'checkbox',
		'min_values': 1,
		'max_values': 1,
		'required': true,
		'error': 'Please select an option to proceed.'
	},
	'email': {
		'type': 'email',
		'required': true,
		'error_empty': 'Please enter an email address.',
		'error_invalid': 'Please enter a valid email address.'
	},
	'contact_ok': {
		'type': 'checkbox',
		'required': true,
		'error': 'Please check the box to continue.'
	},
	'phone_ok': {
		'type': 'checkbox',
		'required': true,
		'error': 'Please check the box to continue.'
	},
	'full_name': {
		'type': 'text',
		'required': true,
		//'regex': /\w+\s+\w+/,
		'error': 'Please enter your first name.'
	},
	'surname': {
		'type': 'text',
		'required': true,
		'error': 'Please enter your surname.'
	},
	'phone': {
		'type': 'uk_phone',
		'required': true,
		'minimum_length': 7,
		'error': 'Please enter at least one valid phone number.'
	},
	'mobile': {
		'type': 'uk_phone',
		'required': true,
		'minimum_length': 7,
		'error': 'Please enter at least one valid phone number.'
	},
	'address_finder': {
		'type': 'text',
		'required': true,
		'min_length': 5,
		'max_length': 0,
		'error': 'Please enter your address.'
	},
	'terms': {
		'type': 'checkbox',
		'required': true,
		'error': 'Please check the box to continue.'
	}
};

if ( typeof validation_override !== 'undefined' ) {
	$.each(validation_override, function( index, value ) {
		console.log(index);
		validation[ index ] = value;
	});
}

$(document).ready(function() {
	
});

function validate_phone_fields(phone_inputs, checkmark, error_text) {
	var return_value = false;
	var error_message = '';
		
	var input_results = {
		'phone': 'empty',
		'mobile': 'empty'
	};
	
	var empty_count = 0;
	var invalid_count = 0;
	var parent_container = null;
	
	jQuery.each(phone_inputs, function(index, phone_input) {
		parent_container = $(phone_input).closest('.form-section');
		if ( parent_container == null || parent_container.length == 0 ) {
			parent_container = $(phone_input).closest('.step');
		}
		
		error_message = validation[ $(phone_input).attr('name') ]['error'];
		if ( $(phone_input).val() == '' ) {
			input_results[ $(phone_input).attr('name') ] = 'empty';
			empty_count += 1;
		}
		else {
			var validation_response = validate_field($(phone_input), validation);
			
			input_results[ $(phone_input).attr('name') ] = validation_response['success'] == true ? 'valid' : 'invalid';
			if ( ! validation_response['success'] ) {
				invalid_count += 1;
			}
		}
	});
	
	if ( invalid_count + empty_count == 2 ) {
		if ( invalid_count > 0 ) {
			jQuery.each(input_results, function(phone_type, phone_result) {
				var input_item = parent_container.find('input[type="tel"][name="' + phone_type + '"]');
				update_element_valid_state($(input_item), {'success': false, 'error': error_message}, checkmark, error_text);
				/*
				if ( phone_result == 'invalid' ) {
					update_element_valid_state($(input_item), {'success': false, 'error': error_message}, checkmark, error_text);
				}
				else {
					update_element_valid_state($(input_item), {'success': true, 'error': error_message}, false, error_text);
				}
				*/
			});
		}
		else {
			jQuery.each(input_results, function(phone_type, phone_result) {
				var input_item = parent_container.find('input[type="tel"][name="' + phone_type + '"]');
				update_element_valid_state($(input_item), {'success': false, 'error': error_message}, checkmark, error_text);
			});
			return_value = true;
		}
	}
	else {
		jQuery.each(input_results, function(phone_type, phone_result) {
			var input_item = parent_container.find('input[type="tel"][name="' + phone_type + '"]');
			if ( phone_result == 'invalid' ) {
				update_element_valid_state($(input_item), {'success': false, 'error': error_message}, checkmark, false);
			}
			else if ( phone_result == 'valid' ) {
				update_element_valid_state($(input_item), {'success': true, 'error': error_message}, checkmark, false);
			}
			else {
				update_element_valid_state($(input_item), {'success': true, 'error': error_message}, false, false);
			}
		});
		return_value = true;
	}
	
	return return_value;
}

function check_data8(phone, mobile, callback) {
	var result_data = {'success': false};
	result_data['error_message'] = 'Please enter at least one valid phone number.';
	result_data['error_count'] = 0;
	result_data['valid_count'] = 0;
	result_data['phone_response'] = validate_field($(document).find('input[name="phone"][type="tel"]'), validation)['success'];
	result_data['mobile_response'] = validate_field($(document).find('input[name="mobile"][type="tel"]'), validation)['success'];
	
	if ( result_data['phone_response'] && result_data['mobile_response'] ) {
		data8(phone, function(phone_result) {
			if ( ! phone_result ) {
				result_data['error_count'] += 1;
			}
			else {
				result_data['valid_count'] += 1;
			}
			result_data['phone_response'] = phone_result;
			
			data8(mobile, function(mobile_result) {
				if ( ! mobile_result ) {
					result_data['error_count'] += 1;
				}
				else {
					result_data['valid_count'] += 1;
				}
				result_data['mobile_response'] = mobile_result;
				
				if ( result_data['valid_count'] > 0 ) {
					result_data['success'] = true;
				}
				
				callback(result_data);
			});
		});
	}
	else if ( result_data['phone_response'] ) {
		result_data['error_count'] = 1;
		data8(phone, function(phone_result) {
			if ( ! phone_result ) {
				result_data['error_count'] = 2;
			}
			else {
				result_data['valid_count'] += 1;
			}
			result_data['phone_response'] = phone_result;
			
			if ( result_data['valid_count'] > 0 ) {
				result_data['success'] = true;
			}
			
			callback(result_data);
		});
	}
	else if ( result_data['mobile_response'] ) {
		result_data['error_count'] = 1;
		data8(mobile, function(mobile_result) {
			if ( ! mobile_result ) {
				result_data['error_count'] = 2;
			}
			else {
				result_data['valid_count'] += 1;
			}
			result_data['mobile_response'] = mobile_result;
			
			if ( result_data['valid_count'] > 0 ) {
				result_data['success'] = true;
			}
			
			callback(result_data);
		});
	}
	else {
		result_data['error_count'] = 2;
		result_data['phone_response'] = false;
		result_data['mobile_response'] = false;
		
		callback(result_data);
	}
}

function data8(phone_number, callback) {
	var data = {'phone_number': phone_number};
			
	$.ajax({
		'url': '/ajax_data-8.php',
		'type': 'POST',
		'dataType': 'json',
		'data': data,
		'error': function(return_data) {
			callback(true);
		},
		'success': function(return_data) {
			callback(return_data.success);
		},
		timeout: 5000
	});
}

function validate_field(input_object, validation) {
	var rules = validation[ $(input_object).attr('name') ];
	var result = {
		'success': false
	}
	
	if ( rules['type'] == 'email' ) {
		result['error'] = rules['error_empty'];
	}
	else {
		result['error'] = rules['error'];
	}
	
	if ( rules['type'] == 'select' ) {
		if ( $(input_object).val() == '' ) {
			return result;
		}
		else {
			result['success'] = true;
			return result;
		}
	}
	
	if ( rules['type'] == 'checkbox' ) {
		var checkboxes = $(document).find('input[name="' + $(input_object).attr('name') + '"]');
		if ( checkboxes.length == 1 ) {
			result['success'] = $(input_object).prop('checked');
			return result;
		}
		else {
			var checked_count = 0;
			
			$.each(checkboxes, function(index, check_input) {
				if ( $(check_input).prop('checked') ) {
					checked_count += 1;
				}
			});
			
			if ( 'min_values' in rules ) {
				if ( checked_count < rules['min_values'] ) {
					return result;
				}
			}
			
			if ( 'max_values' in rules && rules['max_values'] != 0 ) {
				if ( checked_count > rules['max_values'] ) {
					return result;
				}
			}
			
			result['success'] = true;
			return result;
		}
	}
	
	if ( rules['type'] == 'email' ) {
		if ( $(input_object).val() == '' ) {
			result['error'] = rules['error_empty'];
			return result;
		}
		
		var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
			
		if ( regex.test($(input_object).val()) ) {
			result['success'] = true;
			return result;
		}
		else {
			result['error'] = rules['error_invalid'];
			return result;
		}
	}
	
	if ( rules['type'] == 'text' ) {
		if ( $(input_object).val() == '' ) {
			return result;
		}

		if ( 'min_length' in rules ) {
			if ( $(input_object).val().trim().length < rules['min_length'] ) {
				return result;
			}
		}
		
		if ( 'max_length' in rules && rules['max_length'] != 0 ) {
			if ( $(input_object).val().trim().length > rules['max_length'] ) {
				return result;
			}
		}
		
		if ( 'regex' in rules ) {
			if ( rules['regex'].test($(input_object).val()) ) {
				result['success'] = true;
				return result;
			}
			else {
				return result;
			}
		}
		
		result['success'] = true;
		return result;
	}
	
	if ( rules['type'] == 'number' ) {
		var number_value = parseInt($(input_object).val().replace(/[^0-9]/g, ''));
		
		if ( 'min_value' in rules ) {
			if ( number_value < rules['min_value'] ) {
				return result;
			}
		}
		
		if ( 'max_value' in rules ) {
			if ( number_value > rules['max_value'] ) {
				return result;
			}
		}
		
		result['success'] = true;
		return result;
	}
	
	if ( rules['type'] == 'uk_phone' ) {
		var check_regex = /[\(\)\d\s\-\.]/g;
		var strip_regex = /[^\d]/g;
		var leading_zero_regex = /^0?/;
		var valid_lengths = [7,9,10];
		
		if ( $(input_object).val() == '' ) {
			return result;
		}
		
		if ( valid_lengths.indexOf( $(input_object).val().replace(strip_regex, '').replace(leading_zero_regex, '').length ) == -1 ) {
			return result;
		}
		
		if ( check_regex.test( $(input_object).val() ) == false ) {
			return result;
		}
		
		result['success'] = true;
		return result;
	}
	
	if ( rules['type'] == 'canada_phone' ) {
		var check_regex = /[\(\)\d\s\-\.]/g;
		var strip_regex = /[^\d]/g;
		var valid_lengths = [10];
		
		if ( $(input_object).val() == '' ) {
			return result;
		}
		
		if ( ! $(input_object).val().replace(strip_regex, '').length in valid_lengths ) {
			return result;
		}
		
		if ( check_regex.test( $(input_object).val() ) == false ) {
			return result;
		}
		
		result['success'] = true;
		return result;
	}
}
