import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function Generics() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 泛型 Generics</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        和 TypeScript 如出一辙的强大抽象机制。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="泛型：写一次，用无数次"
          description="如果你写过 TypeScript，那你完全不用学 Swift 的泛型，因为连尖括号 <code>&lt;T&gt;</code> 的语法都一模一样。泛型允许你编写可以与任何类型配合使用的灵活、可重用的函数和类型。"
          frontend-ref="TypeScript 的泛型 <code>function identity&lt;T&gt;(arg: T): T</code>"
        />

        <h2>泛型函数</h2>
        <p>
          在没有泛型的时候，如果你想写一个交换两个值的函数，你得为{" "}
          <code>Int</code> 写一个，为 <code>String</code> 写一个，为{" "}
          <code>Double</code> 写一个……
        </p>

        <CodeCompare
          title="定义泛型函数 (一模一样)"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 使用 <T> 占位，表示传入的类型
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}

// 使用
var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)

var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)`}
          rightCode={`// TypeScript
// 箭头函数的泛型写法
const swapTwoValues = <T>(a: T, b: T): [T, T] => {
    // TS 没有 inout 这种可以修改原指针的语法
    // 只能通过返回一个元组来模拟交换
    return [b, a];
}

// 使用
let someInt = 3;
let anotherInt = 107;
[someInt, anotherInt] = swapTwoValues(someInt, anotherInt);

let someString = "hello";
let anotherString = "world";
[someString, anotherString] = swapTwoValues(someString, anotherString);`}
        />

        <h2>泛型类型 (比如栈 Stack)</h2>
        <p>
          Swift 的 <code>Array</code> 和 <code>Dictionary</code>{" "}
          其实就是系统内置的泛型类型（分别是 <code>Array&lt;Element&gt;</code>{" "}
          和 <code>Dictionary&lt;Key, Value&gt;</code>）。你也可以自己造轮子。
        </p>

        <CodeCompare
          title="定义一个泛型结构体 Stack"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
struct Stack<Element> {
    var items: [Element] = []
    
    // 用 mutating 是因为结构体是值类型，修改自己的属性必须标注
    mutating func push(_ item: Element) {
        items.append(item)
    }
    
    mutating func pop() -> Element {
        return items.removeLast()
    }
}

// 推断出这是一个装有 String 的栈
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")`}
          rightCode={`// TypeScript
class Stack<Element> {
    items: Element[] = [];
    
    push(item: Element) {
        this.items.push(item);
    }
    
    pop(): Element | undefined {
        return this.items.pop();
    }
}

// 显式指定泛型
const stackOfStrings = new Stack<string>();
stackOfStrings.push("uno");`}
        />

        <h2>类型约束 (Type Constraints)</h2>
        <p>
          有时候你不能让 <code>T</code>{" "}
          变成所有的类型。比如，你想写一个查找数组某个元素的下标的函数，那么这个{" "}
          <code>T</code> 类型必须是
          <strong>
            可以判断相等（遵循 <code>Equatable</code> 协议）
          </strong>
          的类型才行。
        </p>

        <CodeCompare
          title="给泛型加约束 (extends vs :)"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// T: Equatable 约束 T 必须遵循判等协议
func findIndex<T: Equatable>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind { // 没有约束这里会报错！
            return index
        }
    }
    return nil
}

let doubleIndex = findIndex(of: 9.3, in: [3.14159, 0.1, 0.25])
let stringIndex = findIndex(of: "Andrea", in: ["Mike", "Malcolm", "Andrea"])`}
          rightCode={`// TypeScript
// 借用类型断言，或者通过 extends 约束
interface Equatable {
    equals(other: any): boolean;
}

// TS 常用写法: T extends 某个接口
function findIndex<T extends Equatable>(valueToFind: T, array: T[]): number | null {
    for (let index = 0; index < array.length; index++) {
        // 调用接口的方法判断
        if (array[index].equals(valueToFind)) {
            return index;
        }
    }
    return null;
}

// 但在 TS 中基础类型自带 === 比较，所以经常不用这么麻烦`}
        />

        <p>
          如果你觉得 <code>&lt;T: SomeProtocol&gt;</code>{" "}
          写在函数名后面太拥挤，Swift 还有一个更高级的写法：<code>where</code>{" "}
          子句。
          它允许你把一长串的泛型约束放到函数签名最后面，让代码可读性直接起飞！
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/properties-deep"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 属性与存储深入
        </Link>
        <Link
          to="/swift/oop/generics-advanced"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：泛型与协议导向编程 →
        </Link>
      </div>
    </div>
  );
}
