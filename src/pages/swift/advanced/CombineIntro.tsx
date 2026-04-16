import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function CombineIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🌊 Combine 响应式编程入门</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Apple 官方的响应式框架，RxSwift 的继任者。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端有 RxJS、Vue 的响应式系统、React 的 useEffect 依赖追踪。
          iOS 中，Apple 在 iOS 13 推出了 <strong>Combine</strong>，
          用 Publisher（发布者）和 Subscriber（订阅者）来建模异步事件流。
        </p>

        <h2>核心概念：Publisher + Subscriber</h2>
        <p>
          Publisher 负责产生事件（值或错误），Subscriber 负责接收并处理。
          只有订阅发生后，事件流才开始流动。
        </p>

        <CodeCompare
          title="简单的 Publisher 订阅"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`import Combine

// 一个发布整数的发布者
let publisher = [1, 2, 3].publisher

// 订阅并打印
let cancellable = publisher
    .sink(receiveValue: { value in
        print(value)
    })

// 输出: 1 2 3`}
          rightCode={`import { from } from 'rxjs';

const publisher = from([1, 2, 3]);

const subscription = publisher.subscribe({
    next: (value) => console.log(value)
});

// 输出: 1 2 3`}
        />

        <h2>操作符：map、filter、debounce</h2>
        <p>
          和 RxJS 一样，Combine 提供了丰富的操作符来转换事件流：
        </p>
        <ul>
          <li><code>map</code>：转换值</li>
          <li><code>filter</code>：过滤值</li>
          <li><code>debounce</code>：防抖，常用于搜索输入</li>
          <li><code>merge</code>：合并多个 Publisher</li>
          <li><code>combineLatest</code>：多个流最新值的组合</li>
        </ul>

        <CodeCompare
          title="搜索输入防抖"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`searchTextPublisher
    .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
    .removeDuplicates()
    .flatMap { query in
        searchAPI(query: query)
    }
    .sink(receiveValue: { results in
        self.results = results
    })`}
          rightCode={`searchText$
    .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => searchAPI(query))
    )
    .subscribe(results => {
        this.results = results;
    });`}
        />

        <h2>内存管理：AnyCancellable</h2>
        <p>
          订阅会返回一个 <code>AnyCancellable</code> 对象，必须被持有，否则订阅会立即释放。
          在 SwiftUI 中通常把 Cancellable 存到 Set 里；在 UIKit 的 ViewModel 中也类似。
        </p>

        <TipBox type="info" title="Combine 与 async/await 的关系">
          Combine 适合处理持续的事件流（用户输入、KVO、通知中心）。
          一次性的异步任务（如单次网络请求）用 async/await 更简洁。
          两者可以互相转换：Publisher 有 <code>.values</code> 属性可以得到 AsyncSequence。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/property-wrapper"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 属性包装器
        </Link>
        <Link
          to="/swift/swiftui/intro"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：SwiftUI 简介 →
        </Link>
      </div>
    </div>
  );
}
