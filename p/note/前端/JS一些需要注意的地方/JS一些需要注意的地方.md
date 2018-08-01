My Note
--------
> JS一些需要注意的地方

js在条件式函数声明，有些浏览器解释会丧失了函数声明提升的特性
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

事件委托
<a href="https://www.cnblogs.com/liugang-vip/p/5616484.html">事件委托</a>