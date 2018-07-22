My Note
--------
> Zepto和jQuery

在zepto.js中原型的应用

```
// html
<div>1</div>
<div>2</div>
<div>3</div>
<script>
	$("div").css("color","red");
</script>

// js
(function (window){

	var zepto = {}; 

	function Z(dom,selector){
		var i, len = dom ? dom.length : 0;
		for (i = 0; i < len; i++) {
			this[i] = dom[i];
		}
		this.length = len;
		this.selector = selector || '';
	}

	zepto.Z = function (dom,selector){
		return new Z(dom,selector);
	}

	zepto.init = function (selector){
		var slice = Array.prototype.slice;
		var dom = slice.call(document.querySelectorAll(selector));
		return zepto.Z(dom,selector);
	}

	var $ = function(selector){
		return zepto.init(selector)
	}

	window.$ = $;
	
	$.fn = {
		css: function(key,value){

		},
		html: function (value){

		}
	}
	
	Z.prototype = $.fn;

})(window)
```

在jQuery.js中原型的应用
```
// js
(function (window){

	var jQuery = function (selector) {
		return new jQuery.fn.init(selector);
	}
	
	jQuery.fn = {
		css: function (key,value){

		},
		html: function (value){

		}
	};

	var init = jQuery.fn.init = function (selector) {
		var slice = Array.prototype.slice;
		var dom = slice.call(document.querySelectorAll(selector));
		var i, len = dom ? dom.length : 0;
		for (var i = 0; i < len; i++) {
			this[i] = dom[i];
		}
		this.length = len;
		this.selector = selector || '';
	}
	
	init.prototype = jQuery.fn

	window.$ = jQuery;

})(window)
```

为什么要把原型方法放在$fn?为了扩展插件
```
$.fn.getNodeName = function (){
	return this[0].nodeName;
}
```
好处：1.只有$会暴露在window全局变量；2.将插件扩展统一到$.fn.xxx这一接口，方便使用