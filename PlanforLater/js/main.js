
$.fn.isOnScreen = function(){

	var win = $(window);

	var viewport = {
		top : win.scrollTop(),
	};
	viewport.bottom = viewport.top + win.height();

	var bounds = this.offset();
	bounds.bottom = bounds.top + this.outerHeight();

	return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
		alert('Sorry, your application time has expired. Click "Ok" to add 5 more minutes and complete your application.');
        	timer = 60 * 5;
        }
    }, 1000);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

$(window).resize(function() {
	$("#body").css({ minHeight: $(window).height() - $("#footer").outerHeight() - $("#header").outerHeight() });
});

function validate_current_section(show_errors, show_checks) {
	var error_count = 0;
	var error = true;
	var current_section = $('[class*="step"][class*="active"]');
	var current_inputs = current_section.find('input,select,textarea').not('[type=hidden]');
	var processed_inputs = {};
	$.each(current_inputs, function(index,row) {
console.log('field name: ' + row.name);
		if ( (typeof processed_inputs[ row.name ] === 'undefined') && ( (typeof validation[ row.name ] !== 'undefined') ) ) {
			if ( row.type == 'radio' || row.type == 'checkbox' ) {
				var input_item = $('input[name="' + row.name + '"]:checked');
				
				if ( input_item.length == 0 ) {
					var input_item = $('input[name="' + row.name + '"]')[0];
				}
			}
			else {
				var input_item = row;
			}
			var validate_result = validate_field(input_item, validation);
			
			if ( ! validate_result['success'] ) {
				error_count += 1;
			}
			
			processed_inputs[ row.name ] = validate_result;
		}
	});

console.log(processed_inputs);
		
	if ( error_count == 0 || 
		( typeof processed_inputs['phone'] !== 'undefined' &&
		( processed_inputs['phone']['success'] || processed_inputs['mobile']['success']  )
		&& ( error_count < 2 && ( processed_inputs['phone']['success'] == false || processed_inputs['mobile']['success'] == false) ) ) ) {
		error = false;
	}
	
	if ( error && show_errors ) {
		if ( current_section.find('.check-list').length > 0 ) {
			var error_message = '';
			$.each(processed_inputs, function(index,row) {
				error_message = row['error'];
			});
			
			current_section.find('.check-list').addClass('error');
			current_section.find('.field-error-message').html(error_message).show();
		}
		else {
			$.each(processed_inputs, function(index,row) {
				if ( ! row['success'] ) {
					if ( index == 'phone' && processed_inputs['mobile']['success'] ) {
						return;
					}
					else if ( index == 'mobile' && processed_inputs['phone']['success'] ) {
						return;
					}
					$(document).find('[name="' + index + '"]:not([type="hidden"])').closest('.form-control').addClass('error');
					$(document).find('.error-' + index).html(row['error']).show();
				}
				else {
					$(document).find('[name="' + index + '"]:not([type="hidden"])').closest('.form-control').removeClass('error');
					$(document).find('.error-' + index).html('').hide();
				}
			});
		}
	}
	else {
		if ( current_section.find('.check-list').length > 0 ) {
			current_section.find('.check-list').removeClass('error');
		}
		else {
			$.each(processed_inputs, function(index,row) {
				$(document).find('[name="' + index + '"]:not([type="hidden"])').closest('.form-control').removeClass('error');
				$(document).find('.error-' + index).html('').hide();
			});
		}
	}
	
	return error;
}

