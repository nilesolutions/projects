$(document).ready(function() {
	initAnchor();
	initMenu();
	initCustomForms();
	initPromo();
	initBgImage();
	initFixed();
	intiUp();
	initSelect();
	initInput();
	initReviews();
	initBasket();
	initValidation();
	initCountdown();
	initTriggerHidden();
	initTabs();
	initSearch();
	initAutocomplete();

	$('.message .material-icons').click(function(event) {
		$('.message').slideUp(500, function() {
			$(this).removeClass('show');
			initPromo();
		});
	});

	$(window).resize(function(event) {
		if ($('#wrapper').width() > 1000) initPromo();
		initReviewsWidth();
		setTimeout(function(){
			$.fancybox.update();
		}, 100);
	});

	$('a.fancybox, a[rel*="fancybox"]').fancybox({
		maxWidth: 760,
		openMethod: 'fadescaleIn',
		closeMethod: 'fadescaleOut',
		closeBtn: '.btn-close',
		scrolling: 'visible',
		helpers: {
			overlay: {
				closeClick : false,
				locked: false
			}
		},
		beforeShow: function(current, previous) {
			initCustomScroll();
		},
		afterShow: function(current, previous) {
			initValidation();
		}
	});
	$(document).on('click touchstart', '.btn-close, .fancybox-overlay', function(event) {
		$.fancybox.close();
		event.preventDefault();
	});

	$('.slick-gallery').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		fade: true,
		asNavFor: '.slider-nav'
	});

	$('.slider-nav').slick({
		infinite: false,
		slidesToShow: 10,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		adaptiveHeight: true,
		touchMove:false,
		dots: false,
		arrows: false,
		asNavFor: '.slick-gallery',
		focusOnSelect: true
	});

	// init Sly scroll
	$(window).load(function() {
		initFixedScrollBlock();
		initCustomScroll();
	});
	
	// Masked Input Plugin
	$(".tel").mask("(999) 999-9999");
	$(".tel-2").mask("+389999999999");
	
	if($('textarea').size()) autosize($('textarea'));
});

function initAnchor() {
	$('.anchor').click(function(event) {
		event.preventDefault();
		var _id = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(_id).offset().top
		});
	});
}

function initSearch() {
	$('#header .search-form button').click(function(event) {
		if(!$(this).closest('.search-form').hasClass('show')) {
			event.preventDefault();
			$(this).closest('.search-form').addClass('show');
		}
	});
	$(document).on('click', function(event) {
		if ($(event.target).closest('.search-form').length) return;
		$('#header .search-form').removeClass('show');
		event.stopPropagation();
	});
}

// content tabs init
function initTabs() {
	jQuery('ul.tabset').tabset({
		tabLinks: 'a',
		defaultTab: false
	});
	jQuery('ul.tabset-city').tabset({
		tabLinks: 'a',
		defaultTab: false
	});
}

function initAutocomplete() {
	jQuery('[data-autocomplete]').uiAutocomplete();
}

//iCheck custom forms
$(document).ready(function(){
  $('input').iCheck({
    checkboxClass: 'icheckbox_flat-red',
    radioClass: 'iradio_flat-red',
    increaseArea: '20%' // optional
  });
});

// Load more JS
jQuery(window).load(function() {
    size_row = $(".table-wallet tr").size();
    x=5;
    $('.table-wallet tr:lt('+x+')').show();
    $('.btn-load-more').click(function () {
        x= (x+20 <= size_row) ? x+20 : size_row;
        $('.table-wallet tr:lt('+x+')').show();
    });
});

function initTriggerHidden() {
	$('.input-holder input:checkbox').on('ifChecked', function() {
		var _this = $(this),
			_parent = _this.closest('.input-holder');
		if(_parent.next('.trigger-hidden')) _parent.next('.trigger-hidden').show();
	}).on('ifUnchecked', function() {
		var _this = $(this),
			_parent = _this.closest('.input-holder');
		if(_parent.next('.trigger-hidden')) _parent.next('.trigger-hidden').hide();
	});
	$('.request input:checkbox').change(function(event) {
		var _this = $(this);
		if(_this.is(':checked')) {
			_this.parent().next('.trigger-hidden').css('opacity', 0).slideDown(200, function(){
				$(this).fadeTo(200, 1, function() {
					$(this).find('input, textarea, select').each(function(index, el) {
						$(this).removeClass('ignore');
					});
					initValidation();
				});
			});
			if(_this.hasClass('have-company')) {
				var _check = _this.closest('form').find('.have-text'),
					_lebel = _check.data('label-company');
				_check.parent().find('.mdl-switch__label').text(_lebel);
			}
		}
		else {
			_this.parent().next('.trigger-hidden').fadeTo(200, 0, function() {
				$(this).slideUp(200, function(){
					$(this).find('input, textarea, select').each(function(index, el) {
						$(this).addClass('ignore').closest('.input').removeClass('error');
					});
					initValidation();
				});
			});
			if(_this.hasClass('have-company')) {
				var _check = _this.closest('form').find('.have-text'),
					_lebel = _check.data('label-i');
				_check.parent().find('.mdl-switch__label').text(_lebel);
			}
		}
	});
	$('.request input:checkbox').each(function(index, el) {
		var _this = $(this);
		if(!_this.is(':checked')) {
			_this.parent().next('.trigger-hidden').css({
				opacity: 0,
				display: 'none'
			}).find('input, textarea, select').each(function(index, el) {
				$(this).addClass('ignore');
			});
		}
	});
}

function initInput() {
	var defaultVal = '';
	$('.input-holder input, .input-holder textarea').focus(function(event) {
		$(this).closest('.input-holder').addClass('focus');
	}).blur(function(event) {
		$(this).closest('.input-holder').removeClass('focus');
		var actionVal = $(this).val();
		if (actionVal != defaultVal) $(this).closest('.input-holder').addClass('enter');
		else $(this).closest('.input-holder').removeClass('enter');
	}).keyup(function(event) {
		var actionVal = $(this).val();
		if (actionVal != defaultVal) $(this).closest('.input-holder').addClass('enter');
		else $(this).closest('.input-holder').removeClass('enter');
	}).change(function(event) {
		var actionVal = $(this).val();
		if (actionVal != defaultVal) $(this).closest('.input-holder').addClass('enter');
		else $(this).closest('.input-holder').removeClass('enter');
		$(this).blur();
	});
	$('.input-holder input, .input-holder textarea').each(function(index, el) {
		if($(this).val() != '') $(this).closest('.input-holder').addClass('enter');
		if($(this).is(':disabled')) $(this).closest('.input-holder').addClass('disable');
	});
}

function initSelect() {
	if ('SumoSelect' in $.fn) {
		$('.select').each(function(index, el) {
			var _placeholder = $(this).data('placeholder'),
				_empty = $(this).data('empty');
			if(!$(this).hasClass('search-select')) $(this).SumoSelect();
			else {
				$(this).SumoSelect({
					search: true,
					searchText: _placeholder,
					noMatch: _empty
				});
			}
		});
		
		$('.SumoSelect').each(function(index, el) {
			if(!$(this).find('.SelectBox span').hasClass('placeholder')) $(this).closest('.input-holder').addClass('enter');
			if($(this).hasClass('disabled')) $(this).closest('.input-holder').addClass('disable');
		});
	};
	$('.select').change(function(event) {
		$(this).closest('.input-holder').addClass('enter');
		$(this).blur();
	});
	$('.SumoSelect input').keyup(function(event) {
		initCustomScroll();
	});
}

function initCountdown() {
	$('.defaultCountdown').each(function(index, el) {
		$(this).countdown({
			until: new Date(2016, 07 - 1, 22),
			format: 'dHM'
		});
	});
}

function initValidation() {
	$('form:visible').each(function(index, el) {
		if ($(this).hasClass('ignore')) return;
		$(this).validate({
			ignore: '.ignore',
			onclick: false,
			focusInvalid: false,
			errorClass: "error",
			validClass: "success",
			success: "success",
			debug: true,
			errorElement: "span",
			rules: {
				email: {
					required: true,
					email: true
				},
				password: "required",
				confirm_password: {
					equalTo: "#password"
				}
			},
			highlight: function(element, errorClass, validClass) {
				$(element).closest('.input-holder').addClass(errorClass).removeClass(validClass);
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).closest('.input-holder').removeClass(errorClass).addClass(validClass);
			},
			submitHandler: function(form) {
				form.submit();
			}
		});
	});
}

