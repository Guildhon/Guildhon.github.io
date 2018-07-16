My Note
-------- 
> 牛客剑指offer

1.在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
```
// javascript
function Find(target, array){
	// 从最后一行第一个元素开始
	for (var i = array.length - 1, j = 0; i >= 0 && j < array.length) {
		if (target == array[i][j]) {
			return true;
		} else if (target < array[i][j]) {
			i--;
			continue;
		} else {
			j++;
			continue;
		}
	}
	return false;
}
```
2.请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
```
// javascript
// 如果只是用" "来替换的话，无法达到全局的效果
function replaceSpace(str)
{
    return str.replace(/\s/g,"%20");
}
```

3.输入一个链表，从尾到头打印链表每个节点的值。
```
// javascript
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    if (!head) {
        return 0;
    } 
    var arr = [];
    var cur = head;
    while (cur != null) {
        arr.unshift(cur.val);
        cur = cur.next;
    }
    return arr;
}
```

4.输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
```
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function reConstructBinaryTree(pre, vin)
{
    // write code here
    if (pre.length == 0 || vin.length == 0) {
        return null;
    }
    var index = vin.indexOf(pre[0]);
    var left = vin.slice(0,index);
    var right = vin.slice(index+1);
    var node = new TreeNode(vin[index]);  // pre[0]来代替
    node.left = reConstructBinaryTree(pre.slice(1,left.length+1),left);
    node.right = reConstructBinaryTree(pre.slice(left.length+1),right);
    return node;
}
```

5.用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。
```
var stack1 = [];
var stack2 = [];
function push(node)
{
    stack1.push(node);
}
function pop()
{
    var temp = stack1.pop();
    while (temp) {
        stack2.push(temp);
        temp = stack1.pop();
    }
    var result = stack2.pop();
    temp = stack2.pop();
    while (temp) {
        stack1.push(temp);
        temp = stack2.pop();
    }
    return result;
}
```