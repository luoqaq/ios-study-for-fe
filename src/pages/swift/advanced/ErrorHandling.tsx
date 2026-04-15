import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function ErrorHandling() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 错误处理</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        显式的异常处理机制：不再是隐藏的定时炸弹。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🚨"
          title="强制的 try / catch"
          description="在 JavaScript 中，任何函数都可以抛出错误 (throw Error)，而且调用者不知道它会抛出错误，往往在运行时崩溃。在 Swift 中，一个函数如果可能抛出错误，必须在声明时用 <code>throws</code> 标记，调用者必须用 <code>try</code> 来显式处理！"
          frontend-ref="这是一种强大的契约精神，甚至比 TypeScript 还要严格（TypeScript 无法在类型系统中强制要求捕获异常）。"
        />

        <h2>抛出错误 (Throws)</h2>
        <p>
          在 Swift 中，错误通常是一个遵循 <code>Error</code>{" "}
          协议的枚举。这让你能把所有可能出错的类型列举得清清楚楚。
        </p>

        <CodeCompare
          title="抛出一个自定义错误"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 1. 定义一个符合 Error 协议的枚举
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}

// 2. 声明一个会抛出错误的函数 (注意 -> 前面的 throws)
func vend(itemNamed name: String) throws {
    if name != "Candy" {
        // 使用 throw 抛出具体的枚举错误
        throw VendingMachineError.invalidSelection
    }
    print("Dispensing \\(name)")
}`}
          rightCode={`// TypeScript
// 1. 定义一些 Error 类 (或者直接扔字符串/对象)
class InvalidSelectionError extends Error {
    constructor() { super("无效选择"); }
}

// 2. TS 无法在签名上强制声明 throw，全靠注释或文档
function vend(name: string): void {
    if (name !== "Candy") {
        // 使用 throw 抛出对象
        throw new InvalidSelectionError();
    }
    console.log(\`Dispensing \${name}\`);
}`}
        />

        <h2>处理错误 (Try / Do-Catch)</h2>
        <p>
          当你调用一个被标记了 <code>throws</code> 的函数时，Swift
          编译器会强制你写 <code>try</code>，提醒你“这个调用可能会失败”。
        </p>

        <CodeCompare
          title="使用 Do-Catch 捕获错误"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
// 需要用 do { } 包裹，并配合 catch
do {
    // 调用可能会失败的函数，前面加上 try
    try vend(itemNamed: "Chips")
    print("购买成功！")
} catch VendingMachineError.invalidSelection {
    print("选择无效")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    // 还能顺便把关联值提取出来！
    print("还差 \\(coinsNeeded) 个硬币")
} catch {
    // 捕获所有其他未知的 Error
    print("未知错误: \\(error)")
}`}
          rightCode={`// TypeScript
try {
    // 在 JS/TS 中，try 前面不需要加任何修饰符
    vend("Chips");
    console.log("购买成功！");
} catch (error) {
    // catch 到的 error 类型是 unknown/any
    // 必须用 instanceof 手动判断
    if (error instanceof InvalidSelectionError) {
        console.log("选择无效");
    } else {
        console.log(\`未知错误: \${error}\`);
    }
}`}
        />

        <h2>将错误转化为可选型 (try?)</h2>
        <p>
          这是 Swift 提供的一个非常棒的语法糖：
          <strong>
            我不在乎具体出了什么错误，我只在乎它有没有成功。如果失败了，直接给我一个{" "}
            <code>nil</code> 就行。
          </strong>{" "}
          这在网络请求或者 JSON 解析时极其常用，能省下大段的{" "}
          <code>do-catch</code> 代码。
        </p>

        <CodeCompare
          title="try? 的优雅"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 如果 vend 抛出错误，result 就是 nil
// 如果成功，result 就是函数的返回值（这里是 Void?）
let result = try? vend(itemNamed: "Candy")

// 更常见的场景：配合 if let 使用！
// 如果解析 JSON 成功，就把解包后的对象给 user
if let user = try? JSONDecoder().decode(User.self, from: data) {
    print("解析成功: \\(user.name)")
} else {
    print("解析失败，不管原因")
}`}
          rightCode={`// TypeScript
// 没有等价的单行语法。通常需要封装成工具函数：
function tryCatch<T>(fn: () => T): T | null {
    try {
        return fn();
    } catch {
        return null;
    }
}

// 然后像这样调用
const user = tryCatch(() => JSON.parse(data));
if (user !== null) {
    console.log(\`解析成功: \${user.name}\`);
} else {
    console.log("解析失败，不管原因");
}`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/concurrency"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 并发 async/await
        </Link>
        <Link
          to="/swift/advanced/property-wrapper"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：属性包装器 →
        </Link>
      </div>
    </div>
  );
}
