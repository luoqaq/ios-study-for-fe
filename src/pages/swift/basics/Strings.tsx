import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function SwiftStrings() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 字符串</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        终于可以像写 JS 一样自由地拼接字符串了，但它是值类型。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🧵"
          title="String 是值类型 (Value Type)"
          description="和 Objective-C 的 NSString（引用类型）不同，Swift 的 String 是结构体，在传递给函数或赋给新变量时会被拷贝（Copy-on-Write 优化性能）。"
          frontend-ref="JavaScript 的字符串也是基本类型，按值传递且不可变。"
        />

        <h2>字符串字面量与多行字符串</h2>
        <p>
          在 Swift 中，字符串不需要像 OC 那样加 <code>@</code>{" "}
          前缀了。而且原生支持多行字符串，这会让写过 JS
          模板字符串的你感到非常亲切。
        </p>

        <CodeCompare
          title="字符串声明"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift
let singleLine = "Hello, world!"

// 多行字符串，使用三个双引号 """
let quotation = """
这是一段
跨越多行的
优美字符串
"""`}
          rightCode={`// JavaScript
const singleLine = "Hello, world!";

// 模板字符串反引号 \`
const quotation = \`
这是一段
跨越多行的
优美字符串
\`;`}
        />

        <h2>字符串拼接与插值 (Interpolation)</h2>
        <p>
          回忆一下，在 Objective-C 中你要用到冗长的{" "}
          <code>[NSString stringWithFormat:]</code>。<br />在 Swift
          中，你可以直接用加号 <code>+</code> 或者使用斜杠加括号{" "}
          <code>\(变量)</code> 的形式把值插入到字符串中。
        </p>

        <CodeCompare
          title="字符串插值，终于和 JS 一样了！"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift 
let multiplier = 3
let message = "\\(multiplier) 乘以 2.5 等于 \\(Double(multiplier) * 2.5)"

// 加号拼接也可以
let a = "Hello"
let b = " World"
var greeting = a + b
greeting += "!"`}
          rightCode={`// JavaScript
const multiplier = 3;
const message = \`\${multiplier} 乘以 2.5 等于 \${multiplier * 2.5}\`;

const a = "Hello";
const b = " World";
let greeting = a + b;
greeting += "!";`}
        />

        <h2>字符串的索引：Swift 最大的痛点</h2>
        <p>
          在 JavaScript 中，获取字符串第 5 个字符很简单：<code>str[4]</code> 或{" "}
          <code>str.charAt(4)</code>。<br />
          但是在 Swift 中，由于底层对 Unicode 扩展字符群集（比如 Emoji
          和带重音的字母，它们可能占据多个字节）的正确处理，
          <strong>
            Swift 的字符串不允许直接用整数进行索引 (<code>str[4]</code> 会报错)
          </strong>
          。
        </p>

        <CodeCompare
          title="获取字符串中的字符 (非常麻烦)"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift
let greeting = "Guten Tag!"

// 1. 获取第一个字符
let first = greeting[greeting.startIndex] // G

// 2. 获取最后一个字符 (注意不能直接用 endIndex)
let last = greeting[greeting.index(before: greeting.endIndex)] // !

// 3. 获取第 7 个字符 (从开头向后偏移 7 步)
let index = greeting.index(greeting.startIndex, offsetBy: 7)
let char = greeting[index] // a`}
          rightCode={`// JavaScript
const greeting = "Guten Tag!";

// 获取第一个字符
const first = greeting[0]; // G

// 获取最后一个字符
const last = greeting[greeting.length - 1]; // !

// 获取第 7 个字符 (索引 7)
const char = greeting[7]; // a`}
        />

        <p>
          这种设计虽然繁琐，但保证了诸如 👨‍👩‍👧‍👦（由 4 个 Emoji
          加上连接符组合成的一个视觉字符）在计算长度和切割时，不会像 JS
          那样被切成两半或者返回错误的长度。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/basics/optionals"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 可选型 Optionals
        </Link>
        <Link
          to="/swift/basics/collections"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：集合类型 →
        </Link>
      </div>
    </div>
  );
}
