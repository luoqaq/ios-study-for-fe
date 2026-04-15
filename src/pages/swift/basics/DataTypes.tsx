import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function SwiftDataTypes() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 数据类型与变量</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Swift 和 TypeScript 一样：类型推断（Type Inference）是一等公民。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🏷️"
          title="隐式声明与强类型"
          description="和 TypeScript 几乎完全一致的设计：如果能在编译时推断出变量的类型，就不用写出来。"
          frontend-ref="const a = 1（TS 知道它是 number），但它后续不能变成 string。"
        />

        <h2>变量与常量声明 (var & let)</h2>
        <p>
          在前端，我们经历了从 <code>var</code> 时代到 <code>const / let</code>{" "}
          时代的进化。而在 Swift 里，<code>let</code> 意味着
          <strong>常量</strong>（不可变），<code>var</code> 意味着
          <strong>变量</strong>（可变）。
        </p>

        <CodeCompare
          title="声明变量"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
let maximumNumberOfLoginAttempts = 10  // 相当于 const
var currentLoginAttempt = 0            // 相当于 let

// Swift 编译器知道它们是 Int (整数)`}
          rightCode={`// TypeScript
const maximumNumberOfLoginAttempts = 10;
let currentLoginAttempt = 0;`}
        />

        <TipBox type="tip" title="尽量使用 let">
          和 JS 社区最佳实践 <code>const first</code>{" "}
          类似，苹果官方极度推荐，除非变量一定需要被修改，否则永远使用{" "}
          <code>let</code> 声明。
          <br />
          这能显著减少 Bug 并且方便编译器进行优化。
        </TipBox>

        <h2>类型注解与推断</h2>
        <p>
          如果你不想依靠推断，或者初始没有赋值，可以像 TypeScript 一样加上冒号{" "}
          <code>:</code> 声明类型。
        </p>

        <CodeCompare
          title="显式类型声明"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
var welcomeMessage: String
welcomeMessage = "Hello"

// 数字类型
let pi: Double = 3.14159
let isAwesome: Bool = true`}
          rightCode={`// TypeScript
let welcomeMessage: string;
welcomeMessage = "Hello";

let pi: number = 3.14159;
let isAwesome: boolean = true;`}
        />

        <h2>基本数据类型</h2>
        <CompareTable
          headers={["类型", "Swift", "TypeScript"]}
          rows={[
            ["整数", "`Int`, `UInt`, `Int8` 等", "`number`"],
            ["浮点数", "`Double` (64位), `Float` (32位)", "`number`"],
            ["布尔值", "`Bool` (true/false)", "`boolean` (true/false)"],
            ["字符串", "`String`", "`string`"],
            ["字符", "`Character`", "无单独类型（用长度为 1 的 string）"],
          ]}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/basics/intro"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 简介
        </Link>
        <Link
          to="/swift/basics/optionals"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：可选型 Optionals →
        </Link>
      </div>
    </div>
  );
}