function update_element_valid_state(input_element, validation_response, checkmark, error_text) {
	var $validation_display = input_element.closest('.validation-display');
	if ( typeof $validation_display === 'undefined' || $validation_display.length == 0 ) {
		var $validation_display = input_element.closest('.check-list');
	}
	if ( typeof $validation_display === 'undefined' || $validation_display.length == 0 ) {
		var $validation_display = input_element.closest('.form-control');
	}
	
	var $error_message = $validation_display.find('.field-error-message');
	if ( typeof $error_message === 'undefined' || $error_message.length == 0 ) {
		var $error_message = $validation_display.closest('.step').find('.field-error-message.error-' + input_element.attr('name'));
		if ( typeof $error_message === 'undefined' || $error_message.length == 0 ) {
			var $error_message = $validation_display.parent().find('.field-error-message');
		}
	}
	
	var check_display = checkmark;
	var error_display = error_text;
	/*
	var check_display = true;
	if ( typeof validation_response['leave_blank'] !== 'undefined' ) {
		if ( validation_response['leave_blank'] ) {
			check_display = false;
		}
	}*/
	
	if ( ! validation_response['success'] ) {
		$validation_display.removeClass('success');
		$validation_display.find('.success-icon').hide();
		if ( error_text ) {
			$validation_display.addClass('error');
			$error_message.text( validation_response['error'] );
			$error_message.show();
		}
		else {
			$validation_display.removeClass('error');
			$error_message.text('');
			$error_message.hide();
		}
	}
	else {
		$validation_display.removeClass('error');
		$validation_display.addClass('success');
		if ( check_display ) {
			$validation_display.find('.success-icon').fadeIn();
		}
		else {
			$validation_display.find('.success-icon').hide();
		}
		$error_message.text('');
		$error_message.hide();
	}
}

function process_comments(callback) {
	var comment_text = "";
	
	if ( $('input[name="address"]').val() != '' ) {
		comment_text += "Address: " + $('input[name="address"]').val();
	}
	
	var comment_map = [
		{'input': 'number_of_debts', 'output': 'Number Of Debts'},
		{'input': 'type_of_debts[]', 'output': 'Type Of Debts'},
		{'input': 'Behind_On_Bills', 'output': 'Behind On Bills'},
		{'input': 'repay_per_month', 'output': 'Repay Per Month'},
		{'input': 'Credit_Rating', 'output': 'Credit Rating'},
		{'input': 'employment_status', 'output': 'Employment Status'},
		{'input': 'residency_status', 'output': 'Residency Status'},
		{'input': 'description', 'output': 'Describe Your Debt Problem'}
	];
	
	$.each(comment_map, function(index, row) {
		if ( comment_text.length > 0 ) {
			comment_text += " | ";
		}
		
		comment_text += row['output'] + ": "
		
		if ( row['input'].indexOf('[]') != -1 ) {
			var selected_values = [];
			$.each( $(document).find('input[name="' + row['input'] + '"]:checked'), function( input_index, input_row) {
				selected_values.push($(input_row).val());
			});
			var input_value = selected_values.join(", ");
		}
		else if ( row['input'].indexOf('description') != -1 ) {
			var input_value = $('textarea[name="' + row['input'] + '"]').val();
		}
		else {
			if ( $('input[name="' + row['input'] + '"]').length > 1 ) {
				var input_value = $('input[name="' + row['input'] + '"]:checked').val().toString();
			}
			else {
				var input_value = $('input[name="' + row['input'] + '"]').val().toString();
			}
		}
		
		comment_text += input_value;
	});
	
	$('input[name="comments"]').val(comment_text);
	
	callback(true);
}

function process_additional_validation(callback) {
	var $repay_per_month_field = $('input[name="repay_per_month"]');
	var $number_of_debts_field = $('input[name="number_of_debts"]');
	
	if ( parseInt($repay_per_month_field.val().replace(/[^0-9]/g, '')) < 75 ) {
		$repay_per_month_field.val('£75');
	}
	
	if ( parseInt($number_of_debts_field.val().replace(/[^0-9]/g, '')) < 2 ) {
		$number_of_debts_field.val(String(2));
	}
	
	callback(true);
}

$(document).on('click', '.not-more-than-5k', function(e) {
	e.preventDefault();
	alert('Sorry, you must have a minimum of £5,000 in debt to apply.');
});

$(document).on('change', 'input[type=radio]', function() {
	if ( typeof validation[ this.name ] !== 'undefined' ) {
		var validate_result = validate_field($(this), validation);
		if ( $(this).closest('.check-list').hasClass('error') ) {
			if ( validate_result['success'] ) {
				$(this).closest('.check-list').removeClass('error');
				$(this).closest('.check-list').parent().find('.field-error-message').html('').hide();
			}
		}
	}
});

$(document).on('blur', 'input[type="text"], input[type="email"], textarea', function(e) {
	if ( typeof validation[ $(this).attr('name') ] !== 'undefined' ) {
		console.log('validating on ' + $(this).attr('name'));
		var validation_response = validate_field($(this), validation);
		if ( $(this).closest('.validation-display').hasClass('error') ) {
			update_element_valid_state($(this), validation_response, true, true);
		}
		else {
			update_element_valid_state($(this), validation_response, true, false);
		}
	}
});
	
