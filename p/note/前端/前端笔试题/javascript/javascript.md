My Note
--------
> javascript

```
如何获取下面表单 select

<form name="a">
<select name="a" size="1" id=”obj”>
<option value="a">1</option>
<option value="b">2</option>
<option value="c">3</option>
</select>
</form> 域的选择部分的文本？()

答案为obj.options[obj.selectedIndex].text

<script>
var obj = document.getElementById("obj");
obj.onchange = function (){
	alert(obj.value);
	alert(obj.options[obj.selectedIndex].text);
}
</script>
```

```
在 javascript 中，用于阻止默认事件的默认操作的方法是preventDefault()
```

```
void();
上面表达式的结果是：SyntaxError
```

```
假设有如下代码，那么a(10)的返回结果是？（ ）
function a(a)
{
  a^=(1<<4)-1;
   return a;
}

1<<4   左移相当于1*2^4=16
a^=16-1=15
a=a^15=10^15
^ 异或运算：
10的二进制00001010
15的二进制00001111
========>00000101  转成十进制：5
（按位异或运算，同为1或同为0取0，不同取1）
```

```
javascirpt中的数字在计算机内存储为多少Byte？

关于Javascript中数字的部分知识总结：
1.Javascript中，由于其变量内容不同，变量被分为基本数据类型变量和引用数据类型变量。基本类型变量用八字节内存，存储基本数据类型(数值、布尔值、null和未定义)的值，引用类型变量则只保存对对象、数组和函数等引用类型的值的引用(即内存地址)。
2. JS中的数字是不分类型的，也就是没有byte/int/float/double等的差异。
```

```
下列函数哪些是JavaScript的全局函数？即global下
encodeURI  parseFloat   eval

window下是setTimeout
```

```
给网页添加javascript的方式有 A B C  
A 使用script标签，将javascript代码写到<script></script>之间  
B 添加外部javascript文件
C 使用行内javascript
D 使用@import引入javascript文件

正确。使用script标签，将javascript代码写到<script></script>之间， 例子：<scriptype="text/javascript"> document.write("Hello World!");</script>
正确。加外部javascript文件 <script src="xxx.js"></script>
正确。行内js——javascript:return void(null)或javascript:return confirm("……");
错误。查阅了资料，import用于引入css，js暂未发现这种用法。
```