// Sly scroll
function initCustomScroll() {
	if ('sly' in $.fn) {
		$frame = $('.scroll .holder');
		$frame2 = $('.optWrapper.scroll, .autocomplete-box .scroll');
		$frame.each(function() {
			var _this = $(this);
			var $wrap = $(this).parent();

			var _thisH = _this.height(),
				_listH = $('> *', _this).not('.scrollbar').height();

			if (_listH > _thisH) $wrap.addClass('init');
			else $wrap.removeClass('init');

			if (!$('.scrollbar', $wrap).size()) {
				_this.append('<div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>');
			}

			$(this).sly({
				horizontal: 0,
				smart: 1,
				mouseDragging: 0,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 0,
				cycleBy: 0,
				cycleInterval: 0,
				scrollBar: 0,
				scrollBar: $wrap.find('.scrollbar'),
				scrollBy: 120,
				speed: 1000,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
				prevPage: $wrap.find('.prev'),
				nextPage: $wrap.find('.next'),
				draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
				activeClass: 'active', // Class for active items and pages.
				disabledClass: 'disabled'
			}, {
				move: function(a) {
					wst = this.pos.cur;
					$(window).trigger('scroll');
				}
			});
			$frame.sly('reload');
		});
		$frame2.each(function() {
			var _this = $(this);
			var $wrap = $(this).parent();

			var _thisH = _this.height(),
				_listH = $('ul', _this).height();

			if (!$('.scrollbar', _this).size()) {
				_this.append('<div class="scrollbar"><div class="handle"><div class="mousearea"></div></div></div>');
			}

			if (_listH > _thisH) {
				_this.addClass('init');
			} else {
				_this.removeClass('init');
			}

			$(this).sly({
				smart: 1,
				mouseDragging: 0,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 0,
				cycleBy: 0,
				cycleInterval: 0,
				scrollBar: 0,
				scrollBy: 120,
				speed: 1000,
				elasticBounds: 1,
				scrollBar: _this.find('.scrollbar'),
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
				prevPage: _this.find('.prev'),
				nextPage: _this.find('.next'),
				draggedClass: 'dragged', // Class for dragged elements (like SLIDEE or scrollbar handle).
				activeClass: 'active', // Class for active items and pages.
				disabledClass: 'disabled'
			}, {
				move: function(a) {
					wst = this.pos.cur;
					$(window).trigger('scroll');
				}
			});
			$frame2.sly('reload');
		});
		$frame.mouseenter(function(event) {
			disableScroll();
		}).mouseleave(function(event) {
			enableScroll();
		});
		$frame2.mouseenter(function(event) {
			disableScroll();
		}).mouseleave(function(event) {
			enableScroll();
		});

		// compare page scroll
	}
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
	37: 1,
	38: 1,
	39: 1,
	40: 1
};

function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
	if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}
}

function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}

// initialize fixed blocks on scroll
function initFixedScrollBlock() {
	var _offset = 40;
	if($('.added').size()) _offset = 110;
	$(".twocolumns #sidebar").stick_in_parent({
		offset_top: _offset
	});
	$(".product-section .img-product-box").stick_in_parent({
		offset_top: 30
	});
}

// initialize custom form elements
function initCustomForms() {
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: false
	});
	jcf.replaceAll();
}

function initBasket() {
	$('.item .button.buy').click(function(event) {
		$('.basket').addClass('present');
		event.preventDefault();
	});
}

function initReviews() {
	$('.comments').makeGallery();
	initReviewsWidth();
}

function initReviewsWidth() {
	var wW = $('#wrapper').width(),
		blockW = $('.comments').width(),
		item = $('.comments li');
	if (wW < 1000) {
		item.outerWidth(blockW);
	} else if (wW < 1600) {
		item.outerWidth(blockW / 3);
	} else if (wW >= 1600 && wW < 2000) {
		item.outerWidth(blockW / 4);
	} else {
		item.outerWidth(blockW / 5);
	}
}

/*
 * jQuery Tabs plugin
 */

;(function($, $win) {
	'use strict';

	function Tabset($holder, options) {
		this.$holder = $holder;
		this.options = options;

		this.init();
	}

	Tabset.prototype = {
		init: function() {
			this.$tabLinks = this.$holder.find(this.options.tabLinks);

			this.setStartActiveIndex();
			this.setActiveTab();

			if (this.options.autoHeight) {
				this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
			}
		},

		setStartActiveIndex: function() {
			var $classTargets = this.getClassTarget(this.$tabLinks);
			var $activeLink = $classTargets.filter('.' + this.options.activeClass);
			var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
			var activeIndex;

			if (this.options.checkHash && $hashLink.length) {
				$activeLink = $hashLink;
			}

			activeIndex = $classTargets.index($activeLink);

			this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
		},

		setActiveTab: function() {
			var self = this;

			this.$tabLinks.each(function(i, link) {
				var $link = $(link);
				var $classTarget = self.getClassTarget($link);
				var $tab = $($link.attr(self.options.attrib));

				if (i !== self.activeTabIndex) {
					$classTarget.removeClass(self.options.activeClass);
					$tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
				} else {
					$classTarget.addClass(self.options.activeClass);
					$tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
				}

				self.attachTabLink($link, i);
			});
		},

		attachTabLink: function($link, i) {
			var self = this;

			$link.on(this.options.event + '.tabset', function(e) {
				e.preventDefault();

				if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
					self.activeTabIndex = i;
					self.switchTabs();
				}
			});
		},

		resizeHolder: function(height) {
			var self = this;

			if (height) {
				this.$tabHolder.height(height);
				setTimeout(function() {
					self.$tabHolder.addClass('transition');
				}, 10);
			} else {
				self.$tabHolder.removeClass('transition').height('');
			}
		},

		switchTabs: function() {
			var self = this;

			var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
			var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

			var $prevTab = this.getTab($prevLink);
			var $nextTab = this.getTab($nextLink);

			$prevTab.removeClass(this.options.activeClass);

			if (self.haveTabHolder()) {
				this.resizeHolder($prevTab.outerHeight());
			}

			setTimeout(function() {
				self.getClassTarget($prevLink).removeClass(self.options.activeClass);

				$prevTab.addClass(self.options.tabHiddenClass);
				$nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

				self.getClassTarget($nextLink).addClass(self.options.activeClass);

				if (self.haveTabHolder()) {
					self.resizeHolder($nextTab.outerHeight());

					setTimeout(function() {
						self.resizeHolder();
						self.prevTabIndex = self.activeTabIndex;
					}, self.options.animSpeed);
				} else {
					self.prevTabIndex = self.activeTabIndex;
				}
			}, this.options.autoHeight ? this.options.animSpeed : 1);
		},

		getClassTarget: function($link) {
			return this.options.addToParent ? $link.parent() : $link;
		},

		getActiveTab: function() {
			return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
		},

		getTab: function($link) {
			return $($link.attr(this.options.attrib));
		},

		haveTabHolder: function() {
			return this.$tabHolder && this.$tabHolder.length;
		},

		destroy: function() {
			var self = this;

			this.$tabLinks.off('.tabset').each(function() {
				var $link = $(this);

				self.getClassTarget($link).removeClass(self.options.activeClass);
				$($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
			});

			this.$holder.removeData('Tabset');
		}
	};

	$.fn.tabset = function(options) {
		options = $.extend({
			activeClass: 'active',
			addToParent: false,
			autoHeight: false,
			checkHash: false,
			defaultTab: true,
			animSpeed: 500,
			tabLinks: 'a',
			attrib: 'href',
			event: 'click',
			tabHiddenClass: 'js-tab-hidden'
		}, options);
		options.autoHeight = options.autoHeight && $.support.opacity;

		return this.each(function() {
			var $holder = $(this);

			if (!$holder.data('Tabset')) {
				$holder.data('Tabset', new Tabset($holder, options));
			}
		});
	};
}(jQuery, jQuery(window)));

