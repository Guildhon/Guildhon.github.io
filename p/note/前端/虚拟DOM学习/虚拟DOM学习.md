My Note
--------
> 虚拟DOM学习

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