import { Link } from "react-router-dom";

export default function PracticeIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">实战案例</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        只有将理论结合实际敲出来，才能真正掌握一门语言和框架。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>不要光看不练！</h2>
        <p>
          前端同学最容易犯的错误就是像看小说一样刷完了语法教程，认为自己"懂了"，但在新建
          Xcode 工程时，面对空荡荡的文件，脑子里一片空白。
        </p>

        <h3>为什么需要实战模块？</h3>
        <ul>
          <li>
            <strong>语法脱离上下文是没有意义的：</strong>{" "}
            在真实场景中，你会遇到对象生命周期管理、委托模式和并发处理交织在一起的情况。
          </li>
          <li>
            <strong>UIKit/SwiftUI 才是重点：</strong> 原生开发中，UI
            框架（和浏览器
            DOM）同样重要。如何布局、如何响应事件、如何更新视图状态，都需要实操。
          </li>
          <li>
            <strong>双语言对比学习：</strong> 每个案例我们都尽量提供了
            Objective-C 和 Swift
            两种实现，你可以直观地感受到从命令式到声明式的演进。
          </li>
        </ul>

        <h2>UIKit 实战</h2>
        <ul>
          <li>
            <Link to="/uikit/practice/form-app">表单实战案例</Link>：
            注册/登录页面的完整表单流程，包含键盘避让和输入校验
          </li>
          <li>
            <Link to="/uikit/practice/animation-app">动画实战案例</Link>：
            点赞动效、Cell 展开、Skeleton 骨架屏与自定义转场
          </li>
          <li>
            <Link to="/uikit/practice/collection-view-app">CollectionView 电商首页</Link>：
            用 Compositional Layout 搭建 Banner + 分类 + 商品瀑布流
          </li>
          <li>
            <Link to="/uikit/practice/todo-app">Todo App</Link>：
            基础 UI 与数据增删改查，所有框架的"Hello World"
          </li>
          <li>
            <Link to="/uikit/practice/tableview-app">无限滚动列表</Link>：
            UITableView 的核心能力，成百上千条数据的复用机制
          </li>
        </ul>

        <h2>Swift 实战</h2>
        <ul>
          <li>
            <Link to="/swift/practice/protocol-app">Swift POP 网络层实战</Link>：
            用面向协议编程搭建可测试、可替换的网络请求层
          </li>
          <li>
            <Link to="/swift/practice/mini-swiftui">SwiftUI 声明式体验</Link>：
            感受从状态驱动视图的丝滑开发体验
          </li>
        </ul>

        <h2>Objective-C 实战</h2>
        <ul>
          <li>
            <Link to="/objc-maintenance/practice/memory-debug">内存泄漏实战排查</Link>：
            常见泄漏场景、Instruments 定位与修复策略
          </li>
        </ul>

        <h2>高级进阶实战</h2>
        <ul>
          <li>
            <Link to="/advanced/practice/network-app">网络请求与 JSON 解析</Link>：
            URLSession、异步回调、以及 Swift async/await 网络模型
          </li>
        </ul>

        <p>准备好了吗？打开你的 Xcode，让我们开始动手。</p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/starter"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 开发起步
        </Link>
        <Link
          to="/uikit/practice/form-app"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          从表单实战开始 →
        </Link>
      </div>
    </div>
  );
}
