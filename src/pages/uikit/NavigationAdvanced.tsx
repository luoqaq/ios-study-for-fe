import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function NavigationAdvanced() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🧭 UIKit 导航模式深入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从简单的 push/pop，到 Coordinator、路由表和深层链接。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端有 React Router、Vue Router 等成熟的路由库，URL 是页面的唯一标识。
          UIKit 中没有天然的路由 URL，导航栈是页面关系的核心模型。
          项目大了之后，直接在每个 VC 里写 <code>pushViewController</code> 会让代码高度耦合，
          因此需要引入更高层的导航抽象。
        </p>

        <h2>Coordinator 模式</h2>
        <p>
          Coordinator 把页面跳转逻辑从 ViewController 中完全抽离。
          每个业务模块有一个 Coordinator，它知道该模块包含哪些页面、以及页面之间的跳转规则。
        </p>
        <ul>
          <li><strong>优点：</strong> VC 只负责展示，跳转逻辑可复用、可测试</li>
          <li><strong>缺点：</strong> 增加了类的数量，小项目可能显得过重</li>
        </ul>

        <h2>路由表与解耦跳转</h2>
        <p>
          在大型项目中，可以用一个中央路由表（Router Registry）来管理页面映射：
        </p>
        <pre><code>{`// 路由注册
Router.register("/user/profile") { params in
    let vc = ProfileViewController(userId: params["id"])
    return vc
}

// 跳转调用
Router.navigate(to: "/user/profile", params: ["id": "123"])`}</code></pre>
        <p>这样 A 页面不需要 import B 页面，只需要知道路由字符串即可。</p>

        <h2>深层链接（Deep Link / Universal Link）</h2>
        <p>
          如果前端有 <code>https://example.com/product/123</code>，
          iOS 可以通过 <strong>Universal Link</strong> 让点击链接直接打开 App 并进入对应页面。
          需要在 AppDelegate / SceneDelegate 中处理传入的 URL，
          然后让路由系统解析并导航到目标页面。
        </p>

        <TipBox type="warning" title="不要混用多种导航方式">
          一个项目里如果同时存在 push、present、自定义转场、Coordinator、路由表，
          很容易让新人无所适从。建议统一一种主导航模式，其余作为特例处理。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/navigation"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 导航与页面跳转
        </Link>
        <Link
          to="/uikit/auto-layout"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Auto Layout →
        </Link>
      </div>
    </div>
  );
}
