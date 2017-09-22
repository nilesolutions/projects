$(document).ready(function() {
	// fancybox JS
	$('a.fancybox, a[rel*="fancybox"]').fancybox({
		maxWidth: 1280,
		scrolling: 'visible',
		helpers: {
			overlay: {
				closeClick: false,
				locked: false,
				css: {
					background: 'rgba(0, 0, 0, 0.7)'
				}
			}
		},
		padding:0
	});

	// open close JS
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
	
	$('.item-block .opener').click(function(event) {
		$('.open-close.active').not($(this).parent()).removeClass('open');
		$(this).parent().toggleClass('active');
		event.preventDefault();
	});
	
	// SLick Gallery
	$('.slick-gallery').each(function(index, el) {
		var _autoplay = $(this).data('autoplay'),
			_autoplaySpeed = $(this).data('autoplay-speed'),
			_speed = $(this).data('speed'),
			_pause = $(this).data('pause');
		$(this).slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
			fade: false,
			speed: _speed,
			autoplay: _autoplay,
			pauseOnHover: _pause,
			autoplaySpeed: _autoplaySpeed
		});
	});
	$('.slick-gallery-2').each(function(index, el) {
		var _autoplay = $(this).data('autoplay'),
			_autoplaySpeed = $(this).data('autoplay-speed'),
			_speed = $(this).data('speed');
		$(this).slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			fade: true,
			cssEase: 'linear',
			autoplay: _autoplay,
			autoplaySpeed: _autoplaySpeed,
			speed: _speed
		});
	});
	$('.vertical-slick-gallery').slick({
		infinite: false,
		vertical: true,
		slidesToShow: 3,
		slidesToScroll: 2,
		arrows: true,
		dots: false,
		adaptiveHeight: false,
		prevArrow:'<button type="button" class="slick-prev"><span>Previous</span></button>',
		nextArrow:'<button type="button" class="slick-next"><span>Next</span></button>'
	});

	initLayout();
	initVideo();
	
	// init Sly scroll
	$(window).load(function() {
		initCustomScroll();
		initHoverStart();
	});

	$(window).resize(function(event) {
		initCustomScroll();
	});

	if ('SumoSelect' in $.fn) {
		$('select').SumoSelect({
			placeholder: 'Искать везде'
		});
	}
});

$('.bg-stretch').each(function(index, el) {
	var _src = $('> img', this).attr('src');
	$('> img', this).hide();
	$(this).css('background-image', 'url(' + _src + ')');
});

function initVideo() {
	$('.item').mouseenter(function(event) {
		var _video = $('video', this);
		if(_video.size()) {
			_video.trigger("play");
			$('[class*="slick-gallery"]').not('.slick-gallery-2').slick('slickPause');
		}
	}).mouseleave(function(event) {
		var _video = $('video', this);
		if(_video.size()) {
			$('[class*="slick-gallery"]').not('.slick-gallery-2').each(function(index, el) {
				if($(this).is('[data-autoplay="true"]')) $(this).slick('slickPlay');
			});
			setTimeout(function(){
				_video.prop("currentTime",0)
				_video.trigger("pause");
			}, 200);
		}
	});
}

function initLayout() {
	$('.item-holder').each(function(index, el) {
		var _length = $('.item', this).length;
		$(this).closest('.item-block').addClass('layout-' + _length);
	});
}

function initHoverStart() {
	$('.item').mouseenter(function(event) {
		$('.slick-gallery-2', this).slick('slickNext');
		$('.slick-gallery-2', this).slick('slickPlay');
		if($('.slick-gallery-2', this).size()) $('[class*="slick-gallery"]').not('.slick-gallery-2').slick('slickPause');
	}).mouseleave(function(event) {
		$('.slick-gallery-2', this).slick('slickPause');
		if($('.slick-gallery-2', this).size()) {
			$('[class*="slick-gallery"]').not('.slick-gallery-2').each(function(index, el) {
				if($(this).is('[data-autoplay="true"]')) $(this).slick('slickPlay');
			});
		}
	});
}

// Sly scroll
function initCustomScroll() {
	if ('sly' in $.fn) {
		$frame = $('.scroll');
		$frame.each(function() {
			var _this = $(this);
			var $wrap = $(this).parent();

			var _thisH = _this.height(),
				_listH = $('> *', _this).not('.scrollbar').outerHeight(true);

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
		$frame.mouseenter(function(event) {
			disableScroll();
		}).mouseleave(function(event) {
			enableScroll();
		});
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

// Grayscale Images fix for IE10-IE11
var GrayScaleFix = (function() {
	var needToFix = /(MSIE 10)|(Trident.*rv:11\.0)|( Edge\/[\d\.]+$)/.test(navigator.userAgent);

	function replaceImage(image) {
		var tmpImage = new Image();
		tmpImage.onload = function() {
			var imgWrapper = document.createElement('span'),
				svgTemplate = 
				'<svg xmlns="http://www.w3.org/2000/svg" id="svgroot" viewBox="0 0 '+tmpImage.width+' '+tmpImage.height+'" width="100%" height="100%">' +
					'<defs>' +
					'<filter id="gray">' +
						'<feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" />' +
					'</filter>' +
					'</defs>' +
					'<image filter="url(&quot;#gray&quot;)" x="0" y="0" width="'+tmpImage.width+'" height="'+tmpImage.height+'" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+tmpImage.src+'" />' +
				'</svg>';
			
			imgWrapper.innerHTML = svgTemplate;
			imgWrapper.className = 'grayscale-fix';
			image.parentNode.insertBefore(imgWrapper, image);

			image.style.cssText += 'visibility:hidden;display:block';
			imgWrapper.querySelector('svg').style.position = 'absolute';
			imgWrapper.style.cssText = 'display:inline-block;position:relative;';
			imgWrapper.appendChild(image);
		};
		tmpImage.src = image.src;
	}

	function replaceAll() {
		var images = document.querySelectorAll('.bg-stretch');
		for(var i = 0; i < images.length; i++) {
			replaceImage(images[i]);
		}
	}

	if(needToFix) {
		document.addEventListener('DOMContentLoaded', replaceAll);
	}

	return {
		replace: replaceImage,
		refresh: replaceAll
	};
}());