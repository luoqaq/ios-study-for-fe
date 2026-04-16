import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function GcdPractical() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">⚙️ 多线程与 GCD 实战</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        不止会 dispatch_async，还要会组合、同步、限流和排错。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端处理并发用 Promise.all、async/await、Web Workers。
          iOS 中除了 Swift 的现代并发，老项目和底层优化仍然大量使用 GCD（Grand Central Dispatch）。
        </p>

        <h2>1. Dispatch Group：等待多个任务完成</h2>
        <p>
          对应前端的 <code>Promise.all</code>。当你需要并发下载三张图片，等全部完成后再更新 UI 时：
        </p>

        <CodeCompare
          title="并发任务组"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`let group = DispatchGroup()

for url in imageURLs {
    group.enter()
    downloadImage(url) {
        group.leave()
    }
}

group.notify(queue: .main) {
    print("全部下载完成，更新 UI")
}`}
          rightCode={`const promises = imageURLs.map(url => downloadImage(url));
Promise.all(promises).then(() => {
    console.log("全部下载完成，更新 UI");
});`}
        />

        <h2>2. Dispatch Barrier：读写锁的轻量替代</h2>
        <p>
          多个线程同时读写同一个数组或字典会导致崩溃。Dispatch Barrier 可以在并发队列中插入“独占写”操作，
          保证写的时候没有其他线程在读或写。
        </p>

        <TipBox type="warning" title="Swift 的 Array/Dict 不是线程安全的">
          和前端单线程模型不同，iOS 的多线程非常普遍。任何在多个线程中共享的可变状态都需要同步保护。
        </TipBox>

        <h2>3. Semaphore：控制并发数量</h2>
        <p>
          对应前端请求库里的 maxConcurrentRequests。比如你想限制同时只发起 3 个网络请求：
        </p>
        <pre><code>{`let semaphore = DispatchSemaphore(value: 3)

for request in requests {
    DispatchQueue.global().async {
        semaphore.wait()
        performRequest(request)
        semaphore.signal()
    }
}`}</code></pre>

        <h2>4. 死锁陷阱</h2>
        <p>
          最常见的死锁是在主线程里执行 <code>dispatch_sync(dispatch_get_main_queue())</code>：
          主线程正在等这个同步任务完成，但这个任务又在排队等主线程执行它——互相等待，永远卡住。
        </p>

        <h2>GCD 到 Swift Concurrency 的迁移</h2>
        <ul>
          <li>简单的 async + 主线程回调 → 直接用 async/await</li>
          <li>Dispatch Group → 用 withTaskGroup</li>
          <li>Dispatch Barrier → 用 actor 隔离</li>
          <li>Semaphore 限流 → Task 的优先级和并发控制</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/distribution"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 签名、打包与发布
        </Link>
        <Link
          to="/advanced/core-animation"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Core Animation →
        </Link>
      </div>
    </div>
  );
}
