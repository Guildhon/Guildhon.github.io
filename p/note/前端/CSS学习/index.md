My Notes
--------
> CSS学习

#### HTML回顾

##### HTML常见元素

header头部元素，一般是资源或信息元素，不会在页面留下内容

```
meta  <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
title
style
link
script
base <base href="作为基准URL的绝对URL(比如'http://www.example.com/')">
```

body里的元素
```
div/section/article/aside/header/footer
p
span/em/strong
table/thead/tbody/td/tr
ul/ol/li/dl/dt/dd
a
form/input/select/textarea/button
```


#### 爱恨原则
1. link:连接平常的状态
2. visited:连接被访问过之后
3. hover:鼠标放到连接上的时候
4. active:连接被按下的时候

正确顺序：“爱恨原则”（LoVe/HAte），即四种伪类的首字母:LVHA。再重复一遍正确的顺序：a:link、a:visited、a:hover、a:active

因为当鼠标经过未访问的链接，会同时拥有a:link、a:hover两种属性，a:link离它最近（即一个HTML页面的styke里，放在后面），所以它优先满足a:link，而放弃a:hover的重复定义。当鼠标经过已经访问过的链接，会同时拥有a:visited、a:hover两种属性，a:visited离它最近，所以它优先满足a:visited，而放弃a:hover的重复定义。究其原因，是css的就近原则“惹的祸”