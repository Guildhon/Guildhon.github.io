My Note
-------- 
> C++入门

C++的I/O方式
 不用关注占位符，不用关注数据类型
```
cout<<x<<endl;		// endl等效回车
cin>>x;
```
```
#include<iostream>
#include<stdlib.h> 
using namespace std;     // cout和endl在std命名空间里面

int main(void)
{	
	cout<<"请输入一个整数："<<endl;
	int x = 0;
	cin>>x;
	cout<<oct<<x<<endl;  // 8进制显示 
	cout<<dec<<x<<endl;	 // 10进制显示 
	cout<<hex<<x<<endl;	// 16进制显示 
	return 0;
}
```
命名空间
```
#include<iostream>
#include<stdlib.h> 
using namespace std; 
namespace A
{
	int x = 1;
	void fun()
	{
		cout<<'A'<<endl;
	}
} 
namespace B
{
	int x = 2;
	void fun()
	{
		cout<<'B'<<endl;
	}
}
using namespace B;
int main(void)
{	
	cout<<A::x<<endl;
	cout<<B::x<<endl;
	fun();      // B
	return 0;
}
```
指针和引用
```
#include<iostream>
using namespace std;
void fun(int *a,int *b){
	int c = 0;
	c = *a;
	*a = *b;
	*b = c;
}
int main(){
	int x = 10, y = 20;
	fun(&x,&y);
	printf("%d %d",x,y);
	return 0;
}
```
```
#include<iostream>
using namespace std;
void fun(int &a,int &b){
	int c = 0;
	c = a;
	a = b;
	b = c;
}
int main(){
	int x = 10, y = 20;
	fun(x,y);
	printf("%d %d",x,y);
	return 0;
}
```
