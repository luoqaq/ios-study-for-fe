import { Link } from "react-router-dom";

export default function SwiftIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Swift</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        现代化、类型安全，苹果生态的未来。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>前端开发者的舒适区</h2>
        <p>
          如果你觉得 Objective-C 的语法过于古老和繁琐，那么{" "}
          <strong>Swift 将会让你感到宾至如归</strong>。
        </p>
        <p>
          Swift 吸收了大量现代编程语言（如 Rust, Kotlin,
          TypeScript）的优秀特性。如果你熟练掌握了 TypeScript，那么 Swift
          对你来说几乎没有学习门槛。
        </p>

        <h3>语言特点</h3>
        <ul>
          <li>
            <strong>类型安全与推断（Type Inference）：</strong>{" "}
            不需要显式写出类型，编译器会自动推断，但一旦确定就不能再赋其他类型的值（和
            TypeScript 一模一样）。
          </li>
          <li>
            <strong>可选型（Optionals）：</strong> 彻底消灭{" "}
            <code>NullPointerException</code>。强制你显式处理变量可能为{" "}
            <code>nil</code> 的情况，这也是 Swift 最核心的安全设计。
          </li>
          <li>
            <strong>闭包与高阶函数：</strong> 语法极其简洁，支持{" "}
            <code>map</code>, <code>filter</code>, <code>reduce</code>{" "}
            等函数式编程范式。
          </li>
          <li>
            <strong>协议与面向协议编程（POP）：</strong> 远比 TypeScript 的
            interface 强大，可以提供默认实现，是 Swift 架构设计的灵魂。
          </li>
        </ul>

        <h2>学习路径</h2>
        <p>本模块分为五个部分，带你感受 Swift 的优雅：</p>

        <ol>
          <li>
            <Link to="/swift/basics/intro">基础语法</Link>
            ：常量变量、类型推断、可选型。
          </li>
          <li>
            <Link to="/swift/oop/class-struct">结构体与类</Link>
            ：理解值类型（Struct）与引用类型（Class）的区别。
          </li>
          <li>
            <Link to="/swift/oop/enum">枚举与协议</Link>：见识 Swift
            最强大的枚举和面向协议编程。
          </li>
          <li>
            <Link to="/swift/advanced/closure">高级特性</Link>：闭包、泛型和{" "}
            <code>async/await</code> 并发。
          </li>
          <li>
            <Link to="/swift/swiftui/intro">SwiftUI 入门</Link>：像 React
            一样写声明式 UI。
          </li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/roadmap/before-start"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 开始之前
        </Link>
        <Link
          to="/swift/basics/intro"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          开始 Swift 基础 →
        </Link>
      </div>
    </div>
  );
}
