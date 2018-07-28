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
```
cnpm install webpack -g             安装命令环境
cnpm install webpack-dev-server -g  小型服务器
```
webpack组成部分
```
a) 入口，出口
b) loaders (加载器)
c) plugins (插件，自己插件，第三方插件)
```
配置文件webpack.config.js

webpack命令
```
webpack 打包一次
webpack -w 监听文件变化打包
webpack -p 压缩文件
webpack -pw 持续监听并压缩
```
```
在ES6语法中，如果要导出一个对象需要使用export default {a:'welcome',b:'china'}
如果是散着导出的话使用export {a:12,b:13}
在js文件里面使用
import json,{a,b} from 'xxx'   
console.log(json.a,json.b,a,b);   // 输出welcomechina1213
```
loaders
```
引入css文件
style-loader,css-loader
// index.js
import 'xx.css';
// webpack.config.js
module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}]
	}
};

jsx语法
配置babel
babel-core核心代码,babel-loader,babel-preset-es2015设置预设
使用预设：
a)参数
rules: [{
	test: /\.js$/,
	use: [
		{
			loader: 'babel-loader',
			options: {
				presets: ['es-2015']
			}
		}
		
	]
}]
b).babelrc
	{
		"presets": ['es2015']
	}
```
配置react
```
react,
react-dom,
babel-preset-react,
babel-core,
babel-loader,
babel-preset-es2015,
react-hot-loader
```

#### 脚手架安装
```
cnpm install -g create-react-app
create-react-app react-test
cd react-test
npm run start
```

#### 组件化
组件的封装

视图 数据 变化逻辑（数据驱动视图变化）

组件的复用

props传递，复用

#### JSX
##### JSX语法

注释 
```
{/* <Todo/> */}  {之间放的是JS变量}
```
html形式
```
(<div>
	<div></div>
</div>)
```
引入JS变量和表达式
```
{name ? '1' : 0} 
{(name === 'zhangsan').toString()}
&& || 
```

if...else...
```
三目运算 ? : 
```

循环
```
render(){
	const list = [1,2,3]
	return (<div>
		<ul>
			{list.map((item,index)=>{
				return <li key={index}>{item}</li>
			})}
		</ul>
	</div>)
}
```

style和className 
```
render(){
	const styleConfig = {
		fontSize: '40px'
		color: 'blue'
	}
	return (<div className="container">
		<p style={styleConfig}>aaa</p>   // style={{fontSize: '40px',color: 'blue'}}
	</div>)
}
```

事件

JSX语法根本无法被浏览器所解析

##### JSX解析
```
/* JSX代码 */
var profile = <div>
	<img src="avatar.png" className="profile" />
	<h3>{[user.firstName,user.lastName].join(' ')}</h3>
</div>;

// 解析结果
var profile = React.createElement("div",null,
	React.createElement("img",{src: 'avatar.png',className: "profile"}),
	React.createElement("h3",null,[user.firstName,user.lastName].join(' '))
);

/* JSX代码 */
render(){
	const list = this.props.data
	return (
		<ul>
			{
				list.map((item,index) => {
					return <li key={index}>{item}</li>
				})
			}
		</ul>
	)
}

// 解析结果
function render(){
	const list = this.props.data
	return React.createElement(
		"ul",
		null,
		list.map((item,index) => {
			return React.createElement(
				"li",
				{key: index},
				item
		});
	);
}
```

JSX其实是语法糖

开发环境会将JSX编译成JS代码

JSX的写法大大降低了学习成本和编码工作量，同时，JSX也会增加debug成本

##### JSX独立的标准

JSX是React引入的，但不是React独有的

React已经将它作为一个独立标准开放，其他项目也可用

React.createElement是可以自定义修改名字的

本身功能已经完备；和其他标准兼容和扩展性没问题

