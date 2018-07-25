My Note
--------
> VueJs学习


[官网](https://cn.vuejs.org/)
[手册](https://cn.vuejs.org/v2/api/)

<img src="./img/mvvm.png" alt="">
Model 模型、数据

View 视图、模板（视图和模型是分离的）

ViewModel 连接Model和View

#### MVVM三要素

响应式：vue如何监听到data的每个属性变化？

模板引擎：vue的模板如何被解析，指令如何处理？

渲染：vue的模板如何被渲染成html?以及渲染过程?

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
数组有重复数据
```
<li v-for="value in arr" track-by="$index" ></li>
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
自定义键盘信息
```
Vue.directive('on').keyCodes.ctrl = 17;
```
##### v-show 显示隐藏
```
<div v-show="true/false"></div>
```
#### 自定义指令
实现DOM操作，比如拖拽
```
// 可以传参
<script>
	Vue.directive('read', function (){
		this.el.style.background = 'red';
	});
</script>
<span v-read >123</span>
```
##### 自定义元素指令
```
Vue.elementDirective('zns-red', function(){
	bind: function(){
		......
	}
});
<zns-red></zns-red>
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
##### 自定义过滤器
```
<div>
	{{a | toDou 1}}
</div>
<script>
	Vue.filter('toDou', function(input, a){
		console.log(a);   // 1
		return input < 10 ? '0' + input : input;
	});
</script>
```
双向过滤器
```
// model -> view
// view  -> model
Vue.filter('xxx', function (){
	read: function (input){    // model -> view

	},
	write: function (val){	  // view  -> model	

	} 
});
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
#### vue实例简单方法
```
vm.$el         元素el
vm.$data       data
vm.$options    可以访问实例的自定义属性
vm.$destroy()  销毁对象
vm.$log()      查看data状态
```
如果在new Vue里面不使用el的话
```
vm.$mount('#box');   // 手动挂载vue程序
```
#### 监听数据变化
```
data: {
	a: 1,
	b: {
		name: 'guildhon'
	}
}
// 浅度
vm.$watch('a' function(){

});
// 深度，可以监听json
vm.$watch('a' function(){

}, {
	deep: true
});
```
#### 过渡（动画）
本质走的是CSS3动画:transition,animation
```
<style>
	.fade-transition{
		transition: 1s all ease;
	}
	.fade-enter{
		opacity: 0;
	}
	.fade-leave{
		opacity: 1;
	}
</style>
<div v-show="bSign" transition="fade"></div>
```
配合animate.css使用
```
Vue实例里面
<div v-show="bSign" transition="fade"></div>
transitions: {
	fade: {
		enterClass: '',
		leaveClass: ''
	}
}
```
#### 组件
全局组件
```
<div id="box">
	<aaa></aaa>
</div>
var Aaa = Vue.extend({
	template: '<h3>我是标题</h3>'
});
Vue.component('aaa',Aaa);
```
组件中放数据
```
var Aaa = Vue.extend({
	data(){
		return {
			msg: 123
		}
	},
	template: '<h3>{{msg}}</h3>'
});
```
组件中加事件
```
// data必须是个函数，返回json
var Aaa = Vue.extend({
	data(){
		return {
			msg: 123
		}
	},
	methods: {
		change(){
			this.msg = 'abc'
		}
	},
	template: '<h3 @click="change">{{msg}}</h3>'
});
```
局部组件
```
var Aaa = Vue.extend({
	data(){
		return {
			msg: 123
		}
	},
	methods: {
		change(){
			this.msg = 'abc'
		}
	},
	template: '<h3 @click="change">{{msg}}</h3>'
});
var vm = new Vue({
	el: '#box',
	data: {

	},
	components: {
		aaa: Aaa
	}
})
```
也可以直接使用
```
Vue.component('my-aaa',{
	template: '<strong>strong</strong>'
});
```
```
var vm = new Vue({
	el: '#box',
	data: {

	},
	components: {
		'my-aaa': {
			template: '<h1>Big</h1>'
		}
	}
})
```
将template的东西抽到其他地方
```
<div id="box">
	<my-aaa></my-aaa>
</div>
<script type="x-template" id="aaa">
	<h1>{{msg}}</h1>
</script>
<script>
	var vm = new Vue({
		el: '#box',
		data: {

		},
		components: {
			'my-aaa': {
				data(){
					return {
						msg: 'test data'
					}
				},
				template: '#aaa'
			}
		}
	})
</script>
```
也可以
```
<template id="aaa">
	<h1>{{msg}}</h1>
</template>
```
动态组件
```
<component :is="组件"></component>
```
父子组件
```
components: {
	'aaa': {
		data(){
			return {
				msg: '父组件数据'
			}
		},
		template: '<h1>aaa组件</h1><bbb></bbb>',
		components: {
			'bbb': {
				template: '<h2>bbb</h2>'
			}
		}
	}
}
```
组件数据传递
```
<div id="box">
	<aaa></aaa>
</div>
<template id="aaa">
	<h1>aaa组件->{{msg}}</h1>
	<bbb :m="msg"></bbb>
</template>
<script>
	var vm = new Vue({
		el: '#box',
		data: {

		},
		components: {
			'aaa': {
				data(){
					return {
						msg: '父组件数据'
					}
				},
				template: '#aaa',
				components: {
					'bbb': {
						props: ['m'],
						template: '<h2>子组件拿到->{{m}}</h2>'
					}
				}
			}
		}
	})
</script>
```