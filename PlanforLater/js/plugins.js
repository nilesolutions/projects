/*! jQuery UI - v1.11.4 - 2016-06-22
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, slider.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,s){var n,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=t.parentNode,a=n.name,t.href&&a&&"map"===n.nodeName.toLowerCase()?(o=e("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!t.disabled:"a"===r?t.href||s:s)&&i(t)}function i(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return s&&"static"===t.css("position")?!1:n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(i){return t(i,!isNaN(e.attr(i,"tabindex")))},tabbable:function(i){var s=e.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&t(i,!n)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,s,n=e(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}};var s=0,n=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(o){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r,h={},l=t.split(".")[0];return t=t.split(".")[1],n=l+"-"+t,s||(s=i,i=e.Widget),e.expr[":"][n.toLowerCase()]=function(t){return!!e.data(t,n)},e[l]=e[l]||{},a=e[l][t],o=e[l][t]=function(e,t){return this._createWidget?(arguments.length&&this._createWidget(e,t),void 0):new o(e,t)},e.extend(o,a,{version:s.version,_proto:e.extend({},s),_childConstructors:[]}),r=new i,r.options=e.widget.extend({},r.options),e.each(s,function(t,s){return e.isFunction(s)?(h[t]=function(){var e=function(){return i.prototype[t].apply(this,arguments)},n=function(e){return i.prototype[t].apply(this,e)};return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}(),void 0):(h[t]=s,void 0)}),o.prototype=e.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||t:t},h,{constructor:o,namespace:l,widgetName:t,widgetFullName:n}),a?(e.each(a._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){for(var i,s,a=n.call(arguments,1),o=0,r=a.length;r>o;o++)for(i in a[o])s=a[o][i],a[o].hasOwnProperty(i)&&void 0!==s&&(t[i]=e.isPlainObject(s)?e.isPlainObject(t[i])?e.widget.extend({},t[i],s):e.widget.extend({},s):s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(a){var o="string"==typeof a,r=n.call(arguments,1),h=this;return o?this.each(function(){var i,n=e.data(this,s);return"instance"===a?(h=n,!1):n?e.isFunction(n[a])&&"_"!==a.charAt(0)?(i=n[a].apply(n,r),i!==n&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+a+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+a+"'")}):(r.length&&(a=e.widget.extend.apply(null,[a].concat(r))),this.each(function(){var t=e.data(this,s);t?(t.option(a||{}),t._init&&t._init()):e.data(this,s,new i(a,this))})),h}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=s++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?i.ownerDocument:i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof t)if(o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,i,s){var n,a=this;"boolean"!=typeof t&&(s=i,i=t,t=!1),s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){return t||a.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(i).undelegate(i),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}}),e.widget;var a=!1;e(document).mouseup(function(){a=!1}),e.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(!a){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,n="string"==typeof this.options.cancel&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(t)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(t)!==!1,!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),a=!0,!0)):!0}},_mouseMove:function(t){if(this._mouseMoved){if(e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button)return this._mouseUp(t);if(!t.which)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),a=!1,!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),e.widget("ui.slider",e.ui.mouse,{version:"1.11.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;i>t;t++)o.push(a);this.handles=n.add(e(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t)})},_createRange:function(){var t=this.options,i="";t.range?(t.range===!0&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=e("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===t.range||"max"===t.range?" ui-slider-range-"+t.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(t){var i,s,n,a,o,r,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-u.values(t));(n>i||n===i&&(t===u._lastChangedValue||u.values(t)===c.min))&&(n=i,a=e(this),o=t)}),r=this._start(t,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-h.left-a.width()/2,top:t.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,n,a;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(e,t){var i={handle:this.handles[t],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("start",e,i)},_slide:function(e,t,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(t?0:1),2===this.options.values.length&&this.options.range===!0&&(0===t&&i>s||1===t&&s>i)&&(i=s),i!==this.values(t)&&(n=this.values(),n[t]=i,a=this._trigger("slide",e,{handle:this.handles[t],value:i,values:n}),s=this.values(t?0:1),a!==!1&&this.values(t,i))):i!==this.value()&&(a=this._trigger("slide",e,{handle:this.handles[t],value:i}),a!==!1&&this.value(i))},_stop:function(e,t){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._trigger("stop",e,i)},_change:function(e,t){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[t],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(t),i.values=this.values()),this._lastChangedValue=t,this._trigger("change",e,i)}},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),this._change(null,t),void 0;if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(t,i){var s,n=0;switch("range"===t&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!i),this._super(t,i),t){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(this._valueMin()>=e)return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=this.options.max,t=this._valueMin(),i=this.options.step,s=Math.floor(+(e-t).toFixed(this._precision())/i)*i;e=s+t,this.max=parseFloat(e.toFixed(this._precision()))},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=""+e,i=t.indexOf(".");return-1===i?0:t.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var t,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(t){var i,s,n,a,o=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,e(t.target).addClass("ui-state-active"),i=this._start(t,o),i===!1))return}switch(a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),t.keyCode){case e.ui.keyCode.HOME:n=this._valueMin();break;case e.ui.keyCode.END:n=this._valueMax();break;case e.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a)}this._slide(t,o,n)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),e(t.target).removeClass("ui-state-active"))}}})});


(function ( $ ) {

	$.fn.crfi = function() {
		this.change(function() {
			if ($(this).attr('type') == "radio") {
				$("input[name="+$(this).attr('name')+"]").not(this).next(".crf").removeClass("checked");
			}
			if ($(this).prop('checked')) {
				$(this).next().addClass("checked");
			} else {
				$(this).next().removeClass("checked");
			}
		});
		this.not(".crf-i").each(function(i) {
			$(this).attr("id", "crf-input-"+i).css({ position: "absolute", left: -9999+"em" }).addClass("crf-i").next("label").addClass("crf").attr("for", "crf-input-"+i);
			if ($(this).prop('checked')) {
				$(this).next().addClass("checked");
			}
		});
	};

	var settings;
	function closeF() {
		if ($(".crf-sm.opened").length) {
			$(".crf-s.opened").removeClass("opened");
			$(".crf-sm.opened").removeClass("opened").hide();
			settings.close.call()
		}
	}

	var methods = {
		init : function(options) {
			settings = $.extend({
				select: function(){},
				done: function(){},
				open: function(){},
				close: function(){}
			}, options);

			$(document).unbind("click.crfs").on("click.crfs", ".crf-s", function() {
				var currentItem = $("div[data-id="+$(this).attr("id")+"]");
				if (currentItem.is(":visible")) {
					closeF()
					return false;
				}
				closeF()
				var outh = $(this).outerHeight();
				var selectCl = $(this).find("select").attr("class");
				var offsetE = $(this).offset();
				var currHei = currentItem.show().height();
				currentItem.css({ position: "absolute", left: -9999+"em" });
				$(this).addClass("opened");
				currentItem.addClass("opened "+selectCl).css({ left: offsetE.left, top: (offsetE.top+outh+currHei > $(document).height()) ? offsetE.top-currHei : offsetE.top+outh, width: $(this).outerWidth() }).show();
				settings.open.call()
			});
			$(document).click(function(e){
				if( $(e.target).closest(".crf-sm.opened, .crf-s.opened").length > 0 ) {
					return false;
				}
				closeF();
			});


			$(window).resize(function(){
				var currentT = $(".crf-s.opened");
				if (currentT.length) {
					var currentItem = $(".crf-sm.opened");
					var outh = currentT.outerHeight();
					var offsetE = currentT.offset();
					var currHei = currentItem.height();
					currentItem.css({ left: offsetE.left, top: (offsetE.top+outh+currHei > $(document).height()) ? offsetE.top-currHei : offsetE.top+outh, width: currentT.outerWidth() });
				}
			});

			$(document).on("click.crfs", ".crf-sm li", function() {
				var currentMenu = $(this).parentsUntil(".crf-sm").parent().attr("data-id");
				var currentClass = $("#"+currentMenu).attr("class");
				$("#"+currentMenu).attr("class", "crf-s").addClass($(this).attr("class").replace("selected", "")).addClass(currentClass.replace("hided-s", "").replace("opened", "")).find(".option").html($(this).html());
				$("#"+currentMenu).find("select").children().prop('selected', false).eq($(this).index()).prop('selected', true).change();
				$(this).parentsUntil(".crf-sm").parent().find(".selected").removeClass("selected");
				$(this).addClass("selected");
				closeF()
				settings.select.call()
				return false;
			});


			this.each(function(i) {
				if (!$(this).hasClass("hided-s")) {
					$(this).addClass("hided-s").hide().wrap("<span class='crf-s "+$(this).attr("class")+"' id='crf-s-"+i+"' />").parent().append("<span class='option'>"+$(this).find("option:selected").html()+"</span>");
					var menuList= $("<ul></ul>");

					$(this).children().each(function() {
						menuList.append("<li class='"+(($(this).attr('class') != undefined) ? $(this).attr('class')+"" : "") + (($(this).is(':selected')) ? " selected" : "") +"'><span class='link'>"+$(this).html()+"</span></li>");
					});
					$("<div class='crf-sm' data-id='crf-s-"+i+"'/>").append(menuList).appendTo("body")
					settings.done.call()
				};
			});

		},
		hide : function( ) { closeF(); }
	};

	$.fn.crfs = function(methodOrOptions) {
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			return methods.init.apply( this, arguments );
		}    
	};
}( jQuery ));


/*!jQuery Knob*/
/**
 * Downward compatible, touchable dial
 *
 * Version: 1.2.12
 * Requires: jQuery v1.7+
 *
 * Copyright (c) 2012 Anthony Terrien
 * Under MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Thanks to vor, eskimoblood, spiffistan, FabrizioC
 */
 (function (factory) {
 	if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    /**
     * Kontrol library
     */
     "use strict";

    /**
     * Definition of globals and core
     */
    var k = {}, // kontrol
    max = Math.max,
    min = Math.min;

    k.c = {};
    k.c.d = $(document);
    k.c.t = function (e) {
    	return e.originalEvent.touches.length - 1;
    };

    /**
     * Kontrol Object
     *
     * Definition of an abstract UI control
     *
     * Each concrete component must call this one.
     * <code>
     * k.o.call(this);
     * </code>
     */
     k.o = function () {
     	var s = this;

        this.o = null; // array of options
        this.$ = null; // jQuery wrapped element
        this.i = null; // mixed HTMLInputElement or array of HTMLInputElement
        this.g = null; // deprecated 2D graphics context for 'pre-rendering'
        this.v = null; // value ; mixed array or integer
        this.cv = null; // change value ; not commited value
        this.x = 0; // canvas x position
        this.y = 0; // canvas y position
        this.w = 0; // canvas width
        this.h = 0; // canvas height
        this.$c = null; // jQuery canvas element
        this.c = null; // rendered canvas context
        this.t = 0; // touches index
        this.isInit = false;
        this.fgColor = null; // main color
        this.pColor = null; // previous color
        this.dH = null; // draw hook
        this.cH = null; // change hook
        this.eH = null; // cancel hook
        this.rH = null; // release hook
        this.scale = 1; // scale factor
        this.relative = false;
        this.relativeWidth = false;
        this.relativeHeight = false;
        this.$div = null; // component div

        this.run = function () {
        	var cf = function (e, conf) {
        		var k;
        		for (k in conf) {
        			s.o[k] = conf[k];
        		}
        		s._carve().init();
        		s._configure()
        		._draw();
        	};

        	if (this.$.data('kontroled')) return;
        	this.$.data('kontroled', true);

        	this.extend();
        	this.o = $.extend({
                    // Config
                    min: this.$.data('min') !== undefined ? this.$.data('min') : 0,
                    max: this.$.data('max') !== undefined ? this.$.data('max') : 100,
                    stopper: true,
                    readOnly: this.$.data('readonly') || (this.$.attr('readonly') === 'readonly'),

                    // UI
                    cursor: this.$.data('cursor') === true && 30
                    || this.$.data('cursor') || 0,
                    thickness: this.$.data('thickness')
                    && Math.max(Math.min(this.$.data('thickness'), 1), 0.01)
                    || 0.35,
                    lineCap: this.$.data('linecap') || 'butt',
                    width: this.$.data('width') || 200,
                    height: this.$.data('height') || 200,
                    displayInput: this.$.data('displayinput') == null || this.$.data('displayinput'),
                    displayPrevious: this.$.data('displayprevious'),
                    fgColor: this.$.data('fgcolor') || '#87CEEB',
                    inputColor: this.$.data('inputcolor'),
                    font: this.$.data('font') || 'Arial',
                    fontWeight: this.$.data('font-weight') || 'bold',
                    inline: false,
                    step: this.$.data('step') || 1,
                    rotation: this.$.data('rotation'),

                    // Hooks
                    draw: null, // function () {}
                    change: null, // function (value) {}
                    cancel: null, // function () {}
                    release: null, // function (value) {}

                    // Output formatting, allows to add unit: %, ms ...
                    format: function(v) {
                    	return v;
                    },
                    parse: function (v) {
                    	return parseFloat(v);
                    }
                }, this.o
                );

            // finalize options
            this.o.flip = this.o.rotation === 'anticlockwise' || this.o.rotation === 'acw';
            if (!this.o.inputColor) {
            	this.o.inputColor = this.o.fgColor;
            }

            // routing value
            if (this.$.is('fieldset')) {

                // fieldset = array of integer
                this.v = {};
                this.i = this.$.find('input');
                this.i.each(function(k) {
                	var $this = $(this);
                	s.i[k] = $this;
                	s.v[k] = s.o.parse($this.val());

                	$this.bind(
                		'change blur',
                		function () {
                			var val = {};
                			val[k] = $this.val();
                			s.val(s._validate(val));
                		}
                		);
                });
                this.$.find('legend').remove();
            } else {

                // input = integer
                this.i = this.$;
                this.v = this.o.parse(this.$.val());
                this.v === '' && (this.v = this.o.min);
                this.$.bind(
                	'change blur',
                	function () {
                		s.val(s._validate(s.o.parse(s.$.val())));
                	}
                	);

            }

            !this.o.displayInput && this.$.hide();

            // adds needed DOM elements (canvas, div)
            this.$c = $(document.createElement('canvas')).attr({
            	width: this.o.width,
            	height: this.o.height
            });

            // wraps all elements in a div
            // add to DOM before Canvas init is triggered
            this.$div = $('<div style="'
            	+ (this.o.inline ? 'display:inline;' : '')
            	+ 'width:' + this.o.width + 'px;height:' + this.o.height + 'px;'
            	+ '"></div>');

            this.$.wrap(this.$div).before(this.$c);
            this.$div = this.$.parent();

            if (typeof G_vmlCanvasManager !== 'undefined') {
            	G_vmlCanvasManager.initElement(this.$c[0]);
            }

            this.c = this.$c[0].getContext ? this.$c[0].getContext('2d') : null;

            if (!this.c) {
            	throw {
            		name:        "CanvasNotSupportedException",
            		message:     "Canvas not supported. Please use excanvas on IE8.0.",
            		toString:    function(){return this.name + ": " + this.message}
            	}
            }

            // hdpi support
            this.scale = (window.devicePixelRatio || 1) / (
            	this.c.webkitBackingStorePixelRatio ||
            	this.c.mozBackingStorePixelRatio ||
            	this.c.msBackingStorePixelRatio ||
            	this.c.oBackingStorePixelRatio ||
            	this.c.backingStorePixelRatio || 1
            	);

            // detects relative width / height
            this.relativeWidth =  this.o.width % 1 !== 0
            && this.o.width.indexOf('%');
            this.relativeHeight = this.o.height % 1 !== 0
            && this.o.height.indexOf('%');
            this.relative = this.relativeWidth || this.relativeHeight;

            // computes size and carves the component
            this._carve();

            // prepares props for transaction
            if (this.v instanceof Object) {
            	this.cv = {};
            	this.copy(this.v, this.cv);
            } else {
            	this.cv = this.v;
            }

            // binds configure event
            this.$
            .bind("configure", cf)
            .parent()
            .bind("configure", cf);

            // finalize init
            this._listen()
            ._configure()
            ._xy()
            .init();

            this.isInit = true;

            this.$.val(this.o.format(this.v));
            this._draw();

            return this;
        };

        this._carve = function() {
        	if (this.relative) {
        		var w = this.relativeWidth ?
        		this.$div.parent().width() *
        		parseInt(this.o.width) / 100
        		: this.$div.parent().width(),
        		h = this.relativeHeight ?
        		this.$div.parent().height() *
        		parseInt(this.o.height) / 100
        		: this.$div.parent().height();

                // apply relative
                this.w = this.h = Math.min(w, h);
            } else {
            	this.w = this.o.width;
            	this.h = this.o.height;
            }

            // finalize div
            this.$div.css({
            	'width': this.w + 'px',
            	'height': this.h + 'px'
            });

            // finalize canvas with computed width
            this.$c.attr({
            	width: this.w,
            	height: this.h
            });

            // scaling
            if (this.scale !== 1) {
            	this.$c[0].width = this.$c[0].width * this.scale;
            	this.$c[0].height = this.$c[0].height * this.scale;
            	this.$c.width(this.w);
            	this.$c.height(this.h);
            }

            return this;
        };

        this._draw = function () {

            // canvas pre-rendering
            var d = true;

            s.g = s.c;

            s.clear();

            s.dH && (d = s.dH());

            d !== false && s.draw();
        };

        this._touch = function (e) {
        	var touchMove = function (e) {
        		var v = s.xy2val(
        			e.originalEvent.touches[s.t].pageX,
        			e.originalEvent.touches[s.t].pageY
        			);

        		if (v == s.cv) return;

        		if (s.cH && s.cH(v) === false) return;

        		s.change(s._validate(v));
        		s._draw();
        	};

            // get touches index
            this.t = k.c.t(e);

            // First touch
            touchMove(e);

            // Touch events listeners
            k.c.d
            .bind("touchmove.k", touchMove)
            .bind(
            	"touchend.k",
            	function () {
            		k.c.d.unbind('touchmove.k touchend.k');
            		s.val(s.cv);
            	}
            	);

            return this;
        };

        this._mouse = function (e) {
        	var mouseMove = function (e) {
        		var v = s.xy2val(e.pageX, e.pageY);

        		if (v == s.cv) return;

        		if (s.cH && (s.cH(v) === false)) return;

        		s.change(s._validate(v));
        		s._draw();
        	};

            // First click
            mouseMove(e);

            // Mouse events listeners
            k.c.d
            .bind("mousemove.k", mouseMove)
            .bind(
                    // Escape key cancel current change
                    "keyup.k",
                    function (e) {
                    	if (e.keyCode === 27) {
                    		k.c.d.unbind("mouseup.k mousemove.k keyup.k");

                    		if (s.eH && s.eH() === false)
                    			return;

                    		s.cancel();
                    	}
                    }
                    )
            .bind(
            	"mouseup.k",
            	function (e) {
            		k.c.d.unbind('mousemove.k mouseup.k keyup.k');
            		s.val(s.cv);
            	}
            	);

            return this;
        };

        this._xy = function () {
        	var o = this.$c.offset();
        	this.x = o.left;
        	this.y = o.top;

        	return this;
        };

        this._listen = function () {
        	if (!this.o.readOnly) {
        		this.$c
        		.bind(
        			"mousedown",
        			function (e) {
        				e.preventDefault();
        				s._xy()._mouse(e);
        			}
        			)
        		.bind(
        			"touchstart",
        			function (e) {
        				e.preventDefault();
        				s._xy()._touch(e);
        			}
        			);

        		this.listen();
        	} else {
        		this.$.attr('readonly', 'readonly');
        	}

        	if (this.relative) {
        		$(window).resize(function() {
        			s._carve().init();
        			s._draw();
        		});
        	}

        	return this;
        };

        this._configure = function () {

            // Hooks
            if (this.o.draw) this.dH = this.o.draw;
            if (this.o.change) this.cH = this.o.change;
            if (this.o.cancel) this.eH = this.o.cancel;
            if (this.o.release) this.rH = this.o.release;

            if (this.o.displayPrevious) {
            	this.pColor = this.h2rgba(this.o.fgColor, "0.4");
            	this.fgColor = this.h2rgba(this.o.fgColor, "0.6");
            } else {
            	this.fgColor = this.o.fgColor;
            }

            return this;
        };

        this._clear = function () {
        	this.$c[0].width = this.$c[0].width;
        };

        this._validate = function (v) {
        	var val = (~~ (((v < 0) ? -0.5 : 0.5) + (v/this.o.step))) * this.o.step;
        	return Math.round(val * 100) / 100;
        };

        // Abstract methods
        this.listen = function () {}; // on start, one time
        this.extend = function () {}; // each time configure triggered
        this.init = function () {}; // each time configure triggered
        this.change = function (v) {}; // on change
        this.val = function (v) {}; // on release
        this.xy2val = function (x, y) {}; //
        this.draw = function () {}; // on change / on release
        this.clear = function () { this._clear(); };

        // Utils
        this.h2rgba = function (h, a) {
        	var rgb;
        	h = h.substring(1,7);
        	rgb = [
        	parseInt(h.substring(0,2), 16),
        	parseInt(h.substring(2,4), 16),
        	parseInt(h.substring(4,6), 16)
        	];

        	return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + a + ")";
        };

        this.copy = function (f, t) {
        	for (var i in f) {
        		t[i] = f[i];
        	}
        };
    };


    /**
     * k.Dial
     */
     k.Dial = function () {
     	k.o.call(this);

     	this.startAngle = null;
     	this.xy = null;
     	this.radius = null;
     	this.lineWidth = null;
     	this.cursorExt = null;
     	this.w2 = null;
     	this.PI2 = 2*Math.PI;

     	this.extend = function () {
     		this.o = $.extend({
     			bgColor: this.$.data('bgcolor') || '#EEEEEE',
     			angleOffset: this.$.data('angleoffset') || 0,
     			angleArc: this.$.data('anglearc') || 360,
     			inline: true
     		}, this.o);
     	};

     	this.val = function (v, triggerRelease) {
     		if (null != v) {

                // reverse format
                v = this.o.parse(v);

                if (triggerRelease !== false
                	&& v != this.v
                	&& this.rH
                	&& this.rH(v) === false) { return; }

                	this.cv = this.o.stopper ? max(min(v, this.o.max), this.o.min) : v;
                this.v = this.cv;
                this.$.val(this.o.format(this.v));
                this._draw();
            } else {
            	return this.v;
            }
        };

        this.xy2val = function (x, y) {
        	var a, ret;

        	a = Math.atan2(
        		x - (this.x + this.w2),
        		- (y - this.y - this.w2)
        		) - this.angleOffset;

        	if (this.o.flip) {
        		a = this.angleArc - a - this.PI2;
        	}

        	if (this.angleArc != this.PI2 && (a < 0) && (a > -0.5)) {

                // if isset angleArc option, set to min if .5 under min
                a = 0;
            } else if (a < 0) {
            	a += this.PI2;
            }

            ret = (a * (this.o.max - this.o.min) / this.angleArc) + this.o.min;

            this.o.stopper && (ret = max(min(ret, this.o.max), this.o.min));

            return ret;
        };

        this.listen = function () {

            // bind MouseWheel
            var s = this, mwTimerStop,
            mwTimerRelease,
            mw = function (e) {
            	e.preventDefault();

            	var ori = e.originalEvent,
            	deltaX = ori.detail || ori.wheelDeltaX,
            	deltaY = ori.detail || ori.wheelDeltaY,
            	v = s._validate(s.o.parse(s.$.val()))
            	+ (
            		deltaX > 0 || deltaY > 0
            		? s.o.step
            		: deltaX < 0 || deltaY < 0 ? -s.o.step : 0
            		);

            	v = max(min(v, s.o.max), s.o.min);

            	s.val(v, false);

            	if (s.rH) {
                        // Handle mousewheel stop
                        clearTimeout(mwTimerStop);
                        mwTimerStop = setTimeout(function () {
                        	s.rH(v);
                        	mwTimerStop = null;
                        }, 100);

                        // Handle mousewheel releases
                        if (!mwTimerRelease) {
                        	mwTimerRelease = setTimeout(function () {
                        		if (mwTimerStop)
                        			s.rH(v);
                        		mwTimerRelease = null;
                        	}, 200);
                        }
                    }
                },
                kval,
                to,
                m = 1,
                kv = {
                	37: -s.o.step,
                	38: s.o.step,
                	39: s.o.step,
                	40: -s.o.step
                };

                this.$
                .bind(
                	"keydown",
                	function (e) {
                		var kc = e.keyCode;

                        // numpad support
                        if (kc >= 96 && kc <= 105) {
                        	kc = e.keyCode = kc - 48;
                        }

                        kval = parseInt(String.fromCharCode(kc));

                        if (isNaN(kval)) {
                            (kc !== 13)                     // enter
                            && kc !== 8                     // bs
                            && kc !== 9                     // tab
                            && kc !== 189                   // -
                            && (kc !== 190
                                || s.$.val().match(/\./))   // . allowed once
                            && e.preventDefault();

                            // arrows
                            if ($.inArray(kc,[37,38,39,40]) > -1) {
                            	e.preventDefault();

                            	var v = s.o.parse(s.$.val()) + kv[kc] * m;
                            	s.o.stopper && (v = max(min(v, s.o.max), s.o.min));

                            	s.change(s._validate(v));
                            	s._draw();

                                // long time keydown speed-up
                                to = window.setTimeout(function () {
                                	m *= 2;
                                }, 30);
                            }
                        }
                    }
                    )
                .bind(
                	"keyup",
                	function (e) {
                		if (isNaN(kval)) {
                			if (to) {
                				window.clearTimeout(to);
                				to = null;
                				m = 1;
                				s.val(s.$.val());
                			}
                		} else {
                            // kval postcond
                            (s.$.val() > s.o.max && s.$.val(s.o.max))
                            || (s.$.val() < s.o.min && s.$.val(s.o.min));
                        }
                    }
                    );

                this.$c.bind("mousewheel DOMMouseScroll", mw);
                this.$.bind("mousewheel DOMMouseScroll", mw);
            };

            this.init = function () {
            	if (this.v < this.o.min
            		|| this.v > this.o.max) { this.v = this.o.min; }

            		this.$.val(this.v);
            	this.w2 = this.w / 2;
            	this.cursorExt = this.o.cursor / 100;
            	this.xy = this.w2 * this.scale;
            	this.lineWidth = this.xy * this.o.thickness;
            	this.lineCap = this.o.lineCap;
            	this.radius = this.xy - this.lineWidth / 2;

            	this.o.angleOffset
            	&& (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset);

            	this.o.angleArc
            	&& (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc);

            // deg to rad
            this.angleOffset = this.o.angleOffset * Math.PI / 180;
            this.angleArc = this.o.angleArc * Math.PI / 180;

            // compute start and end angles
            this.startAngle = 1.5 * Math.PI + this.angleOffset;
            this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;

            var s = max(
            	String(Math.abs(this.o.max)).length,
            	String(Math.abs(this.o.min)).length,
            	2
            	) + 2;

            this.o.displayInput
            && this.i.css({
            	'width' : ((this.w / 2 + 4) >> 0) + 'px',
            	'height' : ((this.w / 3) >> 0) + 'px',
            	'position' : 'absolute',
            	'vertical-align' : 'middle',
            	'margin-top' : ((this.w / 3) >> 0) + 'px',
            	'margin-left' : '-' + ((this.w * 3 / 4 + 2) >> 0) + 'px',
            	'border' : 0,
            	'background' : 'none',
            	'font' : this.o.fontWeight + ' ' + ((this.w / s) >> 0) + 'px ' + this.o.font,
            	'text-align' : 'center',
            	'color' : this.o.inputColor || this.o.fgColor,
            	'padding' : '0px',
            	'-webkit-appearance': 'none'
            }) || this.i.css({
            	'width': '0px',
            	'visibility': 'hidden'
            });
        };

        this.change = function (v) {
        	this.cv = v;
        	this.$.val(this.o.format(v));
        };

        this.angle = function (v) {
        	return (v - this.o.min) * this.angleArc / (this.o.max - this.o.min);
        };

        this.arc = function (v) {
        	var sa, ea;
        	v = this.angle(v);
        	if (this.o.flip) {
        		sa = this.endAngle + 0.00001;
        		ea = sa - v - 0.00001;
        	} else {
        		sa = this.startAngle - 0.00001;
        		ea = sa + v + 0.00001;
        	}
        	this.o.cursor
        	&& (sa = ea - this.cursorExt)
        	&& (ea = ea + this.cursorExt);

        	return {
        		s: sa,
        		e: ea,
        		d: this.o.flip && !this.o.cursor
        	};
        };

        this.draw = function () {
            var c = this.g,                 // context
                a = this.arc(this.cv),      // Arc
                pa,                         // Previous arc
                r = 1;

                c.lineWidth = this.lineWidth;
                c.lineCap = this.lineCap;

                if (this.o.bgColor !== "none") {
                	c.beginPath();
                	c.strokeStyle = this.o.bgColor;
                	c.arc(this.xy, this.xy, this.radius, this.endAngle - 0.00001, this.startAngle + 0.00001, true);
                	c.stroke();
                }

                if (this.o.displayPrevious) {
                	pa = this.arc(this.v);
                	c.beginPath();
                	c.strokeStyle = this.pColor;
                	c.arc(this.xy, this.xy, this.radius, pa.s, pa.e, pa.d);
                	c.stroke();
                	r = this.cv == this.v;
                }

                c.beginPath();
                c.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                c.arc(this.xy, this.xy, this.radius, a.s, a.e, a.d);
                c.stroke();
            };

            this.cancel = function () {
            	this.val(this.v);
            };
        };

        $.fn.dial = $.fn.knob = function (o) {
        	return this.each(
        		function () {
        			var d = new k.Dial();
        			d.o = o;
        			d.$ = $(this);
        			d.run();
        		}
        		).parent();
        };

    }));

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
 !function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);



