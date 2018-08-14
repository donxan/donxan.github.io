---
title: RxSwift+Moya网络请求之项目实战
date: 2017-10-08 17:58:28
tags: [Swift, RxSwift, 响应式编程]
categories: RxSwift框架
---

- RxSwift相关基本介绍和用法可参考:
  - [RxSwift的使用详解01](https://www.titanjun.top/2017/09/15/RxSwift%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A301/)
  - [RxSwift的使用详解02](https://www.titanjun.top/2017/09/21/RxSwift%E7%9A%84%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A302/)

<!-- more -->

## 下面将将进行实战项目

- 1.登录注册功能
  - 输入用户名要大于6个字符，不然密码不能输入
  - 密码必须大于6个字符，不然重复密码不能输入
  - 重复密码输入必须和密码一样，不然注册按钮不能点击
  - 根据输入的字符是否合法,按钮动态的改变颜色
- 2.UITableView和搜索SertchBar的应用
  - searchBar根据输入的字体展示包含该字体的cell列表
  - [RxSwift](https://github.com/ReactiveX/RxSwift)实现tableView列表展示
- 3.[Moya](https://github.com/Moya/Moya)+[RxSwift](https://github.com/ReactiveX/RxSwift)实现网络请求
  - 应用[RxSwift](https://github.com/ReactiveX/RxSwift)在UICollectionView中的应用
  - 用[Moya](https://github.com/Moya/Moya)进行网络请求
  - [ObjectMapper](https://github.com/Hearst-DD/ObjectMapper)进行json到model的数据解析
  - 整个[Demo](https://github.com/coderQuanjun/RxSwift-Table-Collection)的架构使用[MVVM](http://www.codertian.com/2015/11/13/MVVM-patterns-introduce/)
- 4.[Demo地址](https://github.com/coderQuanjun/RxSwift-Table-Collection)

### 下面简单看一下demo的界面

<center>登录注册</center>

![登录注册](http://upload-images.jianshu.io/upload_images/4122543-6a3971f8ea4a7622.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)


<center>UITableView和SearchBar</center>

![UITableView和SearchBar](http://upload-images.jianshu.io/upload_images/4122543-e2cff86052a6aa5b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

<center>UICollectionView和Moya</center>

![UICollectionView和Moya](http://upload-images.jianshu.io/upload_images/4122543-da346221f1ddcba0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)


## 项目结构和框架
### 结构
demo是使用的纯MVVM模式，因为RxSwift就是为MVVM而生。不懂MVVM的猿友可参考[MVVM模式快速入门](http://www.codertian.com/2015/11/13/MVVM-patterns-introduce/) 


![项目结构](http://upload-images.jianshu.io/upload_images/4122543-b180e89ddba220eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/500)

### 项目框架

```objc
// Swift三方库
    // Rx
    pod 'RxSwift'  //RxSwift的必备库
    pod 'RxCocoa'  //对 UIKit Foundation 进行 Rx 化
    pod 'RxDataSources'   // 帮助我们优雅的使用tableView的数据源方法

    // 网络请求
    pod 'Moya/RxSwift'  // 为RxSwift专用提供，对Alamofire进行封装的一个网络请求库

    // 图片处理
    pod 'Kingfisher'  //图片处理库

    // 数据解析
    pod 'ObjectMapper'  //json转模型


    
// OC库
    // MJRefresh
    pod 'MJRefresh'   //MJ上拉下拉刷新
    pod 'SVProgressHUD'  //HUD

```

## 注册界面
- 这里主要使用了Observable的相关知识,不了解的童鞋可参考[RxSwift的使用详解01](http://www.jianshu.com/p/319db438c4d3),了解Observable的操作
- 注册和登录并没有保存已注册的账号和密码, 故登录功能并不完善,后期会在完善,望知晓
- 下面将针对注册用户名做简单介绍:

### 字符串的语法法则
首先在model里处理输入字符串的语法法则和字符个数是否符合规范

```objc
extension InputValidator {
    //判断字符串是否符合语法法则
    class func isValidEmail(_ email: String) -> Bool {
        let regular = try? NSRegularExpression(pattern: "^\\S+@\\S+\\.\\S+$", options: [])
        if let re = regular {
            let range = NSRange(location: 0, length: email.lengthOfBytes(using: .utf8))
            let result = re.matches(in: email, options: [], range: range)
            return result.count > 0
        }
        return false
    }
    
    //判断密码字符个数>8
    class func isValidPassword(_ password: String) -> Bool {
        return password.characters.count >= 8
    }
    
    //判断用户名
    class func validateUserName(_ username: String) -> Result {
        //判断字符个数是否正确
        if username.characters.count < 6 {
            return Result.failure(message: "输入的字符个数不能少于6个字符")
        }
        
        //账号可用
        return Result.success(message: "账号可用")
    }
}
```


> 其中Result是一个返回是否成功的枚举值,可传入字符串变量


```objc
enum Result {
    case success(message: String)
    case failure(message: String)
}
```

### 判断该用户名
根据输入的用户名判断该用户名是否可用

```objc
    var usernameObserable: Observable<Result>
    var passwordObserable: Observable<Result>
    var repeatPassObserable: Observable<Result>
    var registerBtnObserable: Observable<Bool>
    
    
    init(){
        //检测账号
        usernameObserable = username.asObservable().map({ (username) -> Result in
            return InputValidator.validateUserName(username)
        })
    }    

```

- 该返回参数Result,控制器将根据该Result是否成功来改变输入框是否是可编辑状态
- 初始化方法中，我们对传入的序列进行处理和转换成相对应的Result序列

### controller逻辑
根据用户名输入改变各控件状态


```objc
//1. 账号判断逻辑
        //1-1. 检测账号
        usernameTextField.rx.text
            .orEmpty // 将String? 类型转为String型
            .bindTo(registerVM.username)
            .addDisposableTo(bag)
        
        //1-2. 根据账号监听提示字体的状态
        registerVM.usernameObserable
            .bindTo(usernameHintLabel.rx.validationResult)
            .addDisposableTo(bag)
        
        //1-3. 根据账号监听密码输入框的状态
        registerVM.usernameObserable
            .bindTo(passwordTextField.rx.enableResult)
            .addDisposableTo(bag)
            
```

- 检测输入用户名是否符合规范
- 根据账号监听提示字体的状态
- 根据账号监听密码输入框的状态
- 根据账号监听注册按钮的状态
 

## UITableView和SearchBar


- 该UITableView展示界面并未涉及网络请求
- 数据来源plist文件
- 图片为本地图片,可下载demo,在demo中查找图片
- 选用自定义UITableViewCell,故cell不做介绍
- model小编这里也不多做介绍,详情可下载demo看具体代码

### viewModel中逻辑
#### 获取模型数组
读取plist文件,获取模型数组

```objc
fileprivate func getHeroData() -> [HeroModel]{
    // 1.获取路径
    let path = Bundle.main.path(forResource: "heros.plist", ofType: nil)!
        
    // 2.读取文件内容
    let dictArray = NSArray(contentsOfFile: path) as! [[String : Any]]
        
    // 3.遍历所有的字典并且转成模型对象
    return dictArray.map({ HeroModel(dict: $0) }).reversed()
}
```

#### seachBar

```objc
    lazy var heroVariable: Variable<[HeroModel]> = {
        return Variable(self.getHeroData())
    }()
    
    var searchText: Observable<String>
    init(searchText: Observable<String>) {
        self.searchText = searchText
        
        self.searchText.subscribe(onNext: { (str: String) in
            let heros = self.getHeroData().filter({ (hero: HeroModel) -> Bool in
                //过滤
                if str.isEmpty { return true }
                //model是否包含搜索字符串
                return hero.name.contains(str)
            })
            self.heroVariable.value = heros
        }).addDisposableTo(bag)
    }

```
- 其中heroVariable是一个数组模型的包装箱,在controller内调用使用前需要asObservable或者asDriver解包装;详细用法可参考:[RxSwift的使用详解01](http://www.jianshu.com/p/319db438c4d3)
- searchText搜索框输入的关键字,根据该关键字从数组中过滤出所有包含该关键字的model
- 对heroVariable重新赋值,发出事件

### RxTableViewController
#### searchBar搜索框
searchBar搜索框,输入字符后间隔0.5秒开始搜索

```objc
var searchText: Observable<String> {
    //输入后间隔0.5秒搜索,在主线程运行
    return searchBar.rx.text.orEmpty.throttle(0.5, scheduler: MainScheduler.instance)
}

```

#### UITableView的设置

```objc
    //2.给tableView绑定数据
    //注意: 三个参数:row, model, cell三个顺序不可以搞错, 不需要的可省略 
    heroVM.heroVariable.asDriver().drive(rxTableView.rx.items(cellIdentifier: kCellID, cellType: RxTableViewCell.self)) { (_, hero, cell) in
        cell.heroModel = hero
    }.addDisposableTo(bag)
        
    // 3.监听UITableView的点击
    rxTableView.rx.modelSelected(HeroModel.self).subscribe { (event: Event<HeroModel>) in
        print(event.element?.name ?? "")
    }.addDisposableTo(bag)

```
- 将viewModel中的heroVariable进行解包装，如果是Driver序列，我们这里不使用bingTo，而是使用的Driver，用法和bingTo一模一样。
- Deriver的监听一定发生在主线程，所以很适合我们更新UI的操作
- 如需设置delegate的代理

```objc
rxTableView.rx.setDelegate(self).addDisposableTo(bag)
```

> 然后在实现相应的代理方法即可,如: 

```objc
extension RxTableViewController: UITableViewDelegate{
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 100
    }
}
```

## 网络请求和数据处理
- 文件目录: `UICollectionView+Moya+ObjectMapper`
- 与上述`UITableView`不同的是,这部分将以[RxDataSources](https://github.com/RxSwiftCommunity/RxDataSources)处理数据源
- model数组以sections组集合处理
- 结合[Moya](https://github.com/Moya/Moya)进行网络请求
- 使用[ObjectMapper](https://github.com/Hearst-DD/ObjectMapper)进行json数据转模型

### 配合ObjectMapper
**这里再介绍一下ObjectMapper**

```objc
class AnchorModel: Mappable {

    var name = ""    //名字
    var pic51 = ""   //头像
    var pic74 = ""   //大图
    var live = 0
    var push = 0
    var focus = 0    //关注量
    
    required init?(map: Map) {
        
    }
    
    func mapping(map: Map) {
        name  <- map["name"]
        pic51 <- map["pic51"]
        pic74 <- map["pic74"]
        live  <- map["live"]
        push  <- map["push"]
        focus <- map["focus"]
    }
}

```
- 使用 ObjectMapper ，需要让自己的 Model 类使用 Mappable 协议，这个协议包括两个方法：

```objc
required init?(map: Map) {}
 
func mapping(map: Map) {}
```

- 在 mapping 方法中，用 `<-` 操作符来处理和映射你的 JSON数据
- 详细的 ObjectMapper 教程可以查看它的 [Github 主页](https://github.com/Hearst-DD/ObjectMapper)，我在这里只做简单的介绍。

### Moya的使用
- [Moya](https://github.com/Moya/Moya)是基于[Alamofire](https://github.com/Alamofire/Alamofire)的网络请求库，这里我使用了Moya/Swift，它在Moya的基础上添加了对RxSwift的接口支持。
- Github上的官方介绍罗列了Moya的一些特点：
  - 编译时检查正确的API端点访问.   
  - 使你定义不同端点枚举值对应相应的用途更加明晰. 
  - 提高测试地位从而使单元测试更加容易.
- 接下来我们来说下Moya的使用

#### 创建一个枚举API

```objc
//请求枚举类型
enum JunNetworkTool {
    
    case getNewList
    case getHomeList(page: Int)
}
```

#### 为枚举添加扩展
- 需遵循协议 TargetType
- 这个协议的Moya这个库规定的协议，可以单击进入相应的文件进行查看
- 这个协议内的每一个参数(除了`validate`可不重写)都必须重写,否则会报错

```objc
//请求参数
extension JunNetworkTool: TargetType {
    
    //统一基本的url
    var baseURL: URL {
        return (URL(string: "http://qf.56.com/home/v4/moreAnchor.ios"))!
    }
    
    //path字段会追加至baseURL后面
    var path: String {
        return ""
    }
    
    //请求的方式
    var method: Moya.Method {
        return .get
    }
    
    //参数编码方式(这里使用URL的默认方式)
    var parameterEncoding: ParameterEncoding {
        return URLEncoding.default
    }
    
    //用于单元测试
    var sampleData: Data {
        return "getList".data(using: .utf8)!
    }
    
    //将要被执行的任务(请求：request 下载：upload 上传：download)
    var task: Task {
        return .request
    }
    
    //请求参数(会在请求时进行编码)
    var parameters: [String: Any]? {
        switch self {
        case .getHomeList(let index):
            return ["index": index]
        default:
            return ["index": 1]
        }
    }
    
    //是否执行Alamofire验证，默认值为false
    var validate: Bool {
        return false
    }
}

```

#### 全局变量
定义一个全局变量用于整个项目的网络请求

```objc
let junNetworkTool = RxMoyaProvider<JunNetworkTool>()
```

至此，我们就可以使用这个全局变量来请求数据了

### [RxDataSources](https://github.com/RxSwiftCommunity/RxDataSources)
- RxDataSources是以section来做为数据结构来传输，这点很重要，比如:在传统的数据源实现的方法中有一个numberOfSection，我们在很多情况下只需要一个section，所以这个方法可实现，也可以不实现，默认返回的就是1，这给我们带来的一个迷惑点：【tableView是由row来组成的】，不知道在坐的各位中有没有是这么想的呢？？有的话那从今天开始就要认清楚这一点，【tableView其实是由section组成的】，所以在使用RxDataSources的过程中，即使你的setion只有一个，那你也得返回一个section的数组出去！！！
- 传统方式适用于简单的数据集，但不处理需要将复杂数据集与多个部分进行绑定的情况，或者在添加/修改/删除项目时需要执行动画时。而使用RxDataSources时，它很容易写
- 想了解更多关于[RxDataSources](https://github.com/RxSwiftCommunity/RxDataSources)的用法,请参考其GitHub主页

#### Sections自定义
- 在我们自定义的Model中创建一个AnchorSection的结构体
- 并遵循SectionModelType协议，实现相应的协议方法


```objc
//MARK: SectionModel
struct AnchorSection {
    // items就是rows
    var items: [Item]
    
    // 你也可以这里加你需要的东西，比如 headerView 的 title
}

extension AnchorSection: SectionModelType {
    // 重定义 Item 的类型为
    typealias Item = AnchorModel
    init(original: AnchorSection, items: [AnchorSection.Item]) {
        self = original
        self.items = items
    }
}
```

### ViewModel
#### 自定义协议BaseViewModel
我们知道MVVM思想就是将原本在ViewController的视图显示逻辑、验证逻辑、网络请求等代码存放于ViewModel中，让我们的ViewController瘦身。这些逻辑由ViewModel负责，外界不需要关心，外界只需要结果，ViewModel也只需要将结果给到外界，基于此，我们定义了一个协议

```objc
protocol JunViewModelType {
    //associatedtype: 关联类型为协议中的某个类型提供了一个占位名（或者说别名），其代表的实际类型在协议被采纳时才会被指定
    associatedtype Input
    associatedtype Output
    
    //我们通过 transform 方法将input携带的数据进行处理，生成了一个Output
    func transform(input: Input) -> Output
}

```

#### 自定义刷新
- 自定义用于网络请求的刷新状态
- 根据枚举值的判断,改变collection的刷新状态

```objc
//刷新的状态
enum JunRefreshStatus {
    case none
    case beingHeaderRefresh
    case endHeaderRefresh
    case beingFooterRefresh
    case endFooterRefresh
    case noMoreData
}

```

#### 自定义用于继承的BaseViewModel
- 定义请求数据的页数index
- 定义input和output的结构体

```objc
class BaseViewModel: NSObject {
    // 记录当前的索引值
    var index: Int = 1
    
    struct JunInput {
        // 网络请求类型
        let category: JunNetworkTool
        
        init(category: JunNetworkTool) {
            self.category = category
        }
    }
    
    struct JunOutput {
        // tableView的sections数据
        let sections: Driver<[AnchorSection]>
        // 外界通过该属性告诉viewModel加载数据（传入的值是为了标志是否重新加载）
        let requestCommond = PublishSubject<Bool>()
        // 告诉外界的tableView当前的刷新状态
        let refreshStatus = Variable<JunRefreshStatus>(.none)
        
        //初始化时,section的数据
        init(sections: Driver<[AnchorSection]>) {
            self.sections = sections
        }
    }
}

```

#### 自定义AnchorViewModel
- 1) 继承BaseViewModel

```objc
class AnchorViewModel : BaseViewModel{
    // 存放着解析完成的模型数组
    let anchorArr = Variable<[AnchorModel]>([])

}
```

- 2) 遵循JunViewModelType协议

```objc
extension AnchorViewModel: JunViewModelType {
    typealias Input = JunInput
    typealias Output = JunOutput

    func transform(input: AnchorViewModel.JunInput) -> AnchorViewModel.JunOutput {
        let sectionArr = anchorArr.asDriver().map { (models) -> [AnchorSection] in
            // 当models的值被改变时会调用
            return [AnchorSection(items: models)]
        }.asDriver(onErrorJustReturn: [])
        
        let output = JunOutput(sections: sectionArr)
        
        output.requestCommond.subscribe(onNext: { (isReloadData) in
            self.index = isReloadData ? 1 : self.index + 1
            //开始请求数据
            junNetworkTool.request(JunNetworkTool.getHomeList(page: self.index))
                .mapObjectArray(AnchorModel.self)
                .subscribe({ (event) in
                    switch event {
                    case let .next(modelArr):
                        self.anchorArr.value = isReloadData ? modelArr : (self.anchorArr.value) + modelArr
                        SVProgressHUD.showSuccess(withStatus: "加载成功")
                    case let .error(error):
                        SVProgressHUD.showError(withStatus: error.localizedDescription)
                    case .completed:
                        output.refreshStatus.value = isReloadData ? .endHeaderRefresh : .endFooterRefresh
                    }
            }).addDisposableTo(bag)
        }).addDisposableTo(bag)
        
        return output
    }
}
```

- sectionArr是将model数组按照section分别存储
- 当请求回来的anchorArr数据改变的时候, sectionArr随之会发生改变
- isReloadData用于区分是下拉刷新(true时), 还是上拉加载更多(false时)


### RxCollectionViewController控制器中
- 创建数据源RxDataSources
- 绑定cell
- 初始化input和output请求
- 绑定section数据
- 设置刷新

#### 创建数据源RxDataSources

```objc
// 创建一个数据源属性，类型为自定义的Section类型
let dataSource = RxCollectionViewSectionedReloadDataSource<AnchorSection>()
```

#### 绑定cell(自定义的cell要提前注册)

```objc
dataSource.configureCell = { dataSource, collectionView, indexPath, item in
    let cell = collectionView.dequeueReusableCell(withReuseIdentifier: kCollecCellID, for: indexPath) as! RxCollectionViewCell
    cell.anchorModel = item
    return cell
}
```
- 以上四个参数的顺序分别为:dataSource, collectionView(或者tableView), indexPath, model, 其对应类型不言而喻,不多做介绍

#### 初始化input和output请求

```objc
let vmInput = AnchorViewModel.JunInput(category: .getNewList)
let vmOutput = anchorVM.transform(input: vmInput)
```

#### 绑定section数据

```objc
//4-1. 通过dataSource和section的model数组绑定数据(demo的用法, 推荐)
vmOutput.sections
    .asDriver()
    .drive(collectionVIew.rx.items(dataSource: dataSource))
    .addDisposableTo(bag)
```

#### 设置刷新
#### 在controller中初始化刷新状态

```objc
collectionVIew.mj_header = MJRefreshNormalHeader(refreshingBlock: {
    vmOutput.requestCommond.onNext(true)
})
collectionVIew.mj_header.beginRefreshing()
        
collectionVIew.mj_footer = MJRefreshAutoNormalFooter(refreshingBlock: {
    vmOutput.requestCommond.onNext(false)
})
```

#### 添加刷新的序列
- 在JunOutput的结构体中添加刷新序列
- 我们在进行网络请求并得到结果之后，修改refreshStatus的value为相应的JunRefreshStatus项
- MJRefre遍会根据该状态做出相应的刷新事件
- 默认状态为none

```objc
// 告诉外界的tableView当前的刷新状态
let refreshStatus = Variable<JunRefreshStatus>(.none)
```

#### 外界订阅output的refreshStatus
- 外界订阅output的refreshStatus，并且根据接收到的值进行相应的操作
- refreshStatus每次改变都会触发刷新事件

```objc
//5. 设置刷新状态
vmOutput.refreshStatus.asObservable().subscribe(onNext: { (status) in
    switch status {
    case .beingHeaderRefresh:
        self.collectionVIew.mj_header.beginRefreshing()
    case .endHeaderRefresh:
        self.collectionVIew.mj_header.endRefreshing()
    case .beingFooterRefresh:
        self.collectionVIew.mj_footer.beginRefreshing()
    case .endFooterRefresh:
        self.collectionVIew.mj_footer.endRefreshing()
    case .noMoreData:                   
        self.collectionVIew.mj_footer.endRefreshingWithNoMoreData()
    default:
        break
    }
}).addDisposableTo(bag)
```

#### output提供一个requestCommond用于控制是否请求数据
- PublishSubject 的特点：即可以作为Observable，也可以作为Observer，说白了就是可以发送信号，也可以订阅信号
- 当你订阅PublishSubject的时候，你只能接收到订阅他之后发生的事件。subject.onNext()发出onNext事件，对应的还有onError()和onCompleted()事件

```objc
// 外界通过该属性告诉viewModel加载数据（传入的值是为了标志是否重新加载）
let requestCommond = PublishSubject<Bool>()
```

## 总结
- 为了研究RxSwift相关知识, 工作之余的时间,差不多一个月了
- 学习的瓶颈大部分在于网络请求和配合刷新这一模块
- 文中如出现self循环引用的问题,还望大神多多指正
- 小编目前也还在初学阶段,文中如出现小错误还望多多指正,如有更好的方法,也希望不吝分享
- 如果喜欢,可以收藏,也可以在Github上star一下

### 最后再一次附上[Demo地址](https://github.com/coderQuanjun/RxSwift-Table-Collection)


### 参考文献:
- [Moya](https://github.com/Moya/Moya)
- [ObjectMapper](https://github.com/Hearst-DD/ObjectMapper)
- [RxDataSources](https://github.com/RxSwiftCommunity/RxDataSources)
- [Kingfisher](https://github.com/onevcat/Kingfisher)
- [RxSwift的使用详解01](http://www.jianshu.com/p/319db438c4d3)
- [RxSwift的使用详解02](http://www.jianshu.com/p/bcd0dc328308)
- [moya + RxSwift 进行网络请求](https://www.2cto.com/kf/201703/611678.html)
- [扒一扒swift中的unowned和weak下](http://www.jianshu.com/p/9d536d3a1740)
- [iOS - RxSwift -项目实战记录](http://mp.weixin.qq.com/s/B-AdatKDkjknKCYorqSfEw)