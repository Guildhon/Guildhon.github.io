My Note
-------- 
> AngularJs学习

[AngularJS版本](https://code.angularjs.org/) 可以通过npm包管理工具，或者bower获取

AngularJS是MVVM框架
```
MVC模式
M   Model       模型-数据
V   View        视图-表现层        HTML/CSS
C   Controller  控制器-业务逻辑

V向C要数据，C通知M，M返回给V
缺点：
1.M和V耦合度高
2.C特别臃肿
```
![mvc](img/mvc.png)
```
MVP
M
V
P   Presenter   主持人

1.M和V没有耦合
2.P特别特别臃肿
```
![mvp](img/mvp.png)
```
MVVM

M
V
VM    ViewModel
1.M和V没有耦合
2.MV还好
```
```
MVC   经典
MVP   解除耦合；P臃肿
MVVM  一部分简单逻辑放到HTML里面
  取消臃肿
  直接、粗暴
```