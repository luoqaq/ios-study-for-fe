import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function RetainCycle() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 循环引用</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        内存泄漏（Memory Leak）：ARC 唯一的阿喀琉斯之踵。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🔄"
          title="互相强持有的死结"
          description="A 强引用 B（B 的计数器 +1），B 又强引用 A（A 的计数器 +1）。如果外部也没有强指针指着它们俩，这俩哥们儿就抱团取暖，永远待在内存里了，并且我们再也无法访问到这块内存。"
          frontend-ref="现代 V8 / SpiderMonkey 垃圾回收（标记清除法从根节点开始遍历）可以识别出互相引用（闭环但不可达）的孤岛并干掉它们，所以前端一般不担心这种级别的循环引用。"
        />

        <h2>一图看懂循环引用 (Retain Cycle)</h2>
        <p>我们用一张图来直观地看看这个会导致内存泄漏的“死亡拥抱”是如何发生的：</p>
        
        <div className="my-8 rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center overflow-x-auto">
          <svg width="500" height="280" viewBox="0 0 500 280" className="text-gray-800 dark:text-gray-200">
            {/* ViewController Box */}
            <rect x="50" y="80" width="160" height="120" rx="12" className="fill-ios-blue opacity-10" stroke="currentColor" strokeWidth="2" />
            <text x="130" y="110" textAnchor="middle" className="font-bold fill-ios-blue text-lg">MyVC (self)</text>
            <text x="130" y="140" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-sm">Retain Count: 1</text>
            <text x="130" y="170" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-sm">无法被销毁 💥</text>

            {/* Block Box */}
            <rect x="290" y="80" width="160" height="120" rx="12" className="fill-ios-red opacity-10" stroke="currentColor" strokeWidth="2" />
            <text x="370" y="110" textAnchor="middle" className="font-bold fill-ios-red text-lg">Block (闭包)</text>
            <text x="370" y="140" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-sm">Retain Count: 1</text>
            <text x="370" y="170" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-sm">无法被销毁 💥</text>

            {/* Top Arrow: VC -> Block */}
            <path d="M 130 80 Q 250 20 370 80" fill="none" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrowhead)" className="text-ios-blue" />
            <rect x="185" y="25" width="130" height="24" rx="4" className="fill-white dark:fill-gray-800" />
            <text x="250" y="42" textAnchor="middle" className="fill-ios-blue font-bold text-xs">self.block = ... (强引用)</text>

            {/* Bottom Arrow: Block -> VC */}
            <path d="M 370 200 Q 250 260 130 200" fill="none" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrowhead)" className="text-ios-red" />
            <rect x="195" y="228" width="110" height="24" rx="4" className="fill-white dark:fill-gray-800" />
            <text x="250" y="245" textAnchor="middle" className="fill-ios-red font-bold text-xs">大括号内捕获 self</text>

            {/* SVG Definitions */}
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </div>

        <h2>循环引用产生的原因</h2>
        <p>
          在 iOS 开发中，除了故意写出来的 <code>A.b = B; B.a = A;</code> 之外，
          <strong>绝大多数的循环引用，都是由 Block（闭包）引起的！</strong>
        </p>

        <p>
          因为 Block 在捕获外部变量时，会产生一次<strong>强引用</strong>。如果你的 Controller (自己) 拥有一个 Block 属性，而在这个 Block 里面又使用了 <code>self</code>，灾难就发生了。
        </p>

        <CodeCompare
          title="Block 引起的循环引用"
          leftLang="objectivec"
          rightLang="objectivec"
          leftCode={`// 假设有一个 ViewController (A)
@interface MyVC : UIViewController
@property (nonatomic, copy) void (^completionBlock)(void);
@end

@implementation MyVC

- (void)viewDidLoad {
    [super viewDidLoad];

    // 1. self 强引用了 completionBlock
    self.completionBlock = ^{
        // 2. Block 的大括号里捕获了 self
        // (Block 强引用了 self)
        NSLog(@"%@", self.view);
    };
    
    // 💥 产生死结，离开这个页面后，MyVC 永远无法销毁
}`}
          rightCode={`// 上面的情况如果在前端发生：
// (不过由于前端有标记清除 GC，它能发现这是孤岛并清理)

class MyVC {
  constructor() {
    // 强引用闭包
    this.completionBlock = () => {
      // 闭包内部又捕获了 this
      console.log(this.view);
    };
  }
}`}
        />

        <h2>打破死结的解药：<code>__weak typeof(self)</code></h2>
        <p>
          为了打破这个死结，你必须把其中一条强引用斩断，换成<strong>弱引用 (weak)</strong>。<br/>
          最常见的做法是：在进入 Block 之前，创建一个只具备弱引用特性的 <code>self</code> 指针。
        </p>

        <CodeCompare
          title="标准的弱引用解法 (Weak-Strong Dance)"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`- (void)viewDidLoad {
    [super viewDidLoad];

    // 1. 声明一个 weak 类型的临时变量，弱指向 self
    // __weak 修饰符告诉 ARC：不要增加 self 的引用计数
    __weak typeof(self) weakSelf = self;

    self.completionBlock = ^{
        // 2. 在 Block 内部，使用这个弱指针！
        NSLog(@"%@", weakSelf.view);
        
        // ✅ 此时，Block 弱引用了 weakSelf，
        // 而 weakSelf 又指向真实的 MyVC。
        // 因为是弱引用，所以没有循环死结！
    };
}`}
          rightCode={`// 虽然 JS 不存在这种闭包级别的循环引用泄漏，
// 但前端在写 React 的 useEffect 时，也经常遇到闭包陷阱（拿不到最新 state）：

// 类似的概念，有时候我们要把外部引用脱钩：
useEffect(() => {
    // 比如把回调存到了一个外部的 event listener 中
    const handler = () => {
        console.log(state); // 闭包陷阱，强绑定了旧的 state
    };
    window.addEventListener("scroll", handler);

    return () => {
        // 如果不移除（斩断引用），就会泄漏
        window.removeEventListener("scroll", handler);
    };
}, []);`}
        />

        <TipBox type="tip" title="进阶：Weak-Strong Dance (弱强共舞)">
          上面只写了一半。<br/>
          因为 <code>weakSelf</code> 是弱引用，如果这个 Block 在 5 秒后才执行，此时 Controller 早就被用户划走销毁了，那么 <code>weakSelf</code> 就会自动变成 <code>nil</code>！<br/>
          如果你在 Block 里有多行代码：<br/>
          <code>[weakSelf doSomething];</code><br/>
          <code>[weakSelf doAnotherThing]; // 如果刚好在这两行代码之间，VC 被销毁了呢？</code>
          <br/>
          为了防止执行到一半被干掉，我们通常会在 Block 内部的开头，把 <code>weakSelf</code> 再短暂地升级成 <code>strong</code> 指针（只在 Block 执行期间有效）：<br/>
          <code>__strong typeof(weakSelf) strongSelf = weakSelf;</code><br/>
          <code>if (!strongSelf) return;</code>
        </TipBox>

        <h2>Delegate 引起的循环引用</h2>
        <p>除了 Block，我们在后续高级特性中会讲到的<strong>代理 (Delegate)</strong>，也是重灾区。<br/>
        记住这个铁律：<strong>无论任何时候声明一个 <code>delegate</code> 属性，修饰符必须是 <code>weak</code>。</strong></p>
        <p><code>@property (nonatomic, weak) id&lt;SomeDelegate&gt; delegate;</code></p>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/memory/arc"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← ARC 机制
        </Link>
        <Link
          to="/objc-maintenance/practice/memory-debug"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：内存泄漏实战排查 →
        </Link>
      </div>
    </div>
  );
}
