My Note
--------
> JS一些需要注意的地方

#### js在条件式函数声明，有些浏览器解释会丧失了函数声明提升的特性
文章参考<a href="https://www.jb51.net/article/90792.htm">1</a> <a href="https://segmentfault.com/q/1010000000731247/a-1020000000732024">2</a>
```
console.log(test);              // undefined
if (true) {
	function test(){alert(1)}
} else {
	function test(){alert(2)}; 
}
console.log(test);             // ƒ test(){alert(1)}
```

#### 事件委托
<a href="https://www.cnblogs.com/liugang-vip/p/5616484.html">事件委托</a>

#### 数组去重
```
var arr = [1,2,3,4,2,1];

// 利用Set

[...new Set(arr)]  // 将Set结构转换成数组

Array.from(new Set(arr))

// 利用Map

function unique (arr) {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}

// 利用IndexOf
var newArr = [];
for (var i = 0; i < arr.length; i++) {
	if (i === arr.indexOf(arr[i])){
		newArr.push(arr[i])
	}
}

arr.filter(function(v,i,a){return a.indexOf(v) === i})

// 先排序再去重
arr.sort()
var newArr = [];
for (var i = 0; i < arr.length; i++){
	if (arr[i] !== arr[i+1] || i+1 === arr.length) {
		newArr.push(arr[i])
	}
}

// 利用对象属性去重        如果有'1'和1会有问题
var newArr = [];
var json = {};
for (var i = 0; i < arr.length; i++) {
	if (!json[arr[i]]) {
		newArr.push(arr[i]);
		json[arr[i]] = 1;
	}
}


// 使用includes判断一个数组是否包含一个指定的值
```

#### 初始化一个个数为n，元素全为0的数组
```
function fn(n){
	return new Array(n).fill(0);
}
```

#### 遍历器（Iterator）转为数组
```
// 转为数组方法一
[...string.matchAll(regex)]

// 转为数组方法二
Array.from(string.matchAll(regex));
```

#### 打印全排列
```
var str = "abc";
var arr = str.split("");
var len = arr.length;
var newArr = [];
function dfs(i) {
	var v = arr.join("");
	if (i == len) {         //  如果字符串有重复值 && newArr.indexOf(v) < 0
		newArr.push(v);
		return;
	} else {
		for (var j = i; j < len; j++) {
			[arr[i],arr[j]] = [arr[j],arr[i]];
			dfs(i+1);
			[arr[i],arr[j]] = [arr[j],arr[i]];
		}
	}
}
dfs(0);
console.log(newArr)
```

#### 闭包
闭包是指有权访问访问一个函数作用域的变量的函数

函数可以访问它被创建时所处的执行上下文环境，使得Javascript的垃圾回收机制不会收回子函数所占用的资源<a href="https://baike.baidu.com/item/%E9%97%AD%E5%8C%85/10908873#6_1">参考</a>

可以用于模块化，封装私有变量


#### js判断数据类型

基本数据类型有Number,String,Boolean,Undefined,Null,Symbol(ES6)

复杂类型Object

<a href="https://segmentfault.com/a/1190000015264821?utm_source=channel-hottest">文章</a>
```
var bool = true
var num = 1
var str = 'abc'
var und = undefined
var nul = null
var arr = [1,2,3]
var obj = {name:'haoxl',age:18}
var fun = function(){console.log('I am a function')}
```

1.使用typeof
```
console.log(typeof bool); //boolean
console.log(typeof num);//number
console.log(typeof str);//string
console.log(typeof und);//undefined
console.log(typeof nul);//object
console.log(typeof arr);//object
console.log(typeof obj);//object
console.log(typeof fun);//function
```
由结果可知typeof可以测试出number、string、boolean、undefined及function，而对于null及数组、对象，typeof均检测出为object，不能进一步判断它们的类型

2.使用instanceof,用来测试一个对象在其原型链中是否存在一个构造函数的prototype属性
```
console.log(bool instanceof Boolean);// false
console.log(num instanceof Number);// false
console.log(str instanceof String);// false
console.log(und instanceof Object);// false
console.log(arr instanceof Array);// true
console.log(nul instanceof Object);// false
console.log(obj instanceof Object);// true
console.log(fun instanceof Function);// true

var bool2 = new Boolean()
console.log(bool2 instanceof Boolean);// true

var num2 = new Number()
console.log(num2 instanceof Number);// true

var str2 = new String()
console.log(str2 instanceof String);//  true

function Person(){}
var per = new Person()
console.log(per instanceof Person);// true

function Student(){}
Student.prototype = new Person()
var haoxl = new Student()
console.log(haoxl instanceof Student);// true
console.log(haoxl instanceof Person);// true
```
从结果中看出instanceof不能区别undefined和null，而且对于基本类型如果不是用new声明的则也测试不出来，对于是使用new声明的类型，它还可以检测出多层继承关系。