$(document).on('blur', 'input[type="tel"]', function() {
	console.log('validating on ' + $(this).attr('name'));
	
	var parent_container = $(this).closest('.step');
	var phone_inputs = parent_container.find('input[type="tel"]');
	if ( $(this).closest('.validation-display').hasClass('error') ) {
		var phone_valid = validate_phone_fields(phone_inputs, true, true);
	}
	else {
		var phone_valid = validate_phone_fields(phone_inputs, true, false);
	}
});

$(document).on('change', 'select', function() {
	console.log('validating on ' + $(this).attr('name'));
	var validation_response = validate_field($(this), validation);
	update_element_valid_state($(this), validation_response, true, false);
});

$(document).on('change', 'input[type="checkbox"]', function() {
	console.log('validating on ' + $(this).attr('name'));
	var validation_response = validate_field($(this), validation);
	update_element_valid_state($(this), validation_response, true, false);
});

$(document).keyup(function(e) {
	e.preventDefault();
	e.stopPropagation();
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13 || code == 10) {
		var section_buttons = $(document).find('a[class*="continue_button"], #form_submit_button');
		var click_counter = 0;
		jQuery.each(section_buttons, function(index, section_button) {
			if ( $(section_button).is(':visible') ) {
				if ( click_counter == 0 ) {
					$(section_button).click();
				}
				click_counter += 1;
			}
		});
	}
});

