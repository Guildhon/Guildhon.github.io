My Note
-------- 
>Webpack

<a href="https://caniuse.com/">can i use</a>

<a href="https://webpack.docschina.org/">文档</a>

<a href="https://blog.csdn.net/weixin_41559723/article/details/79116049">babel插件</a>

<a href="https://blog.csdn.net/WEB_YH/article/details/79325182">file-loader与url-loader的区别</a><a href="https://blog.csdn.net/qq_38652603/article/details/73835153">2</a>

要使用npm install 才会产生package-lock.json，使用cnpm install不会产生，解决方法是
```
npm install vue -S --registry=https://registry.npm.taobao.org
```

#### 模块化

##### 命名空间

库名.类别名.方法名
```
var NameSpace = {};
NameSpace.type = NameSpace.type || {};
NameSpace.type.method = function (){
}
```
有很多弊端，比如容易覆盖

##### COMMON.JS
一个文件为一个模块

通过module.exports暴露模块接口

通过require引入模块，模块同步加载执行

##### AMD异步模块定义

通过define定义模块

使用require加载模块

require.js 依赖前置，提前执行

模块一开始就执行完了

```
// 前面模块名可以省略
define(["a","b","c"],function(a,b,c){
	if (false) {
		b.foo();			// 即使没有用到模块b，但b还是提前执行了，可以直接引用
	}
})
```

##### CMD通用模块定义
一个文件一个模块

通过define定义模块

使用require加载模块

Sea.js 尽可能的懒执行，就近依赖，延迟执行

和AMD区别就是写法不一样，模块提前加载，等require用到的时候再执行


##### UMD

通用模块方案<a href="https://leohxj.gitbooks.io/front-end-database/content/javascript-modules/about-umd.html">umd</a>

1、判断是否支持AMD；2、判断是否支持CommonJS，如果都没有，定义为全部变量

```
// 模块定义
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {      //检查AMD是否可用
        define('toggler', ['jquery', factory])
    } else if (typeof exports === 'object' && typeof module !== undefined) { //	检查CommonJS是否可用
        module.exports = factory(require('jquery'));
    }  else {       //两种都不能用，把模块添加到JavaScript的全局命名空间中。
        global.toggler = factory(global, factory);   // 暴露到全部
    }
})(this, function ($) {
    function init() {

    }
    return {
        init: init
    }
});
```

##### ESM(ES6)
一个文件一个模块

export/import

as重命名

wepback支持AMD(RequireJS),ES Modules(推荐的),CommonJS

##### CSS模块化
css设计模式，css modules

#### webpack版本
```
webpack v1
编译、打包
HMR(模块热更新)
代码分割
文件处理

webpack v2
Tree shaking  引入代码却没有使用，打包后不会加入
ES module 在1版本需要使用babel才能支持，2可以直接使用
动态Import

webpack v3
Scope Hoisting(作用域提升) 打包后代码性能提升
Magic Comments(配合动态Import) 指定打包后的文件名
```

#### API
##### Entry 
代码的入口 打包的入口 单个或多个

##### Output 
打包成的文件(bundle) 一个或多个 自定义规则 
```
modules.exports = {
	entry: {
		index: 'index.js',
		vendor: 'vendor.js'
	},
	output: {
		filename: '[name].min.[hash:5].js'
	}
}
```

##### Loaders 
处理文件 转化成模块
```
modules.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: 'css-loader' 
			}			
		]
	}
}
```
编译相关 babel-loader ts-loader

样式相关 style-loader css-loader less-loader postcss-loader(添加浏览器前缀)

文件相关 file-loader url-loader

##### Plugins
参与打包整个过程 打包优化和压缩 配置编译时的变量
```
const webpack = require('webpack');
module.exports = {
	plugins: [
		new webpack.optimize.UglifyJsPlugin()   // 混淆和压缩代码
	]
}
```
常用的Plugins

优化相关 CommonsChunkPlugin(提取第三方库和公共模块) UglifyjsWebpackPlugin(混淆和压缩代码)

功能相关  ExtraTextWebpackPlugin(将css单独提取出来当初文件) HtmlWebpackPlugin HotModuleReplacementPlugin CopyWebpackPlugin

##### 名词
chunk代码块 Bundle打包后的，一束，一捆 Moudle模块

#### webpack命令
webpack -h

