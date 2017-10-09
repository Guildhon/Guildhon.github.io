My Notes
--------
> ReactJs学习

```
库:    本质一堆函数组合 高度封装DOM操作 jquery/zepto
框架:  解决程序中问题  angular/vue/react  
```
[官方网站](https://reactjs.org/)
```	
React
优势
1.虚拟DOM
2.性能很高
3.可以用到移动端
劣势
1.学习成本偏高
2.react本身做得东西很小，比如用react周边产品（全家桶）
```
#### 使用jsx语法----可以在js里面书写HTML标签
```
1.书写格式
	let a = <div>welcome div</div>;
2.多个标签，需要一个根元素包裹
	let a = <div><div>welcome div</div><span>span</span></div>;
3.可以自由缩进，下面两种等价
	let a = <div>
				<div>welcome div</div>
				<span>span</span>
			</div>;
	let a = (<div>
				<div>welcome div</div>
				<span>span</span>
			</div>);
4.单标记标签必须闭合
	<img />
5.使用class，样式类
	<div className="abc"></div>
style要写成json形式,json是js代码要用{}
	<div style={{width:'200px'}}></div>
6.jsx语法里面写js代码,要使用{}
	var a = 'welcome china';
	let b = <div>{a}</div>;
7.事件名--驼峰命名法，单词首字母大写
	function show(){
		alert(1);
	}
	<div onClick={show}></div>
```
#### react开发模式
1.直接引入文件;
2.基于webpack.
#### ReactDOM渲染
ReactDOM.render(组件，位置);
```
<div id="app">
</div>
<script type="text/babel">
	ReactDOM.render(
		<h3>welcome</h3>,
		document.querySelector('#app')
	)
</script>
```
#### 组件定义
```
// 定义组件
class Title extends React.Component {
	render(){
		return <h3>welcome react</h3>
	}
}
ReactDOM.render(
	<Title />,
	document.querySelector('#app')
)
```
#### 参数
只能读 only read
```
// 定义组件
class Title extends React.Component {
	render(){
		return (<div>
			<h3>welcome react</h3>
			<h4>{this.props.a}</h4>
		</div>)
	}
}
ReactDOM.render(
	<Title a="well" />,
	document.querySelector('#app')
)
```
// 弹出传参的数据
```
class Title extends React.Component {
	show(){
		alert(this.props.a);
	}
	render(){
		return (<div>
			<h3 onClick={this.show.bind(this)}>welcome react</h3>
			<h4>{this.props.a}</h4>
		</div>)
	}
}
ReactDOM.render(
	<Title a="well" />,
	document.querySelector('#app')
)
```
#### 改变this指向
```
a) call(this指向谁,arg1,arg2,......)  
	function show(a,b){
		// 弹出'abc',12,5
		alert(`
			this:${this}\n
			a:${a}\n
			b:${b}
		`);
	}
	show.call('abc',12,5);	// 函数调用阶段改变this
b) apply(this指向谁,[arg1,arg2,......])
	show.apply('abc',[12,5]);  // 函数调用阶段改变this
c) bind()   es5出现的
	var cc = show.bind('abc');  // 函数定义阶段改变this
	cc(12,5);             // 弹出'abc',12,5
	show()                // this又变回window

	也可以像call一样去写
	var cc = show.bind('abc',12,5);
	cc();
```
#### 状态
更新状态来更新视图
```
// 定义组件
class Title extends React.Component {
	constructor(){
		super();   //调用父级构造函数，获得继承下来的属性
		this.state = {
			msg: 'welcome'
		}
	}
	show(){
		// 更新状态来更新视图
		this.setState({
			'msg': 'abc'
		});
	}
	render(){
		return (<div>
			<h3 onClick={this.show.bind(this)}>welcome react</h3>
			<h4>{this.state.msg}</h4>
		</div>)
	}
}
ReactDOM.render(
	<Title />,
	document.querySelector('#app')
)
```
显示隐藏例子，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件
```
// 定义组件
class Toggle extends React.Component {
	constructor(){
		super();   //调用父级构造函数，获得继承下来的属性
		this.state = {
			bShow: false
		}
	}
	change(){
		this.setState({
			bShow: !this.state.bShow
		});
	}
	render(){
		let bShow = this.state.bShow ? 'block' : 'none';
		return (<div>
			<input type="button" value="按钮" onClick={this.change.bind(this)} />
			<div className='box' style={{display: bShow}}></div>
		</div>)
	}
}
ReactDOM.render(
	<Toggle />,
	document.querySelector('#app')
)
```
#### 获取某个元素
```
a) 事件触发时处理函数可拿到事件对象本身，获取当前元素
	show(ev){
		console.log(ev.target)
	}
b) 直接DOM操作
	document.querySelector()
c) react提供语法，钩子使用ref
	this.refs.t1;
	<input type="text" ref="t1">
```
#### 生命周期
```
componentWillMount				组件挂载前
componentDidMount				组件挂载后

componentWillUpdate				组件更新前，更改state时触发
componentDidUpdate				组件更新后

componentWillUnMount			组件卸载，ReactDOM.render新的组件
```
```
<script type="text/babel">
	class MyCom extends React.Component{
		constructor(){
			super();
			this.state = {
				msg: 'aaa'
			};
		}
		render(){
			return (<div>
			<h3 ref="h3">welcome</h3>
			</div>)
		}
		componentWillMount(){
			console.log(this.state.msg); // 可以获取属性和方法
			console.log(this.refs.h3);   // 元素还没挂载，获取不到
		}
		componentDidMount(){
			console.log(this.refs.h3);   // 已经挂载，可以获取
		}
	}
	ReactDOM.render(
		<MyCom />,
		document.querySelector('#app')
	)

</script>
```
阻止冒泡
```
在方法中拿到的ev由于是经过react包装过的，所以要拿到原生的才能阻止
ev.nativeEvent.stopImmedidatePropagation();
```
#### 表单
原生表单是受控的
```
return <input type="text" value="abc">   // 这样的话值是无法更改的
要使用<input type="text" defaultValue="abc">

<input type="checkbox" defaultChecked >   // 复选框默认打对勾
```
#### 交互
react本身没有提供交互的。
可以使用原生,jquery,zepto,fetch,axios......
##### 循环输出数据
```
class MyCom extends React.Component{
	constructor(){
		super();
		this.state = {
			arr: ['apple','banana','orange']
		}
	}
	render(){
		let arrLi = [];
		this.state.arr.forEach((val, index) => {
			arrLi.push(<li key={index}>{val}</li>);    // key需要唯一
		});
		return (<div>
			<ul>
				{arrLi}
			</ul>
		</div>)
	}
}
ReactDOM.render(
	<MyCom />,
	document.querySelector('#app')
);
```
#### 组件嵌套
增强复用性
```
class Title extends React.Component{
	render(){
		return <h1 style={{background: this.props.bgColor}}>标题</h1>
	}
}
class App extends React.Component{
	render(){
		return (<div>
			<Title bgColor="red"/>
		</div>)
	}
}
ReactDOM.render(
	<App />,
	document.querySelector('#app')
)
```
#### 组件通信
父级 -> 子级

通过传参数的形式
```
class Child extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (<div>
			我是子组件 {this.props.msg}
		</div>)
	}
}
class Parent extends React.Component{
	constructor(){
		super();
		this.state = {
			msg: 'from parent msg'
		}
	}
	hanleClick(){
		// gsm tnerap morf
		this.setState({
			msg: this.state.msg.split('').reverse().join('')
		})
	}
	render(){
		return (<div>
			<h3 onClick={this.hanleClick.bind(this)}>我是父组件 {this.state.msg}</h3>
			<Child msg={this.state.msg}/>
		</div>)
	}
}
ReactDOM.render(
	<Parent />,
	document.querySelector('#app')
)
```
子级 -> 父级

通过传递方法
```
class Child extends React.Component{
	constructor(){
		super();
		this.state = {
			'msg': 'from child msg'
		}
	}
	handleClick(){
		this.props.fnTrans(this.state.msg);
	}
	render(){
		return (<div onClick={this.handleClick.bind(this)}>
			我是子组件
		</div>)
	}
}
class Parent extends React.Component{
	constructor(){
		super();
		this.state = {
			msg: ''
		}
	}
	getMsg(val){
		alert("拿到子组件的" + val);
		this.setState({
			msg: val
		})
	}
	render(){
		return (<div>
			<h3>我是父组件 -> {this.state.msg}</h3>
			<Child fnTrans={this.getMsg.bind(this)} />
		</div>)
	}
}
ReactDOM.render(
	<Parent />,
	document.querySelector('#app')
)
```
#### 基于webpack开发
模块加载器



