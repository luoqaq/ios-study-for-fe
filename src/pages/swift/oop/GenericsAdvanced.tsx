import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function GenericsAdvanced() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 泛型与协议导向编程</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从“用泛型”到“用协议设计系统”，这是 Swift 最鲜明的工程风格。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端用 TypeScript 的 interface + generic 做类型约束；
          Swift 走得更远，提出了 <strong>Protocol-Oriented Programming (POP)</strong>：
          先用协议定义能力，再用扩展给协议默认实现，最后用泛型约束组合这些能力。
        </p>

        <h2>关联类型（Associated Type）</h2>
        <p>
          协议里可以用 <code>associatedtype</code> 定义一个占位类型，
          由遵循该协议的具体类型来指定。这类似 TypeScript 泛型接口里的类型参数。
        </p>

        <CodeCompare
          title="带关联类型的协议"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
}

struct IntStack: Container {
    typealias Item = Int
    mutating func append(_ item: Int) { ... }
    var count: Int { items.count }
}`}
          rightCode={`// TypeScript
interface Container<T> {
    append(item: T): void;
    count: number;
}

class NumberStack implements Container<number> {
    append(item: number) { ... }
    count = 0;
}`}
        />

        <h2>协议扩展：给协议写默认实现</h2>
        <p>
          这是 POP 的核心武器。你可以给协议写扩展，让所有遵循者自动获得默认行为，
          同时允许特定类型覆盖它。
        </p>

        <CodeCompare
          title="协议扩展提供默认实现"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
protocol Greetable {
    var name: String { get }
    func greet()
}

extension Greetable {
    func greet() {
        print("Hello, \\(name)")
    }
}

struct User: Greetable {
    let name: String
    // 自动获得默认 greet() 实现
}`}
          rightCode={`// TypeScript 没有直接等价物
// 通常通过抽象基类或 mixin 实现
abstract class Greetable {
    abstract name: string;
    greet() {
        console.log(\`Hello, \${this.name}\`);
    }
}`}
        />

        <h2>where 子句：精细的泛型约束</h2>
        <p>
          当泛型约束变得复杂，可以用 <code>where</code> 子句把条件放到签名末尾，提升可读性：
        </p>
        <pre><code>{`func allItemsMatch<C1: Container, C2: Container>(
    _ container1: C1, _ container2: C2
) -> Bool where C1.Item == C2.Item, C1.Item: Equatable {
    // 只有当两个容器的 Item 类型相同，且该类型可判等时，才能比较
}`}</code></pre>

        <TipBox type="tip" title="面向协议编程的设计口诀">
          1. 先定义协议（能力）<br/>
          2. 用扩展给协议默认实现（复用）<br/>
          3. 用泛型 + where 约束组合协议（灵活）<br/>
          这让 Swift 的代码既有接口的抽象，又有复用的便利。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/generics"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 泛型基础
        </Link>
        <Link
          to="/swift/advanced/closure"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：闭包 Closure →
        </Link>
      </div>
    </div>
  );
}
