---
title: HTML5学习笔记之表单标签
date: '2017-06-15 20:18'
tags:
  - HTML5标签
  - CSS
  - WebStorm
categories: HTML5
abbrlink: 8930c83
image:
---





![image](http://upload-images.jianshu.io/upload_images/647982-9f6f2cfcfdf04c42.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


<!-- more -->


- 作用: 用于收集用户信息, 让用户填写、选择相关信息
- 注意事项:
  - 所有的表单内容，都要写在form标签里面
form标签中有两个比较重要的属性action和method
- 格式:

```objc
<form>
    所有的表单内容，都要写在form标签里面
</form>
```


## input标签

> 如果说td是表格最核心的标签, 那么input就是表单最核心的标签. nput标签有一个type属性, 这个属性有很多类型的取值, 取值的不同就决定了input标签的功能和外观不同


### 明文输入框

  - 作用: 用户可以在输入框内输入内容
  - 账号: `<input type="text"/>`
- 暗文输入框
  - 作用: 用户可以在输入框内输入内容
  - 密码: `<input type="password"/>`
- 给输入框设置默认值
  - 账号: `<input type="text"  value="tqj"/>`
  - 密码: `<input type="password" value="0929"/>`
- 规定输入字段中的字符的最大长度
  - 账号: `<input type="text" name="fullname" maxlength="8" />`

#### 代码

```html
<form>
    <!--明文输入框-->
    <p>账号: <input type="text" /></p>
    <!--暗文输入框-->
    <p>密码: <input type="password" /></p>

    <!--p标签换行-->
    <p>账号: <input type="text" value="tqj" /></p>
    <p>密码: <input type="password" value="0929" /></p>


    <p>最大长度: <input type="text" maxlength="5"/></p>
</form>

```


![Snip20170615_22.png](http://upload-images.jianshu.io/upload_images/4122543-39cbc042f6cfbdb1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 选框

- 单选框(radio)
  - 作用: 用户只能从众多选项中选择其中一个
  - 单选按钮，天生是不互斥的，如果想互斥，必须要有相同的name属性
- 多选框(checkbox)
  - 作用: 用户只能从众多选项中选择多个
  - 复选框，最好也是有相同的name（虽然他不需要互斥，但是也要有相同的name）
- label标签
  - 作用: label标签不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性
  - 注意事项: 表单元素要有一个id，然后label标签就有一个for属性，for属性和id相同就表示绑定了
  - 所有表单元素都可以通过label绑定
- 示例代码


```html
<!--单选框-->
<!--checked属性,为默认值-->
<label for="sex">性别: </label>
<input type="radio" name="sex" checked /> <label for="sex">男</label>
<input type="radio" name="sex" /> <label for="sex">女</label>
<input type="radio" name="sex" /> <label for="sex">妖</label>
<p></p>

<!--多选框-->
<label for="课程">课程: </label>
<input type="checkbox" name="课程" checked /> <label for="课程">HTML5 </label>
<input type="checkbox" name="课程" checked /> <label for="课程">Swift </label>
<input type="checkbox" name="课程" /> <label for="课程">OC </label>
<input type="checkbox" name="课程" /> <label for="课程">CSS </label>

```


![Snip20170615_1.png](http://upload-images.jianshu.io/upload_images/4122543-141c73672aca00ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 按钮
#### 普通按钮

 作用: 定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）

```
<input type="button" value="点我丫" />
```


#### 图片按钮
 作用:定义图像形式的提交按钮

```
<input type="image" src="1.png" />
```

#### 还原按钮
 作用: 定义还原按钮。还原按钮会清除表单中的所有数据

```
<input type="reset" />
```

> 注意事项:
这个按钮不需要写value自动就有“还原”文字
reset只对form表单中表单项有效果

#### 提交按钮
 作用:定义提交按钮。提交按钮会把表单数据发送到action属性指定的页面

```
<input type="submit" />
```

- 注意事项:
  - 这个按钮不需要写value自动就有“提交”文字
  - 要想通过submit提交数据到服务器, 被提交的表单项都必须设置name属性
  - 默认明文传输(GET)不安全, 可以将method属性设置为POST改为非明文传输(学到Ajax再理解)
  

#### 示例代码

```html
<!--按钮-->
<!--普通按钮-->
<input type="button" value="点我有奖">
<!--图片按钮-->
<input type="image" src="http://note.youdao.com/favicon.ico">
<!--还原按钮-->
<input type="reset">
<!--提交按钮-->
<input type="submit">

```


![Snip20170615_3.png](http://upload-images.jianshu.io/upload_images/4122543-df3952d22685cb6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 隐藏域

- 作用: 定义隐藏的输入字段
- 暂时不用掌握, 在Ajax中对数据的CRUD操作有非常大的作用

```
<input type="hidden">
```




### 取色器和日期选择器

- 取色器: `<input type="color">`
- 日期选色器: `<input type="date">`
- HTML5中input类型增加了很多type类型, 例如color、date但是都不兼容, 后面讲到浏览器兼容时会重点讲解
- 亲测,在Mac电脑的Safari浏览器不兼容,只能用谷歌浏览器


```html
<!--取色器-->
<label>颜色: </label> <input type="color">
<!--换行-->
<p></p>

<!--日期选色器-->
<label>时间: </label> <input type="date">

```


![Snip20170615_5.png](http://upload-images.jianshu.io/upload_images/4122543-af39ca426f317aec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 数据列表
- 作用: 给输入框绑定待选项
- 格式:

```objc
datalist>
  <option>待选项内容</option>
</datalist>
```

- 如何给输入框绑定待选列表
  - 搞一个输入框
  - 搞一个datalist列表
  - 给datalist列表标签添加一个id
  - 给输入框添加一个list属性,将datalist的id对应的值赋值给list属性即可


```html
<!--数据列表-->
请选择车型: <input type="text" list="cars">
<datalist id="cars">
    <option>奔驰</option>
    <option>宝马</option>
    <option>奥迪</option>
    <option>别克</option>
    <option>奔腾</option>
    <option>奔跑</option>
</datalist>

```


![Snip20170615_6.png](http://upload-images.jianshu.io/upload_images/4122543-5e9e1c3b75a16426.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 当输入某一个字符时,会自动根据datalist列表查询,并显示对应的列表,如图:

![Snip20170615_7.png](http://upload-images.jianshu.io/upload_images/4122543-4973010e14b7d6c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 多行文本框(文本域)

- 作用: textarea标签用于在表单中定义多行的文本输入控件
  - cols属性表示columns“列”, 规定文本区内的可见宽度
  - rows属性表示rows“行”, 规定文本区内的可见高度
- 格式:
`<textarea cols="30" rows="10">`默认`</textarea>`

- 注意点:
  - 可以通过cols和rows来指定输入框的宽度和高度
  - 默认情况下输入框是可以手动拉伸的

```html
<!--禁止手动拉伸-->
<style type="text/css">
  textarea{
      resize: none;
  }
</style>
```

## 下拉列表

- 作用: select标签和ul、ol、dl一样，都是组标签. 用于创建表单中的待选列表
  - 和radio、checkbox一样select也可以设置默认值, 通过selected属性设置(本身默认是第一个选项)
- 给下拉列表添加分组
- 示例代码

```html
<!--给下拉表添加分组-->
<select>
    <optgroup label="杭州市">
        <option>江干区</option>
        <option>西湖区</option>
        <option>滨江区</option>
        <option>下城区</option>
    </optgroup>
    <optgroup label="烟台市">
        <option>莱山区</option>
        <option>芝罘区</option>
    </optgroup>
    <option selected>北京市</option>
</select>

```


![Snip20170615_8.png](http://upload-images.jianshu.io/upload_images/4122543-c9638bcbcf8e60f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



> 对HTML5语言有兴趣的同学,给大家极力推荐:江哥的视频[HTML5 + 跨平台开发](http://study.163.com/course/introduction.htm?courseId=1003864040),只是不知道会不会继续更新