3.使用constructor
```
console.log(bool.constructor === Boolean);// true
console.log(num.constructor === Number);// true
console.log(str.constructor === String);// true
console.log(arr.constructor === Array);// true
console.log(obj.constructor === Object);// true
console.log(fun.constructor === Function);// true

console.log(haoxl.constructor === Student);// false
console.log(haoxl.constructor === Person);// true
```

constructor不能判断undefined和null，undefined和null没有contructor属性，并且使用它是不安全的，因为contructor的指向是可以改变的

4.使用Object.prototype.toString.call
```
onsole.log(Object.prototype.toString.call(bool));//[object Boolean]
console.log(Object.prototype.toString.call(num));//[object Number]
console.log(Object.prototype.toString.call(str));//[object String]
console.log(Object.prototype.toString.call(und));//[object Undefined]
console.log(Object.prototype.toString.call(nul));//[object Null]
console.log(Object.prototype.toString.call(arr));//[object Array]
console.log(Object.prototype.toString.call(obj));//[object Object]
console.log(Object.prototype.toString.call(fun));//[object Function]

function Person(){}
function Student(){}
Student.prototype = new Person()
var haoxl = new Student()
console.log(Object.prototype.toString.call(haoxl));//[object Object]
```

原理(摘自高级程序设计3)：在任何值上调用 Object 原生的 toString() 方法，都会返回一个 [object NativeConstructorName] 格式的字符串。每个类在内部都有一个 [[Class]] 属性，这个属性中就指定了上述字符串中的构造函数名。

但是它不能检测非原生构造函数的构造函数名

#### 作用域

全局变量和局部变量

最外层函数定义的变量拥有全局作用域，不定义就使用的变量也会变成全局变量

局部作用域，函数作用域，在函数内部声明只在函数内可访问，块级作用域（ES6），在代码块中起作用

声明变量和函数会提升。一个标识符，同时是变量和函数，函数的优先级高。

#### 作用域链
文章参考:<a href="https://github.com/mqyqingfeng/Blog/issues/6">1</a><a href="https://blog.csdn.net/whd526/article/details/70990994">2</a><a href="https://www.cnblogs.com/mrzl/p/4415149.html">3</a>

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链

作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象

#### call和apply实现
call
```
var value = 12;
Function.prototype.call2 = function (context) {
	context = context || window;
	var args = [];
	for (var i = 1; i < arguments.length; i++) {
		args.push("arguments[" + i + "]");
	}
	context.fn = this;
	var result = eval("context.fn(" + args + ")");
	delete context.fn;
	return result;
}
var foo = {
	value: 1
};
function bar(name,age){
	return {
		age: age,
	    name: name,
	    value: this.value
	}
}
console.log(bar.call2(null,'kity',12));
console.log(bar.call(null,'kity',12));
```
apply
```
Function.prototype.apply2 = function (context,arr){
	context = context || window;
	context.fn = this;
	var result = [];
	if (!arr) {
		result = context.fn();
	} else {
		var args = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			args.push("arr[" + i + "]");
		}
		result = eval("context.fn(" + args + ")");
	}
	delete context.fn;
	return result;
}
```
#### bind实现
初步实现
```
Function.prototype.bind2 = function (context){
	var self = this;
	var args = Array.prototype.slice.call(arguments,1);      // bind的时候参数
	return function (){
		var bindArgs = Array.prototype.slice.call(arguments);    // bind返回函数的参数
		return self.apply2(context,args.concat(bindArgs));
	}
}
var foo = {
	value: 1
};
function bar(name,age){
	console.log(this.value);
	console.log(name);
	console.log(age);
	return 2;
}
var bindFoo = bar.bind2(foo,'jack');
console.log(bindFoo(12));  // 1
```
最终实现

> 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

```
Function.prototype.bind2 = function (context){
	if (typeof this !== "function") {
	  throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
	}
	var self = this;
	var args = Array.prototype.slice.call(arguments,1);
	var fNOP = function (){};
	var fBound = function (){
		var bindArgs = Array.prototype.slice.call(arguments);
		return self.apply2(this instanceof fBound ? this : context,args.concat(bindArgs));
	}
	fNOP.prototype = this.prototype;  // 为了new运算符，原本绑定的this失效
	fBound.prototype = new fNOP();  // 避免修改fBound的prototype导致绑定函数的prototype，如bar的prototype
	return fBound;
}
```
#### Object.create
```
Object.create = function (o) {
	function f(){}
	f.prototype = o;
	return new f;
}
```