jQuery.fn.makeGallery = function(o) {
	o = $.extend({
		speed: 750,
		/* скорость перемещения 1000 = 1секунда */
		gallery_frame: '.holder',
		gallery_holder: 'ul',
		gallery_item: 'li'
	}, o || {});
	return this.each(
		function() {
			var _phase = true;
			var main_holder = $(this);
			var _frame = $(o.gallery_frame, main_holder);
			var _holder = $(o.gallery_holder, _frame);
			var _gal_item = o.gallery_item;
			var _speed = o.speed;

			var _count = 0;
			var _currentIndex = 0;
			var _slideCount = _holder.find(_gal_item).length;

			// _holder.find(_gal_item).each(function(index, el) {
			// 	var _h = $('> p', this).height();
			// 	$('> p', this).height(_h);
			// });

			function oneStepMinus() {
				if (_count == _slideCount) return;
				var step = (_holder.find(_gal_item + ':last').outerWidth(true));
				_holder.css('margin-left', -step).prepend(_holder.find(_gal_item + ':last').addClass('hide'));
				_holder.find('.hide p span').text('');
				_holder.find('.hide .info, .hide .rating').css('opacity', 0);
				setTimeout(function() {
					_holder.find('.hide').removeClass('hide');
				}, 400);
				_holder.animate({
					marginLeft: 0
				}, _speed, function() {
					_holder.find(_gal_item).eq(0).find('p span').typed({
						stringsElement: _holder.find(_gal_item).eq(0).find('.text'),
						typeSpeed: 30,
						showCursor: false,
						callback: function() {
							_holder.find(_gal_item).eq(0).find('.typed-cursor').remove();
							_holder.find(_gal_item).eq(0).find('.info, .rating').delay(500).fadeTo(200, 1);
							setTimeout(function() {
								oneStepMinus();
							}, 5000);
						}
					});
					$(this).css('margin-left', '0');
					var _index = parseInt($(this).find(_gal_item + ':first').attr('data-id'));
					_phase = true;
					_count++
				});
			};
			setTimeout(function() {
				oneStepMinus();
			}, 5000);
		});
};

function initMenu() {
	$('.mobile-logo').click(function(event) {
		$('body').toggleClass('open-menu');
		event.preventDefault();
	});
	$('.menu-icon').click(function(event) {
		if ($('body').hasClass('open-nav')) {
			$('#nav .frame').hide();
			$('#nav .nav-holder').removeClass('open');
			$('body').removeClass('open-sub');
			$('#nav .active').removeClass('active');
		}
		$('body').removeClass('open-menu');
		$('body').toggleClass('open-nav');
		initValidation();
		initCustomScroll();
		event.preventDefault();
	});
	$('.back').click(function(event) {
		$('body').removeClass('open-sub');
		$('#nav .frame').hide();
		$('#nav .active').removeClass('active');
		event.preventDefault();
	});
	$('#nav .main-nav a').click(function(event) {
		var _id = $(this).attr('href');
		if (_id != "#") {
			if ($('#nav .active').size()) {
				if (!$(this).parent().hasClass('active')) {
					$('#nav .active').removeClass('active');
					$(this).parent().addClass('active');
					$('#nav .nav-holder').addClass('open');
					$('body').addClass('open-sub');
				} else {
					$('#nav .active').removeClass('active');
					$('#nav .nav-holder').removeClass('open');
					$('body').removeClass('open-sub');
				}
			} else {
				$(this).parent().addClass('active');
				$('#nav .nav-holder').addClass('open');
				$('body').addClass('open-sub');
			}
			$('#nav .frame').hide();
			$(_id).show();
			initCustomScroll();
			initValidation();
			event.preventDefault();
		}
	});
	$(document).on('click', function(event) {
		if ($(event.target).closest('.menu-icon').length || $(event.target).closest('#nav').length || $(event.target).closest('.back').length) return;
		$('body').removeClass('open-nav');
		$('#nav .nav-holder').removeClass('open').parent().removeClass('open-sub');;
		$('#nav .active').removeClass('active');
		event.stopPropagation();
	});
	$('.open-close > a').click(function(event) {
		$('.open-close.open').not($(this).parent()).removeClass('open');
		$(this).parent().toggleClass('open');
		event.preventDefault();
	});
	$(document).on('click', function(event) {
		if ($(event.target).closest('.open-close').length) return;
		$('.open-close').removeClass('open');
		event.stopPropagation();
	});
}

function intiUp() {
	$(window).scroll(function(event) {
		var _top = $('#header').outerHeight(true) - $('.message:visible').outerHeight(true);
		if ($(window).scrollTop() >= _top) {
			$('.icon-up').fadeIn(200);
		} else {
			$('.icon-up').fadeOut(200);
		}
	});
	$('.icon-up').click(function(event) {
		$('html, body').animate({
			scrollTop: 0
		}, 500);
		event.preventDefault();
	});
}

function initFixed() {
	$(window).scroll(function(event) {
		var _top = $('.message:visible').outerHeight() + 10;
		if ($(window).scrollTop() >= _top && $('#wrapper').width() > 1000) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});
}

function initBgImage() {
	$('.avatar, .promo, .slick-gallery .slide-item').each(function(index, el) {
		var _src = $('> img', this).attr('src');
		$('> img', this).hide();
		$(this).css('background-image', 'url(' + _src + ')');
	});
}

