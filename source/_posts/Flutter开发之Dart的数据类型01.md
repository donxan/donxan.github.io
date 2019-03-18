---
title: Flutter开发之Dart的数据类型01
date: 2019-02-20 10:16:40
tags: [Flutter, Dart]
categories: Flutter笔记
image:
---




![dart-logo](https://titanjun.oss-cn-hangzhou.aliyuncs.com/flutter/dart-logo.png?x-oss-process=style/titanjun)

<!--more-->



- 这几篇文章都是在学习`Dart`过程中所记录的学习笔记, 都是一些基础知识, 几乎没什么技术含量, 主要是方便后期使用的时候方便查阅
- 我写的[Flutter和Dart语法系列相关的文章](https://www.titanjun.top/categories/Flutter笔记/), 有兴趣的可参考随便看看


## Dart数据类型

`Dart`内置的数据类型中, 支持以下几种数据类型
- `numbers`(数字)
- `strings`(字符串)
- `booleans`(布尔)
- `lists` (也被称之为 `arrays`)
- `maps`
- `runes` (用于在字符串中表示`Unicode`字符)
- `symbols`


上面的数据类型可以直接使用字面量初始化

```dart
var str = 'this is a string' ;
var isStr = true;
```

也可以使用构造函数初始化, 由于`Dart`中每个变量引用的都是一个对象 – 一个类的实例, 一些内置的类型具有自己的构造函数

```dart
// 可以使用 Map()构造函数来创建一个 map，就像这样 
var map = new Map();
```


> `Dart`中`Numbers`支持两种类型的数字：

- `int`: 整数值，其取值通常位于`-2^53`和`2^53`之间, 差不多`9*10^16`, 也就是支持16位数字
- `double`: `64-bit` (双精度) 浮点数，符合`IEEE 754`标准

## int

- 其取值通常位于`-2^53`和`2^53`之间
- 也就是-9,007,199,254,740,992和9,007,199,254,740,992之间
- 实际在编译中则是超过19位则会报错
- 更多可参考[问题 1533](https://github.com/dart-lang/sdk/issues/1533)了解更多信息

```dart
// 如下定义则会报错, 定义的int星变量需要在9,223,372,036,854,775,807 or less than -9,223,372,036,854,775,808之间
var bil = 12345678901234567890;
```

一些常用的判断属性

```dart
  const m1 = 12;
  
  // 是否为负数, 大于0即为false
  print(m1.isNegative);
  print(0.isNegative);

  // 是否是有限的
  print(b32.isFinite);
  print(m1.isFinite);

  // 是否是无穷大或者无穷小
  print(m1.isInfinite);

  // 是否为偶数
  print(m1.isEven);

  // 是否为奇数
  print(m1.isOdd);

  // 是否是NaN值
  print(m1.isNaN);
  
  // 数据的符号，-1.0:值小于0、+1.0:值大于0、-0.0/0.0/NaN:值是其本身
  print(21.sign);  // 1
  print(-23.sign); // -1
  print(0.sign);   // 0
  print(-0.sign);  // 0
```

`int`数字类型中常用的函数

```dart
  const m3 = 24;
  
  // 获取绝对值
  print(m3.abs());

  // 转成字符串
  print(m3.toString());

  // 幂次求模; m3的4次幂, 在对3求模
  print(m3.modPow(4, 3)); // 1

  // 返回m3和16的最大公约数
  print(m3.gcd(16));
  
  // 返回m3除以5的余数
  print(m3.remainder(5));

  // 转成double
  print(m3.toDouble());
  
  // 比较大小, 0:相同、1:大于、-1:小于
  print(m3.compareTo(30));
```



## double

下面是定义`double`的一些方式：

```dart
var y = 1.1;
var exponents = 1.42e5;
```

`double`类型相关的属性使用

```dart
  // 是否是NaN值
  print(d0.isNaN);
  // 是否是无穷大或者无穷小
  print(d0.isInfinite);
  // 是否是有限的
  print(d0.isFinite);
  // 是否为负数, 大于0即为false
  print(d0.isNegative);

  // 根据代码单元生成的哈希码
  print(d0.hashCode);
  
  // 数据的符号，-1.0:值小于0、+1.0:值大于0、-0.0/0.0/NaN:值是其本身
  print(d0.sign);
  print(-1.23.sign);
  print(0.0.sign);

  // 返回运行时的类型
  print(d0.runtimeType);  // double
```

`double`类型相关方法的使用

```dart
  // 转成字符串
  print(d0.toString());

  // 取整数, 小数点舍去
  print(d0.toInt());

  // 比较大小, 0:相同、1:大于、-1:小于
  print(d0.compareTo(30));

  // 获取绝对值
  print(d0.abs());

  // 四舍五入
  print(d0.round()); // 13
  // 向上取整
  print(d0.ceil());  // 14
  // 向下取整
  print(d0.floor()); // 13

  // 输出的double类型, 相当于d0.round().toDouble()
  print(d0.roundToDouble()); // 13.0
  print(d0.ceilToDouble());  // 14.0
  print(d0.floorToDouble()); // 13.0

  // 保留指定的小数位数(四舍五入), 不足补0, 字符串返回
  print(d0.toStringAsFixed(2)); // 13.10

  // 保留变量的位数(小数点前后的总位数), 不足补0, 多余的四舍五入
  print(d0.toStringAsPrecision(10));  // 13.09870000

  /**  toStringAsExponential
   *     1.toStringAsExponential();       // 1e+0
   *     1.toStringAsExponential(3);      // 1.000e+0
   *     123456.toStringAsExponential();  // 1.23456e+5
   *     123456.toStringAsExponential(3); // 1.235e+5
   *     123.toStringAsExponential(0);    // 1e+2
   */


  /** toStringAsPrecision
   *     1.toStringAsPrecision(2);       // 1.0
   *     1e15.toStringAsPrecision(3);    // 1.00e+15
   *     1234567.toStringAsPrecision(3); // 1.23e+6
   *     1234567.toStringAsPrecision(9); // 1234567.00
   *     12345678901234567890.toStringAsPrecision(20); // 12345678901234567168
   *     12345678901234567890.toStringAsPrecision(14); // 1.2345678901235e+19
   *     0.00000012345.toStringAsPrecision(15); // 1.23450000000000e-7
   *     0.0000012345.toStringAsPrecision(15);  // 0.00000123450000000000
   */
```


## Booleans

- 为了代表布尔值，`Dart`有一个名字为`bool`的类型。 
- 只有两个对象是布尔类型的：`true`和 `false` 所创建的对象， 这两个对象也都是编译时常量
- 当`Dart`需要一个布尔值的时候，只有`true`对象才被认为是`true`, 所有其他的值都是`flase`; 像 1、 `"aString"`、 以及`someObject`等值都被认为是`false`

```dart
  const m = 1;
  if (m) {
    print('是一个布尔值');
  } else {
    print('不是一个布尔值');
  }
```

- 在`Dart`中上面判断语句是合法的代码
- 但是在`Dart`检查模式运行，上面的代码将会抛出一个异常，表示`m`变量不是一个布尔值
- 所以不建议这么使用上述方法进行判断


## Strings

`Dart`字符串是`UTF-16`编码的字符序列, 可以使用单引号或者双引号来创建字符串：

```dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
// 单引号里面有单引号(双引号里面有双引号)时, 必须使用反斜\杠转义
var s3 = 'It\'s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

### 字符串的拼接

直接把相邻字符串写在一起，就可以连接字符串了

```dart
var string = 'name''+''age'
```

用+把相邻字符串连接起来

```dart
var string1 = 'name' + '+' + 'age';
```

### 引用变量

- 在`Dart`中使用`$`符号引用变量或者表达式
- 表达式引用方式: `${表达式}`, 如果表达式是一个变量则`{}`可以省略

```dart
  const num1 = 12;
  // 引用表达式
  const ageStr0 = 'age = $num1';
  const ageStr1 = 'age = ${num1} is my age';
  // 引用表达式
  const ageStr2 = 'age = ${num1 * num1}';
```

### 多行字符串

使用单引号或双引号的三引号

```dart
  const line1 = '''
      道路千万条，安全第一条，
      行车不规范，亲人两行泪
    ''';
  const line2 = """
      道路千万条，安全第一条，
      行车不规范，亲人两行泪
    """;
```

### 转义符号

声明`raw字符串(前缀为r)`，在字符串前加字符`r`，或者在`\`前面再加一个`\`，可以避免`\`的转义作用，在正则表达式里特别有用

```dart
  // 转义字符
  print(r'转义字符, \n');
  print('转义字符, \\n');
  print('转义字符, \n');
```

### 属性介绍

```dart
  const string0 = 'https://www.titanjun.top/';
  
  // 可根据索引获取字符串的每一个字符
  print(string0[1]);

  // 字符串是否是空的
  print(string0.isEmpty);
  print(''.isEmpty); // true
  // 字符串是否不是空的
  print(string0.isNotEmpty);
  print(''.isNotEmpty);  // false

  // 返回字符串Unicode代码的可迭代对象
  print(string0.runes);
  // 返回字符串的UTF-16代码单元列表
  print(string0.codeUnits);
  // 返回根据代码单元生成的哈希码
  print(string0.hashCode);
  // 字符串的长度
  print(string0.length); 
  // 返回对象运行时的类型
  print(string0.runtimeType);  // String
```

### 方法介绍

```dart
  const string0 = 'https://www.titanjun.top/';
  
  // 字符串比较
  print('titan'.compareTo('jun'));
  
  // 大小写转换
  print(string0.toUpperCase());
  print(string0.toLowerCase());

  // 截取字符串(开头索引和结尾索引)
  print(string0.substring(0, 5)); // https
  // 只有开头索引, 默认截取到最后
  print(string0.substring(12));  // titanjun.top/

  // 拆分字符串
  print(string0.split('.'));  // [https://www, titanjun, top/]
  print(string0.split(new RegExp(r"t")));  // [h, , ps://www., i, anjun., op/]

  // 去掉字符串里面的tab空格和换行符
  const string1 = '\t\ttitanjun top\n';
  print(string1.trim());
  // 去掉字符串开头的tab空格和换行符
  print(string1.trimLeft());
  // 去掉字符串结尾的tab空格和换行符
  print(string1.trimRight());
```

#### endsWith

判断字符串是否以某字符(字符串)结尾, 参数不接受正则表达式

```dart
  const str1 = 'titanjun.top';
  print(str1.endsWith('p'));  //true
  print(str1.endsWith('/'));  //false
  print(str1.endsWith('top'));  //true
```

#### startsWith

```dart
bool startsWith(Pattern pattern, [int index = 0]);
```

判断字符串是否以某字符(字符串)开头, 参数接受正则表达式

```dart
  const str1 = 'titanjun.top';
  print(str1.startsWith('h'));  //false
  print(str1.startsWith('tit')); //true
  print(str1.startsWith('it', 1)); //true
  print(str1.startsWith(new RegExp(r'[A-Z][a-z]'), 1)); //false
```

#### indexOf

```dart
int indexOf(Pattern pattern, [int start]);
```

- 根据指定的字符(字符串)获取其在原字符串中第一次出现的索引值, 顺序是从左到右
- 可以从指定的索引初开始, 默认从0开始
- 如果原字符串中没有需要查找的字符(字符串), 则返回值为: -1

```dart
  const str2 = 'https://www.titanjun.top/';
  print(str2.indexOf('titan')); // 12
  print(str2.indexOf('t', 5));  // 12
  print(str2.indexOf(new RegExp(r'[a-z]'))); //0
  // 如果没有改字符, 则会输出-1
  print(str2.indexOf('ppp'));  // -1
```

#### lastIndexOf

```dart
int lastIndexOf(Pattern pattern, [int start]);
```

效果和`indexOf`一样, 不同点则是: `indexOf`的顺序是从左到右, `lastIndexOf`是从右到左

```dart
  const str2 = 'https://www.titanjun.top/';
  print(str2.lastIndexOf('t', 20));  //14
  print(str2.indexOf(new RegExp(r'[a-z]'))); //0
  // 如果没有改字符, 则会输出-1
  print(str2.indexOf('ppp'));  // -1
```

#### 补占位符

```dart
String padLeft(int width, [String padding = ' ']);
String padRight(int width, [String padding = ' ']);
```

- 在字符串前后补占位符
- 参数一: 想要得到的字符串的位数
- 参数二: 位数不足时, 补充的字符

```dart
  const str3 = '12';
  print(str3.padLeft(2, '0')); //12
  print(str3.padRight(3, '0')); // 120
```

#### contains

```dart
bool contains(Pattern other, [int startIndex = 0]);
```

- 判断字符串中是否包含某字符
- 判断指定索引处的字符是否是某字符

```dart
bool contains(Pattern other, [int startIndex = 0]);

const str = 'Dart strings';
print(str.contains('D'));
print(str.contains(new RegExp(r'[A-Z]')));
print(str.contains('D', 0));
print(str.contains(new RegExp(r'[A-Z]'), 0));
```

#### 替换字符

```dart
// 只能替换一次, 参数三为开始的索引值, 默认0
String replaceFirst(Pattern from, String to, [int startIndex = 0]);

// 替换所有符合条件的字符(字符串)
String replaceAll(Pattern from, String replace);

// 替换某一区间的字符
String replaceRange(int start, int end, String replacement);

// 示例如下:
// 替换字符串
  const str4 = 'titanjun12--0123';
  print(str4.replaceFirst('t', 'T'));  // Titanjun12--0123
  print(str4.replaceFirst('12', '21', 10));   //titanjun12--0213

  // 全部替换
  print(str4.replaceAll('12', '21'));  //titanjun21--0213
  print(str4.replaceAll('t', 'T'));  //TiTanjun12--0123

  // 区间替换
  print(str4.replaceRange(0, 5, 'top'));  //topjun12--0123
```

## List

在`Dart`中`List`对象就是其他语言中的数组

### 创建数组


```dart
// 创建一个指定长度的List, 不能添加/删除元素
List([int length]);

//通过指定长度创建一个固定长度的List，并使用fill初始化每个位置的值, 不能添加/删除元素
List.filled(int length, E fill, {bool growable: false});

//创建一个包含所有elements的List, 
//当growable为true（默认）时，构造函数返回一个可增长的List。 否则，它返回一个固定长度的List
List.from(Iterable elements, {bool growable: true})

//生成一个包含所有值的List
//除非growable为true(默认)，否则创建的List是固定长度的
List.generate(int length, E generator(int index), {bool growable: true})

//创建一个包含所有elements的，不能改变它的长度或元素
List.unmodifiable(Iterable elements)
```

#### List

- 如果设置了参数`length`(`length`不能为负数或`null`)，那么创建的`List`是固定长度的
- 元素可修改, 元素个数不可修改, 不能删除和增加元素

```dart
var l1 = new List(3);  //[null, null, null]
print(l1.length);  //3

// 下面这种写法会报错
l1.length = 1;
```

如果未设置参数`length`，那么`List`的长度是0，并且是可增长的

```dart
// 这两种方式一样
var l10 = new List();
var l11 = [];

// 都是可行的
l10.length = 3;
l10.add(1);
```

当使用指定长度创建一个可增长的`List`时，仅仅在刚创建后分配长度

```dart
List growableList = new List()..length = 500;
```

#### filled

- 通过指定长度创建一个固定长度的`List`，并初始化每个位置的值
- 所有的元素都是相同的`fill`值。 如果指定的值是一个可变对象，那么`List`中所有的元素都是相同的对象，并且是可修改的

```dart
  var l2 = new List.filled(3, 'l');  //[l, l, l]
  var l3 = new List.filled(2, []);   // [[], []]
  l3[0].add(12);   
  print(l3);      // [[12], [12]]
```

#### from

- 创建一个包含所有`elements`的`List`
- `elements`的`Iterator`规定了元素的顺序。
- 当`growable`为`true`（默认）时，构造函数返回一个可增长的`List`。 否则，它返回一个固定长度的`List`


```dart
var l5 = new List.from([1, 2, 3, 4]);
l5.add(5);
print(l5);   // [1, 2, 3, 4, 5]

// 下面的add方法会报错
var l5 = new List.from([1, 2, 3, 4], growable: false);
l5.add(5);
```

#### generate

- 生成一个包含所有值的`List`, 根据索引值创建元素
- `growable`为`false`时，创建的`List`是固定长度的


```dart
var l4 = new List.generate(3, (int i) => i * i);
l4.add(14);
print(l4);
// [0, 1, 4, 14]
```

#### unmodifiable

- 创建一个包含所有`elements`的，不可修改的`List`
- 不可修改的`List`不能改变它的长度或元素
- 如果元素本身是不可改变的，那么由此产生的`List`也是不可改变的

```dart
var l6 = new List.unmodifiable([1, 2, 3, 4]);
```


### List属性

```dart
  var arr1 = [1, 2, 3, 4];
  // 数组的第一个和最后一个元素
  print(arr1.first);  // 1
  print(arr1.last);   // 4

  // 判断数组是否为空
  print(arr1.isNotEmpty);  // true
  print(arr1.isEmpty);     // false

  // 数组长度, 元素个数
  print(arr1.length);  // 4

  // 倒序返回List
  print(arr1.reversed);  // [4, 3, 2, 1]

  // 返回Iterator，被允许迭代Iterable的所有元素
  print(arr1.iterator);

  // 对象的运行时类型
  print(arr1.runtimeType);   // List<int>

  // 获取对象的哈希值
  print(arr1.hashCode);
  
  // 根据索引获取元素
  print(arr1[2]);

  // 根据索引修改元素
  arr1[1] = 11;
  print(arr1);
```

### List方法

#### 增加

```dart
  // 添加元素
  arr1.add(5);

  // 添加一个数组
  arr1.addAll([10, 12]);
```

#### 查找

```dart
  var arr2 = ['one', 'two', 'three', 'one', 'four'];

  // 是否包含某元素
  print(arr2.contains('one'));  // true
  // 判断数组是否有满足条件的元素
  print(arr2.any((item) => item.length > 4));  // true
  // 判断数组是否所有元素都满足条件
  print(arr2.every((item) => item.length > 4));  // false
  
  // 转化为Map类型, 索引作为Key值，对应的元素作为Value
  print(arr2.asMap());  // {0: one, 1: two, 2: three, 3: one, 4: four}
  
  //随机打乱List中的元素
  arr2.shuffle();

  // 通过索引获取元素, 等价于arr2[3]
  print(arr2.elementAt(3));

  // 获取元素对应的索引值, 默认从索引0开始
  print(arr2.indexOf('one'));  // 0
  // 从第2个索引开始查找
  print(arr2.indexOf('one', 2));  // 3
  // 如果找不到, 返回-1
  print(arr2.indexOf('five'));  // -1

  // 获取元素对应的索引值, 从后往前找
  print(arr2.lastIndexOf('one'));
  print(arr2.lastIndexOf('one', 3));
  print(arr2.lastIndexOf('five'));
  
  // 返回满足条件的第一个元素
  print(arr3.firstWhere((item) => item == 'one'));
  
  // 查找符合条件的元素, 如果有且仅有一个符合条件的元素, 则返回该元素
  // 如果没有匹配到元素，或匹配到多个元素, 则会抛出异常
  print(arr2.singleWhere((item) => item.length == 5));  //three
  
  // 返回除了最初的count个元素外的所有元素
  arr2 = ['one', 'two', 'three', 'four'];
  print(arr2.skip(2)); // (three, four)

  // 返回所有不符合该条件的元素
  print(arr2.skipWhile((item) => item.length == 3));  //(three, four)

  // 返回一个新的List，包含从start（包括）到end（不包括）的对象, 原数组不变
  print(arr2.sublist(1, 3));
  // 不指定end, 默认到数组结尾
  print(arr2.sublist(2));
  
  // 获取某一区间的元素, 返回一个数组
  print(arr2.getRange(1, 3));    // ['two', 'three']
  
  // 数组拼接成字符串
  print(arr2.join());  //onetwothreefour
  print(arr2.join('-'));  //one-two-three-four

  // 返回数组最初的count个元素
  print(arr2.take(2));
  // 返回数组符合条件的元素, 直到条件值为false停止过滤
  arr2 = ['one', 'two', 'three', 'four', 'ten'];
  print(arr2.takeWhile((item) => item.length == 3));  //(one, two)
```

#### 删除

```dart
  var arr2 = ['one', 'two', 'three', 'one', 'four'];
  
  // 删除指定的元素
  // 如果有该元素, 返回true
  print(arr2.remove('two'));  // true
  print(arr2);   // [one, three, one, four]
  // 如果没有该元素, 返回false
  print(arr2.remove('five'));  // false

  // 根据索引删除, 返回被删除的元素值
  print(arr2.removeAt(1));  // three
  print(arr2);   // [one, one, four]

  // 删除最后一个元素, 返回该元素值
  print(arr2.removeLast());  // four
  print(arr2); // [one, one]

  // 删除一个区间的元素, 含左不含右[start, end)
  arr2.addAll(['six', 'seven', 'eight']);
  arr2.removeRange(1, 3);
  print(arr2);  // [one, seven, eight]

  // 删除所有符合条件的元素
  arr2.removeWhere((item) => item.length == 3);
  print(arr2);  // [seven, eight]
  
  //删除List中所有不满足条件的元素
  arr2.retainWhere((item) => item.length > 3);
  print(arr2);
  
  // 删除所有的元素
  arr1.clear();
  print(arr1);  // []
```

#### 插入

```dart
  var arr3 = [1, 3, 4];
  // 在某处插入元素
  arr3.insert(1, 10);
  print(arr3); //[1, 10, 3, 4]

  // 插入一个数组
  arr3.insertAll(2, [12, 32]);
  print(arr3);
```

#### 重要方法

```
//过滤
Iterable<E> where(bool test(E element)) => new WhereIterable<E>(this, test);

// 映射
Iterable<T> map<T>(T f(E e)) => new MappedIterable<E, T>(this, f);

// 排序
void sort([int compare(E a, E b)]);

// 迭代计算, initialValue: 初始值, combine: 计算函数
T fold<T>(T initialValue, T combine(T previousValue, E element))

// 迭代计算, 初始值即为第一个元素的值, combine: 计算函数
E reduce(E combine(E value, E element))

// 对集合的每个元素，按迭代顺序执行函数操作
void forEach(void f(E element))

// 将Iterable的每个元素扩展为0个或多个元素
Iterable expand(Iterable f(E element))
```

下面看一下每一个函数的具体使用和介绍

```dart
  var arr2 = ['one', 'two', 'three', 'four'];
  
  // 过滤操作, 返回所有符合条件的元素
  print(arr2.where((item) => item.length == 3));  //(one, two, ten)
  
  // 映射一个新的数组, 参数是一个函数
  var array = arr2.map((item) {
    return item + '-';
  });
  print(array.toList());  // [one-, ten-, two-, four-, three-]
  
  // 排序, 默认从小到大
  arr2.sort();
  print(arr2);  //[four, one, ten, three, two]
  // 设置条件进行排序
  arr2.sort((item1, item2) {
    // 如果两个比较的结果为0, 那么排序后返回的结果可能不同
    return item1.length.compareTo(item2.length);
  });
  print(arr2);  //[one, ten, two, four, three]

  // 迭代计算, initialValue: 初始值, combine: 计算函数
  var arr4 = [1, 2, 3, 4];
  // 设置初始值
  var result1 = arr4.fold(10, (prev, value) => prev + value);  //20
  var result2 = arr4.fold(2, (prev, value) => prev * value);  //48
  // 初始值即为第一个元素的值, 可迭代对象至少要有一个元素。 如果它只有一个元素，则元素直接返回
  var result3 = arr4.reduce((value, element) => value * element);  // 24

  // 对每一个元素进行操作
  arr2.forEach((item) {
    print(item);
  });
  
  // expand, 以对每个元素调用f函数后生成的元素，按迭代的顺序，返回新的Iterable
  var pairs = [[1, 2], [3, 4]];
  var flattened = pairs.expand((pair) => pair).toList();
  print(flattened); // => [1, 2, 3, 4];

  var input = [1, 2, 3];
  var duplicated = input.expand((i) => [i, i]).toList();
  print(duplicated); // => [1, 1, 2, 2, 3, 3]
```


> 由于篇幅太长了, 剩下的一些数据类型下篇文章在继续研究记录吧

### 参考文献

- [Dart官网语法介绍-中文版](http://dart.goodev.org/guides/language/language-tour)
- [Dart官网语法介绍-英文版](https://www.dartlang.org/guides/language/language-tour)
- [Dart语言中文社区](http://www.shutongye.com/dartapi/dart-core/List-class.html)

---



