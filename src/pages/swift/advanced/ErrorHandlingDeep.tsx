import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function ErrorHandlingDeep() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 错误处理与 Result 类型深入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从 try/catch 到 Result，再到与 async/await 的结合。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>Result 类型：延迟错误处理</h2>
        <p>
          有时候你不想立刻写一大段 <code>do-catch</code>，而是想把"成功"或"失败"打包成一个值继续传递。
          Swift 标准库提供了 <code>Result&lt;Success, Failure&gt;</code> 枚举，专门解决这个问题。
        </p>

        <CodeCompare
          title="Result vs throws"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
enum NetworkError: Error {
    case badURL
    case noData
}

func fetchUser(completion: (Result<User, NetworkError>) -> Void) {
    guard let url = URL(string: "...") else {
        completion(.failure(.badURL))
        return
    }
    // 异步请求...
    completion(.success(user))
}

// 使用时可以用 switch 或链式方法
fetchUser { result in
    switch result {
    case .success(let user):
        print(user.name)
    case .failure(let error):
        print(error)
    }
}`}
          rightCode={`// TypeScript
function fetchUser(): Promise<User> { ... }

// Promise 本身已经是 Result 的等价物
fetchUser()
    .then(user => console.log(user.name))
    .catch(error => console.log(error));`}
        />

        <h2>Result 的链式操作</h2>
        <p>
          Result 支持 <code>map</code>、<code>flatMap</code>、<code>mapError</code> 等函数式操作，
          让你可以像处理 Optional 一样优雅地转换和组合结果：
        </p>
        <pre><code>{`let result: Result<String, Error> = .success("123")
let intResult = result.map { Int($0) }          // Result<Int?, Error>
let flatResult = result.flatMap { val in
    Int(val).map { .success($0) } ?? .failure(MyError.invalidNumber)
}`}</code></pre>

        <h2>throws 与 async/await 结合</h2>
        <p>
          Swift 的 async 函数可以直接标记为 <code>throws</code>，调用时用 <code>try await</code>：
        </p>
        <pre><code>{`func loadData() async throws -> Data {
    let (data, response) = try await URLSession.shared.data(from: url)
    return data
}

// 调用
do {
    let data = try await loadData()
} catch {
    print("加载失败: \\(error)")
}`}</code></pre>

        <TipBox type="info" title="Result 在 async/await 时代的定位">
          async/await 让直接 throws 变得非常优雅，Result 的使用场景变少了。
          但在回调式 API、 Combine 流、以及需要把错误作为值传递的场景中，Result 依然很有价值。
        </TipBox>

        <h2>自定义错误：LocalizedError 与 Recovery</h2>
        <p>
          如果你希望错误信息能直接展示给用户，或者支持可恢复操作，
          可以让错误枚举遵循 <code>LocalizedError</code> 或 <code>RecoverableError</code> 协议。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/error-handling"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 错误处理基础
        </Link>
        <Link
          to="/swift/advanced/property-wrapper"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：属性包装器 →
        </Link>
      </div>
    </div>
  );
}
