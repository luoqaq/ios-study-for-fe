import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function RuntimeDeep() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">⚙️ Runtime 消息机制深入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Objective-C 的灵活来自于“运行时决定一切”。理解消息发送，才能看懂那些黑魔法。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>不是方法调用，是消息发送</h2>
        <p>
          在 Objective-C 中，<code>[obj doSomething]</code> 并不是像 C++ 那样的静态函数调用，
          而是被编译器转换为 <code>objc_msgSend(obj, @selector(doSomething))</code>。
          这意味着：方法调用的目标和方法名，在运行时才被解析。
        </p>

        <h2>消息发送的三部曲</h2>
        <ol>
          <li><strong>查找 IMP：</strong> 根据 selector 在对象的类方法缓存中查找对应的函数指针 (IMP)</li>
          <li><strong>动态解析：</strong> 如果没找到，进入 <code>resolveInstanceMethod:</code>，允许你动态添加方法</li>
          <li><strong>消息转发：</strong> 如果动态解析也没处理，进入消息转发流程（<code>forwardingTargetForSelector:</code> → <code>methodSignatureForSelector:</code> → <code>forwardInvocation:</code>）</li>
        </ol>

        <h2>isa 指针与类对象</h2>
        <p>
          每个 OC 对象都有一个 <code>isa</code> 指针，指向它的类对象。
          类对象里存放着方法列表、属性列表、协议列表等元数据。
          类对象本身也是一个对象，它的 isa 指向元类 (meta-class)。
        </p>

        <TipBox type="tip" title="Runtime API 是排查老项目的利器">
          用 <code>class_copyMethodList</code>、<code>method_exchangeImplementations</code>、<code>objc_setAssociatedObject</code> 等 API，
          可以在运行时查看、修改、扩展类的行为。这也是很多埋点、热修、AOP 框架的底层基础。
        </TipBox>

        <h2>Method Swizzling 的原理</h2>
        <p>
          Swizzling 本质上是交换两个 selector 对应的 IMP。
          比如在 <code>+load</code> 方法中，把 <code>viewDidLoad</code> 的 IMP 换成自己的实现，
          在自己的实现里调用原实现，从而在不侵入业务代码的情况下插入逻辑。
        </p>

        <TipBox type="warning" title="Swizzling 是双刃剑">
          它能实现无侵入埋点和热修，但也让调用栈变得难以追踪，调试困难。
          只在框架层或基础库中使用，不要滥用。
        </TipBox>

        <h2>学习 Runtime 的正确顺序</h2>
        <ol>
          <li>先理解对象模型（isa、类对象、元类）</li>
          <li>再理解消息发送流程（objc_msgSend → 查找 IMP → 动态解析 → 转发）</li>
          <li>最后才看 Swizzling、关联对象等工程技巧</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/runtime"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Runtime 入门
        </Link>
        <Link
          to="/objc-maintenance/advanced/forwarding"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：消息转发机制 →
        </Link>
      </div>
    </div>
  );
}
