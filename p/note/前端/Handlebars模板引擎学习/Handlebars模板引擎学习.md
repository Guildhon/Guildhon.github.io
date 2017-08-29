My Note
--------
> Handlebars模板引擎学习

[官网地址](http://handlebarsjs.com/)

前端静态模板，摆脱字符串拼接

[中文教程网站](http://keenwon.com/992.html)

在模板里写注释
```
{{!--  注释内容  --}}
```
案例
```
// js
var data = {name: 123};
var template = Handlebars.compile($("#card-template").html());   // 编译代码   
$(".card").html(template(data));     							// 输入数据并插入
// 模板
<script id="card-template" type="text/x-handlebars-template">
	{{name}}
</script>
```
data是一个数组，数组里是json时，使用each
```
<script id="card-template" type="text/x-handlebars-template">
	{{#each this}}
	{{name}}
	{{/each}}
</script>
```
接上面，数组里有json，json里面有数组，遍历数组
```
//比如 data = [{name: 123, books:['a','b']}, {name: 234, books:['c','d']}];
{{#each this}}
{{name}}
{{#each books}}
	{{this}}    //此处用this
{{books}}
{{/each}}
```
可以通过if来判断值是否存在，决定是否显示
```
{{#if name}}
	名字是 {{name}}
{{/if}}
```
获取序号
```
{{#each this}}
{{@index}}
{{/each}}
```
Helper 可以帮忙进行数据的过滤或修改，没有#的，内联Helper
```
// 将数据进行替换
{{#each this}}
{{chiness @index}}
{{/each}}

// 将数字序号转化为中文序号
Handlebars.registerHelper('chiness', function(value) {
	var arr = ['一', '二', '三'];
	return arr[value];
});
```
子循环拿到父级循环的index
```
{{#each this}}
{{@index}}
{{#each books}}
{{@../index}}{{@index}}{{this}}
{{/each}}
{{/each}}
```
块Helper
```
<li {{#isfirst @index}} style="color:red;" {{/isfirst}}>
	{{@../index}}{{@index}}{{this}}
</li>

Handlebars.registerHelper('isfirst', function(value, options) {
	if (value == 0) {
		return options.fn(this);
	} 
});
```
Helper里面的this指的是当前模板上下文，可获取所需的值，也可赋予值。比如在Helper里面获取this的值，判断，给this赋予新的属性值，模板可通过if来判断产生新值