/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

 /*jshint browser: true, strict: true, undef: true */
 /*global define: false */

 ( function( window ) {

 	'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
	return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
	hasClass = function( elem, c ) {
		return elem.classList.contains( c );
	};
	addClass = function( elem, c ) {
		elem.classList.add( c );
	};
	removeClass = function( elem, c ) {
		elem.classList.remove( c );
	};
}
else {
	hasClass = function( elem, c ) {
		return classReg( c ).test( elem.className );
	};
	addClass = function( elem, c ) {
		if ( !hasClass( elem, c ) ) {
			elem.className = elem.className + ' ' + c;
		}
	};
	removeClass = function( elem, c ) {
		elem.className = elem.className.replace( classReg( c ), ' ' );
	};
}

function toggleClass( elem, c ) {
	var fn = hasClass( elem, c ) ? removeClass : addClass;
	fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

$.fn.isOnScreen = function(){

	var win = $(window);

	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();

	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();

	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};
/**
 * svganimations.js v1.0.0
 * http://www.codrops.com
 *
 * the svg path animation is based on http://24ways.org/2013/animating-vectors-with-svg/ by Brian Suda (@briansuda)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
 (function() {

 	'use strict';

 	var docElem = window.document.documentElement;

 	window.requestAnimFrame = function(){
 		return (
 			window.requestAnimationFrame       || 
 			window.webkitRequestAnimationFrame || 
 			window.mozRequestAnimationFrame    || 
 			window.oRequestAnimationFrame      || 
 			window.msRequestAnimationFrame     || 
 			function(/* function */ callback){
 				window.setTimeout(callback, 1000 / 10);
 			}
 			);
 	}();

 	window.cancelAnimFrame = function(){
 		return (
 			window.cancelAnimationFrame       || 
 			window.webkitCancelAnimationFrame || 
 			window.mozCancelAnimationFrame    || 
 			window.oCancelAnimationFrame      || 
 			window.msCancelAnimationFrame     || 
 			function(id){
 				window.clearTimeout(id);
 			}
 			);
 	}();

 	function SVGEl( el ) {
 		this.el = el;
 		this.image = this.el.previousElementSibling;
 		this.current_frame = 0;
 		this.total_frames = 60;
 		this.path = new Array();
 		this.length = new Array();
 		this.handle = 0;
 		this.init();
 	}

 	SVGEl.prototype.init = function() {
 		var self = this;
 		[].slice.call( this.el.querySelectorAll( 'path' ) ).forEach( function( path, i ) {
 			self.path[i] = path;
 			var l = self.path[i].getTotalLength();
 			self.length[i] = l;
 			self.path[i].style.strokeDasharray = l + ' ' + l; 
 			self.path[i].style.strokeDashoffset = l;
 		} );
 	};

 	SVGEl.prototype.render = function() {
 		if( this.rendered ) return;
 		this.rendered = true;
 		this.draw();
 	};

 	SVGEl.prototype.draw = function() {
 		var self = this,
 		progress = this.current_frame/this.total_frames;
 		if (progress > 1) {
 			window.cancelAnimFrame(this.handle);
 			this.showImage();
 		} else {
 			this.current_frame++;
 			for(var j=0, len = this.path.length; j<len;j++){
 				this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
 			}
 			this.handle = window.requestAnimFrame(function() { self.draw(); });
 		}
 	};

 	SVGEl.prototype.showImage = function() {
		// classie.add( this.image, 'show' );
		// classie.add( this.el, 'hide' );
	};

	function getViewportH() {
		var client = docElem['clientHeight'],
		inner = window['innerHeight'];

		if( client < inner )
			return inner;
		else
			return client;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	// http://stackoverflow.com/a/5598797/989439
	function getOffset( el ) {
		var offsetTop = 0, offsetLeft = 0;
		do {
			if ( !isNaN( el.offsetTop ) ) {
				offsetTop += el.offsetTop;
			}
			if ( !isNaN( el.offsetLeft ) ) {
				offsetLeft += el.offsetLeft;
			}
		} while( el = el.offsetParent )

		return {
			top : offsetTop,
			left : offsetLeft
		};
	}

	function inViewport( el, h ) {
		var elH = el.offsetHeight,
		scrolled = scrollY(),
		viewed = scrolled + getViewportH(),
		elTop = getOffset(el).top,
		elBottom = elTop + elH,
			// if 0, the element is considered in the viewport as soon as it enters.
			// if 1, the element is considered in the viewport only when it's fully inside
			// value in percentage (1 >= h >= 0)
			h = h || 0;

			return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
		}

		function init() {
			var svgs = Array.prototype.slice.call( document.querySelectorAll( '.graph svg' ) ),
			svgArr = new Array(),
			didScroll = false,
			resizeTimeout;

		// the svgs already shown...
		svgs.forEach( function( el, i ) {
			var svg = new SVGEl( el );
			svgArr[i] = svg;
			setTimeout(function( el ) {
				return function() {
					if( inViewport( el.parentNode ) ) {
						console.log("s")
						svg.render();
					}
				};
			}( el ), (500*i) + 500 ); 
		} );

		var scrollHandler = function() {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( function() { scrollPage(); }, 60 );
			}
		},
		scrollPage = function() {
			svgs.forEach( function( el, i ) {
				if( inViewport( el.parentNode, 0.5 ) ) {
					svgArr[i].render();
				}
			});
			didScroll = false;
		},
		resizeHandler = function() {
			function delayed() {
				scrollPage();
				resizeTimeout = null;
			}
			if ( resizeTimeout ) {
				clearTimeout( resizeTimeout );
			}
			resizeTimeout = setTimeout( delayed, 200 );
		};

		window.addEventListener( 'scroll', scrollHandler, false );
		window.addEventListener( 'resize', resizeHandler, false );
	}

	$(".graph").each(function() {
		var cur = $(this);
		if (cur.isOnScreen()) {
				window.setTimeout(function () {
					if (!$(".graph .bar svg").hasClass("animated0")) {
						$(".graph .bar svg").addClass("animated0").css({ opacity: 1});
						init();
					};
				}, 1500);
		};
		$(window).scroll(function() {
			if (cur.isOnScreen()) {
				window.setTimeout(function () {
					if (!$(".graph .bar svg").hasClass("animated0")) {
						$(".graph .bar svg").addClass("animated0").css({ opacity: 1});
						init();
					};
				}, 1500);
			};
		});
	});
})();


/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
 (function (factory) {
 	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
				].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

			for (; i < l; i++) {
				var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

				if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