```
使用babel 编译
cnpm install babel -g
安装插件babel-plugin-transform-react-jsx
创建.babelrc
{"plugins": [transform-react-jsx]}
babel --plugins transform-react-jsx demo.jsx

在demo.jsx头部添加/* @jsx h */，可将React.createElement修改名字为h函数
```

##### JSX和vnode
为何需要vnode？（JSX需要渲染成html，数据驱动视图）

vnode是React初次推广开的，结合JSX

JSX就是模板，最终要渲染成html

初次渲染+修改state后的re-render

正好符合vnode的应用场景

何时patch?

初次渲染 - ReactDom.render(<App/>,container)

会触发patch(container,vnode)

re-render - setState

会触发patch(vnode,newVnode)

自定义组件的解析 （初始化实例，然后执行render）
```
// jsx
return (<div>
	<Input addTitle={this.addTitle.bind(this)}/>
	<List data={this.state.list}/>
</div>)

// js
return React.createElement('div',null,
	React.createElement(Input,{addTitle:this.addTitle.bind(this)}),
	React.createElement(List,{data: this.state.list})
)
/*
	var list = new List({data: this.state.list})
	return list.render();
 */
```

'div' - 直接渲染<div>即可，vdom可以做到

Input和List，是自定义组件(class)，vdom默认不认识

因此Input和List定义的时候必须声明render函数

根据props初始化实例，然后执行实例的render函数

render函数返回的还是vnode对象

##### setState

setState的异步

```
addTitle(title) {
	const currentList = this.state.list
	console.log(this.state.title)     // ['a','b']
	this.setState({
		list: currentList.concat(title)       // 'c'
	})
	console.log(this.state.title)     // ['a','b']
}
```

可能会一次执行多个setState

你无法规定、限制用户如何使用setState

没必要每次setState都重新渲染，考虑性能

即使是每次重新渲染，用户也看不到中间件的效果（因为JS执行和DOM操作都是单线程，JS执行时DOM是卡顿的）

只看到最后的效果即可
```
addTitle(title) {
	const currentList = this.state.list
	// 初次想增加title
	this.setState({
		list: currentList.concat(title)       
	})
	// 改变主意，想增加title+1
	this.setState({
		list: currentList.concat(title+1)       
	})
	// 改变主意，想增加title+2
	this.setState({
		list: currentList.concat(title+2)  // 覆盖，只执行最后一个渲染     
	})
}
```

vue修改属性也是异步

效果、原因和setState一样 

发生在第四步

修改属性，被响应式的set监听到

set中执行updateComponent，updateComponent是异步的

updateComponent重新执行vm._render()

生成的vnode和prevVnode，通过patch进行对比

渲染到html
```
this.title = "123";  // 监听
this.title = "234";  // 监听
```

setState的过程

每个组件实例，都有renderComponent方法（在继承的Component类中）

执行renderComponent会重新执行实例的render（按照最新的数据，生成最新的vnode）

render函数返回newVnode，然后拿到preVnode

执行patch(preVnode,newVnode)
```
// 模拟
class Component {
	constructor(props){}
	renderComponent(){
		const prevVnode = this._vnode
		const newVnode = this.render()
		patch(prevVnode,newVnode)
		this._vnode = newVnode	
	}
}

addTitle(title) {
	const currentList = this.state.list
	this.setState({
		list: currentList.concat(title)       
	}, () => {
		this.renderComponent()
	})
}
```

#### Vue vs React

##### 两者的本质区别

Vue:本质是MVVM框架，由MVC发展而来

React:本质是前端组件框架，由后端组件化发展而来

##### 看模板和组件化的区别

vue:使用模板（最初由angular提出）

React:使用JSX，模板和JS混在一起，未分离

模块语法（倾向JSX，有标准），模板分离上（倾向于vue）

React本身就是组件化，没有组件化就不是React，组件化更倾向React

vue也支持组件化，不过是在MVVM上的扩展
##### 两者共同点
都支持组件化

都是数据驱动视图

国内使用，首推vue，文档易读，易学，社区够大

团队水平够高，推荐使用React，组件化和JSX
