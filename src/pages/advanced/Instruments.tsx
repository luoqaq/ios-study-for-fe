import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Instruments() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔬 Instruments 入门</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Xcode 自带的性能分析神器，前端开发者最该补齐的调试技能之一。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端排查性能问题会打开 Chrome DevTools 的 Performance、Memory、Network 面板。
          iOS 中对应的工具就是 <strong>Instruments</strong>，集成在 Xcode 中，功能更底层、更专业。
        </p>

        <h2>最常用的 4 个模板</h2>

        <h3>1. Time Profiler：CPU 耗时分析</h3>
        <p>
          对应 Chrome Performance 面板里的 Main Thread 火焰图。
          用来找出 App 中哪些函数在吃 CPU、导致卡顿或发热。
        </p>
        <ul>
          <li>关注主线程上的高耗时函数</li>
          <li>检查是否在主线程做了同步 IO、大量计算</li>
          <li>对照源码逐层展开调用栈（Call Tree）</li>
        </ul>

        <h3>2. Allocations：内存分配追踪</h3>
        <p>
          对应 Chrome Memory 的 Allocation Sampling。
          用来观察对象的创建和销毁趋势，发现内存暴增或不释放的问题。
        </p>
        <ul>
          <li>看 Allocations 曲线是否持续上升（内存泄漏信号）</li>
          <li>搜索特定类名，定位哪个模块在疯狂创建对象</li>
        </ul>

        <h3>3. Leaks：自动检测内存泄漏</h3>
        <p>
          Instruments 会自动扫描并标记出发生了循环引用、且确认无法释放的对象。
          这是排查 retain cycle 最直观的工具。
        </p>

        <TipBox type="warning" title="Leaks 检测有盲区">
          有些泄漏是“逻辑泄漏”（比如缓存无限增长、单例持有大对象），Leaks 不会报红，需要结合 Allocations 分析。
        </TipBox>

        <h3>4. Network：网络请求分析</h3>
        <p>
          对应 Chrome Network 面板。可以抓取 App 发出的所有 HTTP/HTTPS 请求，
          查看请求头、响应体、耗时、状态码。
        </p>

        <h2>使用流程</h2>
        <ol>
          <li>在 Xcode 中点击 Product → Profile（或按 Cmd + I）</li>
          <li>选择对应的 Instruments 模板</li>
          <li>点击红色录制按钮开始采集</li>
          <li>在真机或模拟器上复现问题场景</li>
          <li>停止录制，分析火焰图、内存曲线或泄漏列表</li>
        </ol>

        <h2>调试口诀</h2>
        <ul>
          <li><strong>卡顿：</strong> 先看 Time Profiler 主线程</li>
          <li><strong>崩溃（OOM）：</strong> 先看 Allocations 峰值</li>
          <li><strong>发热耗电：</strong> 看 CPU 占用率和后台线程活动</li>
          <li><strong>网络慢：</strong> 看 Network 请求耗时和重复请求</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/network-layer"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 网络层封装
        </Link>
        <Link
          to="/advanced/launch-optimization"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：启动优化 →
        </Link>
      </div>
    </div>
  );
}
