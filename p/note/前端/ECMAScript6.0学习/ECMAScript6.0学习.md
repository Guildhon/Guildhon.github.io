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
#### 解构赋值
左右结构必须一样，声明和赋值不能分开（一句语句完成）,结构必须合法
```
let [a,b,c] = [1,2,3];
console.log(a,b,c);  // 1 2 3
```
```
let {a,b} = {a:1,b:2};
```
```
let [json,arr] = [{a:1,b:2},[1,2]];
```
#### 数组
map 映射 一个对一个
```
let arr = [12,5,8];
let res = arr.map(function (item){
	return item*2;
})
console.log(res)      // 24,10,16
```
reduce 汇总	一堆出来一个
```
let arr = [12,69,180,8763];
// tmp中间结果，初始将12作为中间结果，index是循环下标
let res = arr.reduce(function (tmp,item,index){
	console.log(tmp+','+item+','+index);
	return tmp + item;			// 成为下一个中间结果
})
// res: 9024

12,69,1
81,180,2
261,8763,3
```
求平均数
```
let arr = [12,69,180,8763];
let avg = arr.reduce((tmp,item,index) => {
	if (index != arr.length - 1) {
		return tmp + item;
	} else {
		return (tmp + item)/arr.length;
	}
})
console.log(avg);   // 2256
```
filter	过滤器
```
let arr = [23,66,12,99];
let res = arr.filter(function (item){
	if (item % 3 == 0) {
		return true;
	} else {
		return false;
	}
})
console.log(res);  // [66, 12, 99]
```
forEach 循环（迭代）
```
let arr = [12,5,7];
arr.forEach(item=>{
	alert(item);
})
```
#### 字符串
startsWidth 判断字符串以什么开头
```
var str = "http://www.baidu.com";
str.startsWidth('http://');
```
endsWidth 判断以什么结尾

字符串模板
```
let str = `abc`;   // 用反单引号
let a = `${str}d`    // abcd
```
#### 面向对象
class关键字，构造器和类分开了，class里面加方法

ES5的对象和继承
```
function User(name,pass){
	this.name = name;
	this.pass = pass;
}
User.prototype.showName = function(){
	alert(this.name);
}
User.prototype.showPass = function(){
	alert(this.pass);
}
function VipUser(name,pass,level){
	User.call(this,name,pass);
	this.level = level;
}
VipUser.prototype = new User();
VipUser.prototype.constructor = VipUser;

VipUser.prototype.showLevel = function(){
	alert(this.level);
}
var v1 = new VipUser('guildhon','123','1');
v1.showName();
v1.showPass();
v1.showLevel();
```
ES6的面向对象和继承
```
class User{
	constructor(name,pass){
		this.name = name;
		this.pass = pass;
	}
	showName(){
		alert(this.name);
	}
	showPass(){
		alert()
	}
}
class VipUser extends User{
	constructor(name,pass,level){
		super(name,pass);					// 执行父类构造函数
		this.level = level;
	}
	showLevel(){
		alert(this.level);
	}
}
```
#### json对象
标准写法

1.只能用双引号

2.所有的key必须用引号包起来

json简写
```
key,value一样时候的简写 {a,b}

let json = {
	a: 12,
	show(){			// 省略:function
		alert(1);
	}
}
```
