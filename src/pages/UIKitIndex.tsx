import { Link } from "react-router-dom";

export default function UIKitIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">UIKit 与传统开发</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        真正把业务做出来的主线能力，也是大多数老项目的现实战场。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么要单独把 UIKit 提出来？</h2>
        <p>
          之前的项目结构把 UIKit 能力散落在 Xcode、Objective-C、实战案例里。这样会让前端同学误以为：
          “语法学完了，我就会做 iOS 了。” 实际不是这样。
        </p>
        <p>
          真正的业务开发能力，通常来自对 <code>UIViewController</code>、
          导航、布局、列表、输入和页面状态切换的掌握。UIKit
          才是这条主线的核心。
        </p>

        <h2>这一模块现在先放什么？</h2>
        <ul>
          <li>
            <Link to="/uikit/practice/todo-app">Todo App</Link>
            ：用最小案例串起列表、交互和数据刷新。
          </li>
          <li>
            <Link to="/uikit/practice/tableview-app">列表复用与无限滚动</Link>
            ：理解原生列表的复用机制，这是 UIKit 的核心能力之一。
          </li>
        </ul>

        <h2>后续应该补的内容</h2>
        <ol>
          <li>UIViewController 生命周期</li>
          <li>导航与页面跳转</li>
          <li>Auto Layout</li>
          <li>UICollectionView</li>
          <li>表单和输入框</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/starter"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 开发起步
        </Link>
        <Link
          to="/uikit/practice/todo-app"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          先看 Todo App →
        </Link>
      </div>
    </div>
  );
}
