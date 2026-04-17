import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function LearningPath() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🗺️ 学习路径详解</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从前端到 iOS 开发，按什么顺序学最高效？
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <ConceptCard
          emoji="🧭"
          title="这份路径为前端开发者量身定制"
          description="我们不从变量是什么开始讲，而是直接建立前端概念与 iOS 概念的映射关系，让你用已有的工程经验十倍速上手。"
          frontend-ref="就像你学 TypeScript 不需要重新学编程，只需要理解类型系统和静态检查一样。"
        />

        <h2>阶段一：心智切换与环境准备</h2>
        <p>
          在写第一行代码之前，先完成两个切换：
          <strong>解释型 → 编译型</strong>，<strong>垃圾回收 → ARC</strong>。
          同时把 Xcode、模拟器、真机调试跑通。
        </p>
        <ul>
          <li><Link to="/roadmap/before-start">开始之前</Link>：建立正确的心智模型</li>
          <li><Link to="/starter">开发起步</Link>：Xcode 界面、项目创建、调试基础</li>
        </ul>

        <h2>阶段二：选择主力语言</h2>
        <p>
          iOS 开发目前双语言并存。你需要根据工作场景选择主攻方向：
        </p>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐语言</th>
              <th>入口页面</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>维护老项目、阅读底层源码</td>
              <td>Objective-C</td>
              <td><Link to="/objc-maintenance">OC 维护</Link></td>
            </tr>
            <tr>
              <td>新项目、SwiftUI、现代 iOS 开发</td>
              <td>Swift</td>
              <td><Link to="/swift">Swift 模块</Link></td>
            </tr>
          </tbody>
        </table>

        <TipBox type="tip" title="理想情况下两者都要会">
          即使是纯 Swift 项目，也免不了和 Objective-C 的桥接头、Runtime、CocoaPods 打交道。
          建议 Swift 为主、OC 为辅，至少能读能改。
        </TipBox>

        <h2>阶段三：UIKit 主线（业务开发核心）</h2>
        <p>
          不管你用 Swift 还是 OC，只要做传统 iOS 业务，UIKit 就是主战场。
          核心能力链是：生命周期 → 导航 → 布局 → 列表 → 表单 → 动画。
        </p>
        <ul>
          <li><Link to="/uikit/view-controller-lifecycle">UIViewController 生命周期</Link></li>
          <li><Link to="/uikit/navigation">导航与页面跳转</Link></li>
          <li><Link to="/uikit/auto-layout">Auto Layout</Link></li>
          <li><Link to="/uikit/collection-view">UICollectionView</Link></li>
          <li><Link to="/uikit/form-input">表单与输入</Link></li>
          <li><Link to="/uikit/animation">动画与转场</Link></li>
        </ul>

        <h2>阶段四：SwiftUI 与声明式 UI</h2>
        <p>
          如果你要做新项目且最低版本支持 iOS 15+，强烈建议学习 SwiftUI。
          它的声明式语法和状态管理对前端开发者极其友好。
        </p>
        <ul>
          <li><Link to="/swift/swiftui/intro">SwiftUI 简介</Link></li>
          <li><Link to="/swift/swiftui/state-binding">状态与绑定</Link></li>
          <li><Link to="/swift/swiftui/navigation">SwiftUI 路由</Link></li>
          <li><Link to="/swift/swiftui/mixed-ui">SwiftUI 与 UIKit 混用</Link></li>
        </ul>

        <h2>阶段五：工程化与高级进阶</h2>
        <p>
          当你能独立完成页面开发后，下一个瓶颈通常是工程能力：
          性能优化、稳定性治理、架构设计、发布流程。
        </p>
        <ul>
          <li><Link to="/advanced/instruments">Instruments 性能排查</Link></li>
          <li><Link to="/advanced/network-layer">网络层封装</Link></li>
          <li><Link to="/advanced/architecture">架构选型</Link></li>
          <li><Link to="/advanced/testing">单元测试与 UI 测试</Link></li>
          <li><Link to="/advanced/publish-end-to-end">从零发布一个 App</Link></li>
        </ul>

        <h2>下一步该去哪</h2>
        <p>
          如果你刚开始，直接回到 <Link to="/roadmap/before-start">开始之前</Link>，
          完成心智切换后再进入 <Link to="/starter">开发起步</Link>。
          如果你已经有一定基础，可以从上方对应阶段直接进入深入学习。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/roadmap"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 学习路线
        </Link>
        <Link
          to="/starter"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          进入开发起步 →
        </Link>
      </div>
    </div>
  );
}
