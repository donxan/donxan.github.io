---
title: Flutter开发之Dart的数据类型02
date: 2019-03-01 09:16:34
tags: [Flutter, Dart]
categories: Flutter笔记
image:
---




![dart-logo](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/dart-logo.png?x-oss-process=style/titanjun)

<!--more-->



- 这几篇文章都是在学习`Dart`过程中所记录的学习笔记, 都是一些基础知识, 几乎没什么技术含量, 主要是方便后期使用的时候方便查阅
- 之前的一篇文章已经介绍了一部分的数据类型[Flutter开发之Dart的数据类型01](https://www.titanjun.top/2019/02/20/Flutter%E5%BC%80%E5%8F%91%E4%B9%8BDart%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B01/), 这里主要记录剩下的一些常用的数据类型
- 我写的[Flutter和Dart语法系列相关的文章](https://www.titanjun.top/categories/Flutter笔记/), 有兴趣的可参考随便看看


## Map

- `key-value`键值对（可以使用相关联的`key`检索`value`值）的集合, 即传说中的字典
- `Map`中`key`的数量是有限的，每个`key`正好有一个相关的`value`
- `Map`、以及它的键和值，都是可以迭代的, 迭代的顺序由`Map`不同的类型定义
  - [`HashMap`](http://www.shutongye.com/dartapi/dart-collection/HashMap-class.html)是无序的，这意味着它迭代的顺序是不确定的
  - [`LinkedHashMap`](http://www.shutongye.com/dartapi/dart-collection/LinkedHashMap-class.html)按`key`的插入顺序进行迭代
  - [`SplayTreeMap`](http://www.shutongye.com/dartapi/dart-collection/SplayTreeMap-class.html)按`key`的排序顺序进行迭代
- 当`Map`的一个操作正在执行的时候，通常不允许修改`Map`（添加或删除`key`）

### 创建Map

```dart
Map()
// 创建一个Map实例，默认实现是LinkedHashMap。

Map.from(Map other)
// 创建一个LinkedHashMap实例，包含other的所有键值对。

Map.fromIterable(Iterable iterable, {K key(element), V value(element)})
// 创建一个Map实例，其中Key和Value由iterable的元素计算得到。

Map.fromIterables(Iterable<K> keys, Iterable<V> values)
// 将指定的keys和values关联，创建一个Map实例。

Map.identity()
// 使用默认实现LinkedHashMap创建一个严格的Map。

Map.unmodifiable(Map other)
// 创建一个不可修改、基于哈希值的Map，包含other所有的项
```

每一种创建方式的具体使用

```dart
  // 创建一个Map实例, 插入顺序进行排列
  var dic = new Map();
  print(dic);  // {}

  // 根据一个Map创建一个新的Map, 插入顺序进行排列
  var dic1 = new Map.from({'name': 'titan'});
  print(dic1);  // {name: titan}

  // 根据List创建Map, 插入顺序进行排列
  List<int> list = [1, 2, 3];
  // 使用默认方式, key和value都是数组对应的元素
  var dic2 = new Map.fromIterable(list);
  print(dic2);  // {1: 1, 2: 2, 3: 3}
  // 设置key和value的值
  var dic3 = new Map.fromIterable(list, key: (item) => item.toString(), value: (item) => item * item);
  print(dic3);  // {1: 1, 2: 4, 3: 9}

  // 两个数组映射一个字典, 插入顺序进行排列
  List<String> keys = ['name', 'age'];
  var values = ['jun', 20];
  // 如果有相同的key值, 后面的值会覆盖前面的值
  var dic4 = new Map.fromIterables(keys, values);
  print(dic4);  // {name: jun, age: 20}

  // 创建一个空的Map, Map允许null作为key
  var dic5 = new Map.identity();
  print(dic5);  //{}

  // 创建一个不可修改、基于哈希值的Map
  var dic6 = new Map.unmodifiable({'name': 'titan'});
  print(dic6);
```

### 相关属性

`Map`中相关属性和一些常用属性的操作如下:

```dart
  var map1 = {'name': 'titan', 'age': 20};
  // 哈希值
  print(map1.hashCode); 

  // 运行时类型
  print(map1.runtimeType);  //_InternalLinkedHashMap<String, Object>

  // 是否为空, null不能判断, 会报错
  print(map1.isEmpty);  // false

  // 是否不为空
  print(map1.isNotEmpty);  // true

  // 键值对个数
  print(map1.length);   // 2

  // 所有的key值, 返回Iterable<K>类型
  print(map1.keys.toList());  // [name, age]

  // 所有的value值, 返回Iterable<K>类型
  print(map1.values.toList());   // [titan, 20]

  // 根据key取值
  print(map1['name'] ?? '');   // titan

  // 根据key赋值
  map1['age'] = 30;
  print(map1);   // {name: titan, age: 30}
```

### 相关函数

```dart
  var map2 = {'name': 'titan', 'age': 20};

  // 添加一个map
  map2.addAll({'blog': 'titanjun'});
  print(map2);
  // {name: titan, age: 20, blog: titanjun}

  // 判断是否包含指定的key
  print(map2.containsKey('age'));  //

  // 判断是否包含指定的value
  print(map2.containsValue('titan'));

  // 操作每个键值对
  map2.forEach((key, value) {
    print('key = $key, value = $value');
  });

  // 查找key对应的value，或添加一个新的值为key.length的value
  for (var key in ['name', 'age', 'king']) {
    // 函数的返回值为查找到的对应的value值
    print(map2.putIfAbsent(key, () => key.length));
  }
  print(map2);
  // {name: titan, age: 20, blog: titanjun, king: 4}

  // 转成字符串
  print(map2.toString());

  // 删除键值对, 返回删除key对应的value值, 没有则返回null
  print(map2.remove('blog'));  //titanjun
  print(map2.remove('coder'));  //null
  print(map2);

  // 删除所有的键值对
  map2.clear();
  print(map2);  //{}
```

## Iterable

- 按顺序访问的值或元素的集合, `List`集合也是继承于`Iterable`
- `List`和`Set`也是`Iterable`，`dart:collection`库中同样有很多
- 部分`Iterable`集合可以被修改   
  - 向`List`或`Set`添加元素将改变对象所有包含的元素。 
  - 向Map添加新的`Key`会改变所有`Map.keys`的元素。 
  - 在集合改变后，创建的迭代器将提供新的所有元素，并且可能会保持目前元素的顺序, 也可能不会

### 创建方式

```dart
  // 创建空的可迭代对象
  var ite = Iterable.empty();
  print(ite);   // ()
  
  // 创建一个Iterable，通过序列来动态生成元素
  var ite1 = Iterable.generate(5);
  print(ite1);  // (0, 1, 2, 3, 4)
```

至于`Iterable`的所有属性和函数的介绍和使用, 在上篇文章[Flutter开发之Dart的数据类型01](https://www.titanjun.top/2019/02/20/Flutter%E5%BC%80%E5%8F%91%E4%B9%8BDart%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B01/#List)中的`List`模块中已经详细介绍了, 因为`List`是继承于`Iterable`的, 所以`Iterable`有的属性和方法`List`中都有

## Runes

- 在`Dart`中，`Runes`代表字符串的`UTF-32`字符集, 另一种`Strings`
- `Unicode`为每一个字符、标点符号、表情符号等都定义了 一个唯一的数值
- 由于`Dart`字符串是`UTF-16`的字符序列，所以在字符串中表达32的字符序列就需要新的语法了
- 通常使用`\uXXXX`的方式来表示, 这里的`XXXX`是4个16进制的数, 如，心形符号`(♥)`是`\u2665`
- 对于非4个数值的情况，把编码值放到大括号中即可, 如，笑脸`emoji` (😆) 是`\u{1f600}`
- `String`类有一些属性可以提取`rune`信息
  - `codeUnitAt`和`codeUnit`属性返回16为字符
  - 使用`runes`属性来获取字符串的`runes`信息


```dart
  var clapping = '\u{1f44f}';
  print(clapping);  // 👏
  print(clapping.codeUnits);  // [55357, 56399]
  print(clapping.runes.toList());  // [128079]
```

### 简单使用

```dart
  // 根据字符串创建
  Runes runes = new Runes('\u2665, \u{1f605}, \u{1f60e}');
  print(runes);
  // (9829, 44, 32, 128517, 44, 32, 128526)
  // 输出特殊字符的字符串
  print(new String.fromCharCodes(runes));
  // ♥, 😅, 😎
```

由于`Runes`也是继承于`Iterable`, 所以`Runes`中的属性和方法的使用也和`Iterable`一样, 详情参考[Runes](http://www.shutongye.com/dartapi/dart-core/Runes-class.html)和[Flutter开发之Dart的数据类型01](https://www.titanjun.top/2019/02/20/Flutter%E5%BC%80%E5%8F%91%E4%B9%8BDart%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B01/#List)中的介绍


## Symbols

- 一个`Symbol`对象代表`Dart`程序中声明的操作符或者标识符
- 也许不会用到`Symbol`，但是该功能对于通过名字来引用标识符的情况 是非常有价值的，特别是混淆后的代码，标识符的名字被混淆了，但是`Symbol`的名字不会改变
- 使用`Symbol`字面量来获取标识符的`symbol`对象，也就是在标识符前面添加一个 `#` 符号


```dart
  // 获取symbol 对象
  var sym1 = Symbol('name');
  print(sym1);   // Symbol("name")

  // #号创建
  var sym2 = #titan;
  print(sym2);   // Symbol("titan")
```

## Set

- 对象的集合，其中每个对象只能出现一次, `List`中一个对象可以出现多次
- 迭代Set中的元素时，某些时候有可能是无序的，也有可能是有序的。例如：
  - `HashSet`是无序的，这意味着它迭代的顺序是不确定的
  - `LinkedHashSet`按元素的插入顺序进行迭代
  - `SplayTreeSet`按排序顺序迭代元素
- `Set`除创建方式和`List`不同, 其他属性和方法基本一样


### 创建Set

```dart
  // 创建一个空的Set。
  var set1 = Set();
  print(set1);   // {}

  // 创建一个包含所有elements的Set
  var set2 = Set.from([1, 2, 3]);
  print(set2);   // {1, 2, 3}

  // 创建一个空的，元素严格相等的Set
  var set3 = Set.identity();
  print(set3);   // {}
```

### 方法

```dart
  // set2 = {1, 2, 3}
  //返回一个新的Set，它是this和other的交集
  var set4 = Set.from([2, 3, 5, 6]);
  print(set2.intersection(set4));  //{2, 3}

  // 返回一个新的Set，它包含this和other的所有元素（并集）
  print(set2.union(set4));  // {1, 2, 3, 5, 6}

  // 检查Set中是否包含object, 有则返回该object, 没有则返回null
  print(set4.lookup(5));   // 5
  print(set4.lookup(21));  // null
```

其他更多属性参考[Set<E>](http://www.shutongye.com/dartapi/dart-core/Set-class.html)和[Flutter开发之Dart的数据类型01](https://www.titanjun.top/2019/02/20/Flutter%E5%BC%80%E5%8F%91%E4%B9%8BDart%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B01/#List)中的介绍


## Duration

- `Duration`表示从一个时间点到另一个时间点的时间差
- 如果是一个较晚的时间点和一个较早的时间点，`Duration`可能是负数

### 创建Duration

```dart
// 唯一的构造函数创建Duration对象
Duration({int days: 0, int hours: 0, int minutes: 0, int seconds: 0, int milliseconds: 0, int microseconds: 0})

// 可以使用其中的一个或者几个参数创建
// 只是用其中的一个参数
Duration ration = Duration(days: 1);
print(ration);  //24:00:00.000000
Duration ration1 = Duration(hours: 10);
print(ration1);  //10:00:00.000000

// 只是用其中的两个参数
Duration ration2 = Duration(days: 1, hours: 3);
print(ration2);  //27:00:00.000000

// 使用所有的参数
Duration ration3 = Duration(days: 2, hours: 2, minutes: 23, seconds: 34, milliseconds: 56, microseconds: 89);
print(ration3);  //50:23:34.056089
```

### 相关运算

```dart
  Duration time1 = Duration(days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1, microseconds: 1);
  Duration time2 = Duration(days: 2, hours: 2, minutes: 2, seconds: 2, milliseconds: 2, microseconds: 2);
  print(time1);  //25:01:01.001001
  print(time2);  //50:02:02.002002

  // 加
  print(time1 + time2);  //75:03:03.003003
  // 减
  print(time1 - time2);  //-25:01:01.001001
  // 乘
  print(time1 * 2);    //50:02:02.002002
  // 除(取整)
  print(time2 ~/ 3);  //16:40:40.667334

  // 比较
  print(time1 > time2);  //false
  print(time1 >= time2);  //false
  print(time1 == time2);  //false
  print(time1 < time2);  //true
  print(time1 <= time2); //true

  // 取相反值
  print(-time1);  //-25:01:01.001001
  print(-(time1 - time2));  //25:01:01.001001
```

### 相关函数

```dart
  Duration time3 = -Duration(days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1, microseconds: 1);
  print(time3);  //-25:01:01.001001

  // 取绝对值
  print(time3.abs());  //25:01:01.001001

  // 比较, 返回值, 0: 相等, -1: time1 < time2, 1: time1 > time2
  print(time1.compareTo(time2));  //-1

  // 字符串形式
  print(time1.toString());
```


## DateTime

- 表示一个时间点
- 通过构造函数或解析格式化的字符串创建`DateTime`对象，并且符合`ISO 8601`标准的子集，小时是24小时制，范围在0-23之间
- `DateTime`对象创建之后，将是固定不变的, 不可被修改
- `DateTime`对象默认使用的是本地时区，除非显示地指定`UTC`时区

### 创建时间点

```dart
  // 当前时间
  var date1 = new DateTime.now();
  print(date1);  //2019-02-23 16:43:15.505305

  // 构造一个指定为本地时区的DateTime
  //DateTime(int year, [int month = 1, int day = 1, int hour = 0, int minute = 0, int second = 0, int millisecond = 0, int microsecond = 0])
  var date2 = new DateTime(2018, 10, 3, 12, 23, 34, 562, 1002);
  print(date2);  //2018-10-03 12:23:34.563002

  // 用微秒创建
  var date3 = new DateTime.fromMicrosecondsSinceEpoch(1000222);
  // isUtc: true: UTC时区, 默认false
  var date31 =  new DateTime.fromMicrosecondsSinceEpoch(1000222, isUtc: true);
  print(date3);  //1970-01-01 08:00:01.000222

  // 用毫秒创建
  var date4 = new DateTime.fromMillisecondsSinceEpoch(1000222);
  // isUtc: true: UTC时区, 默认false
  var date41 = new DateTime.fromMillisecondsSinceEpoch(1000222, isUtc: true);
  print(date4);  //1970-01-01 08:16:40.222
  
  // 指定为UTC时区的时间
  var date5 = new DateTime.utc(1969, 7, 20, 20, 18, 04);
  print(date5);  //1969-07-20 20:18:04.000Z
```

### parse

```dart
DateTime parse(String formattedString)
```

- 基于时间字符串, 创建`DateTime`
- 如果输入的字符串无法解析，将抛出异常
- 当前接受的字符串为：
  - 日期：一个有正负号之分的4-6位数的年份，2位数的月份，2位数的号数
    - 年、月、日相互间可选-进行分割
    - 例如："19700101"，"-0004-12-24"，"81030-04-01"
  - 时间部分为可选项，从日期处以`T`或一个空格分开
    - 对于时间部分，包括2位数的小时，然后2位数的分钟值可选，然后2位数的秒钟值可选， 然后 `.` 加1-6位数的秒数可选
    - 分和秒可以用`:`分隔
    - 如："12"，"12:30:24.124"，"123010.50"
  - 时区偏移量为可选项，可能用空格与之前的部分分隔开
    - 时区是`z`或`Z`，或者是一个有正负之分的2位数的小时部分，和可选的2位数的分钟部分
    - 符号必须是`+`或`-`，并且不能省略
    - 分钟和小时可能用`:`分隔
- 接受的字符串例子：
  - `"2012-02-27 13:27:00"`
  - `"2012-02-27 13:27:00.123456z"`
  - `"20120227 13:27:00"`
  - `"20120227T132700"`
  - `"20120227"`
  - `"+20120227"`
  - `"2012-02-27T14Z"`
  - `"2012-02-27T14+00:00"`
  - `"-123450101 00:00:00 Z"`：年份为-12345
  - `"2002-02-27T14:00:00-0500"`: 与`"2002-02-27T19:00:00Z"`相同

```dart
  // 格式化时间字符串
  var date6 = DateTime.parse("2012-02-27 13:27:00");
  var date7 = DateTime.parse('20120227T132700');
  print(date6);  // 2012-02-27 13:27:00.000
  print(date7);  // 2012-02-27 13:27:00.000
```

### 属性值

```dart
  var time = DateTime.parse("2019-02-25 13:27:04");
  // 获取年-月-日-周几
  print(time.year);   //2019
  print(time.month);  //2
  print(time.day);    //25
  print(time.weekday);//1

  // 获取时-分-秒-毫秒-微秒
  print(time.hour);       //13
  print(time.minute);     //27
  print(time.second);     //4
  print(time.millisecond);//0
  print(time.microsecond);//0

  // 是不是utc时区
  print(time.isUtc);
  
  //1970-01-01T00:00:00Z (UTC)开始经过的微秒数
  print(time.microsecondsSinceEpoch);

  //1970-01-01T00:00:00Z (UTC)开始经过的毫秒数
  print(time.millisecondsSinceEpoch);
  
  //平台提供的时区名称
  print(time.timeZoneName);

  //时区偏移量，即本地时间和UTC之间的时间差
  print(time.timeZoneOffset);
```

### 相关函数

```dart
  // 获取当前时间
  DateTime today = new DateTime.now();
  print(today);  //2019-02-28 11:18:16.198088

  //加上duration，返回一个新的DateTime实例
  DateTime newDay = today.add(new Duration(days: 60));
  print(newDay);  //2019-04-29 11:18:16.198088

  //减去duration，返回一个新的DateTime实例
  DateTime newDay1 = today.subtract(new Duration(days: 60));
  print(newDay1);  //2018-12-30 11:25:31.741382

  // 比较两个时间值的大小, 0: 相等, -1: 前值<后值, 1: 前值>后值
  var isCom = today.compareTo(newDay);
  print(isCom);  // -1

  // 计算两个时间的差值
  Duration duration = today.difference(newDay);
  print(duration);  //-1440:00:00.000000

  // 比较两个时间
  print(today.isAfter(newDay));  // false
  print(today.isBefore(newDay)); // true

  // 比较是否是同一时刻
  print(today.isAtSameMomentAs(newDay));  //false

  // 返回此DateTime在本地时区的值
  print(today.toLocal());  //2019-02-28 11:30:51.713069
```


---




### 参考文献

- [Dart官网语法介绍-中文版](http://dart.goodev.org/guides/language/language-tour)
- [Dart官网语法介绍-英文版](https://www.dartlang.org/guides/language/language-tour)
- [Dart语言中文社区](http://www.shutongye.com/dartapi/dart-core/Map-class.html)

---
