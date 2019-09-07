My Note
-------- 
> JAVA入门

##### 基础常识
包括关系JDK(JRE(JVM))

JAVA_HOME 配置JDK安装路径

PATH 配置JDK命令文件的位置

CLASSPATH 配置类库文件的位置

##### 语法

###### 封装

成员内部类
```
//外部类HelloWorld
public class HelloWorld{
    
    //外部类的私有属性name
    private String name = "imooc";
    
    //外部类的成员属性
    int age = 20;
    
	//成员内部类Inner
	public class Inner {
		String name = "爱慕课";
        //内部类中的方法
		public void show() { 
			System.out.println("外部类中的name：" + HelloWorld.this.name);
			System.out.println("内部类中的name：" + name);
			System.out.println("外部类中的age：" + age);
		}
	}
    
	//测试成员内部类
	public static void main(String[] args) {
        
        //创建外部类的对象
		HelloWorld o = new HelloWorld (); 
        
        //创建内部类的对象
		Inner inn = o.new Inner();
        
        //调用内部类对象的show方法
		inn.show();
	}
}
```

静态内部类

静态内部类是 static 修饰的内部类，这种内部类的特点是：

1、 静态内部类不能直接访问外部类的非静态成员，但可以通过 new 外部类().成员 的方式访问 

2、 如果外部类的静态成员与内部类的成员名称相同，可通过“类名.静态成员”访问外部类的静态成员；如果外部类的静态成员与内部类的成员名称不相同，则可通过“成员名”直接调用外部类的静态成员

3、 创建静态内部类的对象时，不需要外部类的对象，可以直接创建 内部类 对象名= new 内部类();

```
//外部类
public class HelloWorld {
    
    // 外部类中的静态变量score
    private static int score = 84;
    
    // 创建静态内部类
	public static class SInner {
        // 内部类中的变量score
        int score = 91;
        
		public void show() {
			System.out.println("访问外部类中的score：" + HelloWorld.score);
			System.out.println("访问内部类中的score：" + score);
		}
	}

	// 测试静态内部类
	public static void main(String[] args) {
		// 直接创建内部类的对象
        SInner si = new SInner();
        // 调用show方法
		si.show();
	}
}
```
方法内部类

方法内部类就是内部类定义在外部类的方法中，方法内部类只在该方法的内部可见，即只在该方法内可以使用。由于方法内部类不能在外部类的方法以外的地方使用，因此方法内部类不能使用访问控制符和 static 修饰符。
```
//外部类
public class HelloWorld {
    
    private String name = "爱慕课";
    
    // 外部类中的show方法
    public void show() { 
		// 定义方法内部类
		class MInner {
			int score = 83;
			public int getScore() {
				return score + 10;
			}
		}
        
		// 创建方法内部类的对象
        MInner mi = new MInner();
        
        // 调用内部类的方法
		int newScore = mi.getScore();
        
		System.out.println("姓名：" + name + "\n加分后的成绩：" + newScore);
	}
    
	// 测试方法内部类
	public static void main(String[] args) {
        
		// 创建外部类的对象
        HelloWorld mo = new HelloWorld();
        
        // 调用外部类的方法
		mo.show();
	}
}
```

###### 继承extends

方法重写

语法规则
1.返回值类型；
2.方法名；
3.参数类型及个数。
都要与父类继承的方法相同，才叫方法的重写

继承的初始化顺序
1.初始化父类再初始化子类；
2.先执行初始化对象中属性，再执行完构造方法中的初始化

final关键字，可以修饰类，方法，属性和变量，final修饰类，则该类不允许被继承，方法不允许覆盖（重写），属性则不会隐式初始化（类初始化属性必须有值，或者在构造方法中赋值），修饰变量只能赋一次值，即常量

super关键字，在对象内部使用，可以代表父类对象
1.访问父类的属性super；
2.可以访问父类的方法；
在子类构造方法中super();调用父类构造方法，如果不写，默认调用父类无参的构造方法，如果显示的调用构造方法，必须在子类的构造方法的第一行。如果子类构造方法中既没有显示调用父类的构造方法，而父类又没有无参的构造方法，则编译出错。

Object类

