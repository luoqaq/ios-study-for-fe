import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function Extension() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 扩展 Extension</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        不需要继承，甚至不需要源码，就能给类型加上新能力。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🔌"
          title="给任何类型“打补丁”"
          description="Swift 的扩展（Extension）可以给已有的类、结构体、枚举或者协议添加新功能（计算属性、方法、构造器），即使你拿不到它的源代码（比如苹果提供的 Double 类型）。"
          frontend-ref="类似 JavaScript 里的修改原型链：String.prototype.myMethod = function() {}，但 Swift 的扩展是编译期静态的，绝对安全！"
        />

        <h2>向已有类型添加方法</h2>
        <p>
          在 JS 中，给原生对象添加方法是危险的（污染全局原型链）。但在 Swift
          中，因为有强类型和模块命名空间的隔离，这是极其推荐的最佳实践。
        </p>

        <CodeCompare
          title="给 Double 添加方法"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 给系统自带的 Double 类型加方法
extension Double {
    var km: Double { return self * 1000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1000.0 }
}

// 极其直观的语法，因为 25.4 已经被推断为 Double 了
let aMarathon = 42.km + 195.m
print("马拉松长 \\(aMarathon) 米")`}
          rightCode={`// TypeScript
// 必须通过 interface 合并来欺骗编译器
// 然后在运行时修改原型链（非常危险，不推荐！）
interface Number {
    km: number;
    m: number;
}

Object.defineProperty(Number.prototype, 'km', {
    get: function() { return this.valueOf() * 1000; }
});

const aMarathon = (42).km + (195).m;
console.log(\`马拉松长 \${aMarathon} 米\`);`}
        />

        <h2>利用扩展组织代码 (代码分块)</h2>
        <p>
          前端写 React 的大组件时，如果一个文件里有 1000 行，我们会拆分 Hook
          或者抽取子组件。 在 Swift 中，如果一个 <code>ViewController</code>{" "}
          又要写页面逻辑，又要写列表代理，代码会非常臃肿。
          <br />
          Swift 的做法是：
          <strong>
            把同一个类的不同职责，写在不同的 <code>extension</code> 块里
          </strong>
          。这就像你给一个类分了不同的命名空间。
        </p>

        <CodeCompare
          title="代码组织（Extension 拆分）"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
class MyViewController: UIViewController {
    // 这里只写核心属性和生命周期
    var items: [String] = []
    override func viewDidLoad() { ... }
}

// 用一个扩展，专门实现 UITableView 的数据源协议
// 这样代码的阅读逻辑就非常清晰！
extension MyViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items.count
    }
}

// 另一个扩展，处理网络请求
extension MyViewController {
    func fetchItems() { ... }
}`}
          rightCode={`// TypeScript / React 
class MyComponent extends React.Component {
    // TS 没有原生的 extension 语法来拆分同一个类
    // 通常只能把逻辑抽成外部独立的函数 (Hooks 机制)
    // 或者用 Mixin，但语法非常晦涩难读
    
    state = { items: [] };
    
    componentDidMount() { ... }
    
    // 全都塞在这一个庞大的类里面
    renderList() { ... }
    fetchItems() { ... }
}`}
        />

        <h2>在框架中的应用：给协议加约束的扩展</h2>
        <p>
          结合上一节《协议》的知识，Swift 扩展最变态的能力是：
          <strong>你可以给某个协议的扩展，加上泛型约束。</strong>
        </p>
        <p>
          比如：你可以规定，
          <strong>
            只有当数组里的元素都是数字（遵循 <code>Numeric</code>{" "}
            协议）时，数组才白送一个 <code>sum()</code> 方法
          </strong>
          。如果数组里装的是字符串，这个方法根本就不会出现！
        </p>

        <CodeCompare
          title="带约束的协议扩展 (非常烧脑，但极度好用)"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 给系统自带的 Sequence 协议 (可以被 for-in 的东西) 加扩展
// 条件是：里面的元素 (Element) 必须能相加 (遵循 Numeric)
extension Sequence where Element: Numeric {
    func sum() -> Element {
        // reduce(初始值, 操作符)
        return reduce(0, +)
    }
}

let numbers = [1, 2, 3, 4]
print(numbers.sum()) // ✅ 打印 10

let words = ["Hello", "World"]
// ❌ 编译报错：String 不能相加，所以 words 根本没有 sum() 方法！
// words.sum() `}
          rightCode={`// TypeScript (通过泛型约束很难优雅实现这种链式调用)
function sum<T extends number>(arr: T[]): number {
    return arr.reduce((a, b) => a + b, 0);
}

const numbers = [1, 2, 3, 4];
// 不能用 numbers.sum()，只能用函数包裹
console.log(sum(numbers)); // ✅ 10

const words = ["Hello", "World"];
// sum(words); // TS 编译报错`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/protocol"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 协议 Protocol
        </Link>
        <Link
          to="/swift/oop/properties-deep"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：属性与存储深入 →
        </Link>
      </div>
    </div>
  );
}
