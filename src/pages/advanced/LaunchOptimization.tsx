import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function LaunchOptimization() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 启动优化</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        用户没有耐心等 App 打开。把启动时间拆成阶段，逐段治理。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端关注 FCP（首次内容绘制）、LCP（最大内容绘制），iOS 中对应的核心指标是 <strong>TTR（Time to Render）</strong>：
          从用户点击 App 图标，到看到可操作的首屏界面，用了多久。
        </p>

        <h2>iOS 启动的两个阶段</h2>

        <h3>1. Pre-main（main 函数之前）</h3>
        <p>
          这个阶段系统在做的事情包括：加载可执行文件、链接动态库、执行 +load 方法、初始化全局变量等。
          开发者能直接控制的不多，但有几个常见的优化点：
        </p>
        <ul>
          <li><strong>减少动态库数量：</strong> 过多 dylib 会显著增加链接时间，尽量合并或静态化。</li>
          <li><strong>清理 +load 方法：</strong> 老项目里很多库在 +load 里做初始化，能移到 +initialize 或运行时延迟加载就移走。</li>
          <li><strong>减少 ObjC 类和分类数量：</strong> 类注册也是 Pre-main 的耗时项之一。</li>
        </ul>

        <TipBox type="tip" title="查看 Pre-main 耗时">
          在 Xcode 的 Edit Scheme → Run → Arguments → Environment Variables 中添加 <code>DYLD_PRINT_STATISTICS=1</code>，可以在控制台打印 Pre-main 各阶段的耗时明细。
        </TipBox>

        <h3>2. main 之后（AppDelegate / SceneDelegate 阶段）</h3>
        <p>
          从 <code>main()</code> 执行到首屏渲染完成，是开发者最能发力的阶段。
          常见的拖慢启动的行为：
        </p>
        <ul>
          <li>在 <code>application:didFinishLaunchingWithOptions:</code> 里串行初始化十几个 SDK</li>
          <li>同步读取 UserDefaults、Keychain 或文件</li>
          <li>主线程执行大量数据库查询或网络请求</li>
          <li>创建过多未立即需要的全局对象</li>
        </ul>

        <h2>优化策略清单</h2>
        <table>
          <thead>
            <tr>
              <th>策略</th>
              <th>具体做法</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>延迟初始化</td>
              <td>非首屏必需的 SDK、模块放到首屏渲染后再初始化</td>
            </tr>
            <tr>
              <td>异步化</td>
              <td>IO、网络、数据库操作放到后台线程</td>
            </tr>
            <tr>
              <td>精简首屏依赖</td>
              <td>只加载首屏必需的数据和配置，其他按需拉取</td>
            </tr>
            <tr>
              <td>缓存预热</td>
              <td>利用上次退出的状态快速渲染首屏，减少等待</td>
            </tr>
            <tr>
              <td>二进制重排</td>
              <td>通过 Order File 优化启动时的 Page Fault（大厂常用）</td>
            </tr>
          </tbody>
        </table>

        <h2>测量指标</h2>
        <p>
          在 Instruments 中使用 <strong>App Launch</strong> 模板，可以直接看到 Pre-main、Main、First Frame 三个阶段的耗时分布。
          一般建议：
        </p>
        <ul>
          <li>冷启动总时间控制在 1.5s 以内（中低端机型）</li>
          <li>Pre-main 控制在 400ms 以内</li>
          <li>main 到首屏渲染控制在 800ms 以内</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/instruments"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Instruments 入门
        </Link>
        <Link
          to="/advanced/instruments-case"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Instruments 性能优化案例 →
        </Link>
      </div>
    </div>
  );
}
