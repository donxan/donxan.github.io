---
title: Mac环境下Redis的安装和基本命令的使用
date: 2018-07-24 19:06:40
tags: [Python, Redis, NoSQL]
categories: 数据库基础
image: 
---



![Redis](http://pcatqk8cn.bkt.clouddn.com/RedisPic.jpg)




<!-- more -->




- 上文中介绍了`NoSQL`和`MongoDB`的相关知识: [MongoDB的安装及基本命令和pymongo的使用](https://www.titanjun.top/2018/07/23/MongoDB%E7%9A%84%E5%AE%89%E8%A3%85%E5%8F%8A%E5%9F%BA%E6%9C%AC%E5%91%BD%E4%BB%A4%E5%92%8Cpymongo%E7%9A%84%E4%BD%BF%E7%94%A8/)
- 这里主要介绍`key-value`存储星数据库--`Redis`




## `Redis`简介

- `Redis`是完全开源免费的，遵守`BSD`协议，是一个高性能的`key-value`数据库
- `Redis`与其他`key - value`缓存产品有以下三个特点：
  - `Redis`支持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用
  - `Redis`不仅仅支持简单的`key-value`类型的数据，同时还提供`list`，`set`，`zset`，`hash`等数据结构的存储。
  - `Redis`支持数据的备份，即`master-slave`模式的数据备份




### `Redis`的优势
- 性能极高 –`Redis`能读的速度是110000次/s,写的速度是81000次/s 。
- 丰富的数据类型 – `Redis`支持二进制案例的`Strings`, `Lists`, `Hashes`, `Sets`及 `Ordered Sets`数据类型操作。
- 原子 – `Redis`的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过MULTI和EXEC指令包起来
- 丰富的特性 – `Redis`还支持`publish/subscribe`, 通知, `key`过期等等特性




### `Redis`与其他`key-value`存储有什么不同？

- `Redis`有着更为复杂的数据结构并且提供对他们的原子性操作，这是一个不同于其他数据库的进化路径
- `Redis`的数据类型都是基于基本数据结构的同时对程序员透明，无需进行额外的抽象
- `Redis`运行在内存中但是可以持久化到磁盘，所以在对不同数据集进行高速读写时需要权衡内存，因为数据量不能大于硬件内存
- 在内存数据库方面的另一个优点是，相比在磁盘上相同的复杂的数据结构，在内存中操作起来非常简单，这样`Redis`可以做很多内部复杂性很强的事情。同时，在磁盘格式方面他们是紧凑的以追加的方式产生的，因为他们并不需要进行随机访问


### `Redis`的安装

- 至于安装, 我这里就不在班门弄斧了, 这里给大家推荐一篇博客: [mac系统安装redis](https://www.cnblogs.com/feijl/p/6879929.html)
- 文章写得非常详细, 建议参考安装



## `Redis`命令操作

- `Redis`命令十分丰富，包括的命令组有`Cluster`、`Connection`、`Geo`、`Hashes`、`HyperLogLog`、`Keys`、`Lists`、`Pub/Sub`、`Scripting`、`Server`、`Sets`、`Sorted Sets`、`Strings`、`Transactions`一共14个`redis`命令组两百多个`redis`命令
- [Redis中文命令大全](http://redis.cn/commands.html), 可以通过检索功能快速查找命令
- [查看网站结构图](http://redis.cn/map.html),它以节点图的形式展示了所有redis命令


### String

- `String`是`redis`最基本的类型，最大能存储512MB的数据
- `String`类型是二进制安全的，即可以存储任何数据、比如数字、图片、序列化对象等


#### 设置值

```Python
# a、设置键值
    set key value
    set titan titan
# b、设置键值及过期时间，以秒为单位
    setex key seconds value
    setex c 10 good
# c、设置多个键值
    mset key value [key value ……]
    mset d good e nice f bad
```


#### 获取值

```Python
# a、根据键获取值，如果键不存在则返回None(null 0 nil)
    get key
    get d
# b、根据多个键获取多个值
    mget key [key ……]
    mget d f a
```

#### 运算命令

前提条件是：值是字符串类型的数字

```Python
# a、将key对应的值加1
    incr key
    incr g
# b、将key对应的值减1
    decr key
    decr h
# c、将key对应的值加整数
    incrby key intnum
    incrby g 12
# d、将key对应的值加整数
    decrby key intnum
    decrby g 11
```


#### 其他常用命令

```Python
# a、追加值
    append key value
    append d lucky
# b、获取值长度
    strlen key
    strlen d
```


### Keys

```Python
# 1、查找键，参数支持正则
    keys pattern
# 2、判断键是否存在，如果存在返回1，不存在返回0
    exists key
# 3、查看键对应的value类型
    type key
# 4、删除键及对应的值
    del key [key ……]
# 5、设置过期时间，以秒为单位
    expire key seconds
# 6、查看有效时间，以秒为单位
    ttl key
```


### Hashes

- `hash`是一个`string`类型的`field`和`value`的映射表，`hash`特别适合用于存储对象
- `Redis`中每个`hash`可以存储 232 - 1 键值对（40多亿）

```Python
# 1、设置
    # a、设置单个值
        hset key field value
        hset a1 field a1
    # b、设置多个值
        hmset key field value [field value ……]
        hmset a3 field1 a3 field2 a4
# 2、获取
    # a、获取一个属性的值
        hget key field
        hget a3 field1
    # b、获取多个属性的值
        hmget key filed [filed ……]
        hmget a3 field1 field2
    # c、获取所有属性和值
        hgetall key
        hgetall a3
    # d、获取所有属性
        hkeys key
        hkeys a3
    # e、获取所有值
        hvals key
        hvals a3
    # f、返回包含数据的个数
        hlen key
        hlen a3
# 3、其它
    # a、判断属性是否存在，存在返回1，不存在返回0
        hexists key field
        hexists a3 field3
        hexists a3 field1
    # b、删除属性及值, 成功返回1, 失败返回0
        hdel key field [field ……]
        hdel a2 field
    # c、返回值的字符串长度
        hstrlen key field
        hstrlen a3 field1
```


### 列表(List)

- `Redis`列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）
- 一个列表最多可以包含 232 - 1 个元素 (4294967295, 每个列表超过40亿个元素)。

```Python
    # 1、设置
        # a、在头部插入
            lpush key value [vlaue ……]
            lpush list 1 2 3 4
        # b、在尾部插入
            rpush key value [vlaue ……]
            rpush list 9 8 7 6
        # c、在一个元素的前|后插入新元素
            linsert key before|after pivot value
            linsert list before 4 10
            linsert list after 3 5
        # d、设置指定索引的元素值
            lset key index value
            lset list 3 11
            lset list -2 21
            # 注意：index从0开始
            # 注意：索引值可以是负数，表示偏移量是从list的尾部开始，如-1表示最后一个元素
    # 2、获取
        # a、移除并返回key对应的list的第一个元素
            lpop key
            lpop list
        # b、移除并返回key对应的list的最后一个元素
            rpop key
            lpop list 
        # c、返回存储在key的列表中的指定范围的元素
            lrange key start end
            lrange list 2 4
            # 注意：start end都是从0开始
            # 注意：偏移量可以是负数
    # 3、其它
        # a、裁剪列表，改为原集合的一个子集
            ltrim key start end
            ltrim list 0 2
            # 注意：start end都是从0开始
            # 注意：偏移量可以是负数
        # b、返回存储在key里的list的长度
            llen key
            llen list
        # c、返回列表中索引对应的值
            lindex key index
            lindex list 2
```


### 集合(Set)
- `Redis`的`Set`是`String`类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。
- `Redis中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。
- 集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储40多亿个成员)。


```Python
    # 1、设置
        # a、添加元素
            sadd key member [member ……]
            sadd set1 1 2 3 4 5 3 2
            sadd set2 4 5 6 7 8
    # 2、获取
        # a、返回key集合中所有元素
            smembers key
            smembers set1
        # b、返回集合元素个数
            scard key
            scard set1
    # 3、
        # a、求多个集合的交集
            sinter key [key ……]
            sinter set1 set2
        # b、求多个集合的差集
            sdiff key [key ……]
            sdiff set1 set2
            # 输出: 1 2 3 
            sdiff set2 set1
            # 输出: 6 7 8
            # 注意: 两个结合前后位置变化输出的结果是不一样的
        # c、求多个集合的合集
            sunion key [key ……]
            sunion set1 set2
        # d、判断元素是否在集合中，存在返回1，不存在返回0
            sismember key member
            sismember set1 4
            sismember set1 7
```


### 有序集合(sorted set)

- 有序集合，元素类型为`Sting`，元素具有唯一性，不能重复
- 每个元素都会关联一个`double`类型的`score`(表示权重),通过权重的大小排序，元素的`score`可以相同
- 集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是O(1)
- 集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储40多亿个成员)


```Python
    # 1、设置
        # a、添加
            zadd key score member [score member ……]
            zadd slist 1 a 5 b 3 c 2 d 4 e
    # 2、获取
        # a、返回指定范围的元素
            zrange key start end
            zrange slist 0 2
        # b、返回元素个数
            zcard key
            zcard slist
        # c、返回有序集合key中，score在min和max之间的元素的个数
            zcount key min max
            zcount slist 1 3
        # d、返回有序集合key中，成员member的score值
            zscore key member
            zscore slist e
```



---
