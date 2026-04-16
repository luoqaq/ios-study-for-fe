import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function CoreAnimation() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🎨 Core Animation 与自定义绘制</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        当 UIKit 控件满足不了你的设计需求时，就要下沉到 CALayer 和 Core Graphics。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端可以用 HTML5 Canvas、SVG、WebGL 做自定义绘制。
          iOS 中对应的是 <strong>Core Graphics</strong>（2D 绘制）和 <strong>Core Animation</strong>（图层动画）。
        </p>

        <h2>UIView vs CALayer</h2>
        <p>
          每个 <code>UIView</code> 背后都有一个 <code>CALayer</code> 负责真正渲染。
          UIView 处理事件和布局，CALayer 处理显示和动画。当你需要：
        </p>
        <ul>
          <li>圆角 + 阴影 + 边框组合优化</li>
          <li>3D 变换（CATransform3D）</li>
          <li>非矩形裁剪、遮罩</li>
          <li>离屏渲染控制</li>
        </ul>
        <p>这时候直接操作 CALayer 比 UIView 更高效。</p>

        <h2>自定义绘制：draw(_:)</h2>
        <p>
          继承 <code>UIView</code> 并重写 <code>draw(_ rect: CGRect)</code>，
          在 Core Graphics 上下文中画线条、文字、图形。这在画图表、画自定义进度条、画手写板时非常有用。
        </p>

        <TipBox type="tip" title="尽量避免频繁触发 draw">
          <code>draw(_:)</code> 是 CPU 绘制，调用成本高。如果只是移动、缩放、透明度变化，优先用 CALayer 的属性动画，
          它可以交给 GPU 处理，性能更好。
        </TipBox>

        <h2>离屏渲染（Off-screen Rendering）</h2>
        <p>
          某些 CALayer 效果（如圆角 + 遮罩、阴影、模糊）需要先在离屏缓冲区计算，再输出到屏幕。
          这在低端设备上会导致掉帧。优化思路：
        </p>
        <ul>
          <li>用预渲染的图片代替实时圆角</li>
          <li>调整 shadowPath 避免实时计算阴影轮廓</li>
          <li>用 layer 的 cornerRadius 时，避免同时设置 masksToBounds</li>
        </ul>

        <h2>什么时候该下沉到这一层</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐技术</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>简单的位移动画、淡入淡出</td><td>UIView.animate</td></tr>
            <tr><td>复杂的组合动画、图层特效</td><td>Core Animation</td></tr>
            <tr><td>自定义图表、画板、签名板</td><td>Core Graphics + draw(_:)</td></tr>
            <tr><td>高性能游戏、3D 渲染</td><td>Metal / SceneKit</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/gcd-practical"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 多线程与 GCD 实战
        </Link>
        <Link
          to="/advanced/security"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：App 安全 →
        </Link>
      </div>
    </div>
  );
}
