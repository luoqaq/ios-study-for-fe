import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function Animation() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🎬 UIKit 动画与转场</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        动画不是锦上添花，而是提升用户体验和界面连贯性的核心能力。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端做动画可以用 CSS transition/animation、GSAP、Framer Motion。
          iOS 中也有对应的层级：UIKit 动画 API → Core Animation → 更底层的 Core Graphics。
          日常业务开发中，UIKit 动画 API 已经覆盖了 80% 的场景。
        </p>

        <h2>UIView.animate：最常用的动画 API</h2>
        <p>
          这相当于前端 CSS 的 <code>transition</code>。你只需要告诉系统：
          "这个视图从 A 状态变到 B 状态，持续 0.3 秒，用缓动曲线"。
        </p>

        <CodeCompare
          title="淡入 + 移动动画"
          leftLang="swift"
          rightLang="css+js"
          leftCode={`// UIKit
UIView.animate(withDuration: 0.3, delay: 0, options: .curveEaseInOut) {
    self.boxView.alpha = 1.0
    self.boxView.center.y += 50
}`}
          rightCode={`/* CSS */
.box {
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: translateY(0);
}
.box.visible {
  opacity: 1;
  transform: translateY(50px);
}`}
        />

        <h2>常见动画属性</h2>
        <ul>
          <li><strong>alpha：</strong> 透明度（0 ~ 1）</li>
          <li><strong>frame / bounds / center：</strong> 位置、尺寸变化</li>
          <li><strong>transform：</strong> 旋转、缩放、位移（对应 CSS transform）</li>
          <li><strong>backgroundColor：</strong> 背景色过渡</li>
        </ul>

        <h2>页面转场动画</h2>
        <p>
          在前端，页面跳转动画通常由 React Transition Group 或 Vue Router 管理。
          UIKit 中可以通过自定义 <code>UINavigationControllerDelegate</code> 的转场动画来实现类似效果。
        </p>

        <TipBox type="tip" title="推荐先用系统默认转场">
          自定义转场虽然酷，但实现成本较高（需要实现 UIViewControllerAnimatedTransitioning 协议）。
          除非产品有明确的动效需求，否则 push/pop 用系统默认的就已经很流畅。
        </TipBox>

        <h2>Spring 动画：更自然的物理感</h2>
        <p>
          iOS 7 之后引入了 Spring 动画，可以模拟弹簧的阻尼效果，让交互更有质感：
        </p>
        <pre><code>{`UIView.animate(
    withDuration: 0.5,
    delay: 0,
    usingSpringWithDamping: 0.7,
    initialSpringVelocity: 0.5
) {
    self.button.transform = CGAffineTransform(scaleX: 1.2, y: 1.2)
}`}</code></pre>

        <h2>动画性能注意事项</h2>
        <ul>
          <li>动画过程中避免在主线程执行大量计算</li>
          <li>避免在 <code>layoutSubviews</code> 中触发复杂布局</li>
          <li>阴影、圆角、蒙层等属性动画容易触发离屏渲染，低端机上会掉帧</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/practice/form-app"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 表单实战案例
        </Link>
        <Link
          to="/uikit/practice/animation-app"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          实战：动画案例 →
        </Link>
      </div>
    </div>
  );
}
