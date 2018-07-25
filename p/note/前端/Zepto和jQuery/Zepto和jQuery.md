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

#### 使用jQuery实现todo-list
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>todo</title>
</head>
<body>
	<div>
		<input type="text" name="" id="text-title">
		<button id="btn-submit">submit</button>
	</div>
	<div>
		<ul id="ul-list"></ul>
	</div>
	<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
	<script>
		var $textTitle = $("#text-title");
		var $btnSubmit = $("#btn-submit");
		var $ulList = $("#ul-list");
		$btnSubmit.click(function () {
			var title = $textTitle.val();
			if (!title) {
				return;
			}
			var $li = $("<li>" + title + "</li>");   // 数据和视图混合
			$ulList.append($li);
			$textTitle.val('');
		})
	</script>
</body>
</html>
```

#### 使用Vue实现todo-list
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>todo</title>
</head>
<body>
	<div id="app">
		 <div>
	        <input type="text" v-model="textTitle">
	        <button id="btn-submit" @click="addList">submit</button>
	    </div>
	    <div>
	        <ul id="ul-list">
	        	<li v-for="item in list">{{item}}</li>
	        </ul>
	    </div>
	</div>
	<script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script>
	<script>
		var vm = new Vue({
			el: '#app',
			data: {
				textTitle: '',
				list: []
			},
			methods: {
				addList: function () {
					if (!this.textTitle) {
						return;
					}
					this.list.push(this.textTitle);
					this.textTitle = "";
				}
			}
		})
	</script>
</body>
</html>
```
vue和jQuery区别

数据和视图的分离，解耦（开放封闭原则）

以数据驱动视图，只关心数据变化，DOM操作被封装