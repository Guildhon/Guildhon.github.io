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
##### v-on:(click/......)    事件
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
##### v-show 显示隐藏
