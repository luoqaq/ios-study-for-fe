import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Closure() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 闭包 Closure</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        更简洁的语法，更像 JavaScript 的箭头函数。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="脱掉 Objective-C 的马甲"
          description="和 OC 中长得像外星符号的 Block `^` 不同，Swift 的闭包语法经过了极大的精简，并且由于强大的类型推断，你甚至可以省略参数类型和 `return` 关键字。"
          frontend-ref="完全等价于 JavaScript 的箭头函数 `() => {}`。"
        />

        <h2>基本闭包语法</h2>
        <p>
          闭包表达式语法可以使用常量、变量和 <code>inout</code>{" "}
          类型作为参数。但不能提供默认值。在花括号 <code>&#123;&#125;</code>{" "}
          内，<code>in</code> 关键字用来分隔参数/返回值和闭包的主体。
        </p>

        <CodeCompare
          title="闭包的基础写法"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
// 完整写法：(参数) -> 返回值 in 闭包体
let greet = { (name: String) -> String in
    return "Hello, \\(name)!"
}

// 调用闭包 (注意：调用闭包不用写参数名)
let message = greet("World")`}
          rightCode={`// TypeScript
// 箭头函数写法
const greet = (name: string): string => {
    return \`Hello, \${name}!\`;
};

// 调用箭头函数
const message = greet("World");`}
        />

        <h2>体验类型推断的魔力 (如何越写越短)</h2>
        <p>
          Swift 的闭包支持多种简写方式，这在调用数组的 <code>map</code>、
          <code>filter</code>、<code>sorted</code> 等高阶函数时体现得淋漓尽致。
        </p>

        <CodeCompare
          title="给数组排序：一步步简化闭包"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]

// 1. 完整写法
var reversed = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})

// 2. 靠类型推断省略参数类型和括号 (类似 JS)
reversed = names.sorted(by: { s1, s2 in return s1 > s2 })

// 3. 单行表达式闭包省略 return
reversed = names.sorted(by: { s1, s2 in s1 > s2 })

// 4. 参数名称缩写 (终极绝杀：$0 代表第一个参数，$1 代表第二个...)
reversed = names.sorted(by: { $0 > $1 })

// 5. 甚至...运算符方法 (因为 > 本身就是一个满足要求的函数)
reversed = names.sorted(by: >)`}
          rightCode={`// TypeScript
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"];

// 1. 完整箭头函数
let reversed = names.sort((s1: string, s2: string): number => {
    if (s1 > s2) return -1;
    if (s1 < s2) return 1;
    return 0;
});

// 2. 简写参数和隐式返回 (最常用)
reversed = names.sort((s1, s2) => s1 > s2 ? -1 : 1);

// TS 没有 $0 $1 这种极致缩写语法
// 也没办法直接传 > 操作符`}
        />

        <h2>尾随闭包 (Trailing Closures)</h2>
        <p>
          这是 Swift 中一个非常有特色的语法：
          <strong>
            如果函数的最后一个参数是闭包，你可以把闭包放在函数调用的括号外面。如果它是唯一的参数，你甚至可以把括号也删掉。
          </strong>
        </p>
        <p>这个语法在 SwiftUI 里被用到了极致（看起来就像用大括号在搭积木）。</p>

        <CodeCompare
          title="尾随闭包的优雅"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
// 假设有一个动画函数，最后一个参数是完成后的回调
func animate(duration: Double, completion: () -> Void) { ... }

// 不使用尾随闭包
animate(duration: 0.5, completion: {
    print("动画结束")
})

// ✅ 使用尾随闭包 (闭包被移到了括号外面)
animate(duration: 0.5) {
    print("动画结束")
}

// ✅ 如果它是唯一参数，括号都可以省略！
// (这正是数组 map 的通常写法)
let numbers = [1, 2, 3]
let strings = numbers.map { String($0) }`}
          rightCode={`// TypeScript
function animate(duration: number, completion: () => void) { ... }

// TS 中必须老老实实把箭头函数包在括号里面
animate(0.5, () => {
    console.log("动画结束");
});

// Array map 也是如此
const numbers = [1, 2, 3];
const strings = numbers.map((num) => String(num));`}
        />

        <TipBox type="warning" title="闭包也是引用类型 (捕获与逃逸)">
          和 JS 的闭包一样，Swift
          的闭包会捕获它周围环境中的变量。由于闭包是引用类型，这会导致
          <strong>循环引用 (Retain Cycle)</strong>。<br />
          <br />
          此外，如果闭包作为参数传入函数，但在函数返回<strong>之后</strong>
          才被调用（比如网络请求的回调），你必须把这个闭包标记为{" "}
          <code>@escaping</code>
          （逃逸闭包），以警告编译器这个闭包会存活更长时间。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/practice/protocol-app"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Swift POP 网络层实战
        </Link>
        <Link
          to="/swift/advanced/closure-memory"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：闭包捕获与内存管理 →
        </Link>
      </div>
    </div>
  );
}
