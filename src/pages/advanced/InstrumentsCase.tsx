import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function InstrumentsCase() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔍 Instruments 性能优化案例</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        不是看文档，而是跟着真实场景走一遍完整的排查和优化流程。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>案例 1：首页滚动掉帧</h2>
        <p>
          用户反馈首页快速滑动时感觉“卡卡的”。
          打开 <strong>Time Profiler</strong>，录制 10 秒滑动过程。
        </p>
        <ol>
          <li>在 Call Tree 中勾选 <code>Invert Call Tree</code> 和 <code>Hide System Libraries</code></li>
          <li>发现 <code>imageNamed:</code> 和 <code>drawInRect:</code> 占用了大量主线程时间</li>
          <li>进一步排查：Cell 复用时每次都重新加载大图，并在主线程解码</li>
          <li><strong>优化方案：</strong> 使用后台线程解码，并按 Cell 尺寸裁剪图片；引入图片缓存</li>
          <li>优化后 Time Profiler 显示主线程 CPU 占用从 85% 降到 35%</li>
        </ol>

        <h2>案例 2：后台返回后内存飙升</h2>
        <p>
          测试同学发现反复进入和退出一个详情页，App 内存持续增长，最终 OOM 崩溃。
        </p>
        <ol>
          <li>用 <strong>Allocations</strong> 录制，反复进入/退出详情页 10 次</li>
          <li>Allocations 曲线呈阶梯状上升，没有回落</li>
          <li>搜索 leaked/transient 对象，发现 <code>DetailViewController</code> 和 <code>AVPlayer</code> 实例数持续增长</li>
          <li><strong>根因：</strong> 详情页中的视频播放器在 <code>viewWillDisappear</code> 中没有释放，且 Notification 观察者未移除</li>
          <li><strong>修复：</strong> 在页面消失时调用 <code>player.replaceCurrentItem(with: nil)</code> 并移除通知监听</li>
        </ol>

        <h2>案例 3：启动时间超标</h2>
        <p>
          低端机型上 App 冷启动超过 3 秒，用户流失率明显上升。
        </p>
        <ol>
          <li>使用 <strong>App Launch</strong> 模板，在 iPhone 8 上测试</li>
          <li>Pre-main 阶段耗时 800ms，Main 阶段耗时 1.5s</li>
          <li>Pre-main 里 dylib 加载占了大头：第三方 SDK 过多且都是动态库</li>
          <li>Main 阶段里，<code>didFinishLaunching</code> 中串行初始化了 6 个 SDK</li>
          <li><strong>优化：</strong> 合并部分 SDK 为静态库；将非必要 SDK 延迟到首屏渲染后初始化；减少 +load 方法</li>
          <li>启动总时间从 3.2s 降到 1.6s</li>
        </ol>

        <TipBox type="tip" title="性能优化没有银弹">
          每个项目的瓶颈都不一样。不要照抄网上的“性能优化 checklist”，
          先用 Instruments 找到你的真实热点，再对症下药。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/launch-optimization"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 启动优化
        </Link>
        <Link
          to="/advanced/crash-symbolication"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：崩溃定位与符号化 →
        </Link>
      </div>
    </div>
  );
}
