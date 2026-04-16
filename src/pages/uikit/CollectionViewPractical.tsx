import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function CollectionViewPractical() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🧩 CollectionView 实战技巧</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从“能用”到“用好”，这些细节决定了列表能不能丝滑滚动。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端处理复杂列表会关注虚拟滚动、key 复用、shouldComponentUpdate。
          iOS 中对应的优化战场是：Cell 复用池、异步图片加载、离屏渲染和主线程阻塞。
        </p>

        <h2>1. Cell 复用与注册</h2>
        <p>
          <code>dequeueReusableCell(withReuseIdentifier:for:)</code> 是核心。
          必须在 <code>viewDidLoad</code> 中先用 <code>register(_:forCellWithReuseIdentifier:)</code> 注册 Cell 类或 Nib，
          否则运行时会直接崩溃。
        </p>

        <h2>2. 图片异步加载与缓存</h2>
        <p>
          在 <code>cellForItemAt</code> 里同步加载网络图片是列表卡顿的头号元凶。
          正确做法：
        </p>
        <ul>
          <li>先用占位图或本地缓存图渲染</li>
          <li>后台线程下载/解码图片</li>
          <li>切回主线程设置到 UIImageView</li>
        </ul>
        <p>生产环境通常直接用 <code>SDWebImage</code> 或 <code>Kingfisher</code>。</p>

        <TipBox type="warning" title="Cell 复用导致图片错位">
          因为 Cell 会被复用，如果你在异步加载完成前 Cell 就已经滑出屏幕被复用了，
          回来的图片可能会设置到错误的 Cell 上。解决办法：在设置图片前检查 URL 或 indexPath 是否匹配。
        </TipBox>

        <h2>3. 预估高度与 Self-Sizing</h2>
        <p>
          如果 Cell 高度不固定，需要开启 Self-Sizing 并提供合理的约束。
          同时设置 <code>estimatedItemSize</code>，让 CollectionView 提前分配复用池大小，
          避免滚动时频繁计算布局导致的跳帧。
        </p>

        <h2>4. 数据刷新的最佳实践</h2>
        <ul>
          <li>小范围更新用 <code>reloadItems(at:)</code></li>
          <li>section 级更新用 <code>reloadSections(_:)</code></li>
          <li>iOS 13+ 推荐使用 <code>NSDiffableDataSource</code>，自动处理增量更新和动画</li>
        </ul>

        <h2>5. 滚动性能排查清单</h2>
        <table>
          <thead>
            <tr>
              <th>症状</th>
              <th>排查方向</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>快速滑动时掉帧</td><td>图片解码、阴影/圆角离屏渲染、复杂约束</td></tr>
            <tr><td>滑动时 CPU 飙升</td><td>主线程做了同步 IO 或大量计算</td></tr>
            <tr><td>Cell 内容闪烁</td><td>复用时未重置状态、异步加载未取消旧任务</td></tr>
            <tr><td>内存持续增长</td><td>图片缓存无上限、Cell 持有大对象未释放</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/collection-view"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← UICollectionView
        </Link>
        <Link
          to="/uikit/form-input"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：表单与输入 →
        </Link>
      </div>
    </div>
  );
}
