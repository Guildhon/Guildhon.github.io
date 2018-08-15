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
函数可以访问它被创建时所处的执行上下文环境，使得Javascript的垃圾回收机制不会收回子函数所占用的资源<a href="https://baike.baidu.com/item/%E9%97%AD%E5%8C%85/10908873#6_1">参考</a>


