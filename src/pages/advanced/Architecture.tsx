import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Architecture() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🏗️ MVC / MVVM / MVP 架构选型</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iOS 项目的代码该放哪里？这不仅是技术问题，更是团队规模和迭代效率的问题。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端也经历过从 jQuery 一把梭，到 MVC（Backbone）、MVVM（Vue/Angular）、Flux/Redux 的演进。
          iOS 里故事几乎一模一样：项目大了，ViewController 越写越肥，就需要把职责拆出去。
        </p>

        <h2>MVC：苹果官方推荐，但容易写成 Massive ViewController</h2>
        <p>
          在经典 iOS MVC 中，<code>UIViewController</code> 同时持有 View 又负责逻辑控制。
          页面一多，VC 里就会塞满：网络请求、数据处理、UI 刷新、事件响应、路由跳转……
        </p>
        <ul>
          <li><strong>优点：</strong> 简单直接，官方文档全是这个写法，小项目够用。</li>
          <li><strong>缺点：</strong> 业务复杂后，VC 动辄几千行，难以测试。</li>
        </ul>

        <h2>MVVM：前端最熟悉的分工方式</h2>
        <p>
          把视图逻辑拆到 <code>ViewModel</code> 中，VC 只负责把 ViewModel 的数据绑定到 UI 上。
          这非常接近 Vue/React 中 "UI = f(State)" 的理念。
        </p>
        <ul>
          <li><strong>优点：</strong> 职责清晰，ViewModel 可以独立单元测试。</li>
          <li><strong>缺点：</strong> 需要引入双向绑定或响应式框架（如 RxSwift、Combine），增加了学习成本。</li>
        </ul>

        <TipBox type="info" title="SwiftUI 里 MVVM 是天然搭档">
          SwiftUI 的 <code>@Observable</code> / <code>@ObservedObject</code> 让 MVVM 变得极其自然：ViewModel 是 ObservableObject，View 自动订阅变化。
        </TipBox>

        <h2>MVP：把 Controller 也变薄</h2>
        <p>
          MVP 和 MVVM 很像，但 Presenter 不持有 View 的引用，而是通过协议（Protocol）回调。
          这在一些老项目或需要严格解耦的场景里比较常见。
        </p>

        <h2>Coordinator：专门管页面跳转</h2>
        <p>
          如果 MVVM 解决了"数据放哪"的问题，Coordinator 就是解决"路由放哪"的问题。
          它把页面之间的 push/pop/present 逻辑从 ViewController 里完全抽离，由专门的 Coordinator 对象管理导航树。
        </p>

        <h2>选型建议</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐架构</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>小型项目 / Demo / MVP</td><td>MVC 即可</td></tr>
            <tr><td>中等复杂度业务模块</td><td>MVVM + 简单路由封装</td></tr>
            <tr><td>大型项目 / 多团队协作</td><td>MVVM + Coordinator</td></tr>
            <tr><td>纯 SwiftUI 新项目</td><td>MVVM（利用 @Observable）</td></tr>
          </tbody>
        </table>

        <TipBox type="warning" title="不要为了架构而架构">
          一个三页的小 App 强行上 Coordinator + RxSwift，只会让代码更难懂。架构是为了解决"变大后难维护"的问题，不是为了炫技。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/practice/network-app"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 网络请求实战
        </Link>
        <Link
          to="/advanced/testing"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：单元测试与 UI 测试 →
        </Link>
      </div>
    </div>
  );
}
