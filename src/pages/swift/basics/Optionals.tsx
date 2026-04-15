import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function Optionals() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 可选型 Optionals</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        为了终结十亿美元的错误（Null Reference），苹果做出的最大努力。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🤔"
          title="强制显式处理空值"
          description="Swift 的类型默认都不能为 nil（绝对的非空安全）。如果它可能为空，必须在类型后加一个问号 `?` 声明为 Optional。"
          frontend-ref="类似 TypeScript 的 `Type | null` 或 `Type | undefined` 联合类型。"
        />

        <h2>为什么要有 Optionals？</h2>
        <p>
          在 JavaScript 中，任何对象访问不到的属性都会返回{" "}
          <code>undefined</code>，或者任何变量默认都是 <code>undefined</code>
          。这导致了前端满天飞的 <code>Cannot read property of undefined</code>
          。
        </p>
        <p>
          Swift 在语言设计上就掐断了这个问题：
          <strong>默认所有类型都是非空的。</strong>
        </p>

        <CodeCompare
          title="声明可能为空的变量"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// ? 号意味着这是一个 "包含 String 的盒子"，里面可能是字符串，也可能是 nil
var serverResponseCode: Int? = 404
serverResponseCode = nil

// ❌ 错误！普通类型不能赋值 nil
// var name: String = nil `}
          rightCode={`// TypeScript
let serverResponseCode: number | null = 404;
serverResponseCode = null;

let name: string = "Alice";
// 在严格模式下不能赋值 null`}
        />

        <h2>如何安全地取值 (Unwrapping)</h2>
        <p>
          既然 Optional
          只是一个“盒子”，你不能直接拿它参与运算（比如和普通的整数相加），你必须通过一种安全的机制“打开盒子”。
        </p>

        <h3>1. 强制解包 (Forced Unwrapping) 🚨</h3>
        <p>
          如果你 100% 确定里面有值，你可以加个感叹号 <code>!</code>{" "}
          强行打开盒子。但如果里面是 <code>nil</code>，程序会当场崩溃。
        </p>

        <CodeCompare
          title="强制解包 (不推荐)"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
let possibleNumber: String = "123"
// 转换失败返回 nil，所以 convertedNumber 是 Int? 类型
let convertedNumber = Int(possibleNumber)

// 强行打开盒子并使用 (非常危险)
print(convertedNumber! + 10) `}
          rightCode={`// TypeScript (非空断言)
const convertedNumber: number | null = Number("123");

// 非空断言 (仅在编译时欺骗 TS，运行时如果真是 null 依旧会报错)
console.log(convertedNumber! + 10);`}
        />

        <h3>2. 可选绑定 (Optional Binding) ✅ 核心语法！</h3>
        <p>
          这是 Swift 最核心的特性之一：使用 <code>if let</code>
          。它做了两件事：1. 判断里面有没有值。2.
          如果有值，自动把它提取到一个临时的新常量中，供你在这个 <code>if</code>{" "}
          块里安全使用。
        </p>

        <CodeCompare
          title="可选绑定"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift (if let 语法)
var optionalName: String? = "John Appleseed"

if let name = optionalName {
    // 这里的 name 已经不是 Optional 了，而是普通的 String
    print("Hello, \\(name)")
} else {
    // 进到这里说明 optionalName 是 nil
    print("Hello, guest")
}`}
          rightCode={`// TypeScript (类型收窄 Type Narrowing)
let optionalName: string | null = "John Appleseed";

if (optionalName !== null) {
    // TS 知道在这个 block 里 optionalName 是 string
    console.log(\`Hello, \${optionalName}\`);
} else {
    console.log("Hello, guest");
}`}
        />

        <TipBox type="tip" title="简写语法">
          在 Swift 5.7 之后，你可以简写成：
          <br />
          <code>if let optionalName &#123; print(optionalName) &#125;</code>
        </TipBox>

        <h3>3. 提前退出 (guard let)</h3>
        <p>
          如果你讨厌 <code>if let</code> 带来的嵌套地狱，你可以使用{" "}
          <code>guard let</code>。它就像一道门神，发现是 <code>nil</code> 就直接{" "}
          <code>return</code>，并且提取出来的值，在 <code>guard</code> 语句
          <strong>之后的所有作用域</strong>都是可用的。
        </p>

        <CodeCompare
          title="Guard 提前返回"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
func greet(person: [String: String]) {
    guard let name = person["name"] else {
        // 如果字典里没有 "name" 这个 key，就会进这里
        return
    }
    
    // 到这里，name 就是一个安全的 String 了
    print("Hello \\(name)!")
}`}
          rightCode={`// TypeScript (Early Return)
function greet(person: Record<string, string>) {
    const name = person["name"];
    if (name === undefined) {
        return;
    }
    
    console.log(\`Hello \${name}!\`);
}`}
        />

        <h3>4. 空合运算符 / 默认值 (Nil-Coalescing)</h3>
        <p>
          和 JS 的 <code>??</code> 一模一样！如果盒子为空，提供一个备胎。
        </p>

        <CodeCompare
          title="提供默认值"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
let defaultColorName = "red"
var userDefinedColorName: String?

// 如果 userDefinedColorName 为空，就使用默认值
var colorToUse = userDefinedColorName ?? defaultColorName`}
          rightCode={`// JavaScript/TypeScript (Nullish Coalescing)
const defaultColorName = "red";
let userDefinedColorName: string | undefined;

let colorToUse = userDefinedColorName ?? defaultColorName;`}
        />

        <h3>5. 可选链 (Optional Chaining)</h3>
        <p>
          也和 JS 的 <code>?.</code> 毫无二致。
        </p>

        <CodeCompare
          title="可选链"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 如果 john.residence 是 nil，roomCount 也就是 nil，类型是 Int?
let roomCount = john.residence?.numberOfRooms`}
          rightCode={`// JavaScript/TypeScript
// 如果 residence 是 undefined，roomCount 返回 undefined
let roomCount = john.residence?.numberOfRooms;`}
        />

        <h2>总结：处理 Optionals 的 5 种招式</h2>
        <CompareTable
          headers={["招式名称", "符号语法", "安全性", "JS / TS 对应物"]}
          rows={[
            [
              "强制解包",
              "`value!`",
              "🔴 危险（为 nil 则崩溃）",
              "非空断言 `value!`",
            ],
            [
              "可选绑定",
              "`if let v = opt`",
              "🟢 安全（常用）",
              "判断 `if (opt !== null)`",
            ],
            [
              "提前退出",
              "`guard let v = opt else { return }`",
              "🟢 安全（消除嵌套）",
              "`if (!opt) return`",
            ],
            ["空合运算符", "`opt ?? default`", "🟢 安全", "`opt ?? default`"],
            [
              "可选链",
              "`opt?.property`",
              "🟢 安全（得到依然是 Optional）",
              "`opt?.property`",
            ],
          ]}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/basics/datatypes"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 数据类型
        </Link>
        <Link
          to="/swift/basics/strings"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：字符串与集合 →
        </Link>
      </div>
    </div>
  );
}