function initPromo() {
	var windowHeight;
	windowHeight = $(window).height() - $('#header').outerHeight(true) - $('.message:visible').outerHeight(true);
	if ($('.promo-gallery-block').height() != windowHeight) {
		$('.promo-gallery-block').css('height', windowHeight);
	}
	var windowHeight1 = $(window).height() - parseInt($('.widget-block').css('margin-bottom')) * 2;
	if ($('.widget-block').height() != windowHeight1) {
		$('.widget-block').css('height', windowHeight1);
	}
}

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;
(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		root.jcf = factory(jQuery);
	}
}(this, function($) {
	'use strict';

	// define version
	var version = '1.1.3';

	// private variables
	var customInstances = [];

	// default global options
	var commonOptions = {
		optionsKey: 'jcf',
		dataKey: 'jcf-instance',
		rtlClass: 'jcf-rtl',
		focusClass: 'jcf-focus',
		pressedClass: 'jcf-pressed',
		disabledClass: 'jcf-disabled',
		hiddenClass: 'jcf-hidden',
		resetAppearanceClass: 'jcf-reset-appearance',
		unselectableClass: 'jcf-unselectable'
	};

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
		isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
	commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

	// create global stylesheet if custom forms are used
	var createStyleSheet = function() {
		var styleTag = $('<style>').appendTo('head'),
			styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

		// crossbrowser style handling
		var addCSSRule = function(selector, rules, index) {
			if (styleSheet.insertRule) {
				styleSheet.insertRule(selector + '{' + rules + '}', index);
			} else {
				styleSheet.addRule(selector, rules, index);
			}
		};

		// add special rules
		addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
		addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
		addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
		addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

		// detect rtl pages
		var html = $('html'),
			body = $('body');
		if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
			html.addClass(commonOptions.rtlClass);
		}

		// handle form reset event
		html.on('reset', function() {
			setTimeout(function() {
				api.refreshAll();
			}, 0);
		});

		// mark stylesheet as created
		commonOptions.styleSheetCreated = true;
	};

	// simplified pointer events handler
	(function() {
		var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
			touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
			eventList, eventMap = {},
			eventPrefix = 'jcf-';

		// detect events to attach
		if (pointerEventsSupported) {
			eventList = {
				pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
				pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
				pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
				pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
			};
		} else {
			eventList = {
				pointerover: 'mouseover',
				pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
				pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
				pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
			};
		}

		// create event map
		$.each(eventList, function(targetEventName, fakeEventList) {
			$.each(fakeEventList.split(' '), function(index, fakeEventName) {
				eventMap[fakeEventName] = targetEventName;
			});
		});

		// jQuery event hooks
		$.each(eventList, function(eventName, eventHandlers) {
			eventHandlers = eventHandlers.split(' ');
			$.event.special[eventPrefix + eventName] = {
				setup: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = fixEvent;
					});
				},
				teardown: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = null;
					});
				}
			};
		});

		// check that mouse event are not simulated by mobile browsers
		var lastTouch = null;
		var mouseEventSimulated = function(e) {
			var dx = Math.abs(e.pageX - lastTouch.x),
				dy = Math.abs(e.pageY - lastTouch.y),
				rangeDistance = 25;

			if (dx <= rangeDistance && dy <= rangeDistance) {
				return true;
			}
		};

		// normalize event
		var fixEvent = function(e) {
			var origEvent = e || window.event,
				touchEventData = null,
				targetEventName = eventMap[origEvent.type];

			e = $.event.fix(origEvent);
			e.type = eventPrefix + targetEventName;

			if (origEvent.pointerType) {
				switch (origEvent.pointerType) {
					case 2:
						e.pointerType = 'touch';
						break;
					case 3:
						e.pointerType = 'pen';
						break;
					case 4:
						e.pointerType = 'mouse';
						break;
					default:
						e.pointerType = origEvent.pointerType;
				}
			} else {
				e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
			}

			if (!e.pageX && !e.pageY) {
				touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
				e.pageX = touchEventData.pageX;
				e.pageY = touchEventData.pageY;
			}

			if (origEvent.type === 'touchend') {
				lastTouch = {
					x: e.pageX,
					y: e.pageY
				};
			}
			if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
				return;
			} else {
				return ($.event.dispatch || $.event.handle).call(this, e);
			}
		};
	}());

	// custom mousewheel/trackpad handler
	(function() {
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
			shimEventName = 'jcf-mousewheel';

		$.event.special[shimEventName] = {
			setup: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = fixEvent;
				});
			},
			teardown: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
					else self['on' + fallbackEvent] = null;
				});
			}
		};

		var fixEvent = function(e) {
			var origEvent = e || window.event;
			e = $.event.fix(origEvent);
			e.type = shimEventName;

			// old wheel events handler
			if ('detail' in origEvent) {
				e.deltaY = -origEvent.detail;
			}
			if ('wheelDelta' in origEvent) {
				e.deltaY = -origEvent.wheelDelta;
			}
			if ('wheelDeltaY' in origEvent) {
				e.deltaY = -origEvent.wheelDeltaY;
			}
			if ('wheelDeltaX' in origEvent) {
				e.deltaX = -origEvent.wheelDeltaX;
			}

			// modern wheel event handler
			if ('deltaY' in origEvent) {
				e.deltaY = origEvent.deltaY;
			}
			if ('deltaX' in origEvent) {
				e.deltaX = origEvent.deltaX;
			}

			// handle deltaMode for mouse wheel
			e.delta = e.deltaY || e.deltaX;
			if (origEvent.deltaMode === 1) {
				var lineHeight = 16;
				e.delta *= lineHeight;
				e.deltaY *= lineHeight;
				e.deltaX *= lineHeight;
			}

			return ($.event.dispatch || $.event.handle).call(this, e);
		};
	}());

	// extra module methods
	var moduleMixin = {
		// provide function for firing native events
		fireNativeEvent: function(elements, eventName) {
			$(elements).each(function() {
				var element = this,
					eventObject;
				if (element.dispatchEvent) {
					eventObject = document.createEvent('HTMLEvents');
					eventObject.initEvent(eventName, true, true);
					element.dispatchEvent(eventObject);
				} else if (document.createEventObject) {
					eventObject = document.createEventObject();
					eventObject.target = element;
					element.fireEvent('on' + eventName, eventObject);
				}
			});
		},
		// bind event handlers for module instance (functions beggining with "on")
		bindHandlers: function() {
			var self = this;
			$.each(self, function(propName, propValue) {
				if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
					// dont use $.proxy here because it doesn't create unique handler
					self[propName] = function() {
						return propValue.apply(self, arguments);
					};
				}
			});
		}
	};

	// public API
	var api = {
		version: version,
		modules: {},
		getOptions: function() {
			return $.extend({}, commonOptions);
		},
		setOptions: function(moduleName, moduleOptions) {
			if (arguments.length > 1) {
				// set module options
				if (this.modules[moduleName]) {
					$.extend(this.modules[moduleName].prototype.options, moduleOptions);
				}
			} else {
				// set common options
				$.extend(commonOptions, moduleName);
			}
		},
		addModule: function(proto) {
			// add module to list
			var Module = function(options) {
				// save instance to collection
				if (!options.element.data(commonOptions.dataKey)) {
					options.element.data(commonOptions.dataKey, this);
				}
				customInstances.push(this);

				// save options
				this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

				// bind event handlers to instance
				this.bindHandlers();

				// call constructor
				this.init.apply(this, arguments);
			};

			// parse options from HTML attribute
			var getInlineOptions = function(element) {
				var dataOptions = element.data(commonOptions.optionsKey),
					attrOptions = element.attr(commonOptions.optionsKey);

				if (dataOptions) {
					return dataOptions;
				} else if (attrOptions) {
					try {
						return $.parseJSON(attrOptions);
					} catch (e) {
						// ignore invalid attributes
					}
				}
			};

			// set proto as prototype for new module
			Module.prototype = proto;

			// add mixin methods to module proto
			$.extend(proto, moduleMixin);
			if (proto.plugins) {
				$.each(proto.plugins, function(pluginName, plugin) {
					$.extend(plugin.prototype, moduleMixin);
				});
			}

			// override destroy method
			var originalDestroy = Module.prototype.destroy;
			Module.prototype.destroy = function() {
				this.options.element.removeData(this.options.dataKey);

				for (var i = customInstances.length - 1; i >= 0; i--) {
					if (customInstances[i] === this) {
						customInstances.splice(i, 1);
						break;
					}
				}

				if (originalDestroy) {
					originalDestroy.apply(this, arguments);
				}
			};

			// save module to list
			this.modules[proto.name] = Module;
		},
		getInstance: function(element) {
			return $(element).data(commonOptions.dataKey);
		},
		replace: function(elements, moduleName, customOptions) {
			var self = this,
				instance;

			if (!commonOptions.styleSheetCreated) {
				createStyleSheet();
			}

			$(elements).each(function() {
				var moduleOptions,
					element = $(this);

				instance = element.data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				} else {
					if (!moduleName) {
						$.each(self.modules, function(currentModuleName, module) {
							if (module.prototype.matchElement.call(module.prototype, element)) {
								moduleName = currentModuleName;
								return false;
							}
						});
					}
					if (moduleName) {
						moduleOptions = $.extend({
							element: element
						}, customOptions);
						instance = new self.modules[moduleName](moduleOptions);
					}
				}
			});
			return instance;
		},
		refresh: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				}
			});
		},
		destroy: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.destroy();
				}
			});
		},
		replaceAll: function(context) {
			var self = this;
			$.each(this.modules, function(moduleName, module) {
				$(module.prototype.selector, context).each(function() {
					if (this.className.indexOf('jcf-ignore') < 0) {
						self.replace(this, moduleName);
					}
				});
			});
		},
		refreshAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function() {
						var instance = $(this).data(commonOptions.dataKey);
						if (instance) {
							instance.refresh();
						}
					});
				});
			} else {
				for (var i = customInstances.length - 1; i >= 0; i--) {
					customInstances[i].refresh();
				}
			}
		},
		destroyAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function(index, element) {
						var instance = $(element).data(commonOptions.dataKey);
						if (instance) {
							instance.destroy();
						}
					});
				});
			} else {
				while (customInstances.length) {
					customInstances[0].destroy();
				}
			}
		}
	};

	// always export API to the global window object
	window.jcf = api;

	return api;
}));

