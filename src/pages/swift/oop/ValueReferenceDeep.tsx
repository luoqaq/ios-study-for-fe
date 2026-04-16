import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function ValueReferenceDeep() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🧬 值类型与引用类型深入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        理解内存模型，是写出高性能、无 Bug Swift 代码的底层基础。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          JavaScript 中，基本类型（number、string、boolean）是值传递，对象是引用传递。
          Swift 把这个概念扩展到了自定义类型层面：struct 默认是值类型，class 默认是引用类型。
          这个选择直接决定了数据在内存中的存储位置、传递方式和生命周期。
        </p>

        <h2>值类型的拷贝语义</h2>
        <p>
          Swift 的 struct 在赋值或传参时会发生拷贝。但编译器做了大量优化：
          如果原对象在拷贝后没有被修改，实际上并不会真的复制内存（Copy-on-Write）。
          只有当你修改了拷贝后的对象，才会触发真正的复制。
        </p>

        <CodeCompare
          title="Array 的 Copy-on-Write"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`var a = [1, 2, 3]
var b = a

// 此时 a 和 b 共享同一块内存
b.append(4)

// 修改 b 时才触发真正的拷贝
// a 不受影响`}
          rightCode={`let a = [1, 2, 3];
let b = a;

// JS 中 b 和 a 指向同一个数组引用
b.push(4);

// a 也被修改了！
console.log(a); // [1, 2, 3, 4]`}
        />

        <h2>引用类型的共享风险</h2>
        <p>
          Class 的实例在堆上分配，多个变量可以指向同一个对象。
          这意味着一个地方的修改会影响到所有引用者。
          在多线程环境下，如果没有加锁或 actor 隔离，还会引发数据竞争。
        </p>

        <TipBox type="warning" title="SwiftUI 的 View 是 struct，但状态对象用 class">
          SwiftUI 的 <code>View</code> 协议要求实现者是 struct（值类型），
          这样界面重建成本低。但真正的状态（如 <code>ObservableObject</code>）通常用 class，
          因为需要共享引用和生命周期管理。
        </TipBox>

        <h2>选型指南</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>数据模型、配置对象、坐标点</td><td>Struct</td></tr>
            <tr><td>需要唯一身份、共享状态</td><td>Class</td></tr>
            <tr><td>多线程共享可变数据</td><td>Actor 或 Class + 锁</td></tr>
            <tr><td>嵌套在 struct 中的大对象</td><td>考虑用 class 避免频繁拷贝</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/class-struct"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 类与结构体
        </Link>
        <Link
          to="/swift/oop/enum"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：枚举 Enum →
        </Link>
      </div>
    </div>
  );
}
