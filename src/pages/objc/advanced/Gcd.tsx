import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function Gcd() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 GCD 并发调度</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        老项目里最常见的并发模型之一。看不懂 GCD，很多异步代码都很难维护。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>先抓住它在解决什么问题</h2>
        <p>
          GCD（Grand Central Dispatch）解决的是：哪些任务放主线程，哪些任务放后台，后台跑完后怎么切回主线程更新 UI。
        </p>

        <CodeCompare
          title="后台执行，再切回主线程"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSData *data = [self heavyWork];

    dispatch_async(dispatch_get_main_queue(), ^{
        self.result = data;
        [self.tableView reloadData];
    });
});`}
          rightCode={`setTimeout(async () => {
  const data = await heavyWork();

  setResult(data);
  render();
}, 0);`}
        />

        <h2>为什么它在老项目里到处都是</h2>
        <ul>
          <li>Swift async/await 是后来的，很多旧代码比它早很多年。</li>
          <li>网络、磁盘、图片处理、数据库、埋点等异步任务全会碰到线程切换。</li>
          <li>很多内存问题、UI 崩溃问题本质上也是线程问题。</li>
        </ul>

        <TipBox type="warning" title="最重要的一条铁律">
          UI 更新必须回到主线程。你在后台线程里改界面，轻则警告，重则崩溃。
        </TipBox>

        <h2>学习重点</h2>
        <ol>
          <li>主队列和全局并发队列区别。</li>
          <li>`dispatch_async` 和 `dispatch_sync` 区别。</li>
          <li>为什么主线程同步派发会死锁。</li>
          <li>什么时候历史代码可以迁移到 Swift async/await。</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/notification"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 通知中心
        </Link>
        <Link
          to="/objc-maintenance/advanced/mixed-project"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：OC / Swift 混编 →
        </Link>
      </div>
    </div>
  );
}
