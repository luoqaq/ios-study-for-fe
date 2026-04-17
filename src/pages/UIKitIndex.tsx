import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";

export default function UIKitIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">UIKit 与传统开发</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        真正把业务做出来的主线能力，也是大多数老项目的现实战场。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <ConceptCard
          emoji="🏗️"
          title="为什么 UIKit 是独立主线？"
          description="只会 Swift 语法不等于能写 iOS 业务。真正的开发能力来自 UIViewController、导航、布局、列表、输入和状态切换的掌握。UIKit 是这条主线的核心。"
          frontend-ref="类似你学会了 JavaScript 还不够，必须深入 React/Vue 的组件体系和状态管理才能真正做业务。"
        />

        <h2>UIKit 学习路径</h2>
        <p>我们将按照"基础 → 布局 → 列表 → 交互 → 实战"的顺序展开：</p>

        <h3>第一阶段：页面基础</h3>
        <ul>
          <li><Link to="/uikit/view-controller-lifecycle">UIViewController 生命周期</Link>：理解 viewDidLoad、viewWillAppear 等核心时机</li>
          <li><Link to="/uikit/navigation">导航与页面跳转</Link>：push / pop / present 和导航栈</li>
          <li><Link to="/uikit/navigation-advanced">导航模式深入</Link>：Coordinator、路由表、深层链接</li>
        </ul>

        <h3>第二阶段：布局体系</h3>
        <ul>
          <li><Link to="/uikit/auto-layout">Auto Layout</Link>：约束系统的核心概念</li>
          <li><Link to="/uikit/auto-layout-advanced">Auto Layout 进阶</Link>：优先级、Intrinsic Content Size、Debug 技巧</li>
        </ul>

        <h3>第三阶段：列表与集合</h3>
        <ul>
          <li><Link to="/uikit/collection-view">UICollectionView 完整实战</Link>：Cell 复用、FlowLayout、DiffableDataSource</li>
          <li><Link to="/uikit/collection-view-practical">CollectionView 实战技巧</Link>：预加载、Self-sizing、复杂布局</li>
          <li><Link to="/uikit/compositional-layout">复杂列表布局</Link>：Compositional Layout 现代布局方式</li>
          <li><Link to="/uikit/tableview-optimization">TableView 性能优化</Link>：复用池、异步渲染、滑动流畅度</li>
        </ul>

        <h3>第四阶段：表单与交互</h3>
        <ul>
          <li><Link to="/uikit/form-input">表单与输入</Link>：UITextField、UITextView、键盘管理</li>
          <li><Link to="/uikit/form-validation">键盘与表单校验</Link>：输入验证、错误提示、用户体验</li>
          <li><Link to="/uikit/gestures">手势与触摸事件</Link>：点击、拖拽、捏合、旋转与响应链</li>
          <li><Link to="/uikit/animation">动画与转场</Link>：Core Animation、UIView 动画、自定义转场</li>
        </ul>

        <h3>第五阶段：实战项目</h3>
        <ul>
          <li><Link to="/uikit/practice/todo-app">Todo App</Link>：用最小案例串起列表、交互和数据刷新</li>
          <li><Link to="/uikit/practice/form-app">表单实战案例</Link>：完整的注册/登录表单流程</li>
          <li><Link to="/uikit/practice/tableview-app">列表复用与滚动</Link>：理解原生列表的复用机制</li>
        </ul>

        <h2>适合谁？</h2>
        <p>
          如果你要维护一个老项目，或者入职的团队还在大量使用 Storyboard / XIB / UIKit，
          这个模块就是你的必修课。即使团队主推 SwiftUI，了解 UIKit 也能帮你更好地理解底层和混编。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/starter"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 开发起步
        </Link>
        <Link
          to="/uikit/view-controller-lifecycle"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          从生命周期开始 →
        </Link>
      </div>
    </div>
  );
}
