import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Arc() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 ARC 机制</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        没有 V8 的垃圾回收，苹果的内存魔术。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🧠"
          title="编译期自动插入管理代码"
          description="和 JavaScript 运行时的垃圾回收器（GC - Garbage Collector）完全不同，ARC (Automatic Reference Counting) 是编译器（LLVM）的杰作。它在把你的代码翻译成机器码时，自动分析生命周期，并在合适的地方插入 `retain` (引用+1) 和 `release` (引用-1) 指令。"
          frontend-ref="就像一个不知疲倦的机器人，在你每次写 let a = b 的时候，默默加了一行 b.refCount++；离开作用域时加了一行 b.refCount--。当 count 归 0，内存立即回收（同步！）。"
        />

        <h2>引用计数 (Reference Counting) 是什么？</h2>
        <p>
          在 Objective-C 中，每个对象都有一个内置的计数器。这个数字表示当前有多少个强引用（强指针）正在指向它。
        </p>
        <p>
          如果这个计数器大于 0，这个对象就会乖乖地待在内存堆（Heap）里。<br/>
          一旦由于变量重新赋值、离开函数作用域，导致没有任何强引用指向它了（计数器减为 0），系统会<strong>立刻</strong>调用它的 <code>dealloc</code>（析构函数），把它的内存收回。
        </p>

        <CodeCompare
          title="ARC 工作的原理示意"
          leftLang="objectivec"
          rightLang="objectivec"
          leftCode={`// 我们写的代码：
- (void)testARC {
    Person *p = [[Person alloc] init];
    // 对象的引用计数变成了 1
    
    // 执行其他逻辑...
    
} // p 变量离开作用域，消亡
// 对象的引用计数变成 0，立刻销毁！`}
          rightCode={`// 编译器眼中的代码（底层展开）：
- (void)testARC {
    Person *p = objc_msgSend(Person, @selector(alloc));
    p = objc_msgSend(p, @selector(init));
    // [p retain]; // alloc 隐含了一次 retain

    // 执行其他逻辑...
    
    [p release]; // 编译器看你用完了，插了一句 release！
    // 发现 p 的 count == 0，底层调用 [p dealloc] 并 free 内存。
}`}
        />

        <h2>ARC vs 垃圾回收 (GC)</h2>
        <p>
          前端同学可能会问：V8 引擎的垃圾回收那么好用，为什么苹果非要死抱着引用计数不放？而且还是在编译期做？
        </p>

        <p>主要原因有两个：</p>
        <ol>
          <li><strong>没有暂停 (Stop The World)：</strong> V8 的垃圾回收（如标记-清除算法）在内存吃紧或者定期扫描时，必须暂停所有的 JS 执行线程去遍历对象树。对于要求 60fps 乃至 120fps 如丝般顺滑的 iOS UI 动画来说，这种不可控的暂停（掉帧）是绝对无法忍受的。</li>
          <li><strong>低内存占用：</strong> 手机内存极其昂贵（早年 iPhone 只有 512MB RAM）。ARC 是<strong>确定性释放</strong>，对象不用了，那条语句执行完的瞬间，内存就立刻交还给系统了，没有任何延迟。</li>
        </ol>

        <TipBox type="tip" title="前端也有类似概念：React 的 useEffect 清理">
          在 React 中，如果组件卸载了（离开作用域），我们常常要在 <code>useEffect</code> 的 return 里清理定时器。这和 ARC 当计数归 0 后立刻执行 <code>dealloc</code> （析构）非常相似。你可以通过重写 <code>dealloc</code> 来打印日志，验证对象是不是被释放了。
        </TipBox>

        <h2>强引用 (Strong) 与 弱引用 (Weak)</h2>
        <p>
          既然靠引用计数，那就必须区分两种指针。
        </p>
        <ul>
          <li><strong>强引用 (Strong)：</strong> 默认的指针类型。只要我有强指针指着你，你的计数器就+1，你就别想死。</li>
          <li><strong>弱引用 (Weak)：</strong> 我指着你，但我<strong>不增加</strong>你的计数器。如果没人强引用你了（你死了），<strong>我的指针会自动变成 <code>nil</code></strong>。这太安全了，完全杜绝了 C 语言里可怕的野指针（悬垂指针）崩溃。</li>
        </ul>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc/oop/property"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 属性 Property
        </Link>
        <Link
          to="/objc/memory/retain-cycle"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：循环引用 →
        </Link>
      </div>
    </div>
  );
}