#### 模拟new
<a href="https://github.com/mqyqingfeng/Blog/issues/13">参考</a>

```
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';

    return {     // 使用new运算符时，如果return的是一个对象，则使用该对象
    	p: "123"
    }
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}
var person = objectFactory(Otaku,'jack',12);
function objectFactory(){
	var obj = new Object();
	Constructor = Array.prototype.shift.call(arguments);
	obj.__proto__ = Constructor.prototype;
	var ret = Otaku.apply(obj,arguments); 
	return typeof ret === 'object' ? ret || obj : obj;
}
```
#### JS对象创建
1.工厂模式
```
function createPerson(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;
}

var person1 = createPerson('kevin');
```
缺点：对象无法识别，因为所有的实例都指向一个原型

2.构造函数模式
```
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

var person1 = new Person('kevin');
```

优点：实例可以识别为一个特定的类型

缺点：每次创建实例时，每个方法都要被创建一次


2.1 构造函数模式优化
```
function Person(name) {
    this.name = name;
    this.getName = getName;
}

function getName() {
    console.log(this.name);
}

var person1 = new Person('kevin');
```
优点：解决了每个方法都要被重新创建的问题

缺点：这叫啥封装……

3.原型模式
```
function Person(name) {

}

Person.prototype.name = 'keivn';
Person.prototype.getName = function () {
    console.log(this.name);
};

var person1 = new Person()
```

优点：方法不会重新创建

缺点：1. 所有的属性和方法都共享 2. 不能初始化参数

3.1原型模式优化
```
function Person(name) {

}

Person.prototype = {
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```
优点：封装性好了一点

缺点：重写了原型，丢失了constructor属性

3.2原型模式优化
```
function Person(name) {

}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```
优点：实例可以通过constructor属性找到所属构造函数

缺点：原型模式该有的缺点还是有

4.组合模式
```
function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person();
```

优点：该共享的共享，该私有的私有，使用最广泛的方式

缺点：有的人就是希望全部都写在一起，即更好的封装性

4.1 动态原型模式
```
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype.getName = function () {
            console.log(this.name);
        }
    }
}

var person1 = new Person();
```
使用字面量
```
function Person(name) {
    this.name = name;
    if (typeof this.getName != "function") {
        Person.prototype = {
            constructor: Person,
            getName: function () {
                console.log(this.name);
            }
        }

        return new Person(name);
    }
}

var person1 = new Person('kevin');
var person2 = new Person('daisy');

person1.getName(); // kevin
person2.getName();  // daisy
```

5.1 寄生构造函数模式
```
function Person(name) {

    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };

    return o;

}

var person1 = new Person('kevin');
console.log(person1 instanceof Person) // false
console.log(person1 instanceof Object)  // true
```

寄生构造函数模式，我个人认为应该这样读：

寄生-构造函数-模式，也就是说寄生在构造函数的一种方法。

也就是说打着构造函数的幌子挂羊头卖狗肉，你看创建的实例使用 instanceof 都无法指向构造函数！

这样方法可以在特殊情况下使用。比如我们想创建一个具有额外方法的特殊数组，但是又不想直接修改Array构造函数，我们可以这样写：

```
function SpecialArray() {
    var values = new Array();

    for (var i = 0, len = arguments.length; i < len; i++) {
        values.push(arguments[i]);
    }

    values.toPipedString = function () {
        return this.join("|");
    };
    return values;
}

var colors = new SpecialArray('red', 'blue', 'green');
var colors2 = SpecialArray('red2', 'blue2', 'green2');


console.log(colors);
console.log(colors.toPipedString()); // red|blue|green

console.log(colors2);
console.log(colors2.toPipedString()); // red2|blue2|green2
```

你会发现，其实所谓的寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个new，实际上两者的结果是一样的。

但是作者可能是希望能像使用普通 Array 一样使用 SpecialArray，虽然把 SpecialArray 当成函数也一样能用，但是这并不是作者的本意，也变得不优雅。

在可以使用其他模式的情况下，不要使用这种模式。

但是值得一提的是，上面例子中的循环：

for (var i = 0, len = arguments.length; i < len; i++) {
    values.push(arguments[i]);
}
可以替换成：

values.push.apply(values, arguments);

5.2 稳妥构造函数模式

