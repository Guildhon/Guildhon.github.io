My Note
-------- 
> 用户和用户组

用户组：拥有相同系统权限的一组用户

/etc/group 存储当前系统中所有用户组信息
- Group ： x ： 123 ： abc,def,zyz
- 组名称 ：组密码占位符 ：组编号 ：组中用户名列表

/etc/gshadow 存储当前系统中所有用户组的密码信息
- Group ： * ：  ： abc,def,zyz
- 组名称 ： 组密码 ：组管理者 ： 组中用户名列表

/etc/passwd 存储当前系统中所有用户的信息
- user ：x ：123 ： 456 ：xxxxxxx ：/home/user ：/bin/bash
- 用户名 ：密码占位符 ：用户编号 ：用户组编号 ：用户注释信息 ：用户主目录 ：shell类型

/etc/shadow 存储当前系统中所有用户的密码信息
- user : xxx ：：：：：
- 用户名 : 密码 ：：：：：

### 用户组
```
# 添加用户组，可以在配置文件/etc/group看到
groupadd group1
# 修改用户组的名称
groupmod -n group2 group1
# 修改组编号
groupmod -g 668 group2
# 创建用户组boss的同时设置编号
groupadd -g 888 boss
# 删除用户组
groupdel group2
```

```
groupadd group1
# 添加用户，会在home目录下创建用户目录
useradd -g group1 userone
useradd -g group1 usertwo
# 创建用户的同时指定用户目录位置，没有指定用户组，自动创建用户组
useradd -g /home/xxx userthree
# 添加用户备注
usermod -c xxxx userone
# 修改名字
usermod -l userfirst userone 
usermod -d /home/userfirst userfirst #还需要创建用户目录
# 修改用户所属用户组
usermod -g group1 userthree
# 删除用户
userdel usertwo
userdel -r usertwo  # 连同个人文件也一起删除
```

```
#可以让root以外的账号无法登录
touch /etc/nologin
```
锁定账户
```
passwd -l userone
# 解锁
passwd -u userone
# 清除密码，可以无密码登录
passwd -d userone
```

### 主要组和附属组
用户可以同时属于多个组
- 一个主要组
- 多个附属组

```
# 添加附属组
gpasswd -a userone boss	
# 切换组
newgrp boss
# 删除附属组
gpasswd -d userone boss	
```
```
# 切换用户身份
su username

id userone
显示指定用户信息，包括用户编号，用户名
主要组编号及名称，附属组列表

groups userone
显示userone用户所在的所有组

chfn userone
设置用户资料，依次输入用户资料

finger imooc
显示用户详细资料
```