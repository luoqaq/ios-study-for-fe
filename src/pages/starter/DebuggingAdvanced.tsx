import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function DebuggingAdvanced() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔬 调试与 Instruments 结合实战</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从“ print 排查”升级到“用工具说话”，这是中级开发者的重要分水岭。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么要把 LLDB 和 Instruments 结合起来</h2>
        <p>
          LLDB 擅长在代码执行到某个点时，查看变量、修改状态、追踪调用栈。
          Instruments 擅长在时间轴上观察整个 App 的 CPU、内存、网络、线程行为。
          两者结合，才能既定位到“哪行代码出问题”，又理解“这个问题在系统层面的影响”。
        </p>

        <h2>实战场景 1：列表滑动卡顿</h2>
        <ol>
          <li>用 <strong>Time Profiler</strong> 录制滑动过程，找到主线程上耗时最高的函数</li>
          <li>在该函数入口处打断点，用 LLDB 的 <code>po</code> 查看当前处理的对象大小和数量</li>
          <li>发现是图片解码阻塞了主线程 → 把解码放到后台线程</li>
          <li>再次用 Time Profiler 验证主线程耗时是否下降</li>
        </ol>

        <h2>实战场景 2：内存泄漏排查</h2>
        <ol>
          <li>用 <strong>Leaks</strong> 模板运行 App，操作几个页面后进退出</li>
          <li>如果 Leaks 报红，查看泄漏对象的类名和引用链</li>
          <li>在相关类的 <code>deinit</code> / <code>dealloc</code> 里打日志断点</li>
          <li>用 LLDB 检查是谁在持有这个对象（查看 retain count 和引用关系）</li>
          <li>修复循环引用或遗漏的释放逻辑后，重新验证 Allocations 曲线是否回落</li>
        </ol>

        <TipBox type="tip" title="养成“先测再改”的习惯">
          很多开发者一遇到性能问题就凭直觉改代码。正确的流程是：
          先用 Instruments 采集数据 → 找到真正的瓶颈 → 小范围修改 → 再次采集对比。
          没有数据支撑的优化，往往是在浪费时间。
        </TipBox>

        <h2>实战场景 3：启动时间拆解</h2>
        <p>
          Xcode 的 <strong>App Launch</strong> 模板会把启动过程分成 Pre-main、Main、First Frame 三个阶段。
          配合 <code>DYLD_PRINT_STATISTICS</code> 环境变量，你可以：
        </p>
        <ul>
          <li>看 dylib 加载是否耗时过长</li>
          <li>看 +load 方法有没有做多余初始化</li>
          <li>看 AppDelegate 里同步初始化的 SDK 数量</li>
        </ul>

        <h2>调试工作流总结</h2>
        <table>
          <thead>
            <tr>
              <th>问题类型</th>
              <th>首选工具</th>
              <th>辅助手段</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>崩溃 / 异常</td><td>Exception Breakpoint + LLDB</td><td>崩溃日志符号化</td></tr>
            <tr><td>卡顿 / 掉帧</td><td>Time Profiler</td><td>Core Animation 调试选项</td></tr>
            <tr><td>内存泄漏</td><td>Leaks + Allocations</td><td>deinit 日志 + 循环引用分析</td></tr>
            <tr><td>启动慢</td><td>App Launch + dyld 统计</td><td>Instruments 的 Pre-main 阶段</td></tr>
            <tr><td>网络慢 / 重复请求</td><td>Network Instrument</td><td>Charles / Proxyman 抓包</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/starter/debugging"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 调试技巧
        </Link>
        <Link
          to="/starter/storyboard"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Storyboard →
        </Link>
      </div>
    </div>
  );
}