Object类是所有类的父类，如果一个类没有使用extends关键字明确标识继承另一个类，那么这个类默认继承Object类，Object类中的方法，适用所有子类。

1.toString返回的对象的哈希code码；
2.equals比较对象的引用是否指向同一块内存地址；

##### 多态
对象的多种形态
1.引用多态，父类的引用可以指向本类的对象，也可以指向子类的对象
```
Dog extends Animal

Animal obj1 = new Animal();
Animal obj2 = new Dog(); // 父类引用可以指向子类对象，子不能指向父
```
2.方法多态,创建本类对象时，调用的方法为本类的方法；创建子类对象时，调用的方法为子类重写的方法或者继承的方法
```
obj1.eat();   // 调用Animal的eat方法
obj2.eat();   // 调用Dog的eat方法

Cat obj3 = new Cat();       // Cat没有eat方法
obj3.eat(); // 调用继承Animal的eat方法

obj2.watchDoor();         // 如果Dog类中有watchDoor方法，Animal没有，将报错
```
引用类型转换
1.向上类型转换（隐式/自动类型转换），是小类型到大类型的转换；
2.向下类型转换（强制类型转换），是大类型到小类型；
3.instanceof运算符，来解决引用对象的类型，避免类型转换的安全性问题。
```
Dog dog = new Dog();
Animal animal = dog; // 自动类型提升，向上类型转换

Dog dog2 = animal;  // 编辑器报错，认为存在风险
Dog dog2 = (Dog)animal; // 向下类型转换，强制类型转换

Cat cat = (Dog)animal;  // 1.编译时Cat类型 2.运行时Dog类型 报错

if (animal instanceof Cat) {    // 改进
	Cat cat = (Dog)animal; 
} else {
	System.out.println("无法进行类型转换");
}
```
抽象类

抽象类前使用abstract关键字修饰，则该类为抽象类
a.在某些场景下，某个父类只是知道其子类应该包含怎样的方法，但无法准确知道这些子类如何实现这些方法
b.从多个具有相同特性的类中抽象出一个抽象类，以这个抽象类作为子类的模板，从而避免子类设计的随意性

作用：限制规定子类必须实现某些方法，但不关注实现细节

