import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function ClosureMemory() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🧠 闭包捕获与内存管理</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        闭包是 Swift 的利器，但用不好就是内存泄漏的温床。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          JavaScript 的闭包也会捕获外部变量，但由于 JS 是垃圾回收机制，循环引用问题远不如 iOS 中致命。
          Swift 使用 ARC（自动引用计数），闭包对 self 的强引用很容易导致<strong>循环引用 (Retain Cycle)</strong>，
          对象永远无法释放，内存泄漏就此产生。
        </p>

        <h2>什么是捕获列表 (Capture List)</h2>
        <p>
          在闭包开头用方括号 <code>[...]</code> 声明如何捕获外部变量，这就是捕获列表。
          最常见的用法是声明对 <code>self</code> 的弱引用：
        </p>

        <CodeCompare
          title="强引用 vs 弱引用捕获"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift
class NetworkManager {
    func fetchData(completion: @escaping () -> Void) { ... }
}

class ProfileViewController: UIViewController {
    let manager = NetworkManager()
    var userName: String = ""

    func loadData() {
        // ❌ 强引用捕获 self：可能导致循环引用
        manager.fetchData {
            self.userName = "Loaded"
        }

        // ✅ 弱引用捕获 self：避免循环引用
        manager.fetchData { [weak self] in
            self?.userName = "Loaded"
        }

        // ✅ 如果 self 一定存活，可用 unowned
        manager.fetchData { [unowned self] in
            self.userName = "Loaded"
        }
    }
}`}
          rightCode={`// TypeScript
class ProfileViewController {
    userName = "";

    loadData() {
        fetchData(() => {
            // JS 中 this 可能丢失，通常用箭头函数绑定
            this.userName = "Loaded";
        });
    }
}`}
        />

        <h2>weak vs unowned 怎么选</h2>
        <ul>
          <li><strong>[weak self]：</strong> 弱引用，可能为 nil。适合异步回调、网络请求，因为闭包执行时 self 可能已经被释放。</li>
          <li><strong>[unowned self]：</strong> 无主引用，不为 nil，但如果 self 已释放再访问会崩溃。适合闭包和 self 生命周期明确绑定的场景。</li>
        </ul>

        <TipBox type="warning" title="unowned 是隐式解包 optional">
          用 <code>[unowned self]</code> 就像用 <code>!</code> 强制解包：方便但危险。
          如果不确定生命周期关系，一律先用 <code>[weak self]</code>。
        </TipBox>

        <h2>逃逸闭包 @escaping</h2>
        <p>
          如果闭包在函数返回后才执行（比如网络回调），必须标记为 <code>@escaping</code>。
          编译器会强制你考虑捕获列表，因为这时的闭包生命周期比函数更长。
        </p>

        <h2>捕获值类型 vs 引用类型</h2>
        <p>
          闭包对值类型（如 Int、String、struct）是值捕获，不会引起循环引用；
          对引用类型（如 class 实例）默认是强引用捕获，必须显式处理。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/closure"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 闭包 Closure
        </Link>
        <Link
          to="/swift/advanced/concurrency"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：并发 async/await →
        </Link>
      </div>
    </div>
  );
}
