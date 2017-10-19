My Note
-------- 
> ECMAScript6.0学习

#### 1.历史

1. ECMAScript和JavaScript
	- ECMA是标准，JS是实现
		- 类似于HTML5是标准，IE10、Chrome、FF都是实现
		- 换句话说，将来也能有其他XXXScript来实现ECMA
	- ECMAScript简称**ECMA或ES**
	- 目前版本
		- 低级浏览器主要支持ES 3.1
		- 高级浏览器正在从ES 5过渡到ES 6
2. 历史版本

|时间|ECMA|JS|解释|
|---|---|---|---|
|1996.11|ES 1.0|JS稳定|Netscape将JS提交给ECMA组织，ES正式出现|
|1998.06|ES 2.0||ES2正式发布|
|1999.12|ES 3.0||ES3被广泛支持|
|2007.10|ES 4.0||ES4过于激进，被废了|
|2008.07|ES 3.1||4.0退化为严重缩水版的3.1<br/>因为吵得太厉害，所以ES 3.1代号为Harmony(和谐)|
|2009.12|ES 5.0||ES 5.0正式发布<br/>同时公布了JavaScript.next也就是后来的ES 6.0|
|2011.06|ES 5.1||ES 5.1成为了ISO国际标准|
|2013.03|ES 6.0||ES 6.0草案定稿|
|2013.12|ES 6.0||ES 6.0草案发布|
|2015.06|ES 6.0||ES 6.0预计发布正式版<br/>JavaScript.next开始指向ES 7.0|

#### 2.兼容性
查看支持性,ES6(ES2015)——IE10+、Chrome、FireFox、移动端、NodeJS

http://kangax.github.io/compat-table/es5/

http://kangax.github.io/compat-table/es6/

使用babel在线编译需要指定type
```
<script type="text/babel">
let a=12;
let b=5;
alert(a+b);
</script>
```

#### 3.新特性

#### 变量
var 声明缺点 
```
1.可以重复声明
2.无法限制修改
3.没有块级作用域{}，只有函数作用域
```
let  不能重复声明 变量，可以修改，块级作用域
 
const 不能重复声明 常量，声明时就要赋值，之后不能修改，块级作用域

#### 函数
箭头函数
```
匿名函数
function (){

}
变成
()=>{

}

function show(){}
变成
let show = ()=>{}
```
```
1.如果只有一个参数，()可以省略
	let show = a => {
		return a*2;
	}
	show(12);  // 24
2.如果{}里只有一个return，return、{}可以省略
	let show = a => a*2;
```
#### 函数参数
剩余参数，剩余参数放到args
```
function show(a,b,...args){
	alert(args);       // 9,1  数组
}
show(12,17,9,1);
```
展开数组
```
let arr = [3,5,1];
show(...arr);
function show(a,b,c){
	alert(a+","+b+","+c);   // 351
}
```
```
let arr1 = [1,2,3];
let arr1 = [5,6,7];
arr=[...arr1,...arr2]
```
```
function show(...args){           // 收集
	fn(...args);					// 展开
}
function fn(a,b){
	alert(a+b);            // 29
}

show(12,17);
```
默认参数
```
function show(a,b=15,c=12){
	console.log(a,b,c);				// 99 15 12
}
show(99);
```