$(document).ready(function() {
    var time = (60 * 10) -1,
        display = $('#time, #time-2, #time-3');

	$("input[type=checkbox], input[type=radio]").crfi();
	$("select1").crfs();

	$("#body").css({ minHeight: $(window).height() - $("#footer").outerHeight() - $("#header").outerHeight() });

	var step = 1;
	var unsecured_debt = 0;
	var current_repay = 0;
	var repay_per_month = 0;

	$('#form_submit_button').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var error = validate_current_section(true, true);
		
		if ( !error ) {
			var phone_input = $('input[type="tel"][name="phone"]').val();
			var mobile_input = $('input[type="tel"][name="mobile"]').val();
			check_data8(phone_input, mobile_input, function(data8_result) {
				if ( data8_result['success'] ) {
					process_comments(function(comments_result) {
						$('#main_form').submit();
					});
				}
				else {
					var error_message = data8_result['error_message'];
					if ( data8_result['error_count'] == 2 ) {
						var phone_inputs = $('input[type="tel"]');
						
						jQuery.each(phone_inputs, function(index, phone_input) {
							update_element_valid_state($(phone_input), {'success': false, 'error': error_message}, true, true);
						});
					}
					else {
						if ( ! data8_result['phone_response'] ) {
							update_element_valid_state($(phone_input), {'success': false, 'error': error_message}, true, true);
						}
						else if ( ! data8_result['mobile_response'] ) {
							update_element_valid_state($(mobile_input), {'success': false, 'error': error_message}, true, true);
						}
					}
				}
			});
		}
		
		return false;
	});

	$(".form-body .btn.btn-green").click(function() {
		if ( $(this).attr('id') == 'form_submit_button' ) {
			return false;
		}


		
		var error = validate_current_section(true, true);
		
		if ( !error ) {
			$(".pager li").eq(step-1).addClass(" filled");
			$(".pager li").eq(step).addClass("active");
			step++;
	console.log('Step: ' + step);
			var $form = $(".steps .step.active");
			var $form_container = $form.closest('.container');
			var $form_button_container = $('.container .btn-c').closest('.container');

			var step_track = $form.next().data('step');
			if ( $form.closest('form').hasClass('mobile_site') ) {
				step_track += " - Mobile";
			}
			$.ajax({
				'url': '/ajax_form.php',
				'type': 'POST',
				'data': {
					'action': 'click',
					'script_name': (window.location.pathname == '/' ? '/index.php' : window.location.pathname),
					'click_tracking_append': step_track
				}
			});

			if ( $form.find('input[type=email]').length ) {

				$.ajax({
					'url': '/ajax_form.php',
					'type': 'POST',
					'data': $form.closest('form').serialize() + '&action=store_prelead'
				});

			}

			$form.next().css('right', -1000).css('visibility','');
			$('.container .btn-c, .container .safe').css('right', -1000).css('visibility','');
			$form.removeClass("active");
			$form.next().addClass('active').animate({ right : 0 }, 250, function() { $form_container.css('overflow', 'visible'); } );
			$('.container .btn-c, .container .safe').animate({ right : 0 }, 250, function() { $form_button_container.css('overflow', 'visible'); } );
			
			if (step == 2) {
				unsecured_debt = parseInt($('input[name="unsecured_debt"]').val().replace(/[^0-9]/g, ''));
				current_repay = Math.floor(unsecured_debt * 0.025);
				$("#cc_start").attr("value", current_repay).attr("data-max", current_repay);
				$("#cc_finish").attr("data-max", current_repay);
				$("#cc").attr("data-max", current_repay).html(current_repay.toString());
			}
			
			if (step == 8) {
				process_additional_validation(function(callback_response) {
					repay_per_month = parseInt($('input[name="repay_per_month"]').val().replace(/[^0-9]/g, ''));
					var repay_over = false;
					if ( (repay_per_month * 60) > (unsecured_debt * 0.75) ) {
						repay_per_month = Math.floor( (unsecured_debt * 0.75) / 60 );
						repay_over = true;
					}
					var repay_difference = current_repay - repay_per_month;
					var offset_angle = Math.floor((repay_per_month / current_repay) * 360) + 3;
					$("#cc_finish").attr("value", (current_repay / 360) * (360 - offset_angle - 3)).attr("data-angleOffset", offset_angle); //(((current_repay - repay_difference) * 360) - 4) / 360
					$("#cc").attr("data-final", repay_per_month)
					$(".new_monthly_payment").html(repay_per_month.toString());
					$(".your_write_off").html((unsecured_debt - (repay_per_month * 60)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
					$(".you_owe").html(unsecured_debt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
					$(".you_could_pay").html((repay_per_month * 60).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
					if ( repay_over ) {
						$(".reduction").html('25');
					}
					else {
						$(".reduction").html((100 - Math.floor(((repay_per_month * 60) / unsecured_debt) * 100)).toString());
					}
				});
			}
			
			if (step == 11) {
				$(this).parentsUntil(".bot").parent(".bot").addClass("hide");
				window.setTimeout(function() {
					if ( $("body").hasClass("mobile_long_qualify_form") ) {
						$('.form-body').addClass('final-step');
						display_final_form();
						startTimer(time, display);
						activate_knob(current_repay, repay_per_month);
					}
					else if ( $("body").hasClass("mobile_short_qualify_form") ) {
						display_final_form();
					}
					else {
						activate_modal(current_repay, repay_per_month);
						startTimer(time, display);
					}
				
				}, 5000);
			}
		}
		return false;
	});

	$(".c-box .btn-c .btn, .form-continue-footer-button").click(function() {
		display_final_form();
	});

	function display_final_form() {
		$("body").removeClass("moved");
		if ($(window).width() > 767) {
			$('.final-form-animated').css('right', -1000).css('visibility','');
			$(".step-modal").removeClass("active");
			$("body").removeClass("active-modal");
			$(".pager").addClass("hide");
			$('.final-form-animated').animate({ right : 0 }, 250);
			$(".form-body .content").addClass("last")
			$(".steps .step.active").removeClass("active").next().addClass("active");

			
		} else {
			step++;
			$(".pager").addClass("hide");
			$(".form-body .content").addClass("last")
			$("body").addClass("active-anim");
			$('html, body').stop().animate({
				scrollTop: 0
			}, 500);
			var next = $(".steps .step.active").next();
			window.setTimeout(function() {
				$("body").addClass("v2");
				$(".steps .step.active").removeClass("active");
			}, 100);
			window.setTimeout(function() {
				$(".step-modal").removeClass("active");
				$("body").removeClass("active-modal");
				$("body").removeClass("active-anim v2");
				next.addClass("active opacity0");
			}, 500);
			window.setTimeout(function() {
				$(".steps .step.active").addClass("fadeIn");
				window.setTimeout(function() {
					$(".steps .step.active.fadeIn.opacity0").removeClass("opacity0");
				}, 1000);
			}, 700);
			$(".step-modal").addClass("opacity0")
		}
		return false;
	}


	function activate_modal(current_repay, repay_per_month) {
		if ( $('body').hasClass('moved') ) {
			$('body').removeClass('moved-modal');
		}
		else {
			$('body').addClass('moved-modal');
		}

		$("body").addClass("active-modal");
		$(".step-modal").addClass("active");
		window.setTimeout(function() {
			$(".active").addClass("active0");
			activate_knob(current_repay, repay_per_month);
		}, 100);

	}

	function activate_knob(current_repay, repay_per_month) {
		$(".knob input").each(function(index) {
			var cur = $(this);
			var cur0 = $(this).parent();
			cur.knob();
			
			// Set Text Max Width 
			$('.set-max-width-text').each(function(){
				var $this = $(this);
				var maxWidth = parseInt($this.css('max-width'));
				$this.removeClass('mobile-max-width').css('max-width','');
				var width = parseInt($this.width());
				var fontSize = parseInt($this.css('font-size'));
				while(width > maxWidth && fontSize > 12){
					$this.css('font-size', --fontSize);
					width = parseInt($this.width());
				}
				$this.removeClass('set-max-width-text');
			});
			
			if ($(window).width() > 767) {
				
				window.setTimeout(function() {
					var $el = $("#cc"),
						start = current_repay; //$el.val();
						value = repay_per_month; //$el.attr("data-final");
						value0 = current_repay; //$el.attr("data-max");

					$({percentage: start}).stop(true).animate({percentage: value}, {
						duration : 2300,
						easing: "linear",
						step: function () {
							var percentageVal = Math.round(this.percentage);
							$el.text(percentageVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
						}
					}).promise().done(function () {
						$el.text(value);
					});
					$({percentage: value0}).stop(true).animate({percentage: value}, {
						duration : 2300,
						easing: "linear",
						step: function () {
							var percentageVal = Math.round(this.percentage);
							if (index == 1) {
								cur.val(percentageVal).trigger('change');
							}
						}
					}).promise().done(function () {
						if (index == 1) {
							cur.val(value).trigger('change');

						}
					});
					
				}, 4000);
				
			}
			else {
				cur.addClass("animated");
				var $el = $("#cc"),

				start = repay_per_month; //$el.val();
				value = repay_per_month; //$el.attr("data-final");
				value0 = repay_per_month; //$el.attr("data-max");

				$({percentage: start}).stop(true).animate({percentage: value}, {
					duration : 0,
					easing: "linear",
					step: function () {
						var percentageVal = Math.round(this.percentage);
						$el.text(percentageVal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
					}
				}).promise().done(function () {
					$el.text(value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
				});
				$({percentage: value0}).stop(true).animate({percentage: value}, {
					duration : 0,
					easing: "linear",
					step: function () {
						var percentageVal = Math.round(this.percentage);
						if (index == 1) {
							cur.val(percentageVal).trigger('change');
						}
					}
				}).promise().done(function () {
						if (index == 1) {
						cur.val(value).trigger('change');
						}
				});
			}

		});
	}


	$(window).scroll(function() {
		if ($(window).scrollTop() > 500) {
			$("body").addClass("moved")
		} else {
			$("body").removeClass("moved")
		};
	});

	$(window).scroll(function() {
		if ( $('body').hasClass('form-page') && step == 11 ) {
			//if ( $(window).scrollTop() > 950 ) {
			if ( $(window).scrollTop() > $(".c-box .btn-c").offset().top - $(window).height() ) {
				$("body").removeClass("moved-modal");
			}
			else {
				$("body").addClass("moved-modal");
			}
		}
	});

	$(".content .slider").each(function() {
		var cur = $(this);
		cur.slider({
			range: "min",
			value: parseInt(cur.attr("data-cur")),
			min: parseInt(cur.attr("data-min")),
			max: parseInt(cur.attr("data-max")),
			step: parseInt(cur.attr("data-step")),
			slide: function( event, ui ) {
				var post = (parseInt(ui.value) >= parseInt(cur.attr("data-max")) ? '+' : '');
				var $input_object = cur.prev();
				$input_object.val( cur.attr("data-symbol") + numberWithCommas(ui.value) + post );
				if ( $input_object.parent().hasClass('form-control') ) {
					console.log('validating on ' + $input_object.attr('name'));
					var validation_response = validate_field($input_object, validation);
					update_element_valid_state($input_object, validation_response, true, false);
				}
			}
		});
	});

	$(".graph .bar, .graph .text").each(function() {
		var cur = $(this);
		if (cur.isOnScreen()) {
			if (!cur.hasClass("animated")) {
				cur.addClass("animated");
			};
		};
		$(window).scroll(function() {
			if (cur.isOnScreen()) {
				if (!cur.hasClass("animated")) {
					cur.addClass("animated");
				};
			};
		});
	});

	//setInterval(function() { update_spots_remaining() }, 5000);
	
});

function update_spots_remaining() {

	$.ajax({
		url: '/ajax.php',
		type: 'POST',
		dataType: 'json',
		data: {
			action: 'spots_remaining'
		},
		success: function(data) {
			if ( data.success ) {
				$('.num-spots').html(data.spots_remaining);
				//data.spots_remaining = 0;
				if ( data.spots_remaining > 0 ) {
					$('.spots-remaining-container').removeClass('hide');
					$('.spots-remaining-container').closest('.head-r').removeClass('no-spots-remaining');
					$('.foot-des .container .right').removeClass('no-spots-remaining');
					$('.foot-cta .container .right').removeClass('no-spots-remaining');
					$('.mobile_short_qualify_form .final-form-next-optional').removeClass('no-spots-remaining');
					$('.mobile_short_qualify_form .spots-available-text').show();
					$('.mobile_short_qualify_form .spots-not-available-text').hide();
 				}
				else {
					$('.spots-remaining-container').addClass('hide');
					$('.spots-remaining-container').closest('.head-r').addClass('no-spots-remaining');
					$('.foot-des .container .right').addClass('no-spots-remaining');
					$('.foot-cta .container .right').addClass('no-spots-remaining');
					$('.mobile_short_qualify_form .final-form-next-optional').addClass('no-spots-remaining');
					$('.mobile_short_qualify_form .spots-available-text').hide();
					$('.mobile_short_qualify_form .spots-not-available-text').show();
				}

			}
		}
	});

}

var is_mobile = false;
$(document).on('click', '.show-terms-popup', function(e) {
        e.stopPropagation();
console.log('terms');
        if ( $(this).closest('form').hasClass('mobile_ppi') ) {
                is_mobile = true;
        }
        TogglePopup($('#TermsPopup'), true, is_mobile);
});
$(document).on('click', '.show-privacy-popup', function(e) {
        e.stopPropagation();
console.log('privacy');
        if ( $(this).closest('form').hasClass('mobile_ppi') ) {
                is_mobile = true;
        }
        TogglePopup($('#PrivacyPopup'), true, is_mobile);
});

function TogglePopup(htmlPopup, isVisible, is_mobile){
        //$('#TermsPopup').find('table').css('width', '300px');
        //$('#PrivacyPopup').find('table').css('width', '300px');
        //$('.popup-box').css('width', '94%').css('margin-left', '0px');
        $(htmlPopup).find('table').css('width', '');
        if(isVisible) {
                $('body').unbind('click', clickOutsideClose);
                $(htmlPopup).unbind('click', clickInsideStop);

                $(htmlPopup).add('.popup-overlay').toggle(isVisible);
                currentlyOpenPopup = htmlPopup;
                setTimeout(function() {
                        $('body').bind('click', clickOutsideClose);
                        $(htmlPopup).bind('click', clickInsideStop);
                }, 250);
        } else {
                $(htmlPopup).add('.popup-overlay').toggle(isVisible);
                $('body').unbind('click', clickOutsideClose);
                $(htmlPopup).unbind('click', clickInsideStop);
        }
}
// Popup for privacy links & terms
function PrivacyPopup(isVisible){
        $('.privacy-popup').toggle(isVisible);
}
var currentlyOpenPopup;
var clickOutsideClose = function() {
        // console.log('closing from outside');
        $(currentlyOpenPopup).add('.popup-overlay').toggle(false);
};
var clickInsideStop = function(e) {
        e.stopPropagation();
};



// hide button on last form
$(document).ready(function() {
    $('.continue_button').on('click', function() {
        if ($('.steps').find('.step').last().hasClass('active')) {
            $(this).closest('.bot').fadeOut();
        }
    });

});