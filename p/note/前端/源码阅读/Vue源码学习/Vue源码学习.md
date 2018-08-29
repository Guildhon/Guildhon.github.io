My Note
-------- 
> Vue源码学习

<a href="https://ustbhuangyi.github.io/vue-analysis/prepare/flow.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8-flow">Vue.js技术揭秘</a>

静态类型检查flow安装

```
cnpm install -g flow-bin 
flow init   // 创建.flowconfig文件，可进行配置
flow     // 默认检查index.js
```

##### 初始化Vue到最终渲染
<img src="https://ustbhuangyi.github.io/vue-analysis/assets/new-vue.png" alt="">

<a href="https://blog.csdn.net/generon/article/details/72482844">文章参考</a>
<a href="https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA">Vue生命周期</a>
<a href="https://ustbhuangyi.github.io/vue-analysis/data-driven/update.html#%E6%80%BB%E7%BB%93">update调用时机</a>

原本的根元素会被render后的替换掉，比如
```
<div id="app">{{mes}}</div>
```

Vue先执行init，初始化，给Vue原型加方法

挂载$mount方法，通过自定义Render方法，template，el等生成Render方法

编译模板，通过render方法生成vnode

执行patch方法，比对前面是DOM节点

通过createElement，递归创建节点，子元素优先调用insert，整个vnode节点插入顺序是先子后父