webpack --config webpack.conf.dev.js

#### webpack-cli
交互式的初始化一个项目

迁移项目v1->v2 
```
// webpack 2.0.13
webpack-cli init webpack-addons-demo
Pengwings
app
verndor

// 生成了webpack-pengwings.js
const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: 'app',

	output: {
		filename: '[name].js'
	},

	context: path.join(__dirname, 'src'),

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor-[hash].min.js'
		})
	]
};
```

#### Babel 
Presets 设将支持ES6新语法的兼容性编译。
```
rules: [
	{
		test: /\.js$/,
		use: {
			loader: 'babel-loader',
			options: {							// options还可以指定环境，如node或browsers 
				presets: ['@babel/preset-env']     
			}
		},
		exclude: '/node_modules/'
	}
]
```
配置targets，可以为node也可为browsers
```
module.exports = {
	entry: {
		app: './app.js'
	},
	output: {
		filename: '[name].[hash:5].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
							    '@babel/preset-env',
                                {
                                    targets: {
                                        browsers: ['> 1%','last 2 versions']  // 指定浏览器情况，箭头函数会被转化，every，map之类不会被转
                                    }
                                }
                            ]
						]
					}
				},
				exclude: '/node_modules/'
			}
		]
	}
}
```
以上的babel只对语法进行转化，一些方法和API无法转化，如map,Array.from,Map,Set,includes等等

需要使用polyfill全局垫片，会污染全局，为应用准备，代码会有如Set()方法的实现等等
```
cnpm install babel-polyfill --save
在我们要编译的代码，如app.js里import "babel-polyfill"，可以把配置抽到.babelrc
```
babel runtime transform局部垫片，为开发框架准备，不污染全局
```
cnpm install babel-plugin-transform-runtime --save-dev
cnpm install babel-runtime --save
可以在根目录下配置.babelrc

前面安装的都是@babel/core，所以也得
cnpm install @babel/runtime --save
cnpm install @babel/plugin-transform-runtime --save-dev

// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
         "targets": {
            "browsers": ["last 2 versions"]
        }
      }
    ]
  ],
  "plugins": ["@babel/transform-runtime"]
}

// webapck.config.js
module.exports = {
	entry: {
		app: './app.js'
	},
	output: {
		filename: '[name].[hash:5].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: '/node_modules/'
			}
		]
	}
}
```
平常开发应用使用babel-polyfill就够了

##### TypeScript
JS的超集，可以在ts里写js，来自微软
```
// 安装，两种方式都可以
cnpm install typescript ts-loader --save-dev
cnpm install typescript awesome-typescript-loadr --save-dev

// 配置
// tsconfig.json
// webpack.config.js
```

##### 提取公共代码
减少代码冗余，提高用户加载速度
CommonsChunkPlugin webpack.optimize.CommonsChunkPlugin
```
{
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(option)
	]
}
// 配置
options.name or options.names 选定代码的chunk
options.filename 共用文件打包后的文件名
options.minChunks 需要提取的共用代码的最小次数，比如赋值2，模块重复出现2次就抽出来
options.chunks 提取代码的范围
options.children 是否在子模块中提取
options.deepChildren
options.async 异步共用代码块
// 场景
单页应用
单页应用+第三方依赖
单页应用+第三方依赖+webpack生成代码 
```
对于单个entry是没有用的，需要多个entry，提取公共代码
```
plugins: [
    new webpack.optimize.CommonsChunkPlugin({      // 提取模块共同代码
        name: 'common',
        minChunks: 2,
        chunks: ['pageA','pageB']
    }),
    new webpack.optimize.CommonsChunkPlugin({      // 提取公共vendor
        name: 'vendor',
        minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({      // 将webpack的代码单独打包出来
        name: 'manifest',
        minChunks: Infinity
    })
]
```


##### 代码分割和懒加载
1.使用webpack方法

