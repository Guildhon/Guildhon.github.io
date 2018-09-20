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


#### 双向数据绑定实现
先实现一个Observer，监听属性，对set和get方法进行改写，每个数据有一个订阅者数组Dep，在set方法时遍历这个数组，执行绑定更新的函数来更新视图，get方法添加订阅者，当编译模板时赋值用到get，将创建好的订阅者添加进去，编译模板遇到input之类的绑定事件，更新到数据
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Two-way-data-binding</title>
</head>
<body>
  <div id="app"><input type="text" v-model="ha">
    {{ ha }}
    <input type="text" v-model="text">
    {{ text }}
  </div>

  <script>
    // 存储每个data比如ha的订阅者，如[v-model:haha {{ha}}]
    function Dep () {
      this.subs = []
    }
    Dep.prototype = {
      addSub: function(sub) {
        this.subs.push(sub);
      },
      notify: function() {
        this.subs.forEach(function(sub) {
          sub.update();
        });
      }
    }
    function observe(obj, vm) {
      Object.keys(obj).forEach(function (key) {
        defineReactive(vm, key, obj[key]);
      })
    }
    function defineReactive (obj, key, val) {
      var dep = new Dep();
      Object.defineProperty(obj, key, {
        get: function () {
          // 添加订阅者 watcher 到主题对象 Dep
          if (Dep.target) dep.addSub(Dep.target); //在获取值时添加一个订阅者watcher对象
          console.log(dep);
          return val
        },
        set: function (newVal) {
          if (newVal === val) return
          val = newVal;
          // 作为发布者发出通知
          dep.notify();      // 对每个如[v-model:haha {{ha}}]进行通知
        }
      });
    }
    function nodeToFragment (node, vm) {
      var flag = document.createDocumentFragment();
      var child;
       // 许多同学反应看不懂这一段，这里有必要解释一下
      // 首先，所有表达式必然会返回一个值，赋值表达式亦不例外
      // 理解了上面这一点，就能理解 while (child = node.firstChild) 这种用法
      // 其次，appendChild 方法有个隐蔽的地方，就是调用以后 child 会从原来 DOM 中移除
      // 所以，第二次循环时，node.firstChild 已经不再是之前的第一个子元素了
      while (child = node.firstChild) {
          compile(child, vm);
          flag.appendChild(child); // 将子节点劫持到文档片段中
      }
      return flag
    }
    function compile (node, vm) {
      var reg = /\{\{(.*)\}\}/;
      // 节点类型为元素
      if (node.nodeType === 1) {
        var attr = node.attributes;        // 属性数组
        // 解析属性
        for (var i = 0; i < attr.length; i++) {
          if (attr[i].nodeName == 'v-model') {
            var name = attr[i].nodeValue; // 获取 v-model 绑定的属性名
            node.addEventListener('input', function (e) {
              // 给相应的 data 属性赋值，进而触发该属性的 set 方法
              vm[name] = e.target.value;
            });
            node.value = vm[name]; // 将 data 的值赋给该 node
            node.removeAttribute('v-model');
          }
        };
        new Watcher(vm, node, name, 'input');
      }
      // 节点类型为 text
      if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
          var name = RegExp.$1; // 获取匹配到的字符串
          name = name.trim();
          new Watcher(vm, node, name, 'text');
        }
      }
    }
    function Watcher (vm, node, name, nodeType) {
      Dep.target = this;          // 一个watch对象
      this.name = name;
      this.node = node;
      this.vm = vm;
      this.nodeType = nodeType;
      this.update();
      Dep.target = null;
    }
    Watcher.prototype = {
      update: function () {
        this.get();
        if (this.nodeType == 'text') {
          this.node.nodeValue = this.value;
        }
        if (this.nodeType == 'input') {
          this.node.value = this.value;
        }
      },
      // 获取 data 中的属性值
      get: function () {
        this.value = this.vm[this.name]; // 触发相应属性的 get
      }
    }
    function Vue (options) {
      this.data = options.data;
      var data = this.data;
      observe(data, this);
      var id = options.el;
      var dom = nodeToFragment(document.getElementById(id), this);
      // 编译完成后，将 dom 返回到 app 中
      document.getElementById(id).appendChild(dom);
    }
    var vm = new Vue({
      el: 'app',
      data: {
        text: 'hello world',
        ha: 'hahaha'
      }
    })
  </script>
</body>
</html>
```