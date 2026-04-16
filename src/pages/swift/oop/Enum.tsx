import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Enum() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 枚举 Enum</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        不要用 TS 的眼光看它，它是 Swift 里最强大的一等公民。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="不再只是魔法数字或字符串"
          description="在 TypeScript 里，Enum 通常是映射到数字或字符串的一组常量。但在 Swift 里，Enum 是强大的值类型，不仅有方法，每个 case 还可以像包裹一样带上不同的关联值（Associated Values）。"
          frontend-ref="关联值 Enum = TypeScript 里的『带 Tag 的联合类型 (Discriminated Unions)』。"
        />

        <h2>基础语法：极简的点语法</h2>
        <p>
          Swift
          的枚举不仅不需要默认赋值，而且在你知道变量类型的情况下，可以直接用点{" "}
          <code>.</code> 来赋值，连枚举名都省了。
        </p>

        <CodeCompare
          title="基本枚举定义"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 不会自动被赋值为 0, 1, 2, 3
enum CompassPoint {
    case north
    case south
    case east
    case west
}

// 首次赋值，需要写出类型
var directionToHead = CompassPoint.west

// 类型推断后，直接点语法！
directionToHead = .east`}
          rightCode={`// TypeScript
enum CompassPoint {
    North, // 默认是 0
    South, // 1
    East,  // 2
    West   // 3
}

let directionToHead: CompassPoint = CompassPoint.West;
// TS 没有这种简写点语法
directionToHead = CompassPoint.East;`}
        />

        <TipBox type="tip" title="配合 Switch 的绝杀">
          枚举天生就应该和 <code>switch</code> 搭配使用。Swift
          会在编译期检查你的 <code>switch</code> 是否覆盖了枚举的
          <strong>所有情况</strong>。如果漏写了一个 <code>case .north:</code>
          ，直接编译报错。这就是极其安全的穷举检查！
        </TipBox>

        <h2>原始值 (Raw Values)：兼容老系统</h2>
        <p>
          如果你真的需要像 C/TS 一样，让枚举底层对应字符串或数字（比如用来解析
          JSON 接口），只需显式指定类型即可。
        </p>

        <CodeCompare
          title="带原始值的枚举"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
enum ASCIIControlCharacter: Character {
    case tab = "\\t"
    case lineFeed = "\\n"
    case carriageReturn = "\\r"
}

// 获取背后的真实值
let rawValue = ASCIIControlCharacter.tab.rawValue // "\\t"

// 甚至能根据原始值反推枚举 (失败则返回 nil，所以是 Optional)
if let char = ASCIIControlCharacter(rawValue: "\\n") {
    print("解析成功")
}`}
          rightCode={`// TypeScript
enum ASCIIControlCharacter {
    Tab = "\\t",
    LineFeed = "\\n",
    CarriageReturn = "\\r"
}

// 打印出来就是原始值本身
const rawValue = ASCIIControlCharacter.Tab; // "\\t"

// TS 也没有这种原生的安全反推方法`}
        />

        <h2>终极杀器：关联值 (Associated Values)</h2>
        <p>
          这是让前端开发者大开眼界的地方。在 Swift 中，一个枚举的每个
          case，可以携带<strong>类型不同、数量不同</strong>的额外信息包！
        </p>
        <p>
          举个例子：二维码可能是一串文本（String），也可能是一个带有产品 ID
          和批次的条形码（Int, Int, Int）。
        </p>

        <CodeCompare
          title="关联值与 TS 联合类型"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

// 它可以是条形码
var productBarcode = Barcode.upc(8, 85909, 51226, 3)

// 它也可以变成二维码
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")

// 提取关联值的超强 Switch 写法
switch productBarcode {
case .upc(let sys, let man, let item, let check):
    print("UPC: \\(sys), \\(man), \\(item), \\(check).")
case .qrCode(let code):
    print("QR Code: \\(code).")
}`}
          rightCode={`// TypeScript 的等价写法 (Discriminated Unions)
type Barcode = 
    | { type: "upc"; sys: number; man: number; item: number; check: number }
    | { type: "qrCode"; code: string };

// 创建对象
let productBarcode: Barcode = { 
    type: "upc", sys: 8, man: 85909, item: 51226, check: 3 
};

productBarcode = { type: "qrCode", code: "ABCDEFGHIJKLMNOP" };

// 用 switch 根据 type 字段区分
switch (productBarcode.type) {
    case "upc":
        // 这里 TS 会自动推断出含有 sys, man 等属性
        console.log(\`UPC: \${productBarcode.sys}\`);
        break;
    case "qrCode":
        console.log(\`QR Code: \${productBarcode.code}\`);
        break;
}`}
        />

        <h2>在框架中的应用</h2>
        <p>
          最经典的例子就是网络请求的结果 <code>Result</code>，它是 Swift
          标准库内置的枚举，完美地封装了成功时的数据包，或者失败时的错误包。告别
          JS 里的 <code>[err, data]</code> 写法。
        </p>

        <CodeCompare
          title="Swift 内置的 Result 枚举"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 标准库底层定义大致如下：
// enum Result<Success, Failure: Error> {
//     case success(Success)
//     case failure(Failure)
// }

// 模拟网络请求返回
func fetchUser() -> Result<User, NetworkError> {
    return .success(User(name: "Alice"))
    // 或者返回 .failure(.timeout)
}

let response = fetchUser()

switch response {
case .success(let user):
    print("获取成功：\\(user.name)")
case .failure(let error):
    print("发生了错误：\\(error)")
}`}
          rightCode={`// TypeScript 中往往通过类似 Promise 或者元组解决
// 比如著名的 Golang 风格错误处理
async function fetchUser(): Promise<[Error | null, User | null]> {
    try {
        const user = await api.fetchUser();
        return [null, user];
    } catch (error) {
        return [error, null];
    }
}

const [err, user] = await fetchUser();
if (err) {
    console.error("发生了错误", err);
} else {
    console.log("获取成功", user.name);
}`}
        />

        <TipBox type="info" title="枚举还能写方法？">
          是的！因为在 Swift
          里它是值类型的一等公民。你甚至可以在枚举里定义计算属性（不能定义存储属性）、编写{" "}
          <code>mutating func</code> 等等。它本质上就是一个轻量级的类。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/value-reference-deep"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 值类型与引用类型深入
        </Link>
        <Link
          to="/swift/oop/protocol"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：协议 Protocol →
        </Link>
      </div>
    </div>
  );
}
