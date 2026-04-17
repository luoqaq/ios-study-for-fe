import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function PerformanceApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 实战：性能排查检查清单</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        拿到一个线上卡顿/发热/崩溃的 App，从哪里开始排查？
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>场景设定</h2>
        <p>
          假设你刚入职一个老项目，测试同学反馈：首页快速滑动时明显掉帧，
          且反复进入退出某个页面后内存持续增长，最终 OOM 崩溃。
          你的任务是在一个小时内给出初步诊断报告。
        </p>

        <h2>Step 1：复现与定性</h2>
        <ul>
          <li>在真机上复现，而不是模拟器（模拟器的性能不代表真实用户）</li>
          <li>打开 Xcode → Debug → View Debugging → Rendering → Color Blended Layers，观察是否有大面积黄色/红色区域</li>
          <li>打开 Color Offscreen-Rendered，查看是否有离屏渲染</li>
        </ul>

        <h2>Step 2：Time Profiler 找热点</h2>
        <ol>
          <li>Product → Profile，选择 Time Profiler</li>
          <li>在真机上快速滑动首页 10 秒，停止录制</li>
          <li>Call Tree 中勾选 Invert Call Tree + Hide System Libraries</li>
          <li>找到占用主线程时间最长的自定义函数</li>
        </ol>

        <TipBox type="tip" title="重点关注这两个函数">
          <code>cellForRowAt</code> / <code>cellForItemAt</code> 和 <code>heightForRowAt</code> 是列表卡顿最常见的罪魁祸首。
        </TipBox>

        <h2>Step 3：Allocations 查内存</h2>
        <ol>
          <li>用 Allocations 模板录制，反复进入/退出目标页面 10 次</li>
          <li>观察 Allocations 曲线是否呈阶梯状上升（不回落说明有泄漏）</li>
          <li>搜索目标 ViewController 的类名，查看实例数是否持续增长</li>
          <li>如果增长，检查 deinit / dealloc 是否被调用</li>
        </ol>

        <h2>Step 4：常见根因速查表</h2>
        <table>
          <thead>
            <tr>
              <th>症状</th>
              <th>最可能原因</th>
              <th>验证方法</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>滑动卡顿</td><td>主线程同步解码大图</td><td>Time Profiler 中 imageNamed/drawInRect 占比高</td></tr>
            <tr><td>滑动卡顿</td><td>高度计算复杂</td><td>heightForRowAt 被频繁调用且耗时长</td></tr>
            <tr><td>内存持续增长</td><td>循环引用 / 闭包捕获 self</td><td>Leaks 报红 或 deinit 未触发</td></tr>
            <tr><td>内存持续增长</td><td>视频/定时器未停止</td><td>页面消失后 AVPlayer 仍在后台运行</td></tr>
            <tr><td>启动慢</td><td>dylib 过多 / SDK 串行初始化</td><td>App Launch 中 Pre-main / Main 阶段占比</td></tr>
            <tr><td>CPU 飙升</td><td>死循环 / 频繁重绘</td><td>Time Profiler 找到重复调用的函数</td></tr>
          </tbody>
        </table>

        <h2>Step 5：输出诊断报告</h2>
        <p>一个合格的性能诊断报告应该包含：</p>
        <ul>
          <li>问题现象（截图/录屏）</li>
          <li>测试环境（机型、iOS 版本、App 版本）</li>
          <li> Instruments 数据截图</li>
          <li>根因分析（定位到具体函数或代码模式）</li>
          <li>优化建议（短期止血 + 长期根治）</li>
        </ul>

        <TipBox type="info" title="性能优化没有银弹">
          不要凭直觉优化。先用工具找到真正的瓶颈，再对症下药。
          同一个优化方案，在不同场景下可能是良药也可能是毒药。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/instruments-case"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Instruments 性能优化案例
        </Link>
        <Link
          to="/advanced"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          返回高级进阶总览 →
        </Link>
      </div>
    </div>
  );
}
