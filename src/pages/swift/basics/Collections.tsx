import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function Collections() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 集合类型</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Array（数组）、Set（集合）与 Dictionary（字典）。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="泛型与类型统一"
          description="Swift 的集合必须且只能装一种特定的数据类型。如果放进去了 String，就不能再放 Int。"
          frontend-ref="JavaScript 的数组可以混装任意类型：[1, 'hello', { }]，而 TypeScript 要求类型一致（如 Array<string>）。"
        />

        <h2>数组 (Array)</h2>
        <p>
          在 Swift 中，创建数组也和 JS 一样简洁，使用方括号 <code>[]</code>。
        </p>
        <p>
          不再需要 OC 中繁琐的 <code>NSMutableArray</code>，直接用{" "}
          <code>var</code> 声明就是可变的，用 <code>let</code>{" "}
          声明就是不可变的。
        </p>

        <CodeCompare
          title="创建与添加元素"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 创建空数组 (必须指明类型)
var someInts: [Int] = []

// 创建并初始化 (类型推断为 [String])
var shoppingList = ["Eggs", "Milk"]

// 追加元素 (相当于 JS 的 push)
shoppingList.append("Flour")

// 批量追加 (相当于 JS 的 concat 或者 ...)
shoppingList += ["Baking Powder"]`}
          rightCode={`// TypeScript
const someInts: number[] = [];

// 类型推断为 string[]
let shoppingList = ["Eggs", "Milk"];

// 追加元素
shoppingList.push("Flour");

// 批量追加
shoppingList.push(...["Baking Powder"]);`}
        />

        <p>
          在 Swift 中，数组的索引访问不会自动返回 <code>Optional</code>
          （可选型）。所以{" "}
          <strong>
            读取超出范围的索引 <code>arr[10]</code> 依旧会当场崩溃！
          </strong>
        </p>

        <h2>字典 (Dictionary)</h2>
        <p>
          在 JavaScript 中，任何 Object (<code>{}</code>)
          都可以当作字典/哈希表来用（ES6 后也推荐使用原生的 <code>Map</code>）。
          在 Swift 中，同样使用方括号 <code>[Key: Value]</code> 来表示字典。
        </p>

        <CodeCompare
          title="字典的增删改查"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 创建一个空字典
var namesOfIntegers: [Int: String] = [:]

// 创建并初始化
var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]

// 新增或修改
airports["LHR"] = "London"

// 读取 (返回的是 String? 可选型，因为可能找不到这个 key)
if let airportName = airports["DUB"] {
    print("机场名称: \\(airportName)")
}

// 删除
airports["LHR"] = nil`}
          rightCode={`// TypeScript (使用 Record 或 Map)
const namesOfIntegers: Record<number, string> = {};

let airports: Record<string, string> = {
    "YYZ": "Toronto Pearson",
    "DUB": "Dublin"
};

// 新增或修改
airports["LHR"] = "London";

// 读取 (注意：如果未开启 strictNullChecks 可能有坑)
const airportName = airports["DUB"];
if (airportName !== undefined) {
    console.log(\`机场名称: \${airportName}\`);
}

// 删除
delete airports["LHR"];`}
        />

        <p>
          和数组不同的是，
          <strong>访问字典的某个键永远会返回一个 Optional（可选型）</strong>。
          因为 Swift 知道，你给的键可能根本不存在。这比 JS 的静默返回{" "}
          <code>undefined</code> 更加安全，强迫你用 <code>if let</code> 处理。
        </p>

        <h2>集合 (Set)</h2>
        <p>
          和 JS 的 <code>Set</code>{" "}
          一样，用来存储无序且唯一的值，通常用于快速去重和集合数学运算（交集、并集）。
        </p>

        <CodeCompare
          title="Set 集合去重"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift 
// 必须显式写出 Set 类型，否则会被推断成 Array
var letters: Set<Character> = ["a", "b", "c", "a"]
print(letters) // ["b", "c", "a"]，顺序可能不同

// 交集运算
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let primeDigits: Set = [2, 3, 5, 7]

// 求交集 (返回 [3, 5, 7])
oddDigits.intersection(primeDigits)`}
          rightCode={`// JavaScript
// Set 构造函数
const letters = new Set(["a", "b", "c", "a"]);
console.log(letters); // Set(3) { 'a', 'b', 'c' }

// JS 没有原生的交集语法，需借助 Array filter
const oddDigits = new Set([1, 3, 5, 7, 9]);
const primeDigits = new Set([2, 3, 5, 7]);

// 求交集
const intersect = new Set(
    [...oddDigits].filter(x => primeDigits.has(x))
);`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/basics/strings"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 字符串
        </Link>
        <Link
          to="/swift/basics/control-flow"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：控制流 →
        </Link>
      </div>
    </div>
  );
}
