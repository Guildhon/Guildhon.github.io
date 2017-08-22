My Note
-------- 
> ThinkPHP入门

是许多代码的集合，是程序结构的代码

先创建index.php,引入thinkphp
```
define ('APP_NAME', 'APP');
define ('APP_PATH', './APP/');  //生成的文件放在APP目录下
require './ThinkPHP/ThinkPHP.php';
```
common  存放当前项目的公共函数

conf  存放当前项目的配置文件

lang 存放当前项目的语言包

lib  存放当前项目的控制器和模型

tpl 存放当前项目的模板文件

1. 运行加载thinkphp.php。2.加载核心文件 ./thinkPHP/LIB/core。3.加载项目的文件 分析URL，调用相关控制器
```
index.php?m=index&a=index   // m是module模块 控制器	  a是action方法 action=页面
```
```
URL_MODEL
U('Index/user',array('id'=>1),'',false,'localhost');
0普通模式http://localhost/TP/ThinkPHP_3.1/index.php?m=Index&a=user&id=1
1默认模式http://localhost/TP/ThinkPHP_3.1/index.php/Index/user/id/1
2重写模式http://localhost/TP/ThinkPHP_3.1/Index/user/id/1
3兼容模式http://localhost/TP/ThinkPHP_3.1/index.php?s=/Index/user/id/1
```