/*!
 * JavaScript Custom Forms : Number Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;
(function($) {
	'use strict';

	jcf.addModule({
		name: 'Number',
		selector: 'input[type="number"]',
		options: {
			realElementClass: 'jcf-real-element',
			fakeStructure: '<span class="jcf-number"><span class="jcf-btn-inc"></span><span class="jcf-btn-dec"></span></span>',
			btnIncSelector: '.jcf-btn-inc',
			btnDecSelector: '.jcf-btn-dec',
			pressInterval: 150
		},
		matchElement: function(element) {
			return element.is(this.selector);
		},
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function() {
			this.page = $('html');
			this.realElement = $(this.options.element).addClass(this.options.realElementClass);
			this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement);
			this.btnDec = this.fakeElement.find(this.options.btnDecSelector);
			this.btnInc = this.fakeElement.find(this.options.btnIncSelector);

			// set initial values
			this.initialValue = parseFloat(this.realElement.val()) || 0;
			this.minValue = parseFloat(this.realElement.attr('min'));
			this.maxValue = parseFloat(this.realElement.attr('max'));
			this.stepValue = parseFloat(this.realElement.attr('step')) || 1;

			// check attribute values
			this.minValue = isNaN(this.minValue) ? -Infinity : this.minValue;
			this.maxValue = isNaN(this.maxValue) ? Infinity : this.maxValue;

			// handle range
			if (isFinite(this.maxValue)) {
				this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
			}
		},
		attachEvents: function() {
			this.realElement.on({
				focus: this.onFocus
			});
			this.btnDec.add(this.btnInc).on('jcf-pointerdown', this.onBtnPress);
		},
		onBtnPress: function(e) {
			var self = this,
				increment;

			if (!this.realElement.is(':disabled')) {
				increment = this.btnInc.is(e.currentTarget);

				self.step(increment);
				clearInterval(this.stepTimer);
				this.stepTimer = setInterval(function() {
					self.step(increment);
				}, this.options.pressInterval);

				this.page.on('jcf-pointerup', this.onBtnRelease);
			}
		},
		onBtnRelease: function() {
			clearInterval(this.stepTimer);
			this.page.off('jcf-pointerup', this.onBtnRelease);
		},
		onFocus: function() {
			this.fakeElement.addClass(this.options.focusClass);
			this.realElement.on({
				blur: this.onBlur,
				keydown: this.onKeyPress
			});
		},
		onBlur: function() {
			this.fakeElement.removeClass(this.options.focusClass);
			this.realElement.off({
				blur: this.onBlur,
				keydown: this.onKeyPress
			});
		},
		onKeyPress: function(e) {
			if (e.which === 38 || e.which === 40) {
				e.preventDefault();
				this.step(e.which === 38);
			}
		},
		step: function(increment) {
			var originalValue = parseFloat(this.realElement.val()),
				newValue = originalValue || 0,
				addValue = this.stepValue * (increment ? 1 : -1),
				edgeNumber = isFinite(this.minValue) ? this.minValue : this.initialValue - Math.abs(newValue * this.stepValue),
				diff = Math.abs(edgeNumber - newValue) % this.stepValue;

			// handle step diff
			if (diff) {
				if (increment) {
					newValue += addValue - diff;
				} else {
					newValue -= diff;
				}
			} else {
				newValue += addValue;
			}

			// handle min/max limits
			if (newValue < this.minValue) {
				newValue = this.minValue;
			} else if (newValue > this.maxValue) {
				newValue = this.maxValue;
			}

			// update value in real input if its changed
			if (newValue !== originalValue) {
				this.realElement.val(newValue).trigger('change');
				this.refresh();
			}
		},
		refresh: function() {
			var isDisabled = this.realElement.is(':disabled'),
				currentValue = parseFloat(this.realElement.val());

			// handle disabled state
			this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);

			// refresh button classes
			this.btnDec.toggleClass(this.options.disabledClass, currentValue === this.minValue);
			this.btnInc.toggleClass(this.options.disabledClass, currentValue === this.maxValue);
		},
		destroy: function() {
			// restore original structure
			this.realElement.removeClass(this.options.realElementClass).insertBefore(this.fakeElement);
			this.fakeElement.remove();
			clearInterval(this.stepTimer);

			// remove event handlers
			this.page.off('jcf-pointerup', this.onBtnRelease);
			this.realElement.off({
				keydown: this.onKeyPress,
				focus: this.onFocus,
				blur: this.onBlur
			});
		}
	});

}(jQuery));


/*
 * jQuery Autocomplete plugin
 */
 ;(function($, $win) {
 	'use strict';

 	$.fn.uiAutocomplete = function() {
 		var termTemplate = '<strong class="ui-autocomplete-term">%s</strong>';
 		
 		return this.each(function() {
 			var $input = $(this);
 			var data = $input.data('autocomplete') || {};
 			var uiInstance;

 			if (data.highlight) {
 				data.open = function(e, ui) {
 					uiInstance.menu.element.find('li').each(function() {
 						var $link = $(this);
 						var regex = new RegExp(uiInstance.term, 'gi');

 						$link.html($link.text().replace(regex, function(matched) {
 							return termTemplate.replace('%s', matched);
 						}));
 					});
 				};
 			}

 			$.Deferred(function(defer) {
 				if (data.source) {
 					$.getJSON(data.source)
 					 .done(defer.resolve)
 					 .fail(defer.reject);
 				} else defer.resolve();
 			}).then(function(source) {
 				uiInstance = $input.autocomplete($.extend({}, data, {
 					source: source || data.request,
 					change: function( event, ui ) {
 						initCustomScroll();
 					},
 					open: function( event, ui ) {
 						initCustomScroll();
 					},
 					search: function( event, ui ) {
 						initCustomScroll();
 					}
 				})).data('ui-autocomplete');
 			});
 		});
 	};
 }(jQuery, jQuery(window)));


