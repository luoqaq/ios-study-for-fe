import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function ClassStruct() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 类与结构体</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Class 还是 Struct？这是 Swift 面试必问的第一题。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="引用类型 (Reference) vs 值类型 (Value)"
          description="在 Swift 中，类（Class）是引用类型，结构体（Struct）是值类型。每次把 Struct 赋给新变量或传给函数时，都会发生拷贝。"
          frontend-ref="JavaScript 只有引用类型 (Object/Array/Function) 和基本类型 (String/Number/Boolean)。Swift 让你能自己定义新的『基本类型』。"
        />

        <h2>定义方式：几乎一模一样</h2>
        <p>
          在语法上，两者长得像双胞胎兄弟。它们都可以定义属性（属性）、定义方法（函数）、甚至定义构造器（init）。
        </p>

        <CodeCompare
          title="定义 Class 与 Struct"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 1. 定义结构体 (Struct)
struct Resolution {
    var width = 0
    var height = 0
}

// 2. 定义类 (Class)
class VideoMode {
    var resolution = Resolution()
    var interlaced = false
    var frameRate = 0.0
    var name: String?
}`}
          rightCode={`// TypeScript
// 1. TS 没有真正的 struct (值类型) 概念
// 只能用 interface/type 描述形状
interface Resolution {
    width: number;
    height: number;
}

// 2. 定义类
class VideoMode {
    resolution = { width: 0, height: 0 };
    interlaced = false;
    frameRate = 0.0;
    name: string | null = null;
}`}
        />

        <TipBox type="info" title="Struct 赠送的构造器">
          如果定义了{" "}
          <code>
            struct Resolution &#123; var width: Int; var height: Int &#125;
          </code>
          ， 编译器会自动为你生成一个按成员初始化的构造器：
          <code>Resolution(width: 1920, height: 1080)</code>。 而 Class
          不会赠送，必须手动写 <code>init()</code>。
        </TipBox>

        <h2>值类型 (Struct) 带来的心智转换</h2>
        <p>
          在 JavaScript 中，如果你把一个对象赋给变量 B，修改 B 的属性，A
          的属性也会跟着变，因为它们指向同一块内存（引用）。
        </p>
        <p>
          在 Swift 的 <strong>结构体 (Struct)</strong> 中，
          <strong>赋值即拷贝</strong>。修改 B，完全不影响
          A！这不仅安全，而且特别适合做状态管理（例如 Redux 里的 Immutable
          State）。
        </p>

        <CodeCompare
          title="Struct 的拷贝行为"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift 
let hd = Resolution(width: 1920, height: 1080)

// 赋值给 cinema，发生了底层拷贝
var cinema = hd

// 修改 cinema 的宽度
cinema.width = 2048

// hd 不受影响！
print(hd.width) // 打印 1920`}
          rightCode={`// JavaScript
const hd = { width: 1920, height: 1080 };

// 仅仅是拷贝了引用
let cinema = hd;

// 修改 cinema
cinema.width = 2048;

// hd 也被改了！(除非你用 Object.assign 或 {...hd})
console.log(hd.width); // 打印 2048`}
        />

        <h2>引用类型 (Class) 就是你熟悉的对象</h2>
        <p>
          Class 在 Swift 里的表现，就和 JavaScript、Java、C# 里的 Class
          完全一样：传递的是指针。
        </p>

        <CodeCompare
          title="Class 的引用行为"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift 
let tenEighty = VideoMode()
tenEighty.frameRate = 25.0

// 赋值给也用同一个实例
let alsoTenEighty = tenEighty
alsoTenEighty.frameRate = 30.0

// tenEighty 也受影响！
print(tenEighty.frameRate) // 打印 30.0

// 判断两个变量是否指向同一个实例 (恒等运算符)
if tenEighty === alsoTenEighty {
    print("是同一个实例")
}`}
          rightCode={`// JavaScript
const tenEighty = new VideoMode();
tenEighty.frameRate = 25.0;

// 引用拷贝
const alsoTenEighty = tenEighty;
alsoTenEighty.frameRate = 30.0;

// tenEighty 被修改
console.log(tenEighty.frameRate); // 打印 30.0

// 判断是否为同一实例 (全等运算符)
if (tenEighty === alsoTenEighty) {
    console.log("是同一个实例");
}`}
        />

        <h2>我到底该用谁？</h2>
        <p>
          苹果官方的建议是：<strong>默认优先使用结构体 (Struct)</strong>
          。只有在需要用到 Class 特有的功能时，才去用 Class。
        </p>

        <CompareTable
          headers={["特性", "结构体 Struct", "类 Class"]}
          rows={[
            ["类型本质", "值类型（传递时拷贝）", "引用类型（传递时共享指针）"],
            [
              "存储位置（通常）",
              "栈（Stack）—— 极快",
              "堆（Heap）—— 较慢，需要 ARC 管理引用计数",
            ],
            ["继承能力", "❌ 不能继承", "✅ 支持单继承"],
            ["类型转换检查", "❌ 不支持 `as?`", "✅ 支持在运行时检查实例类型"],
            [
              "析构器 (Deinit)",
              "❌ 离开作用域自动销毁",
              "✅ 引用计数为0时调用 `deinit`",
            ],
            [
              "使用场景",
              "数据模型 (Model)、配置、状态",
              "视图控制器 (VC)、网络服务单例、需要继承体系时",
            ],
          ]}
        />

        <TipBox type="tip" title="SwiftUI 的颠覆">
          在传统的 UIKit 中，所有的按钮、图片、文字都是 <code>UIView</code>
          （它是 Class）。这导致了庞大的继承树和沉重的内存开销。 但在 SwiftUI
          中，所有的 View（比如 <code>Text</code>、<code>Button</code>
          ）全部变成了轻量级的 <code>Struct</code>。这就是 SwiftUI
          为什么那么快的原因之一。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/basics/control-flow"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 控制流
        </Link>
        <Link
          to="/swift/oop/enum"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：枚举 Enum →
        </Link>
      </div>
    </div>
  );
}
