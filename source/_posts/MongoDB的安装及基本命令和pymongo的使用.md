---
title: MongoDB的安装及基本命令和pymongo的使用
date: 2018-07-23 21:16:40
tags: [Python, MongoDB, pymongo]
categories: 数据库基础
image: 
---



![image](https://cdn.scotch.io/1/OvQmgluRTe5alZTfiQK0_getting-started-with-python-mongo.jpg)



<!-- more -->



## `NoSQL`简介
### `NoSQL`介绍
- `NoSQL`全名为`Not Only SQL`, 指的是非关系型数据库, 在现代的计算系统上每天网络上都会产生庞大的数据量, 网站的数据库性能可能出现问题, `NoSQL`便应运而生了
- `NoSQL`是一项全新的数据库革命性运动, 提倡运用非关系型的数据存储
- `NoSQL`用于超大规模数据的存储, 这些类型的数据存储不需要固定的模式，无需多余操作就可以横向扩展
- `NoSQL`的优点: 高扩展性、分布式计算、低成本、构架灵活
- `NoSQL`的缺点: 没有标准化、有限的查询功能


### `NoSQL`数据库分类

类型 | 部分代表 | 特点
---|---|---
列存储 | `Hbase` 和 `Cassandra` 和 `Hypertable` | 顾名思义，是按列存储数据的。最大的特点是方便存储结构化和半结构化数据，方便做数据压缩，对针对某一列或者某几列的查询有非常大的IO优势。
文档存储  | `MongoDB` 和 `CouchDB`  | 文档存储一般用类似json的格式存储，存储的内容是文档型的。这样也就有有机会对某些字段建立索引，实现关系数据库的某些功能
`key-value`存储 | `Tokyo Cabinet/Tyrant` 和 `Berkeley DB` 和 `MemcacheDB` 和 `Redis`| 可以通过`key`快速查询到其`value`。一般来说，存储不管`value`的格式，照单全收。（`Redis`包含了其他功能）
图存储 | `Neo4J` 和 `FlockDB` | 图形关系的最佳存储。使用传统关系数据库来解决的话性能低下，而且设计使用不方便
对象存储 | `db4o` 和 `Versant` | 通过类似面向对象语言的语法操作数据库，通过对象的方式存取数据
xml数据库 | `Berkeley DB XML` 和 `BaseX` | 高效的存储`XML`数据，并支持`XML`的内部查询语法，比如`XQuery`, `Xpath`


<div class="note warning"><p>这里主要介绍`MongoDB`和`Redis`的相关介绍和使用</p></div>


## 什么是`MongoDB`

### `MongoDB`介绍
- `MongoDB`是由`C++`编写的, 是一个基于分布式文件存储的开源数据库系统
- `MongoDB`旨在为`WEB`应用提供可扩展的高性能数据存储解决方案
- `MongoDB`将数据库存储为一个文档, 数据结构由键值对组成
- `MongoDB`文档类似于`JSON`对象, 字段值可以包含其他文档, 数组以及文档数组


### `MongoDB`主要特点
- `MongoDB`提供了一个面向文档存储, 基本思路就是将原来的行概念换成更加灵活地文档模型, 一条记录可以表示非常复杂的层次关系
- `MongoDB`支持丰富的查询表达式, 查询指令使用`json`形式的标记, 可轻易查询文档中内嵌的对象及数组
- `MongoDB`支持`RUBY`、`Python`、`Java`、`C++`、`PHP`、`C#`等多种编程语言
- `MongoDB`包含索引、存储`JavaScript`、聚合、固定集合、文件存储等操作 


### `MongoDB`的安装
- 这里提到的都是在`Mac`环境下`MongoDB`的安装过程, 其他环境下请自行百度, 这里就不在介绍了
- 安装方式有两种安装包安装和使用`brew`安装, 我是使用安装包安装的, 为了不误导大家, 这里就不介绍`brew`安装方式了

#### 安装包安装
可以在官网下载安装包: [下载地址](https://www.mongodb.com/download-center#community)

![image](http://p7hfnfk6u.bkt.clouddn.com/mongoDownload.png)

接下来我们使用如下命令来下载安装

```Python
# 注意修改下列文件名, 我的是4.0.0
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-4.0.0.tgz

# 解压
sudo tar -zxvf mongodb-osx-x86_64-4.0.0.tgz

# 重命名为 mongodb 目录
sudo mv mongodb-osx-x86_64-4.0.0 mongodb

# 安装完成后，我们可以把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中：
export PATH=/usr/local/mongodb/bin:$PATH
```

#### 运行`MongoDB`

1. 首先我们创建一个数据库存储目录 `/data/db`

```
sudo mkdir -p /data/db
```

2. 启动`mongodb`，默认数据库目录即为 `/data/db`

```
sudo mongod

# 如果没有创建全局路径 PATH，需要进入以下目录
cd /usr/local/mongodb/bin
sudo ./mongod
```

<div class="note success"><p>打开浏览器, 在浏览器内输入`127.0.0.1:27017`, 如果出现下面这种则说明安装成功</p></div>

![success](http://p7hfnfk6u.bkt.clouddn.com/mongoSuccess.png)

3. 再打开一个终端进入执行以下命令：

```
$ cd /usr/local/mongodb/bin 
$ ./mongo
```

<div class="note success"><p>出现这种情况, 则说明数据库连接成功</p></div>

![Content](http://p7hfnfk6u.bkt.clouddn.com/mongoCon.png)


### 安装可视化工具`Studio 3T`

- 这里推荐官网下载: [下载地址](https://studio3t.com/download/)
- 安装之后打开软件, 选择左上角`Connection`, 弹出一个新的弹窗
- 在点击新弹窗上面的`New Connection`, 弹出一个新的弹窗
- 在新窗口中输入名字和电脑IP, 点击`Save`
- 最后选择你新添加的电脑IP, 点击`Connect`链接
- 详细步骤如下图所示:

![Stdio 3T](http://pcatqk8cn.bkt.clouddn.com/Stdiocon.png)

## `MongoDB`基本命令操作

### 操作mongodb数据库
#### 创建数据库

```Python
# 语法：use 数据库名
# 示例:
    use student
```

<div class="note warning"><p>注意:</p></div>

  - 如果数据库不存在则创建数据库，否则切换到指定的数据库
  - 如果刚刚创建的数据库不在列表内，如果要显示它，我们需要向刚刚创建的数据库中插入一些数据

```Python
# 该命令后面会继续介绍
db.student.insert({name:"titan", age:18, sex:1,address:"北京", isDelete:0})
```

#### 其他相关命令

```Python
# 1、删除数据库
    # 前提：使用当前数据库(use 数据库名)
    db.dropDatabase()
# 2、查看所有数据
    show dbs
# 3、查看当前正在使用的数据库
    db
    # 或者
    db.getName()
# 4、断开连接
    exit
# 5、查看命令api
    help
```

### 集合操作

```Python
# 1、查看当前数据库下有哪些集合
    show collections
# 2、创建集合
    # a、
        # 语法：db.createCollection("集合名")
        # 示例：
            db.createCollection("class")
    # b、
        # 语法：db.集合名.insert(文档)
        # 示例：
            db.student.insert({name:"titan1", age:18, sex:1,address:"上海", isDelete:0})

    # 区别：两者的区别在于前者创建的是一个空的集合，后者创建一个空的集合并添加一个文档

# 3、删除当前数据库中的集合
    # 语法：db.集合名.drop()
    # 示例：
        db.class.drop()
```

### 文档操作
#### 插入文档

1. 使用`insert()`方法插入文档

```Python
# 1. 插入一个
    # 语法：
        db.集合名.insert(文档)
    # 示例:
        db.student.insert({name:"jun", age:19, sex:1,address:"北京", isDelete:0})
        
# 2. 插入多个
    # 语法：
        db.集合名.insert([文档1, 文档2, ……, 文档n])
    # 示例：
        db.student.insert([{name:"titan2", age:17, sex:0,address:"深圳", isDelete:0},{name:"coder", age:20, sex:0,address:"上海", isDelete:0}])
```

2. 使用`save()`方法插入文档
- 语法：`db.集合名.save(文档)`
- 说明：如果不指定`_id`字段，`save()`方法类似于`insert()`方法。如果指定`_id`字段，则会更新`_id`字段的数据

```Python
# 示例1：
db.student.save({name:"pro", age:22, sex:1,address:"安徽", isDelete:0})

# 示例2：
db.student.save({_id:ObjectId("59950962019723fe2a0d8d17"),name:"poi", age:23, sex:1,address:"安徽", isDelete:0})
```

#### 文档更新

1、`update()`方法用于更新已存在的文档

```
db.集合名.update(
        query,
        update,
        {
            upset:<boolean>,
            multi:<boolean>,
            writeConcern:<document>
        }
)
```

- 参数说明：
    - `query`：`update`的查询条件，类似于`sql`里`update`语句内`where`后面的内容
    - `update`：`update`的对象和一些更新的操作符`($set,$inc)`等，`$set`直接更新，`$inc`在原有的基础上累加后更新
    - `upset`：可选，如果不存在`update`的记录，是否当新数据插入，`true`为插入，`False`为不插入，默认为`false`
    - `multi`：可选，`mongodb`默认是`false`，只更新找到的第一条记录，如果这个参数为`true`,就按照条件查找出来的数据全部更新
    - `writeConcern`：可选，抛出异常的级别
- 需求：将`pro`的年龄更新为25
- 示例：

```Python
db.student.update({name:"pro"},{$set:{age:25}})
              
# 累加：
db.student.update({name:"titan"},{$inc:{age:25}})  

# 全改：
db.student.update({name:"titan1"},{$set:{age:42}},{multi:true}) 
```

2、`save()`方法通过传入的文档替换已有文档

```Python
db.集合名.save(
    # 文档数据
    document,
    {
        # 可选，抛出异常的级别
        writeConcern:<document>
    }
)
```


#### 文档删除

在执行`remove()`函数前，最好先执行`find()`命令来判断执行的条件是否存在

```
db.集合名.remove(
    query,
    {
        justOne:<boolean>,
        writeConcern:<document>
    }
)
```

- 参数说明：
    - `query`：可选，删除的文档的条件
    - `justOne`：可选，如果为true或1，则只删除一个文档
    - `writeConcern`：可选，抛出异常的级别
- 示例：

```
db.student.remove({name:"poi"})

```

#### 文档查询

1、`find()`方法查询

```Python
db.集合名.find(
    # query：查询条件
    query,
    {
        # key：要显示的字段，1表示显示
        <key>:1,
        <key>:1
    }
)


# 示例：
    db.student.find({sex:0},{name:1,age:1})
    db.student.find({},{name:1,age:1})
```

2、其他查询方法

```Python
# 查询集合下所有的文档(数据)：
db.student.find()

# pretty()方法以格式化的方式来显示文档
db.student.find().pretty()

# findOne()方法查询匹配结果的第一条数据
db.student.findOne({gender:0})
```


#### 查询条件操作符

条件操作符用于比较两个表达式并从`Mongodb`集合中获取数据

```Python
# a、大于 - $gt
    # 语法：
        db.集合名.find({<key>:{$gt:<value>}})
    # 示例：
        db.student.find({age:{$gt:20}})
        
# b、大于等于 - $gte
    # 语法：
        db.集合名.find({<key>:{$gte:<value>}})
        
# c、小于 - $lt
    # 语法：
        db.集合名.find({<key>:{$lt:<value>}})
        
# d、小于等于 - $lte
    # 语法：
        db.集合名.find({<key>:{$lte:<value>}})
        
# e、大于等于 和 小于等于 - $gte 和 $lte
    # 语法：
        db.集合名.find({<key>:{$gte:<value>,$lte:<value>}})
        
# f、等于 - :
    # 语法：
        db.集合名.find({<key>:<value>})
        
# g、使用_id进行查询
    # 语法：
        db.student.find({"_id":ObjectId("id值")})
    # 示例：
        db.student.find({"_id":ObjectId("5995084b019723fe2a0d8d14")})
        
# h、查询某个结果集的数据条数
    # 示例：
        db.student.find().count()
        
# i、查询某个字段的值当中是否包含另一个值
    # 示例：
        db.student.find({name:/ile/})
        
# j、查询某个字段的值是否以另一个值开头
    # 示例：
        db.student.find({name:/^li/})
```


#### 条件查询`and`和`or`

```Python
# 1. AND条件
    # 语法：
        db.集合名.find({条件1,条件2,……,条件n})
    # 示例：
        db.student.find({gender:0,age:{$gt:16}})
        
# 2、OR条件
    # 语法：
        db.集合名.find(
            {
                $or:[{条件1},{条件2},……,{条件n}]
            }
        )
    # 示例：
        db.student.find({$or:[{age:17},{age:{$gte:20}}]})
        
# 3、AND和OR联合使用
    # 语法：
        db.集合名.find(
            {
                条件1,
                条件2,
                $or:[{条件3},{条件4}]
            }
        )
```


#### `limit`和`skip`

```Python
# a、limit()：读取指定数量的数据记录
    db.student.find().limit(3)
    
# b、skip()：跳过指定数量的数据
    db.student.find().skip(3)

# c、skip与limit联合使用
    # 通常用这种方式来实现分页功能
    # 示例：
        db.student.find().skip(3).limit(3)

```


#### 排序

```Python
# 语法：
    db.集合名.find().sort({<key>:1|-1})
# 示例：
    db.student.find().sort({age:1})
# 注意：1表示升序，-1表示降序
```


## `MongoDB`和`Python`的交互

### `MongoDB`数据类型

下表为`MongoDB`中常用的几种数据类型


数据类型  |  描述
---|---
`String`  |  	字符串。存储数据常用的数据类型。在`MongoDB`中，`UTF-8`编码的字符串才是合法的
`Integer`  |  	整型数值。用于存储数值, 根据你所采用的服务器，可分为32位或64位
`Boolean`  |  	布尔值。用于存储布尔值（真/假）
`Double`  |  	双精度浮点值。用于存储浮点值。
`Min/Max keys`  |  	将一个值与`BSON`(二进制的 JSON）元素的最低值和最高值相对比
`Array`	  |  用于将数组或列表或多个值存储为一个键。
`Timestamp`	  |  时间戳。记录文档修改或添加的具体时间。
`Object`  |  	用于内嵌文档。
`Null`	  |  用于创建空值。
`Symbol`  |  	符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。
`Date`  |  	日期时间。用`UNIX` 时间格式来存储当前日期或时间, 你可以指定自己的日期时间：创建`Date`对象，传入年月日信息。
`Object ID`	  |  对象 ID。用于创建文档的 ID。
`Binary Data`  |  	二进制数据。用于存储二进制数据。
`Code`  |  	代码类型。用于在文档中存储`JavaScript`代码。
`Regular expression`  |  	正则表达式类型。用于存储正则表达式。


#### ObjectId

- `ObjectId`类似唯一主键，可以很快的去生成和排序，包含`12 bytes`，含义是：
  - 前 4 个字节表示创建 unix 时间戳,格林尼治时间 UTC 时间，比北京时间晚了 8 个小时
  - 接下来的 3 个字节是机器标识码
  - 紧接的两个字节由进程 id 组成 PID
  - 最后三个字节是随机数
- `MongoDB`中存储的文档必须有一个`_id`键, 这个键的值可以是任何类型的，默认是个`ObjectId`对象


### 插入数据

集合中插入文档使用`insert_one()`方法和`insert_many()`方法

#### 插入一条数据

```Python
from pymongo import MongoClient

# 链接服务器
conn = MongoClient("localhost", 27017)

# 获取指定的数据库
db = conn.mydb

# 获取数据库中的指定的集合
collection = db.student


# 添加文档
try:
    # 添加一条数据
    one = collection.insert_one({"name": "coder19", "age": 19, "gender": 1, "address": "北京", "isDelete": 0})
    print(one)

    # 获取id值
    print(one.inserted_id)

    print('添加成功')
except:
    print('添加失败')

# 断开
conn.close()
```

`insert_one()`方法返回`InsertOneResult`对象，改对象包含`inserted_id`属性，它是插入文档的`id`值


```Python
one = collection.insert_one({"name": "coder19", "age": 19, "gender": 1, "address": "北京", "isDelete": 0})
print(one)

# 获取id值
print(one.inserted_id)


# 输出结果:
    # <pymongo.results.InsertOneResult object at 0x10ec427c8>
    # 5b557821258dc825c7c0cf57
```


#### 插入多个文档

`insert_many()`方法返回`InsertManyResult`对象，该对象包含 `inserted_ids`属性，该属性保存着所有插入文档的`id`值


```Python
# 添加文档
try:
    # 添加多条数据
    mylist = [
        {'name': '个人博客', 'age': 10, 'address': 'https://www.titanjun.top'},
        {'name': 'Github', 'age': 11, 'address': 'https://github.com/CoderTitan'}
    ]
    many = collection.insert_many(mylist)

    print(many)
    # 输出插入的所有文档对应的 _id 值
    print(many.inserted_ids)

    print('添加成功')
except:
    print('添加失败')
    
    
# 输出结果
# <pymongo.results.InsertManyResult object at 0x10bf82cc8>
# [ObjectId('5b557a5d258dc8269a55f485'), ObjectId('5b557a5d258dc8269a55f486')]
```

#### 插入指定`_id`的多个文档

```Python
# 插入指定 _id 的多个文档
    mylist = [
        {'_id': 1, 'name': '简书', 'age': 12, 'address': 'https://www.jianshu.com/u/5bd5e9ed569e'},
        {'_id': 2, 'name': 'csdn', 'age': 13, 'address': 'https://blog.csdn.net/shmilycoder'},
        {'_id': 3, 'name': '掘金', 'age': 14, 'address': 'https://juejin.im/user/5a7a64ae6fb9a0636323fd06'},
    ]
    many = collection.insert_many(mylist)

    print(many)
    # 输出插入的所有文档对应的 _id 值
    print(many.inserted_ids)
    
# 输出结果:
# <pymongo.results.InsertManyResult object at 0x10c457dc8>
# [1, 2, 3]
```


### 查询数据
#### 返回所有/第一条数据

```Python
# 查询集合中的第一条数据
print(collection.find_one())

# 查询集合中所有数据
print(collection.find())
```


#### 根据id查询指定数据

```Python
# 输出一个Cursor对象
res3 = collection.find({'_id': ObjectId('5b52cdbbd87e53d6306f3585')})
print(res3)
    
# 输出指定数据信息
res12 = collection.find_one({'_id': ObjectId('5b52cdbbd87e53d6306f3585')})
print(res12)


# 输出结果:
# <pymongo.cursor.Cursor object at 0x1027f2550>
# {'_id': ObjectId('5b52cdbbd87e53d6306f3585'), 'name': 'hai', 'age': 17.0, 'gender': 0.0, 'address': '北京', 'isDelete': 0.0}
```

#### 根据指定条件查询

查询集合中所有符合`key`为`value`的所有的数据

```Python
res10 = collection.find({'age': 19})
for row in res10:
    print(row)
```

#### 指定条件查询

```Python
# age大于19的所有数据的集合
res2 = collection.find({'age': {'$gt': 19}})

# age大于19的所有数据的个数
res2 = collection.count_documents({'age': {'$gt': 19}})

# 指定多条件查询
res2 = collection.count_documents({'age': {'$gt': 19}, 'gender': 0})

# 正则表达式查询
# name以c开头的数据
res11 = collection.find({'name': {'$regex': '^c'}})
```


#### 返回指定条数记录
如果我们要对查询结果设置指定条数的记录可以使用`limit()`方法，该方法只接受一个数字参数

```Python
# 只返回3条数据
res5 = collection.find()limit(3)


# 跳过指定条数返回
# 结果共6条数据
res12 = collection.find({'age': {'$gt': 19}})

# 跳过前两条, 返回后面4条数据
res13 = collection.find({'age': {'$gt': 19}}).skip(2)


# 分页效果
# 跳过上一页的3条数据, 输出3条数据
res5 = collection.find().skip(3).limit(3)
```


### 修改文档

- 在`MongoDB`中使用`update_one()`和`update_many()`方法修改文档中的记录, 第一个参数为查询的条件，第二个参数为要修改的字段
- 在`update_one()`方法中, 如果查找到的匹配数据多余一条，则只会修改第一条
- 在`update_many()`方法中, 会修改所有符合条件的数据


```Python
# 更新一条数据
collection.update_one({'name': 'coder1'}, {'$set': {'age': 80}})

# 更新多条数据
collection.update_many({'name': 'coder2'}, {'$set': {'age': 90}})
```

<div class="note primary"><p>除了`update`方法之外还有一个`replace`方法, 两者的区别是</p></div>

  - `update`只会修改`key`值对应的`value`值, 对其他的`value`值不做修改
  - `replace`方法是除`id`不变, 其他值都会改变, 若未指定新值, 则赋值为空

```Python
# 修改前
    print('修改前')
    print(collection.find_one({'name': 'coder1'}))
    print(collection.find_one({'name': 'coder19'}))

    # update更新一条数据
    collection.update_one({'name': 'coder1'}, {'$set': {'age': 80}})

    # replace更新数据
    collection.replace_one({'name': 'coder19'}, {'age': 90, 'name': 'coder19'})


    # 修改后
    print('修改后')
    print(collection.find_one({'name': 'coder1'}))
    print(collection.find_one({'name': 'coder19'}))
    

# 最后的输出结果
# 修改前
# {'_id': ObjectId('5b5318d0258dc83e8de6f812'), 'name': 'coder1', 'age': 80, 'gender': 0, 'address': '杭州', 'isDelete': 0}
# {'_id': ObjectId('5b557821258dc825c7c0cf57'), 'name': 'coder19', 'age': 19, 'gender': 1, 'address': '北京', 'isDelete': 0}
# 修改后
# {'_id': ObjectId('5b5318d0258dc83e8de6f812'), 'name': 'coder1', 'age': 80, 'gender': 0, 'address': '杭州', 'isDelete': 0}
# {'_id': ObjectId('5b557821258dc825c7c0cf57'), 'age': 90, 'name': 'coder19'}
```


### 删除文档

- 我们可以使用`delete_one()`和`delete_many()`方法来删除, 参数为查询对象，指定要删除哪些数据
- `delete_one()`: 删除符合条件的第一条数据
- `delete_many()`: 删除符合条件的所有数据, 若参数为空, 则表示删除所有数据


```Python
# 删除一条数据
res = collection.delete_one({'age': 90})

# 删除多条数据
res1 = collection.delete_many({'age': 90})
# 输出删除的数据的数量
print(res1.deleted_count)


# 一下两个方法建议不要轻易尝试, 否则所有数据将不复存在
# 删除所有数据
res1 = collection.delete_many({})
# 输出删除的数据的数量
print(res1.deleted_count)

# 删除集合
collection.drop()
# 如果删除成功 drop() 返回 true，如果删除失败(集合不存在)则返回 false。
```

  
### 排序
- 使用`sort`进行排序, 默认降序排列
- 降序: `DESCENDING`, 升序: `ASCENDING`
- 参数二也可以用1和-1: 1 为升序，-1 为降序


```Python
# 以age进行降序排列, 参数二可不传, 默认降序
res4 = collection.find().sort('age')

# 进行升序排列
res5 = collection.find().sort('age', pymongo.ASCENDING)
res5 = collection.find().sort('age', 1)
```


## 参考文档

- [更多集合相关用法详见官方文档](http://api.mongodb.com/python/current/api/pymongo/collection.html)
- [pymongo官方文档](http://api.mongodb.com/python/current/api/pymongo/)
- [MongoDB介绍](http://pc5s2udrk.bkt.clouddn.com/MongoDB1.pdf)


> 至此, `MongoDB`所有相关的内容这里也就全部都介绍完了


---