require.ensure 只加载不执行
```
参数 
[]:dependencies  不会立即执行
callback         在回调函数里require会执行
errorCallback
chunkName
```
只有在里面回调函数require才会执行
```
require.ensure(['./subPageA'], function () {
    var sibPageA = require('./subPageA');
},'subpageA');
```
require.include 提取父子模块中的公共部分
当前subPageA和subPageB模块里面import moduleA，通过require.include将moduleA抽离出来
```
// pageA.js           
require.include('./moduleA'); // moduleA会跟pageA打包到一起
var page = 'subpageA';

if (page === 'subpageA') {
    require.ensure(['./subPageA'], function () {
        var sibPageA = require('./subPageA');
    },'subpageA');
} else if (page === 'subPageB'){
    require.ensure(['./subPageB'], function () {
        var sibPageA = require('./subPageB');
    },'subPageB');
}
```
当我们有分割出去的chunk，需要指定publicPath，不然bundle文件会找不到chunk文件
```
output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: "./dist/",         // 打包后的代码请求地址，发布路径，动态加载地址
    filename: '[name].bundle.js',
    chunkFilename: "[name].chunk.js"
}
```

2.ES 2015 Loader Spec

System.import() -> import() 返回的是Promise import().then()
```
场景
分离业务代码 和 第三方依赖
分离业务代码 和 业务公共代码 和 第三方依赖
分离首次加载 和 访问后加载的代码
```
动态import加载后会立即执行，魔法注释指定打包的chunk的名称
```
if (page === 'subpageA') {
    import(/* webpackChunkName: 'subpageA' */ './subPageA').then(function (subPageA) {
        console.log(subPageA);
    });
} else if (page === 'subPageB'){
    import(/* webpackChunkName: 'subpageB' */ './subPageB').then(function (subPageB) {
        console.log(subPageB);
    });
}
```
使用async，打包多入口模块中的共同异步代码
```
new webpack.optimize.CommonsChunkPlugin({      
    async: 'async-common',	
    children: true  				// 子模块        				                    
    minChunks: 2	
}),
```

##### 处理CSS
引入CSS
```
style-loader创建一个标签style，插入到html中  
css-loader处理让js可以import一个css进来

在app.js里引入css，打包生成app.bundle.js，渲染出来的html是创建style插入
var path = require('path');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },

        ]
    }
}
```
style-loader
```
style-loader/url把css代码抽离出来，渲染出来的html是通过创建link引入
缺点就是app.js里import一个就创建一个link，这样会造成网络请求增加
var path = require('path');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./dist/",
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/url'
                    },
                    {
                        loader: 'file-loader'
                    }
                ]
            },

        ]
    }
}

style-loader/useable
可以逻辑控制样式，对style标签插入和删除
//webpack.config.js
const path = require('path');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./dist/",
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/useable'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },

        ]
    }
}
// app.js
import base from './css/base.css'
var flag = false;
setInterval(function () {
    if (flag) {
        base.unuse();
    } else {
        base.use();
    }
    flag = !flag;
}, 1000);
```
style-loader可以进行配置
```
options
insertAt(插入位置)
insertInto(插入到DOM'#app')
singleton(是否只使用一个style标签)
transform(转化，浏览器环境下，插入页面前) 设置一个js文件路径，作用是判断可以逻辑判断当前浏览器版本，对css做一个形变
```
css-loader
```
options
alias(解析的别名)
importLoader(@import)
minimize(是否压缩)
modules(启用css-modules)

modules: true,
localIdentName: '[path][name]_[lcoal]_[hash:base64:5]' // 给模块的class起名字，不然就是webpack自定义的名字
// base.css可以模块化引入
.box {
    composes: bigBox from './common.css';
    height: 120px;
    width: 200px;
    border-radius: 4px;
    background: #333;
}
// common.css
.bigBox {
    border: 10px solid green;
}
```
配置less/sass
```
使用less-loader
{
    loader: 'css-loader',
    options: {
        minimize: true,
        modules: true,
        localIdentName: '[path][name]_[local]_[hash:base64:5]'
    }
},
{
    loader: 'less-loader'
}
```
提取css代码，有两种方式，一种是extra-loader,一种是ExtractTextWebpackPlugin
```
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./dist/",
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {             // 提取失败
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [                  // 提取前处理
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css'
        })
    ]
}
```
postcss 需要安装postcss,postcss-loader
```
// 相应插件
autoprefixer     // 加浏览器前缀
css-nano         // 优化，压缩css css-loader设置minimize
css-next		 // 使用css新语法，比如calc等 

{
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            // require('autoprefixer')(),
            require('postcss-cssnext')()
        ]
    }
}

可以在package.json里配置browserslist比如
"browserslist": [
	">= 1%",
	"last 2 versions"
]
也可以单独建立一个.browserslistrc
```
##### Tree Sharking
打包的时候去掉一些没有用到的代码