/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
! function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	function t(t, n) {
		var s, o, u, r = t.nodeName.toLowerCase();
		return "area" === r ? (s = t.parentNode, o = s.name, t.href && o && "map" === s.nodeName.toLowerCase() ? (u = e("img[usemap='#" + o + "']")[0], !!u && i(u)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || n : n) && i(t)
	}

	function i(t) {
		return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
			return "hidden" === e.css(this, "visibility")
		}).length
	}
	e.ui = e.ui || {}, e.extend(e.ui, {
		version: "1.11.4",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), e.fn.extend({
		scrollParent: function(t) {
			var i = this.css("position"),
				n = "absolute" === i,
				s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				o = this.parents().filter(function() {
					var t = e(this);
					return n && "static" === t.css("position") ? !1 : s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
				}).eq(0);
			return "fixed" !== i && o.length ? o : e(this[0].ownerDocument || document)
		},
		uniqueId: function() {
			var e = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + ++e)
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
			})
		}
	}), e.extend(e.expr[":"], {
		data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
			return function(i) {
				return !!e.data(i, t)
			}
		}) : function(t, i, n) {
			return !!e.data(t, n[3])
		},
		focusable: function(i) {
			return t(i, !isNaN(e.attr(i, "tabindex")))
		},
		tabbable: function(i) {
			var n = e.attr(i, "tabindex"),
				s = isNaN(n);
			return (s || n >= 0) && t(i, !s)
		}
	}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
		function n(t, i, n, o) {
			return e.each(s, function() {
				i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), o && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
			}), i
		}
		var s = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
			o = i.toLowerCase(),
			u = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn.outerWidth,
				outerHeight: e.fn.outerHeight
			};
		e.fn["inner" + i] = function(t) {
			return void 0 === t ? u["inner" + i].call(this) : this.each(function() {
				e(this).css(o, n(this, t) + "px")
			})
		}, e.fn["outer" + i] = function(t, s) {
			return "number" != typeof t ? u["outer" + i].call(this, t) : this.each(function() {
				e(this).css(o, n(this, t, !0, s) + "px")
			})
		}
	}), e.fn.addBack || (e.fn.addBack = function(e) {
		return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
	}), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
		return function(i) {
			return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
		}
	}(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
		focus: function(t) {
			return function(i, n) {
				return "number" == typeof i ? this.each(function() {
					var t = this;
					setTimeout(function() {
						e(t).focus(), n && n.call(t)
					}, i)
				}) : t.apply(this, arguments)
			}
		}(e.fn.focus),
		disableSelection: function() {
			var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.bind(e + ".ui-disableSelection", function(e) {
					e.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		},
		zIndex: function(t) {
			if (void 0 !== t) return this.css("zIndex", t);
			if (this.length)
				for (var i, n, s = e(this[0]); s.length && s[0] !== document;) {
					if (i = s.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (n = parseInt(s.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
					s = s.parent()
				}
			return 0
		}
	}), e.ui.plugin = {
		add: function(t, i, n) {
			var s, o = e.ui[t].prototype;
			for (s in n) o.plugins[s] = o.plugins[s] || [], o.plugins[s].push([i, n[s]])
		},
		call: function(e, t, i, n) {
			var s, o = e.plugins[t];
			if (o && (n || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
				for (s = 0; s < o.length; s++) e.options[o[s][0]] && o[s][1].apply(e.element, i)
		}
	}
});

/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
! function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	var t = 0,
		i = Array.prototype.slice;
	e.cleanData = function(t) {
		return function(i) {
			var n, s, a;
			for (a = 0; null != (s = i[a]); a++) try {
				n = e._data(s, "events"), n && n.remove && e(s).triggerHandler("remove")
			} catch (o) {}
			t(i)
		}
	}(e.cleanData), e.widget = function(t, i, n) {
		var s, a, o, r, u = {},
			l = t.split(".")[0];
		return t = t.split(".")[1], s = l + "-" + t, n || (n = i, i = e.Widget), e.expr[":"][s.toLowerCase()] = function(t) {
			return !!e.data(t, s)
		}, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function(e, t) {
			return this._createWidget ? void(arguments.length && this._createWidget(e, t)) : new o(e, t)
		}, e.extend(o, a, {
			version: n.version,
			_proto: e.extend({}, n),
			_childConstructors: []
		}), r = new i, r.options = e.widget.extend({}, r.options), e.each(n, function(t, n) {
			return e.isFunction(n) ? void(u[t] = function() {
				var e = function() {
						return i.prototype[t].apply(this, arguments)
					},
					s = function(e) {
						return i.prototype[t].apply(this, e)
					};
				return function() {
					var t, i = this._super,
						a = this._superApply;
					return this._super = e, this._superApply = s, t = n.apply(this, arguments), this._super = i, this._superApply = a, t
				}
			}()) : void(u[t] = n)
		}), o.prototype = e.widget.extend(r, {
			widgetEventPrefix: a ? r.widgetEventPrefix || t : t
		}, u, {
			constructor: o,
			namespace: l,
			widgetName: t,
			widgetFullName: s
		}), a ? (e.each(a._childConstructors, function(t, i) {
			var n = i.prototype;
			e.widget(n.namespace + "." + n.widgetName, o, i._proto)
		}), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
	}, e.widget.extend = function(t) {
		for (var n, s, a = i.call(arguments, 1), o = 0, r = a.length; r > o; o++)
			for (n in a[o]) s = a[o][n], a[o].hasOwnProperty(n) && void 0 !== s && (t[n] = e.isPlainObject(s) ? e.isPlainObject(t[n]) ? e.widget.extend({}, t[n], s) : e.widget.extend({}, s) : s);
		return t
	}, e.widget.bridge = function(t, n) {
		var s = n.prototype.widgetFullName || t;
		e.fn[t] = function(a) {
			var o = "string" == typeof a,
				r = i.call(arguments, 1),
				u = this;
			return o ? this.each(function() {
				var i, n = e.data(this, s);
				return "instance" === a ? (u = n, !1) : n ? e.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r), i !== n && void 0 !== i ? (u = i && i.jquery ? u.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + a + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + a + "'")
			}) : (r.length && (a = e.widget.extend.apply(null, [a].concat(r))), this.each(function() {
				var t = e.data(this, s);
				t ? (t.option(a || {}), t._init && t._init()) : e.data(this, s, new n(a, this))
			})), u
		}
	}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(i, n) {
			n = e(n || this.defaultElement || this)[0], this.element = e(n), this.uuid = t++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), n !== this && (e.data(n, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(e) {
					e.target === n && this.destroy()
				}
			}), this.document = e(n.style ? n.ownerDocument : n.document || n), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e.noop,
		_getCreateEventData: e.noop,
		_create: e.noop,
		_init: e.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: e.noop,
		widget: function() {
			return this.element
		},
		option: function(t, i) {
			var n, s, a, o = t;
			if (0 === arguments.length) return e.widget.extend({}, this.options);
			if ("string" == typeof t)
				if (o = {}, n = t.split("."), t = n.shift(), n.length) {
					for (s = o[t] = e.widget.extend({}, this.options[t]), a = 0; a < n.length - 1; a++) s[n[a]] = s[n[a]] || {}, s = s[n[a]];
					if (t = n.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t];
					s[t] = i
				} else {
					if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
					o[t] = i
				}
			return this._setOptions(o), this
		},
		_setOptions: function(e) {
			var t;
			for (t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
		},
		enable: function() {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function() {
			return this._setOptions({
				disabled: !0
			})
		},
		_on: function(t, i, n) {
			var s, a = this;
			"boolean" != typeof t && (n = i, i = t, t = !1), n ? (i = s = e(i), this.bindings = this.bindings.add(i)) : (n = i, i = this.element, s = this.widget()), e.each(n, function(n, o) {
				function r() {
					return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
				}
				"string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
				var u = n.match(/^([\w:-]*)\s*(.*)$/),
					l = u[1] + a.eventNamespace,
					h = u[2];
				h ? s.delegate(h, l, r) : i.bind(l, r)
			})
		},
		_off: function(t, i) {
			i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
		},
		_delay: function(e, t) {
			function i() {
				return ("string" == typeof e ? n[e] : e).apply(n, arguments)
			}
			var n = this;
			return setTimeout(i, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function(t) {
					e(t.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(t) {
					e(t.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin: function(t) {
					e(t.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(t) {
					e(t.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(t, i, n) {
			var s, a, o = this.options[t];
			if (n = n || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
				for (s in a) s in i || (i[s] = a[s]);
			return this.element.trigger(i, n), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, i) {
		e.Widget.prototype["_" + t] = function(n, s, a) {
			"string" == typeof s && (s = {
				effect: s
			});
			var o, r = s ? s === !0 || "number" == typeof s ? i : s.effect || i : t;
			s = s || {}, "number" == typeof s && (s = {
				duration: s
			}), o = !e.isEmptyObject(s), s.complete = a, s.delay && n.delay(s.delay), o && e.effects && e.effects.effect[r] ? n[t](s) : r !== t && n[r] ? n[r](s.duration, s.easing, a) : n.queue(function(i) {
				e(this)[t](), a && a.call(n[0]), i()
			})
		}
	});
	e.widget
});

/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
! function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	! function() {
		function t(e, t, i) {
			return [parseFloat(e[0]) * (m.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (m.test(e[1]) ? i / 100 : 1)]
		}

		function i(t, i) {
			return parseInt(e.css(t, i), 10) || 0
		}

		function s(t) {
			var i = t[0];
			return 9 === i.nodeType ? {
				width: t.width(),
				height: t.height(),
				offset: {
					top: 0,
					left: 0
				}
			} : e.isWindow(i) ? {
				width: t.width(),
				height: t.height(),
				offset: {
					top: t.scrollTop(),
					left: t.scrollLeft()
				}
			} : i.preventDefault ? {
				width: 0,
				height: 0,
				offset: {
					top: i.pageY,
					left: i.pageX
				}
			} : {
				width: t.outerWidth(),
				height: t.outerHeight(),
				offset: t.offset()
			}
		}
		e.ui = e.ui || {};
		var n, a, o = Math.max,
			r = Math.abs,
			u = Math.round,
			l = /left|center|right/,
			h = /top|center|bottom/,
			c = /[\+\-]\d+(\.[\d]+)?%?/,
			d = /^\w+/,
			m = /%$/,
			p = e.fn.position;
		e.position = {
				scrollbarWidth: function() {
					if (void 0 !== n) return n;
					var t, i, s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
						a = s.children()[0];
					return e("body").append(s), t = a.offsetWidth, s.css("overflow", "scroll"), i = a.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i
				},
				getScrollInfo: function(t) {
					var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
						s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
						n = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
						a = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
					return {
						width: a ? e.position.scrollbarWidth() : 0,
						height: n ? e.position.scrollbarWidth() : 0
					}
				},
				getWithinInfo: function(t) {
					var i = e(t || window),
						s = e.isWindow(i[0]),
						n = !!i[0] && 9 === i[0].nodeType;
					return {
						element: i,
						isWindow: s,
						isDocument: n,
						offset: i.offset() || {
							left: 0,
							top: 0
						},
						scrollLeft: i.scrollLeft(),
						scrollTop: i.scrollTop(),
						width: s || n ? i.width() : i.outerWidth(),
						height: s || n ? i.height() : i.outerHeight()
					}
				}
			}, e.fn.position = function(n) {
				if (!n || !n.of) return p.apply(this, arguments);
				n = e.extend({}, n);
				var m, f, v, g, _, y, b = e(n.of),
					k = e.position.getWithinInfo(n.within),
					D = e.position.getScrollInfo(k),
					x = (n.collision || "flip").split(" "),
					w = {};
				return y = s(b), b[0].preventDefault && (n.at = "left top"), f = y.width, v = y.height, g = y.offset, _ = e.extend({}, g), e.each(["my", "at"], function() {
					var e, t, i = (n[this] || "").split(" ");
					1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : h.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = l.test(i[0]) ? i[0] : "center", i[1] = h.test(i[1]) ? i[1] : "center", e = c.exec(i[0]), t = c.exec(i[1]), w[this] = [e ? e[0] : 0, t ? t[0] : 0], n[this] = [d.exec(i[0])[0], d.exec(i[1])[0]]
				}), 1 === x.length && (x[1] = x[0]), "right" === n.at[0] ? _.left += f : "center" === n.at[0] && (_.left += f / 2), "bottom" === n.at[1] ? _.top += v : "center" === n.at[1] && (_.top += v / 2), m = t(w.at, f, v), _.left += m[0], _.top += m[1], this.each(function() {
					var s, l, h = e(this),
						c = h.outerWidth(),
						d = h.outerHeight(),
						p = i(this, "marginLeft"),
						y = i(this, "marginTop"),
						M = c + p + i(this, "marginRight") + D.width,
						T = d + y + i(this, "marginBottom") + D.height,
						C = e.extend({}, _),
						I = t(w.my, h.outerWidth(), h.outerHeight());
					"right" === n.my[0] ? C.left -= c : "center" === n.my[0] && (C.left -= c / 2), "bottom" === n.my[1] ? C.top -= d : "center" === n.my[1] && (C.top -= d / 2), C.left += I[0], C.top += I[1], a || (C.left = u(C.left), C.top = u(C.top)), s = {
						marginLeft: p,
						marginTop: y
					}, e.each(["left", "top"], function(t, i) {
						e.ui.position[x[t]] && e.ui.position[x[t]][i](C, {
							targetWidth: f,
							targetHeight: v,
							elemWidth: c,
							elemHeight: d,
							collisionPosition: s,
							collisionWidth: M,
							collisionHeight: T,
							offset: [m[0] + I[0], m[1] + I[1]],
							my: n.my,
							at: n.at,
							within: k,
							elem: h
						})
					}), n.using && (l = function(e) {
						var t = g.left - C.left,
							i = t + f - c,
							s = g.top - C.top,
							a = s + v - d,
							u = {
								target: {
									element: b,
									left: g.left,
									top: g.top,
									width: f,
									height: v
								},
								element: {
									element: h,
									left: C.left,
									top: C.top,
									width: c,
									height: d
								},
								horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
								vertical: 0 > a ? "top" : s > 0 ? "bottom" : "middle"
							};
						c > f && r(t + i) < f && (u.horizontal = "center"), d > v && r(s + a) < v && (u.vertical = "middle"), u.important = o(r(t), r(i)) > o(r(s), r(a)) ? "horizontal" : "vertical", n.using.call(this, e, u)
					}), h.offset(e.extend(C, {
						using: l
					}))
				})
			}, e.ui.position = {
				fit: {
					left: function(e, t) {
						var i, s = t.within,
							n = s.isWindow ? s.scrollLeft : s.offset.left,
							a = s.width,
							r = e.left - t.collisionPosition.marginLeft,
							u = n - r,
							l = r + t.collisionWidth - a - n;
						t.collisionWidth > a ? u > 0 && 0 >= l ? (i = e.left + u + t.collisionWidth - a - n, e.left += u - i) : e.left = l > 0 && 0 >= u ? n : u > l ? n + a - t.collisionWidth : n : u > 0 ? e.left += u : l > 0 ? e.left -= l : e.left = o(e.left - r, e.left)
					},
					top: function(e, t) {
						var i, s = t.within,
							n = s.isWindow ? s.scrollTop : s.offset.top,
							a = t.within.height,
							r = e.top - t.collisionPosition.marginTop,
							u = n - r,
							l = r + t.collisionHeight - a - n;
						t.collisionHeight > a ? u > 0 && 0 >= l ? (i = e.top + u + t.collisionHeight - a - n, e.top += u - i) : e.top = l > 0 && 0 >= u ? n : u > l ? n + a - t.collisionHeight : n : u > 0 ? e.top += u : l > 0 ? e.top -= l : e.top = o(e.top - r, e.top)
					}
				},
				flip: {
					left: function(e, t) {
						var i, s, n = t.within,
							a = n.offset.left + n.scrollLeft,
							o = n.width,
							u = n.isWindow ? n.scrollLeft : n.offset.left,
							l = e.left - t.collisionPosition.marginLeft,
							h = l - u,
							c = l + t.collisionWidth - o - u,
							d = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
							m = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
							p = -2 * t.offset[0];
						0 > h ? (i = e.left + d + m + p + t.collisionWidth - o - a, (0 > i || i < r(h)) && (e.left += d + m + p)) : c > 0 && (s = e.left - t.collisionPosition.marginLeft + d + m + p - u, (s > 0 || r(s) < c) && (e.left += d + m + p))
					},
					top: function(e, t) {
						var i, s, n = t.within,
							a = n.offset.top + n.scrollTop,
							o = n.height,
							u = n.isWindow ? n.scrollTop : n.offset.top,
							l = e.top - t.collisionPosition.marginTop,
							h = l - u,
							c = l + t.collisionHeight - o - u,
							d = "top" === t.my[1],
							m = d ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
							p = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
							f = -2 * t.offset[1];
						0 > h ? (s = e.top + m + p + f + t.collisionHeight - o - a, (0 > s || s < r(h)) && (e.top += m + p + f)) : c > 0 && (i = e.top - t.collisionPosition.marginTop + m + p + f - u, (i > 0 || r(i) < c) && (e.top += m + p + f))
					}
				},
				flipfit: {
					left: function() {
						e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
					},
					top: function() {
						e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
					}
				}
			},
			function() {
				var t, i, s, n, o, r = document.getElementsByTagName("body")[0],
					u = document.createElement("div");
				t = document.createElement(r ? "div" : "body"), s = {
					visibility: "hidden",
					width: 0,
					height: 0,
					border: 0,
					margin: 0,
					background: "none"
				}, r && e.extend(s, {
					position: "absolute",
					left: "-1000px",
					top: "-1000px"
				});
				for (o in s) t.style[o] = s[o];
				t.appendChild(u), i = r || document.documentElement, i.insertBefore(t, i.firstChild), u.style.cssText = "position: absolute; left: 10.7432222px;", n = e(u).offset().left, a = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t)
			}()
	}();
	e.ui.position
});

/*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */
! function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	e.widget("ui.autocomplete", {
		version: "1.11.4",
		defaultElement: "<input>",
		options: {
			appendTo: $('.autocomplete-box .autocomplete-holder'),
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
			open: function(event, ui) {
				initCustomForms();
			},
			close: function(event, ui) {
				initCustomForms();
			},
			change: function(event, ui) {
				initCustomForms();
			},
			focus: null,
			response: null,
			search: null,
			select: null
		},
		requestIndex: 0,
		pending: 0,
		_create: function() {
			var t, i, s, n = this.element[0].nodeName.toLowerCase(),
				o = "textarea" === n,
				u = "input" === n;
			this.isMultiLine = o ? !0 : u ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[o || u ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
				keydown: function(n) {
					if (this.element.prop("readOnly")) return t = !0, s = !0, void(i = !0);
					t = !1, s = !1, i = !1;
					var o = e.ui.keyCode;
					switch (n.keyCode) {
						case o.PAGE_UP:
							t = !0, this._move("previousPage", n);
							break;
						case o.PAGE_DOWN:
							t = !0, this._move("nextPage", n);
							break;
						case o.UP:
							t = !0, this._keyEvent("previous", n);
							break;
						case o.DOWN:
							t = !0, this._keyEvent("next", n);
							break;
						case o.ENTER:
							this.menu.active && (t = !0, n.preventDefault(), this.menu.select(n));
							break;
						case o.TAB:
							this.menu.active && this.menu.select(n);
							break;
						case o.ESCAPE:
							this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
							break;
						default:
							i = !0, this._searchTimeout(n)
					}
				},
				keypress: function(s) {
					if (t) return t = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault());
					if (!i) {
						var n = e.ui.keyCode;
						switch (s.keyCode) {
							case n.PAGE_UP:
								this._move("previousPage", s);
								break;
							case n.PAGE_DOWN:
								this._move("nextPage", s);
								break;
							case n.UP:
								this._keyEvent("previous", s);
								break;
							case n.DOWN:
								this._keyEvent("next", s)
						}
					}
				},
				input: function(e) {
					return s ? (s = !1, void e.preventDefault()) : void this._searchTimeout(e)
				},
				focus: function() {
					this.selectedItem = null, this.previous = this._value()
				},
				blur: function(e) {
					return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(e), void this._change(e))
				}
			}), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
				role: null
			}).hide().menu("instance"), this._on(this.menu.element, {
				mousedown: function(t) {
					t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
						delete this.cancelBlur
					});
					var i = this.menu.element[0];
					e(t.target).closest(".ui-menu-item").length || this._delay(function() {
						var t = this;
						this.document.one("mousedown", function(s) {
							s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close()
						})
					})
				},
				menufocus: function(t, i) {
					var s, n;
					return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), void this.document.one("mousemove", function() {
						e(t.target).trigger(t.originalEvent)
					})) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
						item: n
					}) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, void(s && e.trim(s).length && (this.liveRegion.children().hide(), e("<div>").text(s).appendTo(this.liveRegion))))
				},
				menuselect: function(e, t) {
					var i = t.item.data("ui-autocomplete-item"),
						s = this.previous;
					this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function() {
						this.previous = s, this.selectedItem = i
					})), !1 !== this._trigger("select", e, {
						item: i
					}) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
				}
			}), this.liveRegion = e("<span>", {
				role: "status",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_destroy: function() {
			clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
		},
		_setOption: function(e, t) {
			this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort()
		},
		_appendTo: function() {
			var t = this.options.appendTo;
			return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
		},
		_initSource: function() {
			var t, i, s = this;
			e.isArray(this.options.source) ? (t = this.options.source, this.source = function(i, s) {
				s(e.ui.autocomplete.filter(t, i.term))
			}) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(t, n) {
				s.xhr && s.xhr.abort(), s.xhr = e.ajax({
					url: i,
					data: t,
					dataType: "json",
					success: function(e) {
						n(e)
					},
					error: function() {
						n([])
					}
				})
			}) : this.source = this.options.source
		},
		_searchTimeout: function(e) {
			clearTimeout(this.searching), this.searching = this._delay(function() {
				var t = this.term === this._value(),
					i = this.menu.element.is(":visible"),
					s = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
				(!t || t && !i && !s) && (this.selectedItem = null, this.search(null, e))
			}, this.options.delay)
		},
		search: function(e, t) {
			return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0
		},
		_search: function(e) {
			this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
				term: e
			}, this._response())
		},
		_response: function() {
			var t = ++this.requestIndex;
			return e.proxy(function(e) {
				t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
			}, this)
		},
		__response: function(e) {
			e && (e = this._normalize(e)), this._trigger("response", null, {
				content: e
			}), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
		},
		close: function(e) {
			this.cancelSearch = !0, this._close(e)
		},
		_close: function(e) {
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
		},
		_change: function(e) {
			this.previous !== this._value() && this._trigger("change", e, {
				item: this.selectedItem
			})
		},
		_normalize: function(t) {
			return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
				return "string" == typeof t ? {
					label: t,
					value: t
				} : e.extend({}, t, {
					label: t.label || t.value,
					value: t.value || t.label
				})
			})
		},
		_suggest: function(t) {
			var i = this.menu.element.empty();
			this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({
				of: this.element
			}, this.options.position)), this.options.autoFocus && this.menu.next()
		},
		_resizeMenu: function() {
			var e = this.menu.element;
			e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(t, i) {
			var s = this;
			e.each(i, function(e, i) {
				s._renderItemData(t, i)
			})
		},
		_renderItemData: function(e, t) {
			return this._renderItem(e, t).data("ui-autocomplete-item", t)
		},
		_renderItem: function(t, i) {
			return e("<li>").text(i.label).appendTo(t)
		},
		_move: function(e, t) {
			return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this.isMultiLine || this._value(this.term), void this.menu.blur()) : void this.menu[e](t) : void this.search(null, t)
		},
		widget: function() {
			return this.menu.element
		},
		_value: function() {
			return this.valueMethod.apply(this.element, arguments)
		},
		_keyEvent: function(e, t) {
			(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
		}
	}), e.extend(e.ui.autocomplete, {
		escapeRegex: function(e) {
			return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		},
		filter: function(t, i) {
			var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i");
			return e.grep(t, function(e) {
				return s.test(e.label || e.value || e)
			})
		}
	}), e.widget("ui.autocomplete", e.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function(e) {
					return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
				}
			}
		},
		__response: function(t) {
			var i;
			this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion))
		}
	});
	e.ui.autocomplete
});

