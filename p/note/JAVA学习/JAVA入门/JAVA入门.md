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

