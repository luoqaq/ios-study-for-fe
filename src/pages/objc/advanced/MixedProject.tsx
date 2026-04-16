import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function MixedProject() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 OC / Swift 混编</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        现实里很多项目不是纯 Swift，也不是纯 Objective-C，而是两种语言长期并存。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么混编是必学项</h2>
        <p>
          对前端同学来说，维护老项目最容易卡住的不是语法，而是：
          “为什么这个 Swift 页面调了 OC 工具类，另一个 OC 控制器又拿 Swift
          模型？”
        </p>

        <CompareTable
          headers={["场景", "你会碰到什么"]}
          rows={[
            ["新页面接在老项目里", "Swift 页面调用现有 OC 基础设施"],
            ["老模块逐步重写", "新功能用 Swift，旧逻辑保留 OC"],
            ["共享工具层", "一部分工具类还停留在 Objective-C"],
            ["桥接暴露", "需要知道哪些类、头文件、宏能跨语言访问"],
          ]}
        />

        <h2>学习顺序建议</h2>
        <ol>
          <li>先搞清楚桥接头是什么。</li>
          <li>再搞清楚哪些 OC 类型能暴露给 Swift。</li>
          <li>最后再处理命名、可空性、泛型缺失这些历史遗留细节。</li>
        </ol>

        <TipBox type="tip" title="先把它当成“渐进迁移机制”">
          混编不是临时方案，而是 iOS 里非常常见、非常长期存在的现实状态。你不需要追求“一次性全量迁移”，而要学会在混合状态下稳定开发。
        </TipBox>

        <h2>它和高级能力的关系</h2>
        <p>
          一旦项目进入混编状态，模块边界、命名规范、桥接暴露面、历史包袱治理都会直接影响维护成本。这已经不仅是语法问题，而是工程治理问题。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/gcd"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← GCD
        </Link>
        <Link
          to="/advanced"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          进入高级进阶 →
        </Link>
      </div>
    </div>
  );
}
