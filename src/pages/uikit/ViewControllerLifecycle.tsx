import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function ViewControllerLifecycle() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">
        UIViewController 生命周期
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iOS 页面不是 React 组件，但你可以先用组件生命周期的视角去理解它。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <ConceptCard
          emoji="🕰️"
          title="页面并不是只创建一次、展示一次"
          description="一个 ViewController 可能被创建一次，但其视图会多次出现、消失、重新布局。理解这些时机，才能知道数据请求、埋点、UI 刷新分别该放哪里。"
          frontend-ref="可以粗略类比 React 里的 mount、render、layout、effect，但 iOS 的页面栈和显示时机更显式。"
        />

        <h2>最常用的几个生命周期</h2>
        <CompareTable
          headers={["方法", "什么时候触发", "更适合干什么"]}
          rows={[
            ["`viewDidLoad`", "视图第一次加载进内存之后", "初始化 UI、注册列表、绑定一次性事件"],
            ["`viewWillAppear`", "页面即将显示", "刷新轻量数据、埋点开始、更新导航栏"],
            ["`viewDidAppear`", "页面已经显示出来", "需要等页面真的可见后再做的操作"],
            ["`viewWillDisappear`", "页面即将消失", "结束输入、停止临时任务、埋点结束"],
            ["`deinit` / `dealloc`", "对象销毁前", "清理观察者、打印释放日志、排查泄漏"],
          ]}
        />

        <h2>前端最容易犯的错</h2>
        <ol>
          <li>把每次进入页面都要刷新的逻辑写进 `viewDidLoad`。</li>
          <li>把网络请求、埋点、UI 初始化全堆在一个函数里。</li>
          <li>页面返回后对象没释放，却不知道该去查循环引用还是导航栈持有。</li>
        </ol>

        <TipBox type="tip" title="先记住一个实用分工">
          `viewDidLoad` 负责“一次性初始化”，`viewWillAppear` 负责“每次展示前刷新”，这套分工足够应付大多数业务页面。
        </TipBox>

        <h2>和前端的粗略类比</h2>
        <p>不要强行一一对应，但可以先这样记：</p>
        <CompareTable
          headers={["iOS", "前端近似类比"]}
          rows={[
            ["`viewDidLoad`", "组件首次 mount 后的一次性 setup"],
            ["`viewWillAppear`", "每次进入路由前的刷新逻辑"],
            ["`viewDidAppear`", "页面真正渲染完成后的副作用"],
            ["`dealloc`", "组件卸载 + 对象释放确认"],
          ]}
        />

        <h2>下一步该接什么</h2>
        <p>
          理解生命周期之后，最自然的下一步就是页面怎么跳转，也就是导航栈和
          `push / pop / present` 这些日常业务最常见的动作。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/uikit" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← UIKit 总览
        </Link>
        <Link
          to="/uikit/navigation"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：导航与页面跳转 →
        </Link>
      </div>
    </div>
  );
}
