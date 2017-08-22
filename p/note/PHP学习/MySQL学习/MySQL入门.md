My Note
-------- 
> MySQL入门

##### MYSQL规范
- 关键字与函数名称全部大写
- 数据库名称、表名称、字段名称全部小写
- SQL语句必须以分号结尾

##### MYSQL 常用命令

显示当前服务器版本
```
SELECT VERSION();
```
显示当前日期
```
SELECT NOW();
```
显示当前用户
```
SELECT USER();
```
创建数据库
```
CREATE DATABASE 数据库 CHARACTER SET 编码
```
修改数据库
```
ALTER DATABASE 数据库 CHARACTER SET 编码
```
查看数据库创建的命令
```
SHOW CREATE DATABASE 数据库
```
删除数据库
```
DROP DATABASE 数据库
```
查看WARNING
```
SHOW WARNING
```
##### 数据类型
整型，浮点型，日期时间型，字符型

##### 数据表
是数据库的组成部分之一
```
USE 数据库;  //打开数据库
SELECT DATABASE();  //查看打开的数据库
```
创建数据表
```
CREATE TABLE 表名 (username VARCHAR(20),age TINYINT UNSIGNED, salary FLOAT(8, 2) UNSIGNED);
```
查看数据表
```
SHOW TABLES;  // 可以选择 加上FROM 数据库  
```
查看数据表结构
```
SHOW COLUMNS FROM 表名
```
插入记录
```
// 用中括号括起来代表可以省略
INSERT [INTO] 表名 [()] VALUES ()
```
记录查找
```
SELECT * FROM 表名
```
删除数据表
```
DROP TABLE 表名字
```
空值与非空
NOT NULL 字段值禁止为空
```
CREATE TABLE tb2(username VARCHAR(20), NOT NULL, TINYINT UNSIGNED NULL);
```
自动编号 AUTO_INCREMENT  （起始值为1，每次增量为1） 离不开主键

主键 PRIMARY KEY 每张数据表只能存在一个主键，保证记录的唯一性，主键自动为NOT NULL，不自动编号，需要手动插入，不能有重复id

```
CREATE TABLE tb3 (id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,username VARCHAR(30) NOT NULL);
```

唯一约束，可以保证记录的唯一性，约束的字段可以为NULL，每张数据表可以存在多个唯一约束
```
CREATE TABLE tb5(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(20) NOT NULL UNIQUE KEY,
	age tinyint unsigned);
```
默认约束default 当插入记录时，如果没有明确为字段赋值，则自动赋默认值
```
CREATE TABLE tb6(
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE KEY,
    sex ENUM('1','2','3') DEFAULT '3');
```
外键约束FOREING KEY 保持数据一致性，完整性，实现一对一或一对多关系

需要编辑MySQL配置文件 default-storage-engine = INNODB

创建省份表和用户表，在用户表后面FOREING KEY (pid) REFERENCES (id),id和pid类型不一样创建不了，数字必须相同，字符可以不同。user表为字表

##### 修改数据表

添加单列
```
ALTER TABLE 表名 ADD 字段 字段属性  [AFTER|FIRST 字段]// 默认插入所有列最后，指定可插入到某个位置   
```
删除列
```
ALTER TABLE 表名 DROP 字段;
ALTER TABLE 表名 DROP 字段,DROP 字段，ADD 字段 字段属性;  //删除多列，也可同时添加
```
修改列定义
```
ALTER TABLE 表名 MODIFY 字段 字段属性 FIRST  //可以将字段挪到第一位，也可以修改字段属性
```
修改列名称
```
ALTER TABLE 表名 CHANGE 旧字段 新字段 字段属性
```
数据表更名
```
// 两种方法
ALTER TABLE 旧表名 RENAME 新表名;
RENAME TABLE 旧表名 TO 新表名;
```

INSERT
```
INSERT 表名 VALUES(DEFAULT,'tom');  // 插入数据，自动编号的id可以为DEFAULT和NULL，照样自增
```
UPDATE
```
UPDATE 表名 SET 字段=值 [WHERE];
```
DELETE
```
DELETE FROM 表名 [WHERE];
```
SELECT
```
SELECT 字段,字段  FROM 表名;
SELECT 字段 AS 别名,字段 AS 别名  FROM 表名;
```
GROUP BY  分组
```
SELECT sex FROM users GROUP BY sex;   // 结果为男，女两个结果
```
HAVING 分组条件
```
SELECT sex,age FROM users GROUP BY sex HAVING age>5;
SELECT sex FROM users GROUP BY sex HAVING count(age)>5;  //或者采取聚合函数
```
ORDER BY 排序
```
SELECT * FROM users ORDER BY id DESC; // 按id倒序
```
LIMIT 限制查询数量
```
SELECT * FROM users LIMIT 2;
SELECT * FROM users LIMIT 2,2; //从哪开始
```
```
INSERT 字表 (username) SELECT username FROM 父表 WHERE age>=30;
```
子查询 是指出现在其他SQL语句内的SELECT语句 子查询嵌套在查询内部，且必须始终出现在圆括号内







