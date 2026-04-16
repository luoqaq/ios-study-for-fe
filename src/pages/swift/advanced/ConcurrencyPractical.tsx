import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function ConcurrencyPractical() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">⚡ 并发与数据竞争排查</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        async/await 让代码变简洁了，但多线程的坑一个都没少。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          JavaScript 是单线程事件循环，除了 Web Worker，你几乎不会遇到真正的数据竞争。
          Swift 的并发模型是多线程的，多个 Task 可能同时读写同一块内存，
          如果没有正确隔离，轻则数据错乱，重则崩溃。
        </p>

        <h2>数据竞争 (Data Race) 是什么</h2>
        <p>
          当两个或多个线程同时访问同一个变量，且至少一个是写操作时，就会发生数据竞争。
          结果不可预测：有时能跑通，有时数据错乱，有时直接崩溃。
        </p>

        <h2>Actor：Swift 的线程隔离器</h2>
        <p>
          Swift 引入了 <code>actor</code> 关键字，把可变状态封装在一个隔离域中。
          所有对 actor 内部状态的访问都必须通过 <code>await</code> 串行化执行，
          编译器会帮你防止数据竞争。
        </p>

        <CodeCompare
          title="用 Actor 保护共享状态"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`actor Counter {
    private var value = 0
    
    func increment() {
        value += 1
    }
    
    func getValue() -> Int {
        return value
    }
}

let counter = Counter()

// 并发调用
Task {
    await counter.increment()
}
Task {
    await counter.increment()
}`}
          rightCode={`// JS 单线程，不需要 Actor
class Counter {
    value = 0;
    increment() { this.value++; }
}

const counter = new Counter();
counter.increment();
counter.increment();`}
        />

        <h2>Sendable：跨线程传递的安全类型</h2>
        <p>
          编译器会检查你传给 Task 或 actor 的数据是否是 <code>Sendable</code>。
          值类型（struct、enum）默认就是 Sendable；引用类型（class）需要显式遵循 <code>@unchecked Sendable</code> 或确保不可变。
        </p>

        <TipBox type="warning" title="不要在 actor 外部直接修改 actor 内的属性">
          如果你尝试在 actor 外面直接 <code>counter.value = 10</code>，编译器会直接报错。
          这正是 actor 设计的价值：把并发错误从运行期转移到编译期。
        </TipBox>

        <h2>排查数据竞争的工具</h2>
        <ul>
          <li><strong>Thread Sanitizer：</strong> 在 Scheme 中开启，运行时自动检测数据竞争和线程安全问题</li>
          <li><strong>Instruments - Race Condition：</strong> 更底层的竞争检测</li>
          <li><strong>编译器警告：</strong> Swift 6 模式会对非隔离的共享可变状态报出更多并发安全警告</li>
        </ul>

        <h2>并发最佳实践</h2>
        <ul>
          <li>优先使用 actor 管理共享可变状态</li>
          <li>尽量把数据设计成值类型（struct），天然线程安全</li>
          <li>避免在多个 Task 中直接操作同一个 class 实例的属性</li>
          <li>在主线程只更新 UI，把耗时操作交给后台 Task</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/concurrency"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 并发 async/await
        </Link>
        <Link
          to="/swift/advanced/error-handling"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：错误处理 →
        </Link>
      </div>
    </div>
  );
}
