import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Concurrency() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 并发 async/await</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        告别嵌套回调，用写同步代码的方式写异步。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="⏳"
          title="和 ES2017 的 async/await 理念几乎完全一致"
          description="Swift 在 5.5 版本（iOS 15）终于引入了原生的 async/await 支持，这也是现代编程语言处理并发的标配。"
          frontend-ref="使用方式完全等同于 JavaScript 的 `async function` 和 `await promise`。"
        />

        <h2>基础异步函数</h2>
        <p>
          在传统的 iOS 开发中（不论是 OC 还是早期的
          Swift），网络请求、读写文件等耗时操作都是通过传递一个
          Block（闭包）作为回调（Callback）来处理。这往往会导致臭名昭著的回调地狱（Callback
          Hell）。
        </p>
        <p>
          现在，你只需要在函数返回箭头 <code>-&gt;</code> 的前面加上{" "}
          <code>async</code> 关键字。
        </p>

        <CodeCompare
          title="定义并调用异步函数"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 1. 定义异步函数 (async 加在箭头前面)
func fetchUserData() async throws -> String {
    // 模拟网络延迟 (相当于 setTimeout 或 delay)
    try await Task.sleep(nanoseconds: 1_000_000_000)
    return "User: John Doe"
}

// 2. 在另一个异步上下文中调用
func showUser() async {
    do {
        // await 等待结果 (try 用于处理可能抛出的错误)
        let name = try await fetchUserData()
        print("获取到了: \\(name)")
    } catch {
        print("出错了: \\(error)")
    }
}`}
          rightCode={`// TypeScript
// 1. 定义异步函数 (返回 Promise)
async function fetchUserData(): Promise<string> {
    // 模拟网络延迟
    await new Promise(r => setTimeout(r, 1000));
    return "User: John Doe";
}

// 2. 调用异步函数
async function showUser() {
    try {
        // await 等待 Promise 解决
        const name = await fetchUserData();
        console.log(\`获取到了: \${name}\`);
    } catch (error) {
        console.log(\`出错了: \${error}\`);
    }
}`}
        />

        <TipBox type="tip" title="注意 throws 和 try">
          在 Swift 中，如果异步操作（如网络请求）可能会失败，不仅要标记{" "}
          <code>async</code>，还要标记 <code>throws</code>。所以在调用时必须写{" "}
          <code>try await</code>。这比 JS 中仅仅返回一个被拒绝的 Promise
          语义更加清晰。
        </TipBox>

        <h2>并行执行多个异步任务</h2>
        <p>
          在 JavaScript 中，如果我们需要同时发起 3
          个网络请求，等它们全部完成后再继续，我们会使用{" "}
          <code>Promise.all()</code>。在 Swift 中，这通过 <code>async let</code>{" "}
          语法来实现，非常直观。
        </p>

        <CodeCompare
          title="并发等待 (Promise.all)"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
func fetchThreeImages() async throws -> [Image] {
    // 1. 同时发起三个异步请求 (不写 await)
    // 此时三个任务在后台并行执行
    async let firstPhoto = downloadPhoto(named: "photo1")
    async let secondPhoto = downloadPhoto(named: "photo2")
    async let thirdPhoto = downloadPhoto(named: "photo3")
    
    // 2. 在需要用到结果的地方一起 await
    // 相当于隐式的 Promise.all
    let photos = try await [firstPhoto, secondPhoto, thirdPhoto]
    return photos
}`}
          rightCode={`// TypeScript
async function fetchThreeImages(): Promise<Image[]> {
    // 1. 发起三个异步请求 (得到的是 Promise 对象)
    const p1 = downloadPhoto("photo1");
    const p2 = downloadPhoto("photo2");
    const p3 = downloadPhoto("photo3");
    
    // 2. 使用 Promise.all 等待全部完成
    const photos = await Promise.all([p1, p2, p3]);
    return photos;
}`}
        />

        <h2>在同步代码中启动异步任务</h2>
        <p>
          很多时候，我们需要在按钮点击事件（比如 <code>viewDidLoad</code> 或者是
          SwiftUI 的 <code>.onAppear</code>
          ，它们都是同步函数）里触发一个异步网络请求。
          <br />在 JS 中，你可以在普通函数里直接调用 <code>
            fetch().then()
          </code>{" "}
          或者直接调用一个 async 函数（虽然它会立刻返回 Promise）。 但在 Swift
          中，<strong>编译器严格禁止你在同步代码里调用异步函数</strong>。
        </p>
        <p>
          你需要使用 <code>Task</code> 包装一个全新的并发上下文：
        </p>

        <CodeCompare
          title="Task 包裹"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
class ProfileViewController: UIViewController {
    // 这是一个普通的同步函数
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // ❌ 错误：不能在这里写 await
        // let data = await fetchData()
        
        // ✅ 正确：开辟一个新的异步任务
        Task {
            let data = await fetchData()
            // 拿到数据后更新 UI
        }
    }
}`}
          rightCode={`// TypeScript / React
function Profile() {
    useEffect(() => {
        // useEffect 接收的是同步回调
        
        // ❌ 不推荐把回调直接写成 async
        
        // ✅ 习惯做法是声明并在内部调用
        const run = async () => {
            const data = await fetchData();
            // 拿到数据后更新 UI
        };
        run();
    }, []);
}`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/closure"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 闭包 Closure
        </Link>
        <Link
          to="/swift/advanced/error-handling"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：错误处理 →
        </Link>
      </div>
    </div>
  );
}