使用场景，代码优化
JS Tree Sharking
```
// 本地自己写的一些模块
plugins: [
    new webpack.optimize.UglifyJsPlugin()
]

如果是lodash，即使是使用一个方法，打包以后还是会很大，不方便webpack使用tree sharking，需要通过各种方法兼容
```

CSS Tree Sharking
使用purifycss-webpack
```
options paths: glob.sync([])

var glob = require('glob-all');        // 再装这个
var PurifyCss = require('purifycss-webpack');
plugins: [ 
	new ExtractTextWebpackPlugin({
        filename: '[name].min.css'        
    }),
    new PurifyCss({          // 如果有ExtractTextWebpackPlugin，需要放在其后面
		path.resolve(__dirname,'./*.html'),
		path.resolve(__dirname,'./src/*.js')
    })
]
```

##### 文件处理
图片文件
CSS中引入的图片 自动合成雪碧图 压缩图片 base64编码
file-loader  postcss-sprites img-loader url-loader（base64）
```
// 下面场景为src的css目录下的css文件引用src下assets的图片，都打包到dist目录
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                publicPath: './assets/imgs/',	     // 设置绝对路径，css文件会被修改
                outputPath: '',
                useRelativePath: true               // 设置相对路径
            }
        }
    ]
}
```
使用url-loader，比file-loader多了个转化base64的功能 
```
{
    loader: "url-loader",
    options: {
        name: '[name][hash:5].min.[ext]',
        publicPath: './assets/imgs/',
        outputPath: './assets/imgs/',
        limit: 100000           // 小于10k转成base64
    }
}
```
img-loader压缩图片
```
{
	loader: "img-loader",
	options: {
	    pngquant: {
	        quality: 80
	    }
	}	
}
``` 
生成雪碧图
```
{
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('postcss-sprites')({
                spritePath: 'dist/assets/imgs/',
                retina: true                   // 适应retina屏幕
                
            }),
            require('postcss-cssnext')()
        ]
    }
}	
```

字体文件
```
{
/* 字体文件 */
test: /\.(eot|woff2?|ttf|svg)$/,
use: [{
  loader: 'url-loader',
  options: {
    name: '[name]-[hash:5].[ext]',
    /* 超出 5000 处理成 base64 */
    limit: 5000,
    /* 图片地址不对, 设置绝对路径 */
    publicPath: '',
    /* 放到 dist 目录 */
    outputPath: 'dist/',
    /* 设置相对路径 */
    useRelativePath: true
  }
}]
}
```
第三方JS库
 
webpack.providePlugin  
```
plugins: [                     // 使用npm下载管理的
	new webpack.ProvidePlugin({
		$: 'jquery'
	})
]
```
在module.exports里
```
resolve: {
    alias: {
        jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')   // 解析从其他地方的文件
    }
}
```
使用imports-loader
```
{
test: path.resolve(__dirname, 'src/app.js'),
use: [
    {
        loader: 'imports-loader',
        options: {
            $: 'jquery'
        }
    }
]
}
```
webpack处理html  自动载入引用的文件 自动生成html
HtmlWebpackPlugin
```
options
	template
	filename
	minify
	chunks
	inject  

Plugins: [
	new HtmlWebpackPlugin({
		filename: 'index.html',       // 模板文件
		template: './',
		// inject: false          // 不把生成的路径添加到html中
		chunks: ['app'],           // 多入口，只会把app的相关插入中html中
		minify: {
			collapseWhitespace: true        // html压缩空格
		}
	})
]
```
html中引入的图片
html-loader
```
options
	attrs:[img:src ]

{
	test: /\.html$/,
	use: [
		{
			loader: 'html-loader',
			options: {
				attrs: ['img:src','img:data-src']
			}
		}
	]
}
```

配合优化
提前载入webpack加载代码，把提取出来的js放置进去
inline-mainfest-webpack-plugin
html-webpack-inline-chunk-plugin

##### 搭建开发环境
express+webpack-dev-middleware

