import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function PropertyWrapper() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 属性包装器</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        @State 背后到底是什么魔法？
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🎁"
          title="给属性加上拦截器"
          description="如果你写过 Angular 的 <code>@Component</code>，或者 MobX 的 <code>@observable</code>，你一定不陌生：这是 <strong>装饰器 (Decorator)</strong> 的模式。在 Swift 中，它叫 <code>Property Wrapper</code>，用来复用定义属性“如何存储”和“如何计算”的逻辑。"
          frontend-ref="就像给属性加上了 <code>Proxy</code> 或者一套预设好的 <code>getter/setter</code>。这也是 SwiftUI 能像 React 一样做到数据响应式的根本机制。"
        />

        <h2>它是怎么工作的？</h2>
        <p>
          假设你有一个需求：保证所有用户的名字在存入变量前都被转成全大写，并且最多保留
          12 个字符。你可能会写一堆重复的 <code>didSet</code> 观察者（类似 JS 的{" "}
          <code>setter</code>）。
          <br />
          使用属性包装器，你只需要定义一次“大写+截断”的结构体，然后在需要的变量前面打上这个{" "}
          <code>@</code> 标签。
        </p>

        <CodeCompare
          title="自定义属性包装器"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift 
// 1. 使用 @propertyWrapper 声明这是一个包装器
@propertyWrapper
struct CapitalizedAndTrimmed {
    private var value: String = ""
    
    // 必须实现 wrappedValue 属性
    var wrappedValue: String {
        get { return value }
        set {
            // 在 setter 里统一定义逻辑
            let upper = newValue.uppercased()
            value = String(upper.prefix(12))
        }
    }
}

// 2. 在实体对象中使用这个包装器
struct User {
    // 加上 @ 魔法！
    @CapitalizedAndTrimmed var name: String
}

// 测试它
var user = User()
user.name = "alice wonderland"
print(user.name) // 打印: ALICE WONDER (大写且被截断)`}
          rightCode={`// TypeScript (装饰器模式)
// 1. 定义一个针对属性的装饰器函数
function CapitalizedAndTrimmed(target: any, propertyKey: string) {
    let value: string = "";
    
    // 拦截 getter 和 setter
    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue: string) => {
            const upper = newValue.toUpperCase();
            value = upper.substring(0, 12);
        }
    });
}

// 2. 在类中使用装饰器
class User {
    // TS 中的装饰器需要开启 experimentalDecorators
    @CapitalizedAndTrimmed
    name: string = "";
}

// 测试
const user = new User();
user.name = "alice wonderland";
console.log(user.name); // 打印: ALICE WONDER`}
        />

        <h2>在 SwiftUI 中的核心地位</h2>
        <p>
          在 SwiftUI 中，你几乎每天都在和属性包装器打交道，最著名的一个就是{" "}
          <code>@State</code>。 当你在一个变量前面加上 <code>@State</code>{" "}
          时，你不仅仅是声明了一个变量，你其实是把它交给了 SwiftUI 框架去托管。
          <br />
          当这个变量被修改时，框架会自动触发关联的 View 的重新渲染（就像 React
          的 <code>useState</code>）。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/error-handling"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 错误处理
        </Link>
        <Link
          to="/swift/swiftui/intro"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：SwiftUI 简介 →
        </Link>
      </div>
    </div>
  );
}
