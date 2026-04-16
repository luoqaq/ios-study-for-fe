import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function MemoryDebug() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🐛 OC 内存泄漏实战排查</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从 Instruments 报红到代码修复，完整走一遍老项目的内存排雷流程。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端有 V8 的垃圾回收器兜底，循环引用通常不会导致真正的内存泄漏。
          Objective-C 的 ARC 虽然自动管理引用计数，但 Block 捕获、Delegate 未设 weak、
          NSTimer 持有 self 等场景，都是老项目中内存泄漏的高发区。
        </p>

        <h2>排查流程四步走</h2>
        <ol>
          <li><strong>发现泄漏：</strong> 用 Instruments 的 Leaks 模板运行 App，操作核心流程（进入页面 → 返回 → 重复）</li>
          <li><strong>定位对象：</strong> 查看泄漏列表中的类名，找到对应的 ViewController 或自定义对象</li>
          <li><strong>分析引用链：</strong> 查看 Cycles & Roots，找出是谁在强引用这个对象</li>
          <li><strong>修复验证：</strong> 改成 weak、断开循环引用、清理定时器，再次运行 Leaks 确认消除</li>
        </ol>

        <h2>场景 1：Block 强引用 self</h2>
        <p>
          这是最常见的泄漏原因。Controller 持有 Block，Block 内部又强引用了 self，
          形成经典的“死亡拥抱”。
        </p>
        <pre><code>{`// 错误写法
self.completionBlock = ^{
    [self doSomething];
};

// 正确写法
__weak typeof(self) weakSelf = self;
self.completionBlock = ^{
    __strong typeof(weakSelf) strongSelf = weakSelf;
    if (strongSelf) {
        [strongSelf doSomething];
    }
};`}</code></pre>

        <h2>场景 2：Delegate 未声明 weak</h2>
        <p>
          如果自定义协议属性写成了 <code>@property (nonatomic, strong) id&lt;MyDelegate&gt; delegate;</code>，
          而 delegate 的实现方又持有这个对象，循环引用就产生了。
          <strong>所有 delegate 都应该用 weak。</strong>
        </p>

        <h2>场景 3：NSTimer / CADisplayLink 未释放</h2>
        <p>
          NSTimer 会强引用它的 target。如果在 <code>dealloc</code> 里忘记 <code>invalidate</code>，
          Timer 会永远持有 Controller，导致页面消失了但内存没释放。
        </p>

        <TipBox type="tip" title="在 dealloc 里打日志验证释放">
          给怀疑有泄漏的类加上 <code>{`- (void)dealloc { NSLog(@"%s", __func__); }`}</code>，
          如果页面返回后没有打印，说明对象没被释放，泄漏存在。
        </TipBox>

        <h2>场景 4：NSNotification 未移除</h2>
        <p>
          iOS 9 之前，通知中心会强引用观察者。如果页面销毁前没调用 <code>removeObserver:</code>，
          下次通知发来时可能访问已释放的对象，直接崩溃。
          虽然现在系统会自动处理，但显式移除仍然是好习惯。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/memory/retain-cycle"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 循环引用
        </Link>
        <Link
          to="/objc-maintenance/advanced/kvc"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：KVC →
        </Link>
      </div>
    </div>
  );
}
