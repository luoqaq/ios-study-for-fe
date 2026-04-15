import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Protocol() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 协议 Protocol</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        面向协议编程（POP）：Swift 的灵魂所在。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📝"
          title="接口，但能带实现！"
          description="和 TypeScript 的 Interface 一样，它定义了一组属性和方法的“图纸”，任何遵循它的 Class/Struct 必须实现图纸。但 Swift 最牛的地方在于：协议可以通过扩展（Extension）提供**默认实现**。"
          frontend-ref="TypeScript Interface + 抽象类 (Abstract Class) 的合体。"
        />

        <h2>协议基础：定义“图纸”</h2>
        <p>
          在前端，如果你想要求一个对象必须包含 <code>name</code> 属性和{" "}
          <code>speak()</code> 方法，你会写一个 interface，然后让类去{" "}
          <code>implements</code> 它。在 Swift 中，这叫做 <code>Protocol</code>
          （协议），类去 <code>遵循 (conform)</code> 协议。
        </p>

        <CodeCompare
          title="定义协议与遵循协议"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 1. 定义一份协议（图纸）
protocol Identifiable {
    var id: String { get set } // 必须指明可读还是可读可写
    func identify()
}

// 2. 结构体声明遵循该协议
struct User: Identifiable {
    var id: String
    
    // 必须实现协议要求的方法
    func identify() {
        print("My ID is \\(id)")
    }
}

// 也可以作为类型使用
func printID(item: Identifiable) {
    item.identify()
}`}
          rightCode={`// TypeScript
// 1. 定义一个接口
interface Identifiable {
    id: string; // 默认可读写，除非 readonly
    identify(): void;
}

// 2. 类实现接口
class User implements Identifiable {
    id: string;
    
    constructor(id: string) {
        this.id = id;
    }
    
    identify() {
        console.log(\`My ID is \${this.id}\`);
    }
}

// 作为类型使用
function printID(item: Identifiable) {
    item.identify();
}`}
        />

        <TipBox type="tip" title="在 Swift 里万物皆可 Protocol">
          和 TypeScript 一样，协议不仅可以给 Class 用，也可以给 Struct 甚至 Enum
          用！
          <br />
          （如果你要在协议里定义修改结构体自身的函数，记得加上{" "}
          <code>mutating</code> 关键字）。
        </TipBox>

        <h2>面向协议编程 (POP) 的核心：协议扩展 (Extension)</h2>
        <p>
          在传统的面向对象（比如 Java）里，如果你想让 10
          个不同的类都有一个默认的 <code>identify()</code>{" "}
          实现，你只能写一个“基类 (Base
          Class)”，让它们继承。这就是深恶痛绝的“继承树过深”。
        </p>
        <p>
          而在 Swift 中，你可以利用 <code>extension</code> 给{" "}
          <code>protocol</code> 增加<strong>默认实现</strong>
          。所有遵循该协议的类型，免费获得这个方法的功能！如果你对默认实现不满意，再在类型里重写它。这就叫
          <strong>面向协议编程 (POP)</strong>。
        </p>

        <CodeCompare
          title="协议的默认实现"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
protocol Identifiable {
    var id: String { get }
    func identify()
}

// 💥 神奇的扩展：给协议提供默认方法！
extension Identifiable {
    // 默认实现，谁遵守协议，谁就白送这个能力
    func identify() {
        print("默认 ID: \\(id)")
    }
}

// 这个 Struct 只需提供 id 即可，不必自己写 identify()
struct Product: Identifiable {
    var id: String
}

let p = Product(id: "1001")
p.identify() // 打印: 默认 ID: 1001`}
          rightCode={`// TypeScript
interface Identifiable {
    id: string;
    identify(): void;
}

// ❌ TS 接口不能带实现
// 只能借助抽象类 (Abstract Class)，但这会锁死单继承
abstract class IdentifiableBase implements Identifiable {
    abstract id: string;
    
    // 提供默认实现
    identify() {
        console.log(\`默认 ID: \${this.id}\`);
    }
}

// 类继承抽象类，只能继承一个！
class Product extends IdentifiableBase {
    id: string;
    constructor(id: string) { super(); this.id = id; }
}`}
        />

        <h2>协议组合与多重遵循</h2>
        <p>
          由于 Swift 是单继承（一个类只能有一个父类），但可以遵循
          <strong>无数个</strong>
          协议。结合前面的默认实现，你可以像搭积木一样，把不同的能力（协议）组合到你的对象身上，这就是组合优于继承的设计模式。
        </p>

        <CodeCompare
          title="协议组合（搭积木）"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
protocol Flyable { func fly() }
protocol Swimmable { func swim() }

// 提供默认实现
extension Flyable { 
    func fly() { print("飞") } 
}
extension Swimmable { 
    func swim() { print("游") } 
}

// 鸭子既能飞又能游，直接拼上两个协议！
// 连方法的代码都不用写了
struct Duck: Flyable, Swimmable {
    var name = "唐老鸭"
}

let duck = Duck()
duck.fly()
duck.swim()`}
          rightCode={`// TypeScript (只能用 implements 强制写实现)
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }

// TS 不支持给接口加默认实现
// 也没法用多重继承抽象类（只能 mixin，语法很啰嗦）
class Duck implements Flyable, Swimmable {
    name = "唐老鸭";
    
    // 必须手写，没法白嫖！
    fly() { console.log("飞"); }
    swim() { console.log("游"); }
}`}
        />

        <TipBox type="info" title="标准库到处都是协议">
          实际上，你在 Swift 里用的 <code>Array</code> 为什么能写{" "}
          <code>for-in</code> 循环？因为它遵循了 <code>Sequence</code> 协议。
          <br />
          为什么能判断 <code>a == b</code>？因为它遵循了 <code>Equatable</code>{" "}
          协议。
          <br />
          这些底层能力，全都是通过面向协议编程拼装起来的。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/enum"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 枚举 Enum
        </Link>
        <Link
          to="/swift/oop/extension"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：扩展 Extension →
        </Link>
      </div>
    </div>
  );
}
