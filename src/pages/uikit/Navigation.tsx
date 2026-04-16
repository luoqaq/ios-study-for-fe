import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function UIKitNavigation() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">导航与页面跳转</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        前端有路由，iOS 有导航栈。两者都在解决“从一个页面进入另一个页面”的问题。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>先记住两个世界</h2>
        <ul>
          <li>
            <strong>push / pop：</strong> 进入导航栈内部的新页面，再返回上一页。
          </li>
          <li>
            <strong>present / dismiss：</strong> 模态展示一个页面，再整体关闭。
          </li>
        </ul>

        <CodeCompare
          title="导航栈 vs 前端路由"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// UIKit
let detailVC = DetailViewController()
navigationController?.pushViewController(detailVC, animated: true)

// 返回上一页
navigationController?.popViewController(animated: true)

// 模态弹出
let loginVC = LoginViewController()
present(loginVC, animated: true)

// 关闭模态
dismiss(animated: true)`}
          rightCode={`// React Router
navigate("/detail");

// 返回上一页
navigate(-1);

// 模态更像“显示一个覆盖层组件”
setLoginModalOpen(true);

// 关闭
setLoginModalOpen(false);`}
        />

        <h2>业务里怎么选</h2>
        <ol>
          <li>属于正常业务流转，优先用 `push`。</li>
          <li>属于登录、选择器、临时弹窗、独立任务流，常用 `present`。</li>
          <li>如果页面需要保留“返回上一页”的上下文，基本就是导航栈问题。</li>
        </ol>

        <TipBox type="warning" title="前端同学常见误区">
          不要把所有跳转都理解成 URL 变化。UIKit 默认并没有浏览器地址栏，也没有天然深链语义。你操作的首先是页面控制器栈，而不是 URL。
        </TipBox>

        <h2>为什么它重要</h2>
        <p>
          业务开发里，大部分页面问题都和导航强相关：参数怎么传、返回时怎么刷新、页面为什么没释放、为什么出现重复 push。
          生命周期和导航栈是 UIKit 主线里必须一起掌握的。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/view-controller-lifecycle"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← UIViewController 生命周期
        </Link>
        <Link
          to="/uikit/navigation-advanced"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：导航模式深入 →
        </Link>
      </div>
    </div>
  );
}