所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。

与寄生构造函数模式有两点不同：

1.新创建的实例方法不引用 this
2.不使用 new 操作符调用构造函数

稳妥对象最适合在一些安全的环境中。

稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型

#### JS继承

##### 1.原型链继承
```
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {
	
}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin
```
问题1.引用类型的属性被所有实例共享
```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]
```
2.在创建 Child 的实例时，不能向Parent传参

##### 2.借用构造函数(经典继承)
```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```
优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参
```
function Parent (name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```

缺点：

方法都在构造函数中定义，每次创建实例都会创建一遍方法

##### 3.组合继承
原型链继承和经典继承双剑合璧
```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {

    Parent.call(this, name);          // 一次
    
    this.age = age;

}
 
Child.prototype = new Parent();       // 两次
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

缺点：调用两次父构造函数
4.原型式继承

```
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```
就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样

```
var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
```
注意：修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值

使用场合：没必要构建构造函数，仅仅是想模拟一个对象的时候

##### 5. 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法

##### 6. 寄生组合式继承
组合继承最大的缺点是会调用两次父构造函数,如果我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 呢？
```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
```

最后我们封装一下这个继承方法：
```
function Parent(name){
	this.name = name;
	this.colors = ['red','blue'];
}
Parent.prototype.getName = function (){
	console.log(this.name);
}
function Child(name,age){
	Parent.call(this,name);
	this.age = age;
}
function prototype(child,parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}
prototype(Child,Parent)
var c = new Child('jack',14);
console.log(c);
```

#### 防抖

为了解决频繁触发事件

防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!

初始版本
```
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
	console.log(e);
    this.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction,1000);

function debounce(func,wait) {
	var timeout;
	return function (){
		var context = this;
		var args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function (){
			func.apply(context,args)              // 修复this和event对象问题
		},wait);
	}
}
```

希望能立即执行
```
function debounce(func,wait,immediate) {
	var timeout;
	return function (){
		var context = this;
		var args = arguments;
		if (timeout) clearTimeout(timeout);

		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(function (){
				timeout = null;
			}, wait)
			if (callNow) func.apply(context,args);
		} else {
			timeout = setTimeout(function (){
				func.apply(context,args)
			},wait);
		}
	}
}
```
返回值

此时注意一点，就是 getUserAction 函数可能是有返回值的，所以我们也要返回函数的执行结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量，最后再 return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。

```
function debounce(func, wait, immediate) {

    var timeout, result;

    return function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
}
```

取消

最后我们再思考一个小需求，我希望能取消 debounce 函数，比如说我 debounce 的时间间隔是 10 秒钟，immediate 为 true，这样的话，我只有等 10 秒后才能重新触发事件，现在我希望有一个按钮，点击后，取消防抖，这样我再去触发，就可以又立刻执行啦，是不是很开心？

```
var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
	console.log(e);
    this.innerHTML = count++;
};

var setUseAction = debounce(getUserAction, 5000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})

function debounce(func,wait,immediate) {
	var timeout,result;
	var debounced =  function (){
		var context = this;
		var args = arguments;
		if (timeout) clearTimeout(timeout);

		if (immediate) {
			var callNow = !timeout;
			timeout = setTimeout(function (){
				timeout = null;
			}, wait)
			if (callNow) result = func.apply(context,args);
		} else {
			timeout = setTimeout(function (){
				func.apply(context,args)
			},wait);
		}
		return result;
	};
	debounced.cancel = function (){
		clearTimeout(timeout);
		timeout = null;
	}
	return debounced;
}
```

#### 节流

节流的原理很简单：

如果你持续触发事件，每隔一段时间，只执行一次事件。（不会重新计数时间）

根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
我们用 leading 代表首次是否执行，trailing 代表结束后是否再执行一次。

关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。

##### 使用时间戳
使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为 0 )，如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。

```
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

##### 使用定时器
```
function throttle(func, wait) {
    var context, args;
    var previous = 0;
    var timeout;
    return function (){
    	context = this;
    	args = arguments;
    	if (!timeout) {
    		timeout = setTimeout(function (){
    			timeout = null;
    			func.apply(context,args);
    		},wait)
    	}
    }
}
```
所以比较两个方法：

1.第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行

2.第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件

##### 双剑合璧
```
function throttle(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args)
    };

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}
```
leading：false 表示禁用第一次执行
trailing: false 表示禁用停止触发的回调
```
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}
```
取消
```
在 debounce 的实现中，我们加了一个 cancel 方法，throttle 我们也加个 cancel 方法：
throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
}
```