webpack watch mode
```
webpack -w --progress --display-reasons --color
```
webpack-dev-server 开发服务器 不需要require
live reloading自动刷新，不生成打包文件，路径重定向，支持https，支持浏览器中显示编译错误，接口代理，模块热更新
```
devServer
	inline     默认true,false页面看到打包状态
	contentBase
	port
	historyApiFallback  设置为true，所有页面重定向到主页，可加规则 
	https,
	proxy    代理远程接口请求  http-proxy-middleware(options target changeOrigin headers logLevel pathRewrite)
	hot		 热更新，保持应用的数据状态，节省调试时间，样式调试更快
	openpage 最先打开哪个页面
	lazy     懒模式，只有访问资源才会编译
	overlay  遮罩显示错误

在package.json里scripts里添加
{"server": "webpack-dev-server --open"}
moudle.export = {
	devServer: {
		port: 9001，
		proxy: {                      // 可以解决开发时请求接口跨域
			/*'/api': {
				target: 'https://xxxx',
				changeOrigin: true,
				logLevel: "debug"         // 控制台看到信息
			}*/
			'/': {
				target: 'https://xxxx',
				changeOrigin: true,
				logLevel: "debug",        // 控制台看到信息
				pathRewrite: {
					'^/comments': '/api/comments'   // 省略剩下comments
				},
				headers: {
					'Cookie': '放置cookies' // 调试阶段放置
				}
			}
		},
		hot: true,         // 热更新
		historyApiFallback: {
			rewrites: [
				{
					from: '/pages/a',
					to: '/pages/a.html'
				}
			]
		}
	},
	Plugin: [
		new webpack.HotModuleReplacementPlugin(),        // 配置热更新
		new webpack.NameModulesPlugin()                  // 看到控制台输出
	]
}
```

##### source map调试 

webpack.SourceMapDevToolPlugin

webpack.EvalSourceMapDevToolPlugin

Devtool
```
Development
Production

module.exports = {
	devtool: 'cheap-module-source-map',
}
在各个test的option里sourceMap:true
```

##### EsLint检查代码规范
eslint eslint-loader eslint-plugin-html eslint-friendly-formatter 在webpack config里.eslintrc.*

package.json中的eslintConfig

##### 开发环境和生产环境
生产环境
提取公共代码
压缩混淆
文件压缩或是base64编码
去除无用的代码

共同点
同样的入口 
同样的代码处理（loader）
同样的解析配置

如何做？webpack-merge拼接配置
```
webpack.dev.conf.js
webpack.pro.conf.js
webpack.common.conf.js

webpack-dev-server --env development --open --config build/webpack.common.config.js  // 判断env是啥，然后merge不同的js 

const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const merge = require('webpack.merge');
const generateConfig = env => {
	return 配置对象
}
module.exports = env => {
	let config = env === 'production' ? productionConfig : developmentConfig;
	return merge(gengerateConfig(env),config)
}
```

##### 问题
1.webpack和gulp不同？

webpack是一个模块打包器，可以递归的打包项目中的所有模块，最后生成几个打包后的文件。最大不同在于支持code-splitting、模块化（AMD,ESM,COMMONJS）,全局分析。gulp只是执行任务。

2.什么是bundle,什么是chunk,什么是module?

bundle是由webpack打包出来的文件，chunk是指webpack在进行模块的依赖分析的时候，代码分割出来的代码块，module是开发中的单个模块

3.什么事Loader?什么是Plugin?

Loaders是用来告诉webpack如何转化处理某一类型的文件，并且引入到打包出的文件中

Plugin是用来自定义webpack打包过程的方式，一个插件是含有含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程（声明周期）比如删除目录，压缩，分析，混淆代码等等

如何可以自动生成webpack配置？使用脚手架

4.webpack-dev-server和http服务器如nginx有什么区别？

webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统的http服务对开发更加简洁高效

5.什么是模块热更新？

模块热更新是webpack的一个功能，他可以使得代码修改过后不用刷新浏览器就可以更新

6.什么是长缓存？在webpack中如何做到长缓存优化？

浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行缓存，但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的方式就是引入新的文件名称。在webpack中可以在output给输出的文件指定chunkhash，并且分离经常更新的代码和框架代码。通过NamedModulesPlugin或是HashedModulesIdsPlugin使再次打包文件名不变

7.什么是Tree-shaking?CSS可以Tree-shaking吗？

Tree-shaking是指在打包中去除那些引入了，但是代码中没有使用的那些死代码。在webpack中Tree-shaking是通过uglifyJSPlugin来Tree-shaking JS。CSS需要使用Purify-CSS













