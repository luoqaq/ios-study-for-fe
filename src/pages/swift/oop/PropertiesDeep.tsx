import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function PropertiesDeep() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">⚙️ Swift 属性与存储深入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从 stored property 到 computed property，再到 property observer，搞清楚数据到底存在哪。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端类中的属性通常就是简单的 key-value 存储。
          Swift 中属性分为存储属性（Stored Property）和计算属性（Computed Property），
          还可以用 <code>willSet</code> / <code>didSet</code> 监听变化，
          功能上接近 Vue 的 computed 和 watch，但更底层。
        </p>

        <h2>存储属性 vs 计算属性</h2>
        <ul>
          <li><strong>Stored Property：</strong> 真正占用内存，直接保存值</li>
          <li><strong>Computed Property：</strong> 不占用内存，通过 getter/setter 动态计算</li>
        </ul>

        <CodeCompare
          title="Computed Property 对比"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`struct Rectangle {
    var width: Double
    var height: Double
    
    // 计算属性
    var area: Double {
        get { return width * height }
        set {
            // 假设固定宽度，调整高度
            height = newValue / width
        }
    }
}`}
          rightCode={`class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
    
    // TypeScript 没有原生 computed property
    get area() {
        return this.width * this.height;
    }
    set area(value) {
        this.height = value / this.width;
    }
}`}
        />

        <h2>属性观察器：willSet / didSet</h2>
        <p>
          当你需要在属性值变化前后执行一些逻辑时，可以用 willSet 和 didSet。
          这在数据绑定、日志记录、状态同步中非常实用。
        </p>
        <pre><code>{`var temperature: Double = 0 {
    willSet {
        print("即将从 \\(temperature) 变为 \\(newValue)")
    }
    didSet {
        print("已经从 \\(oldValue) 变为 \\(temperature)")
    }
}`}</code></pre>

        <h2>懒加载属性（Lazy Property）</h2>
        <p>
          用 <code>lazy</code> 标记的属性会在第一次被访问时才初始化，
          适合创建成本高、且不一定每次都用的对象。
          类似前端中的延迟计算或单例模式。
        </p>

        <TipBox type="tip" title="懒加载只适用于引用类型或复杂初始化">
          <code>lazy</code> 属性必须是 var，因为 init 后它的值还会变化（从 nil/uninitialized 到实际值）。
          它在多线程环境下不是线程安全的，如果需要线程安全，建议自己加锁或使用 actor。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/extension"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 扩展 Extension
        </Link>
        <Link
          to="/swift/oop/generics"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：泛型 Generics →
        </Link>
      </div>
    </div>
  );
}
