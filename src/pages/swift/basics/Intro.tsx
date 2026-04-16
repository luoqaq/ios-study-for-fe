import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";
import CodeCompare from "@/components/CodeCompare";

export default function SwiftBasicsIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 Swift 基础导论</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从 TypeScript 心智快速切到 Swift：先掌握最重要的语言感觉。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>先抓住这门语言的感觉</h2>
        <p>
          如果 Objective-C 给前端的第一感觉是“古老、动态、历史包袱重”，那么
          Swift 的第一感觉通常是：“这门语言怎么这么像 TypeScript、Kotlin 和
          Rust 的混合体”。
        </p>

        <ConceptCard
          emoji="🧭"
          title="先把 Swift 当成强约束版 TypeScript"
          description="它有类型推断、可选型、枚举、协议、泛型、闭包和 async/await，但编译器更严格，运行时更接近系统语言。"
          frontend-ref="可以把 Swift 理解成“不是跑在浏览器里的 TypeScript”，而是“直接编译成 App 的静态语言”。"
        />

        <h2>前端同学进入 Swift 的三个关键差异</h2>
        <ol>
          <li>类型更严格，很多模糊写法在编译阶段就被拦住。</li>
          <li>
            <code>nil</code> 不是你想用就能直接用，必须通过 Optional 显式处理。
          </li>
          <li>
            值类型和引用类型区分非常重要，<code>struct</code> 和{" "}
            <code>class</code> 的选择会直接影响数据流。
          </li>
        </ol>

        <h2>第一眼代码对照</h2>

        <CodeCompare
          title="变量、常量、类型推断"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`let appName = "iOS Study"
var count = 0

count += 1

let isReady: Bool = true`}
          rightCode={`const appName = "iOS Study";
let count = 0;

count += 1;

const isReady: boolean = true;`}
        />

        <h2>这一组章节应该怎么学</h2>
        <p>建议顺序不要乱：</p>
        <ol>
          <li>
            先看 <Link to="/swift/basics/datatypes">数据类型</Link>
            ，明确常见基础类型和推断方式。
          </li>
          <li>
            然后看 <Link to="/swift/basics/optionals">可选型</Link>
            ，这是 Swift 和 JS/TS 最大的思维差异之一。
          </li>
          <li>
            再继续字符串、集合和控制流，形成完整的语言基本功。
          </li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Swift 简介
        </Link>
        <Link
          to="/swift/basics/datatypes"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：数据类型 →
        </Link>
      </div>
    </div>
  );
}
