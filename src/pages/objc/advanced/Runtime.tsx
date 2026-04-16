import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function RuntimeIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 Runtime 入门</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        想真正看懂 Objective-C 老项目，Runtime 基本绕不过去。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>它在解决什么问题</h2>
        <p>
          Objective-C 不是把所有行为都在编译期钉死，而是把“类、方法、消息”
          很多能力保留到了运行期。这也是它为什么灵活、也为什么容易变复杂。
        </p>

        <h2>你会在老项目里看到什么</h2>
        <ul>
          <li>动态添加方法</li>
          <li>消息转发</li>
          <li>Method Swizzling</li>
          <li>关联对象</li>
          <li>埋点、AOP、热修类逻辑</li>
        </ul>

        <TipBox type="warning" title="先理解原理，再碰技巧">
          Runtime 最容易学歪的方式，就是上来就背几个黑魔法 API。正确顺序应该是：先理解消息发送和类结构，再去看 Swizzling、关联对象这些技巧。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/mixed-project"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← OC / Swift 混编
        </Link>
        <Link
          to="/objc-maintenance/advanced/runtime-deep"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Runtime 消息机制深入 →
        </Link>
      </div>
    </div>
  );
}
