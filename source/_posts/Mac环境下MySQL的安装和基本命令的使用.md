---
title: Mac环境下MySQL的安装和基本命令的使用
date: 2018-07-19 21:06:40
tags: [Python, MySQL]
categories: 数据库基础
image: 
---



![mysql](http://p7hfnfk6u.bkt.clouddn.com/mysql.jpg)


<!-- more -->

- `MySQL`是一种关系数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。
- `MySQL`所使用的`SQL`语言是用于访问数据库的最常用标准化语言。
- 由于其体积小、速度快、总体拥有成本低，尤其是开放源码这一特点，许多中小型网站为了降低网站总体拥有成本而选择了`MySQL`作为网站数据库。
- `MySQL`是一个多用户、多线程的关系型数据库管理系统。 工作模式是基于客户机/服务器结构。目前它可以支持几乎所有的操作系统
- 简单的来说，`MySQL`是一个开放的、快速的、多线程的、多用户的SQL数据库服务器


## MySQL的安装
工欲善其事必先利其器, 要研究`MySQL`我们首先要安装`MySQL`, 这里只介绍`Mac`环境下的安装和数据库操作

### 下载`MySQL`
直接打开[MySQL官网下载页](https://dev.mysql.com/downloads/mysql/), 选择`mac OS`系统后, 选择`DMG`格式下载软件

![SQLDownload1](http://p7hfnfk6u.bkt.clouddn.com/sqlDownload1.png)


接着, 会跳转到如下页面, 你只需要选择不登录,直接下载即可(当然也可以选择注册并登录)

![SQLDownload2](http://p7hfnfk6u.bkt.clouddn.com/SQLDownload2.png)
 
- 下载好后, 按照`dmg`里面的`pkg`文件一路安装即可, 但是需要注意的是
  - 除了倒数第二步之外按照默认一路安装即可
  - 倒数第二步会有一个设置管理员密码的过程, 设置好后, 一定要牢记该密码, 后期链接数据库会需要
- 最后打开系统偏好设置, 最后会有一个`MySQL`的图标
- 打开`MySQL`会看到默认是开启的(安装的时候按照默认设置安装的情况下)

![image](http://p7hfnfk6u.bkt.clouddn.com/MySQLServer.png)


<div class="note success"><p>到这里`MySQL`就已经基本安装完成了, 不需要再修改什么配置了</p></div>


### 安装`Navicat for MySQL`

- `Navicat for MySQL`是一套专为`MySQL`设计的高性能数据库管理及开发工具
- 它可以用于任何版本`3.21`或以上的 `MySQL`数据库服务器
- 支持大部份`MySQL`最新版本的功能，包括触发器、存储过程、函数、事件、视图、管理用户等
- [正版下载地址](http://www.navicat.com.cn/products/navicat-for-mysql/), 不过正版只有14天的试用时间
- 安装后, 按照下图完善配置即可, 其中连接名随意, 密码即为安装`MySQL`环境的时候设置的密码

![MySQLConten](http://p7hfnfk6u.bkt.clouddn.com/MySQLContent.png)


## `MySQL`的基本命令

### 基本命令
- 首先要打开终端(`Windows`中是`cmd`), 以下命令均是在终端运行
- 启动/停止服务只有在`Windows`系统中才需要运行, `Mac`环境下不需要

#### 启动/停止服务

```objc
// 启动服务
    格式：net start 服务名称
    示例：net start titansql

// 停止服务
    格式：net stop 服务名称
    示例：net stop titansql
```

#### 连接数据

```objc
格式：mysql -u 用户名 -p
示例：mysql -u root -p
// 此处会提示你输入密码(安装时设置的)
```

#### 远程连接
- 链接他人或其他服务器的数据库
  - 格式：`mysql -h ip地址 -u 用户名 -p`
  - 输入对方`mysql`密码


#### 其他命令

<div class="note warning"><p>需要注意的是:</p></div>

以下所有命令中如过结尾有分号(`;`)的一定不能省略, 否则不是一条完整的命令, 系统会提示你继续输入命令

```objc
// 查看版本（连接后可以执行）
select version();

//显示当前时间（连接后可以执行）
select now();

//退出登录(断开连接)
quit或exit
```

![image](http://p7hfnfk6u.bkt.clouddn.com/sqlSelect.png)


### 数据库操作

```objc
// 1、创建数据库
    格式：create database 数据库名 charset=utf8;
    示例：create database titansql charset=utf8;
// 2、删除数据库
    格式：drop database 数据库名;
    示例：drop database titansql;
// 3、切换数据库
    格式：use 数据库名;
    示例：use titansql;
// 4、查看当前选择的数据库
    select database();
    
```

创建完成记得刷新`Navicat for MySQL`

![image](http://p7hfnfk6u.bkt.clouddn.com/sqlSuccess.png)



### 表操作

```objc
// 1、查看当前数据库中所有表
    show tables;
    
// 2、创建表
    格式：create table 表名(列及类型);
    说明：
        //id, name, age: 等为字段名
        //auto_increment: 表示自增长   
        //primary key: 表示主键  
        //int, varchar(20): 等为数据类型, 20为可存储的字节数
        //not null: 表示不为空
        //default: 为设置默认值
    示例：create table student(id int auto_increment primary key, name varchar(20) not null, age int not null, gender bit default 1, address varchar(20), isDelete bit default 0);
    
    
// 3、删除表
    格式：drop table 表名;
    示例：drop table student;
    
// 4、查看表结构
    格式：desc 表名;
    示例：desc student;
    
// 5、查看建表语句
    格式：show create table 表名;
    示例：show create table student;
    
// 6、重命名表名
    格式：rename table 原表名 to 新表名;
    示例：rename table car to newCar;
    
// 7、修改表
    格式：alter table 表名 add|change|drop 列名 类型;
    示例：alter table newcar add isDelete bit default 0
```


### 数据操作


```objc
1、增
    a、全列插入
        格式：insert into 表名 values(...);
        说明：主键列是自动增长，但是在全列插入时需要占位，通常使用0，插入成功以后以实际数据为准
        示例：insert into student values(0, "tom", 19, 1, "北京", 0);
    b、缺省插入
        格式：insert into 表名(列1,列2,……) values(值1,值2,……);
        示例：insert into student(name, age, address) values("titan", 19, "上海");
    c、同时插入多条数据
        格式：insert into 表名 values(...),(...),……
        示例：insert into student values(0, "jun", 18, 0, "北京", 0), (0, "poi", 22, 1, "海南", 0), (0, "coder", 20, 0, "石家庄", 0);
2、删
    格式：delete from 表名 where 条件;  
    示例：delete from student where id=4;
    注意：没有条件是全部删除，慎用
3、改
    格式：update 表名 set 列1=值1,列2=值2,…… where 条件;
    示例：update student set age=16 where id=7;  
    注意：没有条件是全部列都修改，慎用
4、查
    说明：查询表中的全部数据
    格式：select * from 表名;
    示例：select * from student;

```


### 查询数据

#### 基本语法

- 格式：`select * from 表名;`
- 说明：
  - `from`关键字后面是表名，表示数据来源于这张表
  - `select`后面写表中的列名，如果是*表示在结果集中显示表中的所有列
  - 在`select`后面的列名部分，可以使用`as`为列名起别名，这个别名显示在结果集中
  - 如果要查询多个列，之间使用逗号分隔
- 示例：


```objc
//查询所有数据
select * from student;

//查询某列数据
select name, age from student;

//以别名显示搜索结果
select name as a, age from student;
```

![别名](http://p7hfnfk6u.bkt.clouddn.com/sqlselectname.png)


#### 消除重复行

- 在`select`后面列前面使用`distinct`可以消除重复的行
- 示例：


```objc
select gender from student;
select distinct gender from student;
```

![distinct](http://p7hfnfk6u.bkt.clouddn.com/sqldistinct.png)



#### 条件查询

```objc
// 1、语法
    select * from 表名 where 条件
    
// 2、比较运算符
        等于        =
        大于        >
        小于        <
        大于等于    >=
        小于等于    <=
        不等于      !=或<>
    需求：查询id值大于8的所有数据
    示例：select * from student where id>8;
        
// 3、逻辑运算符
        and    并且
        or     或者
        not    非
            
    需求：查询id值大于7的女同学
    示例：select * from student where id>7 and gender=0;
    
// 4、模糊查询(like)
        %: 表示任意多个任意字符
        _: 表示一个任意字符

    需求：查询姓习的同学
    示例：
        select * from student where name like "习%";
        select * from student where name like "习_";
        
// 5、范围查询
        in                表示在一个非连续的范围内
        between...and...  表示在一个连续的范围内

    需求：查询编号为8、10、12的学生
    示例：select * from student where id in (8,10,12);
    需求：查询编号为6到8的学生
    示例：select * from student where id between 6 and 8;

// 6、空判断
        注意：null与""是不同的
        判断空：is null
        判断非空： is not null

    需求：查询没有地址的同学
    示例：select * from student where address is null;
    需求：查询有地址的同学
    示例：select * from student where address is not null;

// 7、优先级
        小括号，not 比较运算符，逻辑运算符
        and比or优先级高，如果同时出现并希望先选or,需要结合()来使用
```


#### 聚合操作

- 为了快速等到统计数据，提供了5个聚合函数
  - `count(*)`: 表示计算总行数，括号中可以写*和列名
  - `max(列)`: 表示求此列的最大值
  - `min(列)`: 表示求此列的最小值
  - `sum(列)`: 表示求此列的和
  - `avg(列)`: 表示求此列的平均值


```objc
//需求：查询学生总数
select count(*) from student;

//需求：查询女生的编号最大值
select max(id) from student where gender=0;

//需求：查询女生的编号最小值
select min(id) from student where gender=0;
        
//需求：查询所有学生的年龄和
select sum(age) from student;

//需求：查询所有学生的年龄平均值
select avg(age) from student;
```

#### 分组

- 按照字段分组，表示此字段相同的数据会被放到一个集合中。
- 分组后，只能查询出相同的数据列，对于有差异的数据列无法显示在结果集中
- 可以对分组后的数据进行统计，做聚合运算
- 语法：
  - `select 列1,列2,聚合…… from 表名 group by 列1,列2,列3,……;`
- 需求：查询男女生总数
- 示例：


```objc
select gender,count(*) from student group by gender;
select name,gender,count(*) from student group by gender,age;
```

分组后的数据筛选：

```objc
select 列1,列2,聚合…… from 表名 group by 列1,列2,列3,…… having 列1,……聚合……;

示例：select gender,count(*) from student group by gender having gender;
```


<div class="note info"><p>`where`与`having`的区别：</p></div>

- `where`是对`from`后面指定的表进行筛选，属于对原始数据的筛选
- `having`是对`group by`的结果进行筛选


#### 排序
- 语法：`select * from 表名 order by 列1 asc|desc，列2 asc|desc , ……;`
- 说明：
  - 将数据按照列1进行排序，如果某些列1的值相同，则按照列2进行排序
  - 默认按照从小到大的顺序排序
  - `asc`: 升序
  - `desc`: 降序


```objc
//需求：将没有被删除的数据按年龄排序
select * from student where isDelete=0 order by age desc;
select * from student where isDelete=0 order by age desc, id desc;
```

#### 分页

- 语法：`select * from 表名 limit start,count;`
- 说明：`start`索引从0开始
- 示例：

```objc              
select * from student limit 0,3;
select * from student limit 3,3;
select * from student where gender=1 limit 0,3;
```


### 关联

```objc
// 建表语句：
    1、create table class(id int auto_increment primary key, name varchar(20) not null, stuNum int not null);
    
    2、create table students(id int auto_increment primary key, name varchar(20) not null, gender bit default 1, classid int not null, foreign key(classid) references class(id));


// 查询所有数据
    select * from students;
    

    /* 关联查询：
    分类：
    1、表A inner join 表B：
        表A与表B匹配的行会出现在结果集中
    2、表A left join 表B：
        表A与表B匹配的行会出现在结果集中，外加表A中独有的数据，未对应的数据使用null填充
    3、表A right join 表B：
        表A与表B匹配的行会出现在结果集中，外加表B中独有的数据，未对应的数据使用null填充
    */
select students.name,class.name from class inner join students on class.id=students.classid;

select students.name,class.name from class left join students on class.id=students.classid;

select students.name,class.name from class right join students on class.id=students.classid;

```


<div class="note success"><p>至此, `MySQL`中一些常用的命令行也基本介绍完了</p></div>

下面看一些`MySQL`和`Python`是如何进行交互的




## `MySQL`和`Python`的交互
- `Python`要对`MySQL`数据库进行操作, 需要引入`pymysql`模块
- `pymsql`是`Python`中操作`MySQL`的模块, 并且`pymysql`支持`python3.x`版本
- 首先要先安装`pymysql`, 终端执行一下语句

```
pip3 install pymysql
```

### 创建数据库连接

```Python
# 链接数据库
# 参数1：mysql服务所在主机的IP(可以是IP地址, 本机链接可以是localhost)
# 参数2：用户名
# 参数3：密码
# 参数4：要连接的数据库名

db = pymysql.connect('localhost', 'root', 'titanjun', 'titansql')


# 创建游标, 查询数据默认为元组类型
cursor = db.cursor()

# 创建sql语句
sql = "select version()"

# 执行sql语句
cursor.execute(sql)

# 获取返回的信息
data = cursor.fetchone()
print(data)

# 关闭游标
cursor.close()

# 关闭数据库
db.close()

```


### 创建表

```Python
import pymysql

db = pymysql.connect('localhost', 'root', 'jun.0929', 'titansql')

# 创建游标, 查询数据默认为元组类型
cursor = db.cursor()

# 建表
# 在建表之前要检查表是否存在, 如果存在则删除
cursor.execute("drop table if exists userinfo")

# 创建表
try:
    sql = "create table userinfo(id int auto_increment primary key, age int not null)"
    cursor.execute(sql)
    print('创建成功')
except:
    print('创建表失败')


cursor.close()
db.close()
```

### 在表中插入数据

```Python

import pymysql

db = pymysql.connect('localhost', 'root', 'jun.0929', 'titansql')

cursor = db.cursor()

# 插入数据的字符串命令
sql = 'insert into userinfo values'

for i in range(10, 20):
    ageStr = "(0, %d)" % i
    addsql = sql + ageStr

    try:
        cursor.execute(addsql)
        # 提交到数据库, 不然无法保存新建或者修改的数据
        db.commit()
        print('插入数据成功')
    except:
        # 如果提交失败则回滚到上一次的提交, 否则下一次提交可能会冲突
        db.rollback()
        print('插入数据失败')

cursor.close()
db.close()
```

### 修改/更新/删除数据

```Python
import pymysql

db = pymysql.connect('localhost', 'root', 'jun.0929', 'titansql')
cursor = db.cursor()

# 修改/更新数据命令字符串
sql = 'update userinfo set age=30 where id=4'
# 删除数据命令字符串
# sql = 'delete from userinfo where age=16'

try:
    cursor.execute(sql)
    db.commit()
    print('数据更新成功')
except:
    db.rollback()
    print('数据更新失败')

cursor.close()
db.close()
```

### 查询数据

- `fetchone`: 获取下一个查询结果集，结果集是一个对象
- `fetchall`: 接收全部的返回的行
- `rowcount`: 是一个只读属性，返回`execute()`方法影响的行数


```Python
import pymysql

db = pymysql.connect('localhost', 'root', 'jun.0929', 'titansql')
cursor = db.cursor()

# 查询数据字符串
sql = 'select * from userinfo where age>16'

try:
    cursor.execute(sql)

    # 获得一条查询数据
    print(cursor.fetchone())
    print('查询到-%d-条数据' % cursor.rowcount)

    result = cursor.fetchall()
    for row in result:
        print('%d--%d' % (row[0], row[1]))

    print('数据查询成功')

except:
    print('数据查询失败')

cursor.close()
db.close()
```


<div class="note success"><p>至此, `Python`和`MySQL`交互的最基本最简单的使用也介绍完了, 如有不足之处还望告知</p></div>


---