/*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */
! function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	e.widget("ui.menu", {
		version: "1.11.4",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-carat-1-e"
			},
			items: "> *",
			menus: "ul",
			position: {
				my: "left-1 top",
				at: "right top"
			},
			role: "menu",
			blur: null,
			focus: null,
			select: null
		},
		_create: function() {
			this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
				role: this.options.role,
				tabIndex: 0
			}), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
				"mousedown .ui-menu-item": function(e) {
					e.preventDefault()
				},
				"click .ui-menu-item": function(t) {
					var i = e(t.target);
					!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
				},
				"mouseenter .ui-menu-item": function(t) {
					if (!this.previousFilter) {
						var i = e(t.currentTarget);
						i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i)
					}
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function(e, t) {
					var i = this.active || this.element.find(this.options.items).eq(0);
					t || this.focus(e, i)
				},
				blur: function(t) {
					this._delay(function() {
						e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
					})
				},
				keydown: "_keydown"
			}), this.refresh(), this._on(this.document, {
				click: function(e) {
					this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1
				}
			})
		},
		_destroy: function() {
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
				var t = e(this);
				t.data("ui-menu-submenu-carat") && t.remove()
			}), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
		},
		_keydown: function(t) {
			var i, s, n, a, o = !0;
			switch (t.keyCode) {
				case e.ui.keyCode.PAGE_UP:
					this.previousPage(t);
					break;
				case e.ui.keyCode.PAGE_DOWN:
					this.nextPage(t);
					break;
				case e.ui.keyCode.HOME:
					this._move("first", "first", t);
					break;
				case e.ui.keyCode.END:
					this._move("last", "last", t);
					break;
				case e.ui.keyCode.UP:
					this.previous(t);
					break;
				case e.ui.keyCode.DOWN:
					this.next(t);
					break;
				case e.ui.keyCode.LEFT:
					this.collapse(t);
					break;
				case e.ui.keyCode.RIGHT:
					this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
					break;
				case e.ui.keyCode.ENTER:
				case e.ui.keyCode.SPACE:
					this._activate(t);
					break;
				case e.ui.keyCode.ESCAPE:
					this.collapse(t);
					break;
				default:
					o = !1, s = this.previousFilter || "", n = String.fromCharCode(t.keyCode), a = !1, clearTimeout(this.filterTimer), n === s ? a = !0 : n = s + n, i = this._filterMenuItems(n), i = a && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(t.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(t, i), this.previousFilter = n, this.filterTimer = this._delay(function() {
						delete this.previousFilter
					}, 1e3)) : delete this.previousFilter
			}
			o && t.preventDefault()
		},
		_activate: function(e) {
			this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(e) : this.select(e))
		},
		refresh: function() {
			var t, i, s = this,
				n = this.options.icons.submenu,
				a = this.element.find(this.options.menus);
			this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).each(function() {
				var t = e(this),
					i = t.parent(),
					s = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
				i.attr("aria-haspopup", "true").prepend(s), t.attr("aria-labelledby", i.attr("id"))
			}), t = a.add(this.element), i = t.find(this.options.items), i.not(".ui-menu-item").each(function() {
				var t = e(this);
				s._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider")
			}), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
				tabIndex: -1,
				role: this._itemRole()
			}), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
		},
		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[this.options.role]
		},
		_setOption: function(e, t) {
			"icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t)
		},
		focus: function(e, t) {
			var i, s;
			this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), s = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function() {
				this._close()
			}, this.delay), i = t.children(".ui-menu"), i.length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, {
				item: t
			})
		},
		_scrollIntoView: function(t) {
			var i, s, n, a, o, r;
			this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, n = t.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = t.outerHeight(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r))
		},
		blur: function(e, t) {
			t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
				item: this.active
			}))
		},
		_startOpening: function(e) {
			clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function() {
				this._close(), this._open(e)
			}, this.delay))
		},
		_open: function(t) {
			var i = e.extend({
				of: this.active
			}, this.options.position);
			clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
		},
		collapseAll: function(t, i) {
			clearTimeout(this.timer), this.timer = this._delay(function() {
				var s = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
				s.length || (s = this.element), this._close(s), this.blur(t), this.activeMenu = s
			}, this.delay)
		},
		_close: function(e) {
			e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
		},
		_closeOnDocumentClick: function(t) {
			return !e(t.target).closest(".ui-menu").length
		},
		_isDivider: function(e) {
			return !/[^\-\u2014\u2013\s]/.test(e.text())
		},
		collapse: function(e) {
			var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			t && t.length && (this._close(), this.focus(e, t))
		},
		expand: function(e) {
			var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
			t && t.length && (this._open(t.parent()), this._delay(function() {
				this.focus(e, t)
			}))
		},
		next: function(e) {
			this._move("next", "first", e)
		},
		previous: function(e) {
			this._move("prev", "last", e)
		},
		isFirstItem: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		isLastItem: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		_move: function(e, t, i) {
			var s;
			this.active && (s = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[t]()), this.focus(i, s)
		},
		nextPage: function(t) {
			var i, s, n;
			return this.active ? void(this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
				return i = e(this), i.offset().top - s - n < 0
			}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(t)
		},
		previousPage: function(t) {
			var i, s, n;
			return this.active ? void(this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
				return i = e(this), i.offset().top - s + n > 0
			}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first()))) : void this.next(t)
		},
		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop("scrollHeight")
		},
		select: function(t) {
			this.active = this.active || e(t.target).closest(".ui-menu-item");
			var i = {
				item: this.active
			};
			this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i)
		},
		_filterMenuItems: function(t) {
			var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
				s = RegExp("^" + i, "i");
			return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
				return s.test(e.trim(e(this).text()))
			})
		}
	})
});