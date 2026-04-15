import { Link } from "react-router-dom";

export default function ObjcIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Objective-C</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iOS 的基石语言。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么作为前端还要学它？</h2>
        <p>
          尽管 Apple 大力推广 Swift，但市面上绝大多数的中大型 iOS
          App（微信、抖音、淘宝等） 核心业务仍在大量使用{" "}
          <strong>Objective-C（简称 OC）</strong>。 理解 OC
          是阅读底层源码、维护遗留系统和进行性能优化的必备技能。
        </p>

        <h3>语言特点</h3>
        <ul>
          <li>
            <strong>C 语言的超集：</strong> 完全兼容 C 语言，可以在 OC
            代码中直接写 C 代码。
          </li>
          <li>
            <strong>消息传递（Message Passing）：</strong> 区别于 C++/Java
            的“调用方法”，OC 是向对象“发送消息”（来自 Smalltalk 的理念）。
          </li>
          <li>
            <strong>动态运行时（Runtime）：</strong>{" "}
            可以在程序运行期间动态地创建类、替换方法实现（Method
            Swizzling），这给了 OC 极大的灵活性，甚至能实现类似 JS 的动态特性。
          </li>
        </ul>

        <h2>学习路径</h2>
        <p>本模块分为四个部分，将带你快速从 JS 的心智模型过渡到 OC：</p>

        <ol>
          <li>
            <Link to="/objc/basics/intro">基础语法</Link>
            ：熟悉基本数据类型、字符串操作和控制流。
          </li>
          <li>
            <Link to="/objc/oop/class-object">面向对象</Link>：掌握 `.h/.m`
            文件分离、类与协议。
          </li>
          <li>
            <Link to="/objc/memory/arc">内存管理</Link>：理解 ARC
            机制，避免循环引用。
          </li>
          <li>
            <Link to="/objc/advanced/kvo">高级特性</Link>：学习 KVO、Delegate 和
            Notification 模式。
          </li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/guide/before-start"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 开始之前
        </Link>
        <Link
          to="/objc/basics/intro"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          开始基础语法 →
        </Link>
      </div>
    </div>
  );
}
