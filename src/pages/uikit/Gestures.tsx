import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function Gestures() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">👆 手势与触摸事件</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从点击、滑动到捏合旋转，理解 iOS 的响应链与手势识别器。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端处理交互很简单：给 DOM 元素绑定 <code>onClick</code>、<code>onTouchStart</code>、<code>onTouchMove</code> 即可。
          iOS 中则有两套并行的体系：
          <strong>UIGestureRecognizer（手势识别器）</strong> 和 <strong>底层 touches 方法</strong>。
          前者封装了常见手势逻辑，后者则让你在 UIView 中直接接管原始触摸事件。
        </p>

        <h2>UIGestureRecognizer：常用六兄弟</h2>
        <p>iOS 提供了六种内置手势识别器，覆盖了绝大多数业务场景：</p>
        <table>
          <thead>
            <tr>
              <th>手势识别器</th>
              <th>对应交互</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>UITapGestureRecognizer</code></td><td>轻点（单击/双击）</td></tr>
            <tr><td><code>UIPanGestureRecognizer</code></td><td>拖拽、滑动</td></tr>
            <tr><td><code>UIPinchGestureRecognizer</code></td><td>双指捏合缩放</td></tr>
            <tr><td><code>UIRotationGestureRecognizer</code></td><td>双指旋转</td></tr>
            <tr><td><code>UISwipeGestureRecognizer</code></td><td>快速轻扫（方向固定）</td></tr>
            <tr><td><code>UILongPressGestureRecognizer</code></td><td>长按</td></tr>
          </tbody>
        </table>

        <CodeCompare
          title="添加点击手势"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift: 给 UIImageView 添加双击缩放
let tap = UITapGestureRecognizer(
    target: self, 
    action: #selector(handleDoubleTap(_:))
)
tap.numberOfTapsRequired = 2
imageView.isUserInteractionEnabled = true
imageView.addGestureRecognizer(tap)

@objc func handleDoubleTap(_ gesture: UITapGestureRecognizer) {
    print("双击了图片")
}`}
          rightCode={`// React: 给 img 添加 onDoubleClick
function ImageViewer() {
    const handleDoubleClick = () => {
        console.log("双击了图片");
    };
    
    return (
        <img 
            src="photo.jpg" 
            onDoubleClick={handleDoubleClick}
            style={{ userSelect: 'none' }}
        />
    );
}`}
        />

        <h2>拖拽手势：PanGesture</h2>
        <p>
          <code>UIPanGestureRecognizer</code> 常用于拖拽视图、侧滑菜单、下拉刷新等交互。
          通过 <code>translation(in:)</code> 获取位移，<code>velocity(in:)</code> 获取速度，
          <code>setTranslation(.zero, in: view)</code> 重置偏移量。
        </p>

        <pre><code className="language-swift">{`@objc func handlePan(_ gesture: UIPanGestureRecognizer) {
    let translation = gesture.translation(in: view)
    gesture.view?.center = CGPoint(
        x: gesture.view!.center.x + translation.x,
        y: gesture.view!.center.y + translation.y
    )
    // 重置，否则 translation 会累加
    gesture.setTranslation(.zero, in: view)
}`}</code></pre>

        <h2>手势冲突与 Simultaneous Recognition</h2>
        <p>
          当一个 View 上同时存在多个手势时（比如 ScrollView 嵌套了 pinch 和 pan），
          它们可能会互相冲突。你可以通过 <code>UIGestureRecognizerDelegate</code> 控制它们是否同时识别。
        </p>

        <TipBox type="warning" title="ScrollView 默认会拦截子视图的手势">
          如果你在 UIScrollView 的子视图上添加了 PanGesture，可能会发现子视图拖不动。
          这是因为 ScrollView 的 PanGesture 会优先响应。需要通过 Delegate 方法协调。
        </TipBox>

        <h2>底层触摸事件：touchesBegan / Moved / Ended</h2>
        <p>
          如果你要做自定义绘图、手写签名、游戏摇杆等高级交互，手势识别器的粒度就不够了。
          这时需要重写 UIView 的四个 touches 方法：
        </p>
        <ul>
          <li><code>touchesBegan(_:with:)</code>：手指按下</li>
          <li><code>touchesMoved(_:with:)</code>：手指移动</li>
          <li><code>touchesEnded(_:with:)</code>：手指抬起</li>
          <li><code>touchesCancelled(_:with:)</code>：手势被系统中断（如来电）</li>
        </ul>

        <CodeCompare
          title="底层触摸 vs 前端 TouchEvent"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`class DrawingView: UIView {
    override func touchesMoved(
        _ touches: Set<UITouch>, 
        with event: UIEvent?
    ) {
        guard let touch = touches.first else { return }
        let point = touch.location(in: self)
        // 收集点并绘制路径
    }
}`}
          rightCode={`function DrawingCanvas() {
    const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const point = { x: touch.clientX, y: touch.clientY };
        // 收集点并绘制路径
    };
    
    return <canvas onTouchMove={handleTouchMove} />;
}`}
        />

        <h2>响应链（Responder Chain）</h2>
        <p>
          iOS 中的事件传递遵循响应链机制：
          触摸事件首先由 UIApplication 传给 UIWindow，再递归传递给最上层合适的 UIView（Hit-Test）。
          如果该 View 不处理事件，它会沿着 nextResponder 向上传递给父视图或 ViewController。
        </p>
        <p>
          理解响应链对于排查"点了没反应"、"手势被拦截"等问题至关重要。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/form-validation"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 键盘与表单校验
        </Link>
        <Link
          to="/uikit/animation"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：动画与转场 →
        </Link>
      </div>
    </div>
  );
}
