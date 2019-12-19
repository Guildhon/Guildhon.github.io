My Note
-------- 
> solidity

https://remix.ethereum.org/

```
版本
pragma solidity ^0.4.0;

导入其他合约
import "xxx.sol"

// 注释

contract Test {

	uint a;    变量

	function setA(uint x) public {   函数
		a = x;
		emit Set_A(x);       触发事件
	}
	
	event Set_A(uint a);       事件

	struct Pos {          数据结构
		int lat;
		int lng; 
	}

	address public ownerAddr;

	modifier owner() {      函数修改器
		require(msg.sender == ownerAddr);
		_;
	}

	function mine() public owner {       // owner通过以后才会继续

	}

}	

```

## 语言类型

### 值类型
#### 布尔类型
true/false
```
bool boola = true;
bool boolb = false;
function testbool() public returns (bool) {
	return boola && boolb;
}
```
#### 整形
int/unit 关键字uint8到uint256(以8步进)
```
uint a;
int256 b = 20;
int256 c = 30;
function public add() public returns (int) {
	if (b > c) {
		return b + c;	
	} else if (b == c) {
		return b * c;
	} else {
		return b >> 2;
	}
	
}
```

#### 常量

有理数和整形常量，返回int常量
```
function testLiterals() public constant returns (int) {
	return 1111*1.5e10;
} 
```


#### 地址类型
address：表示一个账户地址（20字节）0x72xxx

成员
属性：blanance 
函数: transfer()  转移以太币
send
```
pragma solidity ^0.4.16;
contract AddrTest{
    function deposit() public payable {        // 接收多少以太币
        
    }
    function getBalance() public constant returns (uint) {      // 获取当前余额
        return this.balance;
    }
    function transferEther(address towho) public {      // 给某个地址转移多少以太币 
        towho.transfer(10);
    }
}
```
地址常量，地址合法性检查

### 引用类型
数据位置

memory临时分配，开销小点

storge存到链上的

#### 数组类型
```
T[k]:元素类型为T，固定长度为k的数组
T[]:元素类型为T，长度动态调整
bytes string是一种特殊的数组
string可转为bytes，bytes类似byte[]
```
属性：length，函数：push()
```
contract ArrayTest {
	unit[] public u = [1, 2, 3];
	string s = "abcdefg";
	function h() public constant returns (uint) {
		return bytes(s).length;
	}
	function f() public view returns (byte) {
		return bytes(s)[1]
	}
	function newM(uint len) constant public returns (uint) {
		uint[] memory a = new uint[](len);  // 不能更改
		u.length = 100;
		return a.length;
	}
}
```

#### 结构体
```
struct Funder {
	address addr;
	uint amount;
}
Funder funder;
function newFunder() public {
	funder = Funder({addr: msg.sender, amount: 10});  // 发送者的账号
}
```

#### 映射类型
```
mapping(adress => uint) public balances;    
function updateBalance(uint newBalance) public {
	balances[msg.sender] = newBalance
}
```

### 全局变量和函数
#### 有关区块和交易
```
msg.sender(address)   // 返回当前部署的账号
msg.value(uint)        // 返回当前交易附加的以太币
block.coinbase(address)  // 返回当前矿工地址
block.difficulty(uint)
block.number(uint)
block.timestamp(uint)
now(uint)
tx.gassprice(uint)
```
#### 有关错误处理
程序发生错误时的处理方式：回退状态
assert
require
```
function sendHalf(address addr) public payable returns (uini balance){
	require(msg.value % 2 == 0);      // 能%2才能走下去
	uint balanceBeforeTransfer = this.balance;
	addr.transfer(msg.value / 2);
	assert(this.balance == balanceBeforeTransfer - msg.value / 2);
	return this.balance;
}
```
#### 有关数字及加密功能
#### 有关地址和合约

### 函数参数
#### 输入参数
```
function simpleInput(uint a, uint b) public {

}
```
#### 输出参数
```
function simpleInput(uint a, uint b) public returns (uint sum){
	sum = a + b;
}
```
#### 命名参数
```
function simpleInput(uint a, uint b) public returns (uint sum){
	sum = a + b;
}
function testSimpleInput() public constant returns (uint sum){
	sum = simpleInput({a:1,b:3});
}
```
#### 参数解构
```
function simpleInput(uint a, uint b) public returns (uint sum, uint mul){
	sum = a + b;
	mul = a * b;
}
function testSimpleInput() public constant returns (uint sum, uint mul){
	(sum, mul) = simpleInput({a:1,b:3});
}
```
```
function f() public constant returns (uint, bool, uint){
	return (7,true,8);
}
function g() public {
	var (x, y, z) = f();
	(x, z) = (z, x);
}
```

### 控制结构
没有switch和goto，其他if else,while,do有
```
function testWhile() public constant returns(uint) {
	uint i = 0;
	uint sumofOdd = 0;
	while (true) {
		i++;
		if (i % 2 == 0) {
			continue;	
		}
		if (i > 10) {
			break;
		}
		sumofOdd += i;
	}
	return sumofOdd;
}
```

### 可见性
#### public
函数默认可见性是public
可以通过内部，消息来进行调用，变量会自动创建一个访问器
#### private
私有函数和状态变量仅在当前合约中可以访问，在继承的合约内，不可访问
#### external
外部函数是合约接口的一部分，只能使用消息调用
#### internal
函数和变量只能通过内部访问，如在当前合约中调用，或继承的合约中调用，状态变量默认是internal

### 函数
#### 构造函数
```
constructor(uint a) public {
	data = a;	
}
```
#### 视图函数（constant/view）
```
function testView() public constant returns (uint) {
	data = 1;
	return data;
}
```
#### 纯函数（pure）
不能读取状态变量，只能做本地运算
```
function f() public pure returns(uint){
	return 1 + 2;
}
```
#### 回退函数
```
function() public payable{ // 合约要接收以太币，一个函数只能有一个
	
}
```
