使用规则：
a.abstract定义抽象类
b.abstract定义抽象方法，只能声明，不需要实现
c.包含抽象方法的类是抽象类
d.抽象类中可以包含普通的方法，也可以没有抽象方法
e.抽象类不能直接创建，可以定义引用变量
```
public abstract class Telephone {
	public abstract void call();     // 抽象方法没有方法体以分号结束
	public abstract void message();   
}
public class CellPhone extends Telephone {
	public void call(){
		System.out.println("通过键盘打电话");
	}
	public void message(){
		System.out.println("通过键盘发短信");
	}
}

public class SmartPhone extends Telephone {
	public void call(){
		System.out.println("通过语音打电话");
	}
	public void message(){
		System.out.println("通过语音发短信");
	}
}

Telephone tel1 = new CellPhone();
tel1.call();
Telephone tel2 = new SmartPhone();
tel2.call();
```
##### 接口
[定义语法](https://img.mukewang.com/5c2c779d00015a3d12800720.jpg) [使用语法](https://img.mukewang.com/5c1f8e940001fc4212800720.jpg)
类是一个具体实现体，而接口定义了某一批类所需要遵循的规范，接口不关心这些类的内部数据，也不关心这些类里方法的实现细节，它只规定这些类里必须提供某些方法

接口定义和类定义不同，定义接口不再使用class关键字，而是使用interface关键字

接口中的属性是常量，即使定义时不加上pulic static final修饰符，系统也会自动加上

使用接口，一个类可以实现一个或多个接口，实现接口使用implements关键字，java中一个类只能继承一个类，是不够灵活的，通过实现多个接口来弥补

```
// 假设CellPhone和SmartPhone都是继承抽象Telphone，martPhone又有玩游戏的功能，PSP也是，使用接口给PSP和SmartPhone使用
public abstract interface IPlayGame{    //省掉abstract系统会自动带上	
	public abstract void PalyGame();
}
public class SmartPhone extends Telephone implements IPlayGame{
	public void call(){
		System.out.println("通过语音打电话");
	}
	public void message(){
		System.out.println("通过语音发短信");
	}
	public void PlayGame(){
		System.out.println("玩游戏的功能");
	}
}
public class Psp implements IPlayGame{
	public void PlayGame(){
		System.out.println("玩游戏的功能");
	} 
}
IPlayGame ip1 = new SmartPhone();
ip1.playGame();
IPlayGame ip2 = new Psp();
ip2.playGame();
```
使用接口：接口在使用过程中，还经常与内部匿名类配合使用，匿名内部类就是没有名字的内部类，多用于关注实现而不关注实现类的名称
```
语法格式：
interface i = new Interface(){
	public void method(){
		System.out.println("匿名内部类实现接口的方式");
	}
}


IPlayGame ip3 = new IPlayGame(){
	public void playGame(){
		System.out.println("匿名内部类实现接口的方式");
	}
};
ip3.playGame();
```

##### 字符串
字符串对象如果只需比较内容是否相同，应使用 ”equals()” 方法
```
String s1 = "string";  // 字符常量，只创建一个
String s2 = "string";
s1 == s2; // true
String s3 = new String("string");
String s4 = new String("string");
s2 == s3; // false
s3 == s4; // false
```

##### 包装类
为了让基本数据类型也具备对象的特性，Java为每个基本数据类型都提供了一个包装类，这样我们就可以像操作对象那样来操作基本数据类型
```
public class HelloWorld {
    public static void main(String[] args) {
        
		// 定义int类型变量，值为86
		int score1 = 86; 
        
		// 创建Integer包装类对象，表示变量score1的值
		Integer score2=new Integer(score1);
        
		// 将Integer包装类转换为double类型
		double score3=score2.doubleValue();
        
		// 将Integer包装类转换为float类型
		float score4=score2.floatValue();
        
		// 将Integer包装类转换为int类型
		int score5 =score2.intValue();

		System.out.println("Integer包装类：" + score2);
		System.out.println("double类型：" + score3);
		System.out.println("float类型：" + score4);
		System.out.println("int类型：" + score5);
	}
}
```
装箱：把基本类型转换成包装类，使其具有对象的性质，又可分为手动装箱和自动装箱
```
int i = 10;
Integer x = new Integer(i);   // 手动装箱
Integer y = i;                // 自动装箱
```
拆箱：和装箱相反，把包装类对象转换成基本类型的值，又可分为手动拆箱和自动拆箱
```
Integer j = new Integer(8);   // 定义一个Integer包装类对象，值为8
int m = j.intValue();         // 手动拆箱为int类型
int n = j;                    // 自动拆箱为int类型
```
```
public class HelloWorld {
    public static void main(String[] args) {
        
        // 定义double类型变量
		double a = 91.5;
        
         // 手动装箱
		Double b =  new Double(a);
        
        // 自动装箱
		Double c = a;

        System.out.println("装箱后的结果为：" + b + "和" + c);
        
        // 定义一个Double包装类对象，值为8
		Double d = new Double(87.0);
        
        // 手动拆箱
		double e = d.doubleValue();
        
        // 自动拆箱
		double f = d;
        
         System.out.println("拆箱后的结果为：" + e + "和" + f);
	}
}
```
基本数据类型和字符串之间进行转换
有三种方法：
1.使用包装类的 toString() 方法
2.使用String类的 valueOf() 方法
```
int c = 10;
String str1 = Integer.toString(c);
String str2 = String.valueOf(c);
String str3 = c + "";
```
将字符串转换成基本类型有两种方法
1.调用包装类的 parseXxx 静态方法
2.调用包装类的 valueOf() 方法转换为基本类型的包装类，会自动拆箱
```
String str = "8";
int d = Integer.parseInt(str);
int e = Integer.valueOf(str);
```
使用 Date 和 SimpleDateFormat 类表示时间
```
Date now = new Date();
SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒");
ystem.out.println(sdf1.format(now));

String d = "2014-6-1 21:05:36";
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = sdf.parse(d);
```
Calendar 类的应用，
java.util.Calendar 类是一个抽象类，可以通过调用 getInstance() 静态方法获取一个 Calendar 对象，此对象已由当前日期时间初始化，即默认代表当前时间，如 Calendar c = Calendar.getInstance();

Calendar 类提供了 getTime() 方法，用来获取 Date 对象，完成 Calendar 和 Date 的转换，还可通过 getTimeInMillis() 方法，获取此 Calendar 的时间值，以毫秒为单位

##### 集合
java中的集合类：是一种工具类，就像是容器，存储任意数量的具有共同属性的对象

Collection接口，子接口以及实现类，是List,Set,Queue接口的父接口，定义了集合操作的方法-增删改查

List接口及其实现类：ArrayList，List是元素有序并且可以重复的集合，被称为序列；
List可以精确的控制每个元素的插入位置，或删除某个位置的元素；
ArrayList--数组序列，是List的一个重要实现类；
ArrayList底层是由数组实现的；
add添加一个，adAll添加多个，对象存入集合都变成object类型，get取出需要类型转换

泛型规定了某个集合只可以存放特定类型的对象 

Set接口及其实现类：HashSet，Set元素无序并且不可以重复的集合，被称为集;
HashSet--哈希集，是Set的一个重要实现类;

Map接口-Map提供了一种映射关系，其中的元素是以键值对（key,value）的形式存储的，能够实现根据key快速查找value；
Map中的键值对以Entry类型的对象实例形式存在;
键（key）不可重复，value可以；设置put方法，迭代key对象，获取get方法；
Map支持泛型，形式如Map<K,V>；
HashMap基于哈希表实现，其中的Entry对象是无序排列的，Key和value都可以为null，但是一个HashMap只能有一个key值为null的映射（key不可重复）

Comparable和Comparator（临时）接口，可以对对象排序，对象要实现接口，重写compareTo方法

###### 异常Excption
1、非检查异常RuntimeExcption，空指针异常，数据越界异常......
2、检查异常，文件异常，SQL异常

try-catch-finally catch(可以写多个不同类型)

异常抛出throw throws

自定义异常 
```
class 自定义异常类 extends 异常类型{

}
```
异常链
```
public class ChainTest{
	public static void main(String args[]){
		ChianTest ct = new ChainTest();
		try {
			ct.test2();
		} catch (Exception e) {
			e.printStackTrace(); // 打印输出异常
		}
	}
	public void test1() throws DrunkException{
		throw new DrunkException("开车别喝酒");
	}
	public void test2(){
		try {
			test1();
		} catch(DrunkException e){
			RuntimeException newExc = new RuntimeException("司机一滴酒");
			newExc.initCause(e); // 包装异常 
			throw newExc;
		}
	}
}
```

#### File类
java.io.File用于表示文件（目录）的信息（名称，大小等），创建，不能用于文件内容的访问

RandomAccessFile java提供的对文件内容的访问，既可以读文件，也可以写文件，支持随机访问文件，访问任意位置

1.java文件模型，在硬盘上的文件时byte byte byte存储的，是数据的集合

2.打开文件，有两种模式"rw"（读写）, 'r'（只读）

RandomAccessFile raf = new RandomAccessFile(file,'rw');文件指针，打开文件时指针在开头pointer = 0;

3.写方法，raf.write(int) -> 只写一个字节（后8位），同时指针指向下一个位置，准备再次写入

4.读方法，int b = raf.read() ->读一个字节

5.文件读写以后一定要关闭

IO流（输入流，输出流）
字节流，字符流
1.字节流
1） InputStream抽象了应用程序读取数据的方式，
	OuputStream抽象了应用程序写出数据的方式
2） EOF = End 读到-1就读到结尾
3） 输入流基本方式
int b = in.read(); 读取一个字节无符号填充到int低八位，-1是EOF.
in.read(byte[] buf) 读取数据填充到字节数据buf
in.read(byte[] buf, int start, int size) 读取数据填充到字符数据buf，从start位置开始存放size长度的数据
4） 输出流基本方式
out.write(int b) 写出一个byte到流，b的低8位
out.write(byte[] buf) 将buf字节数组都写入到流
out.write(byte[] buf,int start,int size) 字节数组buf从start位置开始写size长度的字节到流
5）FileInputStream -> 具体实现了在文件上写入数据


















