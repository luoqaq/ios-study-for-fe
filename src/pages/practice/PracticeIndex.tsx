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
          前端同学最容易犯的错误就是像看小说一样刷完了语法教程，认为自己“懂了”，但在新建
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

        <h2>案例列表</h2>
        <p>我们精选了以下几个典型的移动端开发场景：</p>

        <ol>
          <li>
            <strong>
              <Link to="/uikit/practice/todo-app">Todo App</Link>（基础 UI
              与数据增删改查）：
            </strong>
            <br />
            这是所有框架的“Hello
            World”。学习如何在原生环境处理按钮点击、文本输入、简单列表的刷新。
          </li>
          <li>
            <strong>
              <Link to="/advanced/practice/network-app">网络请求与 JSON 解析</Link>
              （类比 fetch/axios）：
            </strong>
            <br />
            没有一个 App 可以脱离网络。学习原生 <code>URLSession</code>
            、异步回调、以及 Swift 的 <code>async/await</code> 网络请求模型。
          </li>
          <li>
            <strong>
              <Link to="/uikit/practice/tableview-app">无限滚动列表</Link>
              （核心：UITableView）：
            </strong>
            <br />
            iOS
            开发中最核心的控件！学习原生如何优雅地实现成百上千条数据的“虚拟滚动”（重用机制）。
          </li>
          <li>
            <strong>
              <Link to="/swift/practice/mini-swiftui">SwiftUI 声明式体验</Link>
              （React/Vue 既视感）：
            </strong>
            <br />
            体验苹果未来的 UI
            框架，感受从状态（State）驱动视图（View）的丝滑开发体验。
          </li>
        </ol>

        <p>准备好了吗？打开你的 Xcode，让我们开始第一个项目。</p>

        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
          <Link
            to="/starter"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            ← 开发起步
          </Link>
          <Link
            to="/uikit/practice/todo-app"
            className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
          >
            开始 Todo App 实战 →
          </Link>
        </div>
      </div>
    </div>
  );
}
