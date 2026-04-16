import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function TableViewOptimization() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📊 TableView 性能优化</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        列表是 iOS App 的半壁江山，滚动不流畅用户体验直接崩盘。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端优化长列表会用到虚拟列表（react-window）、懒加载、骨架屏。
          iOS 的 UITableView 本身就有 Cell 复用机制，但想让滚动达到 60fps，
          仍然需要在布局计算、图片渲染、异步任务上精打细算。
        </p>

        <h2>1. 复用机制是底线</h2>
        <p>
          <code>dequeueReusableCell(withIdentifier:)</code> 必须正确使用，
          不要在 <code>cellForRowAt</code> 里每次都 <code>init</code> 新 Cell。
          同时确保 Cell 被滑出屏幕时能正确释放或暂停耗时任务（视频、GIF、定时器）。
        </p>

        <h2>2. 高度计算要轻量</h2>
        <p>
          如果实现了 <code>tableView(_:heightForRowAt:)</code>，
          这个方法会在每次布局时被频繁调用（甚至比 <code>cellForRowAt</code> 次数还多）。
          千万不要在里面做复杂计算或创建临时对象。
        </p>
        <ul>
          <li>固定高度优先用 <code>rowHeight</code> 属性统一设置</li>
          <li>动态高度提前缓存计算结果，不要每次重新算</li>
          <li>iOS 11+ 可以开启 Self-Sizing，让 Auto Layout 自动推导</li>
        </ul>

        <h2>3. 减少主线程阻塞</h2>
        <p>
          用户在快速滑动时，主线程必须全力渲染 UI。任何阻塞行为都会导致掉帧：
        </p>
        <ul>
          <li>不要在 <code>cellForRowAt</code> 里同步解码大图片</li>
          <li>不要在里面做 JSON 解析、数据库查询、正则匹配</li>
          <li>圆角、阴影、遮罩尽量用预渲染图片或 layer 属性优化</li>
        </ul>

        <TipBox type="tip" title="用 Instruments 的 Core Animation 调试">
          打开 Xcode → Debug → View Debugging → Rendering → Color Blended Layers，
          黄色/红色区域代表需要混合的图层，是性能热点。
        </TipBox>

        <h2>4. 图片与媒体处理</h2>
        <p>
          列表里的图片是性能杀手。最佳实践：
        </p>
        <ul>
          <li>后台线程解码，主线程只负责显示</li>
          <li>按 ImageView 尺寸压缩原图，不要显示 4000x4000 的原图</li>
          <li>Cell 滑出屏幕时取消未完成的下载/解码任务</li>
        </ul>

        <h2>5. 增量刷新优于全量 reload</h2>
        <p>
          <code>reloadData()</code> 会重置整个列表状态，代价最高。
          尽可能使用：
        </p>
        <ul>
          <li><code>reloadRows(at:with:)</code></li>
          <li><code>insertRows(at:with:)</code></li>
          <li><code>deleteRows(at:with:)</code></li>
          <li>iOS 13+ 的 <code>UITableViewDiffableDataSource</code></li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/practice/todo-app"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Todo App
        </Link>
        <Link
          to="/uikit/practice/tableview-app"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          实战：列表复用与滚动 →
        </Link>
      </div>
    </div>
  );
}
