import { Link } from "react-router-dom";

export default function AdvancedIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">高级进阶</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从“能写页面”走向“能设计工程、排查问题、治理性能与稳定性”。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>这一层解决的不是语法问题</h2>
        <p>
          到了高级阶段，真正卡人的一般不是“某个 API
          怎么写”，而是这些问题：
        </p>
        <ul>
          <li>为什么这个页面偶发卡顿？</li>
          <li>为什么启动这么慢？</li>
          <li>为什么这个老项目越来越难改？</li>
          <li>网络层、缓存层、页面层边界该怎么切？</li>
          <li>为什么线上崩溃复现不了？</li>
        </ul>

        <h2>这个模块已覆盖和后续会承接的主题</h2>
        <ol>
          <li>持久化与缓存基础</li>
          <li>网络层设计与错误治理</li>
          <li>Instruments 与性能排查</li>
          <li>启动优化</li>
          <li>崩溃定位与符号化</li>
          <li>架构：MVC / MVVM / MVP 选型</li>
          <li>单元测试与 UI 测试</li>
          <li>签名、打包与发布</li>
          <li>CI/CD（Fastlane 与自动化）</li>
        </ol>

        <h2>当前先从哪里接上？</h2>
        <p>
          建议从「持久化与缓存基础」开始，逐步过渡到网络层封装和 Instruments 性能排查。
          如果你已经有明确的问题场景（比如启动慢、线上崩溃多），也可以直接跳到对应的专题。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← OC 维护
        </Link>
        <Link
          to="/advanced/persistence"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          从持久化基础进入 →
        </Link>
      </div>
    </div>
  );
}
