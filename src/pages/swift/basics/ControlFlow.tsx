import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function ControlFlow() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 控制流</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        更强大、更安全的 switch，以及你绝对会爱上的 guard 语句。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🔄"
          title="去掉多余的括号"
          description="和 Go / Rust 一样，Swift 抛弃了 <code>if</code> 和 <code>while</code> 后面那对冗余的圆括号 <code>()</code>，直接跟条件表达式。但是花括号 <code>&#123;&#125;</code> 是必须的。"
          frontend-ref="if (condition) 改为了 if condition"
        />

        <h2>for-in 循环（区间与遍历）</h2>
        <p>
          在 JavaScript 里，我们常常需要写{" "}
          <code>for (let i = 0; i &lt; 5; i++)</code>。 Swift
          采用了更加优雅的“区间（Range）”操作符。
        </p>

        <CodeCompare
          title="区间循环与集合遍历"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift 
// 闭区间 (包含 5)：1...5
for index in 1...5 {
    print("\\(index) 乘 5 是 \\(index * 5)")
}

// 半开区间 (不包含 5)：0..<5
let names = ["Anna", "Alex", "Brian", "Jack"]
for i in 0..<names.count {
    print("第 \\(i + 1) 个人叫 \\(names[i])")
}

// 遍历字典
let numberOfLegs = ["蜘蛛": 8, "蚂蚁": 6, "猫": 4]
for (animalName, legCount) in numberOfLegs {
    print("\\(animalName) 有 \\(legCount) 条腿")
}`}
          rightCode={`// JavaScript
// 传统 for 循环
for (let i = 1; i <= 5; i++) {
    console.log(\`\${i} 乘 5 是 \${i * 5}\`);
}

// 基于长度的循环
const names = ["Anna", "Alex", "Brian", "Jack"];
for (let i = 0; i < names.length; i++) {
    console.log(\`第 \${i + 1} 个人叫 \${names[i]}\`);
}

// 遍历对象的键值对
const numberOfLegs = { "蜘蛛": 8, "蚂蚁": 6, "猫": 4 };
for (const [animalName, legCount] of Object.entries(numberOfLegs)) {
    console.log(\`\${animalName} 有 \${legCount} 条腿\`);
}`}
        />

        <h2>guard：提前退出的门神</h2>
        <p>
          在前端代码里，为了减少 <code>if</code> 的深层嵌套，我们经常使用“Early
          Return（提前返回）”。在 Swift 中，苹果专门设计了 <code>guard</code>{" "}
          关键字来做这件事，它不仅语义更强，而且和 Optional
          Binding（可选绑定）结合后简直是神器。
        </p>

        <CodeCompare
          title="优雅的 Early Return"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
func greet(person: [String: String]) {
    // 守卫 1：必须有名字，否则退出
    guard let name = person["name"] else {
        print("连名字都没有")
        return // 必须 return、throw 或 break
    }
    
    // 守卫 2：必须有地点，否则退出
    guard let location = person["location"] else {
        print("你好 \\(name)，你从哪里来？")
        return
    }
    
    // 到这里，name 和 location 都是解包后的安全 String！
    print("你好 \\(name)！希望 \\(location) 的天气不错。")
}`}
          rightCode={`// TypeScript
function greet(person: Record<string, string>) {
    // 提前退出 1
    const name = person["name"];
    if (name === undefined) {
        console.log("连名字都没有");
        return;
    }
    
    // 提前退出 2
    const location = person["location"];
    if (location === undefined) {
        console.log(\`你好 \${name}，你从哪里来？\`);
        return;
    }
    
    // 必须自己去处理嵌套
    console.log(\`你好 \${name}！希望 \${location} 的天气不错。\`);
}`}
        />

        <h2>switch：终于不会漏掉 break 了</h2>
        <p>
          JavaScript 里的 <code>switch-case</code> 最容易犯的错误就是忘记写{" "}
          <code>break</code>，导致程序“贯穿（fallthrough）”执行下一个 case。
        </p>
        <p>
          <strong>
            在 Swift 中，执行完一个 case 后会自动跳出 switch。不需要写 break！
          </strong>
          如果想强行贯穿，必须显式地写 <code>fallthrough</code>。此外，Swift 的
          switch 支持模式匹配、区间、元组，并且<strong>必须穷举所有情况</strong>
          。
        </p>

        <CodeCompare
          title="强大的模式匹配"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift 
let approximateCount = 62

// Switch 必须穷尽所有可能性
switch approximateCount {
case 0:
    print("没有")
case 1..<5:
    // 区间匹配
    print("几个")
case 5..<12:
    print("好几个")
case 12..<100:
    print("几十个")
case 100..<1000:
    print("成百个")
default:
    // 这个必须要有
    print("很多")
}`}
          rightCode={`// JavaScript
const approximateCount = 62;

// JS 无法在 case 后直接写区间表达式
// 只能使用 if-else 链，或者把 switch 改写：
switch (true) {
    case approximateCount === 0:
        console.log("没有");
        break; // 必须写 break
    case approximateCount >= 1 && approximateCount < 5:
        console.log("几个");
        break;
    case approximateCount >= 5 && approximateCount < 12:
        console.log("好几个");
        break;
    // ...以此类推
    default:
        console.log("很多");
}`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/basics/collections"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 集合类型
        </Link>
        <Link
          to="/swift/oop/class-struct"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：类与结构体 →
        </Link>
      </div>
    </div>
  );
}
