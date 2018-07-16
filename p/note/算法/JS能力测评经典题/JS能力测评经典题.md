My Note
-------- 
> JS能力测评经典题

如果数组中存在 item，则返回元素在数组中的位置，否则返回 -1
```
function indexOf(arr, item) {
  if (Array.prototype.indexOf){
      return arr.indexOf(item);
  } else {
      for (var i = 0; i < arr.length; i++){
          if (arr[i] === item){
              return i;
          }
      }
  }     
  return -1;
}
```

计算给定数组 arr 中所有元素的总和
```
// 递归
function sum(arr) {
    var len = arr.length;
    if(len == 0){
        return 0;
    } else if (len == 1){
        return arr[0];
    } else {
        return arr[0] + sum(arr.slice(1));
    }
}

// 常规循环
function sum(arr) {
    var s = 0;
    for (var i=arr.length-1; i>=0; i--) {
        s += arr[i];
    }
    return s;
}

// 函数式编程 map-reduce
function sum(arr) {
    return arr.reduce(function(prev, curr, idx, arr){
        return prev + curr;
    });
}

// forEach遍历
function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);
  
    return s;
}
// eval
function sum(arr) {
    return eval(arr.join("+"));
}
```

移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
```
// splice()
function remove(arr,item){
    var newarr = arr.slice(0);
    for(var i=0;i<newarr.length;i++){
        if(newarr[i] == item){
            newarr.splice(i,1);
            i--;
        }
    }
    return newarr;
}

// push
function remove(arr, item) {
    var arr2 = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] !== item){
            arr2.push(arr[i]);
        }
    }
    return arr2;
}

// Arra y.prototype.filter()
function remove(arr,item){
    return arr.filter(function(ele){
         return ele != item;
    })
}
```

移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回
```
// 把数组看成是队列，等于item元素直接删除，不等于的，先push再删除。
function removeWithoutCopy(arr, item) {
    var n=arr.length;
     for(var i=0;i<n;i++){
         if(arr[0]!==item)   
             arr.push(arr[0]);
         arr.shift();
           
    }
    return arr;
}

// 简单的
function removeWithoutCopy(arr, item) {
    var count = 0;
    for (var i = 0; i < arr.length; i++){
        if (arr[i] === item){
            arr.splice(i,1);
            i--;
        }
    }
    return arr;
}
```

在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
```
// slice
function append(arr, item) {
   var newArr = arr.slice(0)
   newArr.push(item);
   return newArr;
}

// concat
function append(arr, item) {
    return arr.concat(item);
}
```

删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组
```
function truncate(arr) {
    return arr.slice(0,-1);
}
```

在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
```
function prepend(arr, item) {
    var newArr = arr.slice(0);
    newArr.unshift(item);
    return newArr;
}
```

在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
```
function insert(arr, item, index) {
    var newArr = arr.slice(0);
    newArr.splice(index,0,item);
    return newArr;
}
```
统计数组 arr 中值等于 item 的元素出现的次数
```
function count(arr, item) {
    var count = 0;
    arr.forEach(function (v){
        if (v == item){
            count++;
        }
    });
    return count;
}
```

找出数组 arr 中重复出现过的元素
```
function duplicates(arr) {
    var newArr = [];
    var repeat = [];
    arr.forEach(function (val){
        if (newArr.indexOf(val) == -1){
            newArr.push(val);
        } else {
            if (repeat.indexOf(val) == -1){
                repeat.push(val);
            }
        }
    });
    return repeat;
}
```

为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
```
function square(arr) {
    var a = arr.slice(0)
    a = a.map(function(val) {
        return val*val
    })
    return a
}
```


将数组 arr 中的元素作为调用函数 fn 的参数
```
function argsAsArray(fn, arr) {
    return fn(arr[0],arr[1],arr[2]);
}

function argsAsArray(fn, arr) {
  return fn.apply(this, arr);
 }


调用函数有3种方式：
obj.func();
func.call(obj,args);//参数列出
func.apply(obj,[m,n......]);//参数数组
```