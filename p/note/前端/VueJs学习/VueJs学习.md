My Note
--------
> VueJs学习

[官网](https://cn.vuejs.org/)
[手册](https://cn.vuejs.org/v2/api/)

#### 一个小雏形
```
<script>
    window.onload=function(){
        new Vue({
            el:'#box',   // 选择器
            data:{
                msg:'welcome vue'
            }
        });
    };
</script>
<div id="box">
    {{msg}}
</div>
```
#### 指令，扩展HTML标签功能，属性

##### v-model 数据双向绑定
```
<input type="text" v-model="msg" />
```
##### v-for 循环
```
data: {
	arr: ['a','b','c'],
	json: {
		w: 'width',
		h: 'height'
	}
}
<li v-for="value in arr">
	{{value}}  {{$index}}
</li>
<li v-for="value in json">
	{{value}}  {{$index}} {{$key}}
</li>
<li v-for="(k,v) in json">
	{{k}}  {{v}}
</li>
```
##### v-on:(click/keydown/......)    事件
```
data:{
    msg:'welcome vue'
},
methods: {
	show: function(){
		alert(this.msg);
	}
}
<input type="button" value="按钮" v-on:click="show()" />
```
简写@click
```
<input type="button" value="按钮" @click="show()" />
```
传递事件对象和其他参数
```
methods: {
	show: function(ev, a){
		alert(ev.clientX);
		alert(a);
	}
} 
<input type="button" value="按钮" @click="show($event, 12)" />
```
阻止事件冒泡
```
1.原生方法           ev.cancelBubble = true;
2.vue解决方法(stop)  @click.stop="show";
```
阻止默认行为
```
1.原生方法              ev.preventDefault();
2.vue解决方法(prevent)  @contextmenu.prevent="show";
```
键盘事件
```
// 可以ev.keyCode判断

<input type='text' @keyup.13="show">   // 判断是否是回车，也可以改成enter
```
##### v-show 显示隐藏
```
<div v-show="true/false"></div>
```
#### 属性 
##### v-bind:(src)
```
<img v-bind:src="url">   // 使用src="{{url}}"会报404错误
```
简写
```
<img :src="url">
```
##### 特殊:class
```
<style>
    .red{
        color: red;
    }
    .blue{
        background: blue;
    }
</style>
<div id="box">
    <strong :class="[red]">文字...</strong>
</div>
<script>
window.onload=function(){
    new Vue({
        el:'#box',
        data:{
            red:'red'
        }
    });
};
</script>
```
```
<style>
    .red{
        color: red;
    }
    .blue{
        background: blue;
    }
</style>
<strong :class="{red:true,blue:true}">文字...</strong>
```
##### 特殊:style
```
<strong :style="{color:'red'}">文字...</strong>
```
```
data:{
    c:{color:'red'},
    b:{backgroundColor:'blue'}    // 驼峰命名法
}
<strong :style="[c,b]">文字...</strong>
```
#### 模板
```
{{msg}}   // 双向绑定，数据更新模板变化
{{*msg}}  // 数据只绑定一次，数据更新模板不变
{{{msg}}} // 解析HTML标签输出
```
#### 过滤器
```
{{'abc'|uppercase}} // 字符串转大写
```
#### 交互
vue-resouce
get获取数据，发送数据通过第二个参数data
```
this.$http.get('a.txt',data,{}).then(function(res){
    alert(res.data);
},function(res){
    alert(res.data);
});
```
post需要设置
```
this.$http.post('post.php',{
    a:1,
    b:20
},{
    emulateJSON:true
}).then(function(res){
    alert(res.data);
},function(res){
    alert(res.status);
});
```
#### 生命周期
vue1.x
```
created               实例已经创建
beforeCompile         编译之前
compiled			  编译之后
ready  		       插入到文档中

beforeDestroy		  销毁之前
destroyed			  销毁之后	
```
#### 防止闪烁
防止用户看见花括号标记
```
// vue2.x已经删掉
<style type="text/css">
	[v-clock] {
		display: none;
	}
</style>
<div v-cloak >
	{{msg}}
</div>
```
另一种方法
```
<div v-text="msg" ></div>
```
```
<div v-html="msg" ></div>
```

#### 计算属性
```
// a和b都是vue实例的属性
// 当a数据变化时b会跟着变化
data: {
	a: 1
},
computed: {
	b: function (){
		return this.a + 1;
	}
}
```
b里面有两个默认方法
```
b: {
	get: function(){
		return this.a + 1;   // 默认调用get
	},
	set: function(val){
		alert(val);  // 10
	}
}
document.onclick = function () {
	vm.b = 10;
}
```
