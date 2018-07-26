My Note
--------
> 虚拟DOM学习

以前做项目的时候，后台管理的表单处理经常是修改或删除某一项的内容，发给后台，重新请求接口数据，重新渲染DOM，耗性能，这是以前不足的地方

vdom是Vue和React的核心

用JS模拟DOM结构

DOM变化的对比，放在JS层来做（图灵完备语言）

提高重绘性能

浏览器最耗费性能的操作就是DOM操作

```
<ul id="list">
	<li class="item">Item1</li>
	<li class="item">Item2</li>
</ul>

// js 模拟
{
	tag: 'ul',
	attrs: {
		id: 'list'
	},
	children: [
		{
			tag: 'li',
			attrs: {
				className: 'item'
			},
			children: ['Item1']
		},
		{
			tag: 'li',
			attrs: {
				className: 'item'
			},
			children: ['Item2']
		}
	]
}
```

设计一个需求场景
```
// 1.将改数据展示成一个表格。2.随便修改一个信息，表格也跟着修改
[
	{
		name: '张三',
		age: '20',
		address: '北京'
	},
	{
		name: '李四',
		age: '23',
		address: '上海'
	},
	{
		name: '王五',
		age: '22',
		address: '天津'
	}
]
```
通过jQuery实现
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>index.html</title>
</head>
<body>
	<div id="container"></div>
	<button id="btn-change">change</button>
	<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
	<script>
		var data = [
			{
				name: '张三',
				age: '20',
				address: '北京'
			},
			{
				name: '李四',
				age: '23',
				address: '上海'
			},
			{
				name: '王五',
				age: '22',
				address: '天津'
			}
		];
		// 渲染函数 
		function render(data) {
			var $container = $('#container');
			// 清空现有内容
			$container.html('');
			console.log(data)
			// 拼接table
			var $table = $('<table>');
			$table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'));
			data.forEach(function (item){
				$table.append($('<tr><td>' + item.name + '</td><td>' +
				              item.age + '</td><td>' + item.address + '</td></tr>'));
			});
			$container.append($table);
		}	
		// 修改信息
		$('#btn-change').click(function(){
			data[1].age = 30;
			data[2].address = '深圳';
			render(data);
		})
		// 初始化时候渲染
		render(data);
	</script>
</body>
</html>
```
#### snabbdom
一个实现vdom的库

使用h函数来模拟先前的结构，创建虚拟的node节点

h('<标签名>',{...属性...},[子元素]);

```
var vnode = h('ul#list',{},[
	h('li.item',{},'Item1'),
	h('li.item',{},'Item2')
])
```

patch函数更新node

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="container"></div>
	<button id="btn-change">change</button>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
	<script>
		var snabbdom = window.snabbdom;

		// 定义patch
		var patch = snabbdom.init([
			snabbdom_class,
			snabbdom_props,
			snabbdom_style,
			snabbdom_eventlisteners
		]);

		// 定义h函数
   	 	var h = snabbdom.h;

   	 	var container = document.getElementById("container");

   	 	// 生成vnode
   	 	var vnode = h('ul#list', {}, [
			h('li.item', {}, 'Item1'), 
			h('li.item', {}, 'Item2')
		]);

   	 	patch(container,vnode);

   	 	document.getElementById('btn-change').addEventListener('click',function (){
   	 		// 生成newVnode
   	 		var newVnode = h('ul#list', {}, [
				h('li.item', {}, 'Item1'), 
				h('li.item', {}, 'ItemB'),
				h('li.item', {}, 'Item3')
			]);
			patch(vnode, newVnode);
   	 	})
	</script>
</body>
</html>
```
修改jQuery写的例子
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<div id="container"></div>
	<button id="btn-change">change</button>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
	<script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
	<script>
		var snabbdom = window.snabbdom;

		// 定义patch
		var patch = snabbdom.init([
			snabbdom_class,
			snabbdom_props,
			snabbdom_style,
			snabbdom_eventlisteners
		]);

		// 定义h函数
   	 	var h = snabbdom.h;

   	 	// 原始数据
		var data = [
			{
				name: '张三',
				age: '20',
				address: '北京'
			},
			{
				name: '李四',
				age: '23',
				address: '上海'
			},
			{
				name: '王五',
				age: '22',
				address: '天津'
			}
		];
		// 把表头也放在data中
		data.unshift({
			name: '名字',
			age: '年龄',
			address: '地址'
		});

   	 	var container = document.getElementById("container");

   	 	var vnode;

   	 	// 渲染函数
   	 	function render(data){
   	 		var newVnode = h('table',{},data.map(function (item){
   	 			var tds = [];
   	 			var i;
   	 			for (var i in item) {
   	 				if (item.hasOwnProperty(i)) {
   	 					tds.push(h('td',{},item[i] + ''));
   	 				}
   	 			}
   	 			return h('tr', {}, tds);
   	 		}));
   	 		console.log(newVnode);
   	 		if (vnode) {
   	 			// re-render
   	 			patch(vnode, newVnode);
   	 		} else {
   	 			// 初次渲染
   	 			patch(container, newVnode);
   	 		}
   	 		vnode = newVnode;
   	 	}

   	 	// 初次渲染
   	 	render(data);

   	 	document.getElementById('btn-change').addEventListener('click',function (){
   	 		data[2].age = 30;
				data[3].address = '深圳';
				render(data);
   	 	})

	</script>
</body>
</html>
```

#### diff算法

<a href="https://www.cnblogs.com/wubaiqing/p/6726429.html">文章参考</a>

vdom使用diff算法的原因

DOM操作是“昂贵”的，因此尽量减少DOM操作

找出本次DOM必须更新的节点进行更新，其他的不更新

这个“找出”的过程，就需要diff算法

vnode实现真实DOM的简单实现

```
// 将数据转化为DOM
{
	tag: 'ul',
	attrs: {
		id: 'list'
	},
	children: [
		{
			tag: 'li',
			attrs: {
				className: 'item'
			},
			children: ['Item1']
		},
		{
			tag: 'li',
			attrs: {
				className: 'item'
			},
			children: ['Item2']
		}
	]
}

// patch(container,newVnode)简单实现
function createElement(vnode) {
	var tag = vnode.tag;
	var attrs = vnode.attrs || {};
	var children = vnode.children || [];
	if (!tag) {
		return null;
	}
	// 创建真实的DOM元素
	var elem = document.createElement(tag);
	// 属性
	var attrName;
	for (attrName in attrs) {
		if (attrs.hasOwnProperty(attrName)) {
			// 给elem添加属性
			elem.setAttribute(attrName, attrs[attrName]);
		}
	}
	// 子元素
	children.forEach(function (childVnode){
		// 给elem添加子元素
		elem.appendChild(createElement(childVnode));   // 递归
	})
	// 返回真实的DOM元素
	return elem;
}	

// patch(vnode,newVnode)
function updateChildren(vnode,newVnode){
	var children = vnode.children || [];
	var newChildren = newVnode.children || [];

	children.forEach(function (childVnode,index){
		var newChildVnode = newChildren[index];
		if (childVnode.tag === newChildVnode.tag) {
			// 深层次对比，递归
			updateChildren(childVnode,newChildVnode);
		} else {
			// 替换
			replaceNode(childVnode,newChildVnode);
		}
	})
}
function replaceNode(vnode,newVnode){
	var elem = vnode.elem;   // 真实的DOM节点
	var newElem = createElement(newVnode);
	// 替换
}
```
节点新增和删除

节点重新排序

节点属性，样式，事件绑定

如何极致压榨性能