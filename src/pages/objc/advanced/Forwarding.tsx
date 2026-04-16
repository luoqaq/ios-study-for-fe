import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Forwarding() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📨 Objective-C 消息转发机制</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Runtime 的“最后一道防线”：找不到方法时，系统还能抢救一下。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>消息发送失败后的三部曲</h2>
        <p>
          当 <code>objc_msgSend</code> 在类的方法列表里找不到对应的 selector 时，
          程序并不会立刻崩溃。Runtime 会开启一个挽救流程，给对象三次机会：
        </p>
        <ol>
          <li><strong>动态方法解析：</strong> <code>+resolveInstanceMethod:</code> / <code>+resolveClassMethod:</code> —— 允许你动态添加方法实现</li>
          <li><strong>备援接收者：</strong> <code>-forwardingTargetForSelector:</code> —— 把这个消息转交给另一个对象处理</li>
          <li><strong>完整消息转发：</strong> <code>-methodSignatureForSelector:</code> → <code>-forwardInvocation:</code> —— 打包成 NSInvocation，自己决定怎么处理</li>
        </ol>

        <h2>动态方法解析：现场造方法</h2>
        <p>
          如果你调用了一个不存在的方法，但你在 <code>resolveInstanceMethod</code> 里
          用 <code>class_addMethod</code> 临时加上一个 IMP，程序就能继续跑。
          这是很多“热修复”、“动态埋点”框架的底层原理之一。
        </p>

        <h2>备援接收者：甩锅给别人</h2>
        <p>
          <code>forwardingTargetForSelector:</code> 更简单：
          你告诉 Runtime "这个方法我不会处理，你去找那个对象"。
          这有点类似代理模式，但发生在 Runtime 层面。
        </p>
        <pre><code>{`// 把未知方法转发给 helper 对象
- (id)forwardingTargetForSelector:(SEL)aSelector {
    if ([self.helper respondsToSelector:aSelector]) {
        return self.helper;
    }
    return [super forwardingTargetForSelector:aSelector];
}`}</code></pre>

        <h2>完整消息转发：最后的自由</h2>
        <p>
          如果前两步都没处理，Runtime 会调用 <code>methodSignatureForSelector:</code> 获取方法签名，
          然后封装一个 <code>NSInvocation</code> 传给 <code>forwardInvocation:</code>。
          在这里你可以：修改参数、转发给多个对象、记录日志、或者直接忽略。
        </p>

        <TipBox type="warning" title="消息转发是双刃剑">
          它很强大，但滥用会让调用栈变得极其难以追踪。
          生产环境中，动态解析和消息转发通常只在框架层、AOP、热修等基础设施中使用，
          业务代码应尽量避免。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/runtime-deep"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Runtime 消息机制深入
        </Link>
        <Link
          to="/objc-maintenance/advanced/cocoapods"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：CocoaPods →
        </Link>
      </div>
    </div>
  );
}
