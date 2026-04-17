import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function AnimationApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🎬 实战：UIKit 动画案例</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从点赞动效到页面转场，用动画提升用户体验。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>案例 1：点赞按钮缩放动效</h2>
        <p>
          点击爱心图标时，先放大再弹回，给用户明确的触觉反馈。
          这是 UIView 动画 API 最经典的用法。
        </p>

        <CodeCompare
          title="点赞动画"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`@objc func handleLikeTap() {
    let isLiked = !likeButton.isSelected
    likeButton.isSelected = isLiked
    
    UIView.animate(withDuration: 0.15, delay: 0, options: .curveEaseIn) {
        self.likeButton.transform = CGAffineTransform(scaleX: 1.3, y: 1.3)
    } completion: { _ in
        UIView.animate(withDuration: 0.15, delay: 0, options: .curveEaseOut) {
            self.likeButton.transform = .identity
        }
    }
}`}
          rightCode={`function handleLikeTap() {
    const btn = document.querySelector('.like-btn');
    btn.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.3)' },
        { transform: 'scale(1)' }
    ], { duration: 300, easing: 'ease-in-out' });
}`}
        />

        <h2>案例 2：Cell 展开/收起高度</h2>
        <p>
          点击一个 TableView/CollectionView Cell 时，展开更多内容。
          只需要改变数据源中的高度值，然后调用 <code>UIView.animate</code> 配合 <code>layoutIfNeeded()</code>。
        </p>

        <pre><code className="language-swift">{`func toggleCellExpansion(at indexPath: IndexPath) {
    expandedRows.toggle(indexPath.row)
    
    UIView.animate(withDuration: 0.3) {
        self.tableView.beginUpdates()
        self.tableView.endUpdates()
    }
}`}</code></pre>

        <h2>案例 3：页面转场动画</h2>
        <p>
          使用自定义 <code>UIViewControllerAnimatedTransitioning</code> 实现一个从卡片放大到全屏的 Hero 动画：
        </p>
        <ol>
          <li>实现 <code>UIViewControllerAnimatedTransitioning</code> 协议</li>
          <li>在 <code>animateTransition(using:)</code> 中获取 fromView 和 toView</li>
          <li>创建过渡容器，把 toView 的初始 frame 设为和点击的卡片一样</li>
          <li>执行动画，把 toView 放大到全屏</li>
          <li>在 ViewController 中实现 <code>UIViewControllerTransitioningDelegate</code></li>
        </ol>

        <TipBox type="warning" title="自定义转场不要过度设计">
          自定义转场虽然炫酷，但容易引入手势返回冲突、状态栏闪烁、安全区域计算错误等问题。
          业务开发中，优先使用系统自带的 push、present、fade 动画，只在核心流程（如图片详情、商品页）使用自定义转场。
        </TipBox>

        <h2>案例 4：Skeleton 骨架屏</h2>
        <p>
          网络请求期间展示骨架屏，比空白页或转圈 Loading 体验更好。
          可以用一个带渐变动画的 <code>CAGradientLayer</code> 覆盖在占位视图上。
        </p>

        <pre><code className="language-swift">{`let gradient = CAGradientLayer()
gradient.colors = [
    UIColor.lightGray.cgColor,
    UIColor.white.cgColor,
    UIColor.lightGray.cgColor
]
gradient.locations = [0, 0.5, 1]
gradient.startPoint = CGPoint(x: 0, y: 0.5)
gradient.endPoint = CGPoint(x: 1, y: 0.5)

let animation = CABasicAnimation(keyPath: "locations")
animation.fromValue = [-1, -0.5, 0]
animation.toValue = [1, 1.5, 2]
animation.duration = 1.5
animation.repeatCount = .infinity
gradient.add(animation, forKey: "shimmer")`}</code></pre>

        <h2>动画选型速查</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐 API</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>按钮反馈、状态切换</td><td>UIView.animate</td></tr>
            <tr><td>连续动画、图层效果</td><td>Core Animation (CABasicAnimation)</td></tr>
            <tr><td>页面转场</td><td>UIViewControllerAnimatedTransitioning</td></tr>
            <tr><td>列表插入/删除</td><td>UITableView/UICollectionView 自带动画</td></tr>
            <tr><td>Lottie 复杂动画</td><td>lottie-ios 第三方库</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/animation"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 动画与转场
        </Link>
        <Link
          to="/uikit/tableview-optimization"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：TableView 性能优化 →
        </Link>
      </div>
    </div>
  );
}
