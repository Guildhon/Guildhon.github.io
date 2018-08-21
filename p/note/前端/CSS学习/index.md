My Notes
--------
> CSS学习

#### HTML回顾

##### HTML常见元素

header头部元素，一般是资源或信息元素，不会在页面留下内容

```
meta  <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
title
style
link
script
base <base href="作为基准URL的绝对URL(比如'http://www.example.com/')">
```

body里的元素
```
div/section/article/aside/header/footer
p
span/em/strong
table/thead/tbody/td/tr
ul/ol/li/dl/dt/dd
a
form/input/select/textarea/button
```


#### 爱恨原则
1. link:连接平常的状态
2. visited:连接被访问过之后
3. hover:鼠标放到连接上的时候
4. active:连接被按下的时候

正确顺序：“爱恨原则”（LoVe/HAte），即四种伪类的首字母:LVHA。再重复一遍正确的顺序：a:link、a:visited、a:hover、a:active

因为当鼠标经过未访问的链接，会同时拥有a:link、a:hover两种属性，a:link离它最近（即一个HTML页面的styke里，放在后面），所以它优先满足a:link，而放弃a:hover的重复定义。当鼠标经过已经访问过的链接，会同时拥有a:visited、a:hover两种属性，a:visited离它最近，所以它优先满足a:visited，而放弃a:hover的重复定义。究其原因，是css的就近原则“惹的祸”


#### HTML5新标签兼容性问题

让浏览器识别HTML5规范中的新标签

IE8浏览器中还没有添加对HTML5新标签的支持，所以在IE8中无法直接展现HTML5新标签中的内容。庆幸的是IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，
```
var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
var i= e.length;
while (i--){
    document.createElement(e[i])
}
```
浏览器支持新标签后，还需要添加标签默认的样式
```
article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}
mark{background:#FF0;color:#000}
```

#### CSS布局
三栏布局

<a href="/example/布局.html">例子查看</a>

##### 使用浮动

如果center中的文字过多center整个高度会突出来
```
<style media="screen">
	.layout.float .left{
		float:left;
		width: 300px;
		background:red;
	}
	.layout.float .right{
		float:right;
		width:300px;
		background: blue;
	}
	.layout.float .center{
		background:yellow;	
	}
</style>
<article class="left-right-center">
	<div class="left">
	</div>
	<div class="right"></div>
	<div class="center">
		<h1>浮动解决方案</h1>
		1.这是中间部分
		1.这是中间部分
	</div>
</article
```

##### 使用position

如果center中的文字过多center整个高度也会突出来，不过视觉效果是中间突出来
```
<style>
	 .layout.absolute .left-center-right > div{
	 	position: absolute;
	 }
	 .layout.absolute .left{
		left: 0;
		width: 300px;
		background:red;
	 }
	 .layout.absolute .center{
	 	background:yellow;
	 	left:300px;
	 	right:300px;
	 }
	 .layout.absolute .right{
	 	right: 0px;
	 	width: 300px;
	 	background:blue;
	 }
</style>
<article class="left-center-right">
	<div class="left"></div>
	<div class="center">
		<h2>绝对定位解决方案</h2>
		1.这是三栏布局绝对定位中间部分
		1.这是三栏布局绝对定位中间部分
	</div>
	<div class="right"></div>
</article>

```

##### 使用flex
```
<style>
	.layout.flexbox .left-center-right{
		 display:flex;
	}
	.layout.flexbox .left{
		width:300px;
		background:red;
	}
	.layout.flexbox .center{
		flex: 1;
		background:yellow;
	}
	.layout.flexbox .right{
		width: 300px;
		background: blue;
	}
</style>
<article class="left-center-right">
	<div class="left"></div>
	<div class="center">
		<h1>flexbox解决方案</h1>
		flex布局中间部分flex布局中间部分flex布局中间部分flex布局中间部分flex布局中间部分flex布局中间部分flex布局中间部分flex布局中间部分flex布局中间部分
	</div>
	<div class="right"></div>
</article>
```


##### 使用table
中间高度和两边高度同时撑高
```
<style>
	.layout.table .left-center-right{
		width: 100%;
		display: table;
		height: 100px;
	}
	.layout.table .left-center-right>div{
		display: table-cell;
	}
	.layout.table .left{
		width: 300px;
		background: red;
	}
	.layout.table .center{
		background: yellow;
	}
	.layout.table .right{
		width: 300px;
		background: blue;
	}
</style>
<article class="left-center-right">
	<div class="left"></div>
	<div class="center">
		<h1>表格布局</h1>
		三栏布局的表格布局中间部分
		三栏布局的表格布局中间部分
		三栏布局的表格布局中间部分
	</div>
	<div class="right"></div>
</article>
```

##### 使用网格grid
中间内容只有文字会超出
```
<style>
	.layout.grid .left-center-right{
		display: grid;
		width: 100%;
		grid-template-rows:100px;
		grid-template-columns: 300px auto 300px;
	}
	.layout.grid .left{
		background:red;
	}
	.layout.grid .center{
		background:yellow;
	}
	.layout.grid .right{
		background:blue;
	}
</style>
<article class="left-center-right">
	<div class="left"></div>
	<div class="center">
		<h1>网格布局解决方案</h1>
		三栏布局网格布局中间部分
		三栏布局网格布局中间部分
		三栏布局网格布局中间部分
	</div>
	<div class="right"></div>
</article>
```

<a href="https://blog.csdn.net/wangchengiii/article/details/77926868">圣杯布局和双飞翼布局</a>

#### 垂直居中
①display:flex
```
.box{
	display: flex;
	justify-content: center;  // 主轴
	align-items: center;     // 交叉轴
}
```
```
.box {
	display: flex;
}
.box div {
	margin: auto;
}
```
②table-cell     
```
.box{
	display:table-cell;
	vertical-align: middle;
	text-align: center;
}
```

③绝对定位和负边距
```
div {
	position: absolute;
	width:100px
	height:100px;
	top:50%;
	left:50%;
	margin-left:-25px;
	margin-top:-25px;
	text-align: center;
}
```

④绝对定位+设置宽高和margin:auto
```
div {
	position: absolute;
	width:100px;
	height: 100px;
	top:0;left:0;right:0;bottom:0;
	margin:auto;
}
```
⑤line-height 需要height 适合设置单行文本

⑥如何知道父容器高度
```
div {
	margin: auto;
	margin-top: ()
}
```

#### link和@import区别

书写方式

```
<link rel="stylesheet" href="">

@import ""
```

link是HTML标签，没有兼容性，@import是CSS提供的一种方式，需要IE5以上才支持

link可以定义RSS(xml)，定义rel属性

页面被加载时，link会同时被加载，而@import引用的CSS要等页面加载结束后加载

@import无法DOM操作

#### CSS选择器

权重（数字不会进位，即10个类选择器不会等于一个ID选择器）
```
ID选择器 100
类/伪类/属性选择器 10
元素/伪元素选择器 1  :hover :nth-child()
通配符选择器 0

组合在一起的选择器，拆开计算
如 相邻选择器 selecter+selecter

!important 优先级最高
元素属性，优先级高，但不如important
相同权重，后写的生效
```

#### CSS属性可继承	
```
所有元素可继承：visibility和cursor。
内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
终端块状元素可继承：text-indent和text-align。
列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
```