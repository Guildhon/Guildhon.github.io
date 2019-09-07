My Note
--------(
> Koa

#### 使用脚手架
```
安装
npm install koa-generator -g
创建项目
koa2 my-project
koa2 -e my-project 使用ejs

npm run dev改文件服务可以自动重启
```

#### async await
await后面跟的一般是Promise
```
async fn(){
	let res = await new Promise((resolve,reject) => {
		setTimeout(()=>{resolve(1)},1000);
	})
}

await 1;
等于
await Promise.resolve(1);
```

#### 中间件
洋葱模型，request,response处理中间过程，中间件按use顺序
```
mkdir middleware
touch middleware/koa-pv.js


// koa-pv.js
function pv(ctx){
	global.console.log(ctx.path)
}
module.export = function(){
	return async function(ctx,next){
		pv(ctx)
		await next();
	}
}

// app.js
const pv = require('./middleware/koa-pv');
app.use(pv());


touch /middleware/m1.js
touch /middleware/m2.js
touch /middleware/m3.js
// m1.js       m2.js和m3.js都一样
function m1(ctx){
	global.console.log('m1')
}
module.export = function(){
	return async function(ctx,next){
		console.log('m1 start')
		m1(ctx)
		await next();
		console.log('m1 end')
	}
}

// app.js      m2和m3都一样            
const m1 = require('./middleware/koa-m1');
app.use(m1());
app.use(m2());
...

pv
m1 start
m1 
m2 start
m2 
m3 start
m3
m3 end 
m2 end
m1 end
```

ctx.render方法第一个参数是views目录下页面的名字

#### Cookie和Session
ctx.cookies
```
访问首页
ctx.cookies.set('pvid', Math.random());
ctx.cookies.get('pvid');
```




