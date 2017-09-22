jQuery(function(){
	initTabs();
	initBgParallax();
	initMobileNav();
});

$(document).ready(function() {
	// fancybox JS
	$('a.fancybox, a[rel*="fancybox"]').fancybox({
		maxWidth: 1280,
		openMethod: 'fadescaleIn',
		closeMethod: 'fadescaleOut',
		//closeBtn: '.btn-close',
		scrolling: 'visible',
		helpers: {
			overlay: {
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
	
	//FullPage JS
	$('#fullpage').fullpage({
		navigation: true,
		responsiveWidth: 980,
		responsiveHeight: 600,
		navigationPosition: 'right',
		navigationTooltips: ['1938 рік', '1938 рік', '1945 рік', '1962 рік', '2003 рік', '1930 рік', '1939 рік'],
		onLeave: function(index, nextIndex, direction) {
			setTimeout(function() {
				if (!$('#section-footer').hasClass('active')) $('#footer').removeClass('show');
			}, 10);
			setTimeout(function() {
				if (!$('.fp-responsive').size()) {
					if (nextIndex >= 2) $('#header').addClass('small');
					else $('#header').removeClass('small');
				}
			}, 200);
		},
		afterLoad: function(anchorLink, index) {
			if($('#section-footer').hasClass('active')) $('#footer').addClass('show');
			else $('#footer').removeClass('show');
			if ($('.fp-responsive').size()) {
				if (index >= 2) $('#header').addClass('small');
				else $('#header').removeClass('small');
			}
		}
	});
	
	$('.save-link').click(function(event) {
		$.fn.fullpage.moveSectionDown();
		event.preventDefault();
	});
	
	// SLick Gallery
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
		slidesToShow: 6,
		slidesToScroll: 1,
		adaptiveHeight: false,
		touchMove:true,
		dots: false,
		arrows: true,
		asNavFor: '.slick-gallery',
		focusOnSelect: true
	});
});

$(window).load(function() {
	initCD();
	initAudio();
});

function initAudio() {
	$(document).on('click', '.song-list a', function(event) {
		var _this = $(this);
			_audio = _this.closest('li').find('audio');
		if(!_this.hasClass('active')) {
			$('.song-list .active').removeClass('active');
			$(this).addClass('active');
			$('.song-list audio').trigger('pause');
			_audio.trigger("play");
			_audio.prop("currentTime",0)
		} else {
			$('.song-list .active').removeClass('active');
			$('.song-list audio').trigger('pause');
		}
		event.preventDefault();
	});
}

function initCD() {
	var _top = $(window).scrollTop() + $(window).height();
	$('.block .img-holder').each(function(index, el) {
		var _blockTop = $(this).offset().top + $(this).height() / 2;
		if(_top >= _blockTop && _top <= _blockTop + $(this).height() / 2) $(this).closest('.block').addClass('animate');
	});
	$(window).scroll(function(event) {
		var _top = $(window).scrollTop() + $(window).height();
		$('.block .img-holder').each(function(index, el) {
			var _blockTop = $(this).offset().top + $(this).height() / 2;
			if(_top >= _blockTop && _top <= _blockTop + $(this).height() / 2) $(this).closest('.block').addClass('animate');
		});
	});
}

// content tabs init
function initTabs() {
	jQuery('ul.tabset').tabset({
		tabLinks: 'a',
		defaultTab: false
	});
}

// mobile menu init
function initMobileNav() {
	jQuery('body').mobileNav({
		menuActiveClass: 'nav-active',
		menuOpener: '.nav-opener'
	});
}

// load more init
function initBgParallax() {
	jQuery('.bg-holder').parallaxBlock({
		image: '> img',
		parallaxOffset: 300
	});
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

/*
 * Simple Mobile Navigation
 */
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
			doc = $('html'),
			resizeClass = 'resize-active',
			flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(options) {
		return this.each(function() {
			var params = $.extend({}, options, {container: this}),
				instance = new MobileNav(params);
			$.data(this, 'MobileNav', instance);
		});
	};
}(jQuery));

/*
 * jQuery BG Parallax plugin
 */
;(function($){
	'use strict';

	var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	var ParallaxController = (function() {
		var $win = $(window);
		var items = [];
		var winProps = {
			width: 0,
			height: 0,
			scrollTop: 0
		};

		return {
			init: function() {
				$win.on('load resize orientationchange', this.resizeHandler.bind(this));
				$win.on('scroll', this.scrollHandler.bind(this));

				this.resizeHandler();
			},

			resizeHandler: function() {
				winProps.width = $win.width();
				winProps.height = $win.height();

				$.each(items, this.calculateSize.bind(this));
			},

			scrollHandler: function() {
				winProps.scrollTop = $win.scrollTop();

				$.each(items, this.calculateScroll.bind(this));
			},

			calculateSize: function(i) {
				var item = items[i];
				var bgWidth;
				var bgHeight;

				item.height = item.$el.outerHeight();
				item.width = item.$el.outerWidth();
				item.topOffset = item.$el.offset().top;
				item.bgHeight = winProps.height + item.options.parallaxOffset;
				item.itemRatio = winProps.width / (winProps.height + item.options.parallaxOffset);

				if (item.imageRatio <= item.itemRatio) {
					bgWidth = winProps.width;
					bgHeight = bgWidth / item.imageRatio;

					bgWidth += 'px ';
					bgHeight += 'px ';
				} else {
					bgWidth = 'auto ';
					bgHeight = winProps.height + item.options.parallaxOffset;

					bgHeight += 'px ';
				}

				item.$el.css({
					backgroundSize: bgWidth + bgHeight
				});

				this.calculateScroll(i);
			},

			calculateScroll: function(i) {
				var item = items[i];
				var curPos;
				var offsetPercentage = Math.max(0, Math.min((winProps.scrollTop + winProps.height - item.topOffset)/(winProps.height + item.height), 1)).toFixed(4);

				if(item.imageRatio <= item.itemRatio) {
					curPos = '50% ' + ((-parseFloat(offsetPercentage) * item.options.parallaxOffset) - (item.bgHeight - winProps.height) / 2) + 'px';
				} else {
					curPos = '50% ' + (-parseFloat(offsetPercentage) * item.options.parallaxOffset) + 'px';
				}

				item.$el.css({backgroundPosition: curPos});
			},

			add: function(el, options) {
				var $el = $(el);
				var $image = $el.find(options.image);
				var imageRatio = $image.attr('width') / $image.attr('height') || $image.width() / $image.height();

				$el.css({
					backgroundImage: 'url(' + $image.attr('src') + ')'
				});

				if (isTouchDevice) {
					$el.addClass(options.fallbackClass);
					return;
				}

				$image.remove();

				options.parallaxOffset = Math.abs(options.parallaxOffset);

				var newIndex = items.push({
					$el: $(el),
					options: options,
					imageRatio: imageRatio
				});

				this.calculateSize(newIndex - 1);
			}
		};
	}());

	ParallaxController.init();

	$.fn.parallaxBlock = function(options){
		options = $.extend({
			parallaxOffset: 100,
			fallbackClass: 'fallback-class',
			image: 'img'
		}, options);
		
		return this.each(function() {
			if (this.added) {
				return;
			}

			this.added = true;
			ParallaxController.add(this, options);
		});
	};
}(jQuery));