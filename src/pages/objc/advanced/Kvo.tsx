import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Kvo() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 KVO 键值观察</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Key-Value Observing: Vue.js 响应式原理的 OC 版本。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="👀"
          title="监听对象属性的改变"
          description="KVO 允许对象去注册监听另一个对象的特定属性（哪怕这个属性是一个私有的实例变量）。当该属性的值发生变化时，监听者会立即收到一个通知（回调）。"
          frontend-ref="核心思想与 Vue 2 的 `Object.defineProperty` 拦截 getter/setter 极为相似。现代前端则用 ES6 的 `Proxy` 实现。"
        />

        <h2>KVO 的三步走</h2>
        <p>
          相比于 JS 中的隐式响应式（比如 Vue 模板），在 OC 里，实现这种监听是完全手动的，分为三步：
        </p>
        <ol>
          <li><strong>注册观察者：</strong> 我（Observer）要盯着你（Target）的某个属性（KeyPath）。</li>
          <li><strong>接收通知：</strong> 实现一个固定的回调方法（<code>observeValueForKeyPath...</code>），当值改变时，系统会叫你。</li>
          <li><strong>移除观察者：</strong> 不看的时候，必须手动解绑，否则会内存泄漏或野指针崩溃。</li>
        </ol>

        <CodeCompare
          title="完整的 KVO 实现"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
// 假设有一个 User 对象，我们监听它的 name 属性
@interface User : NSObject
@property (nonatomic, copy) NSString *name;
@end

@implementation MyViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.user = [[User alloc] init];
    
    // 1. 注册监听 (self 监听 user 的 "name" 属性)
    // 并且要求系统把 [新值] 和 [旧值] 一并传给我
    [self.user addObserver:self 
                forKeyPath:@"name" 
                   options:NSKeyValueObservingOptionNew | NSKeyValueObservingOptionOld 
                   context:nil];
                   
    self.user.name = @"Alice"; // 这会触发监听回调！
}

// 2. 实现系统约定的回调方法 (名字必须是这个)
- (void)observeValueForKeyPath:(NSString *)keyPath 
                      ofObject:(id)object 
                        change:(NSDictionary *)change 
                       context:(void *)context {
                       
    if ([keyPath isEqualToString:@"name"]) {
        NSLog(@"新名字是: %@", change[NSKeyValueChangeNewKey]);
    }
}

// 3. 页面销毁时，必须移除监听！(如果不写，一旦 user 销毁会立马崩溃)
- (void)dealloc {
    [self.user removeObserver:self forKeyPath:@"name"];
}
@end`}
          rightCode={`// JavaScript (使用 Proxy 模拟 KVO 模式)
const user = { name: "" };

// 1. 设置监听 (拦截赋值)
const userProxy = new Proxy(user, {
    set(target, property, value) {
        const oldValue = target[property];
        target[property] = value;
        
        // 2. 触发回调
        if (property === "name") {
            console.log(\`新名字是: \${value}, 旧的: \${oldValue}\`);
        }
        return true;
    }
});

// 触发监听！
userProxy.name = "Alice";`}
        />

        <TipBox type="danger" title="KVO 的黑魔法与大坑">
          <strong>KVO 的底层原理非常骚 (isa-swizzling)：</strong>
          
          <div className="my-4 p-4 bg-white dark:bg-gray-800 rounded-lg flex justify-center">
            <svg width="480" height="220" viewBox="0 0 480 220" className="text-gray-800 dark:text-gray-200">
              {/* Original Object */}
              <rect x="20" y="20" width="160" height="60" rx="8" className="fill-ios-blue opacity-20" stroke="currentColor" strokeWidth="2" />
              <text x="100" y="45" textAnchor="middle" className="font-bold fill-ios-blue">User 实例</text>
              <text x="100" y="65" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">isa -&gt; User 类</text>

              <path d="M 180 50 L 300 50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#kvo-arrow)" />
              <text x="240" y="40" textAnchor="middle" className="text-xs fill-ios-orange">addObserver 后</text>

              {/* Swizzled Object */}
              <rect x="300" y="20" width="160" height="60" rx="8" className="fill-ios-orange opacity-20" stroke="currentColor" strokeWidth="2" />
              <text x="380" y="45" textAnchor="middle" className="font-bold fill-ios-orange">User 实例</text>
              <text x="380" y="65" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">isa -&gt; NSKVONotifying_User</text>

              {/* Fake Subclass */}
              <rect x="280" y="120" width="200" height="80" rx="8" className="fill-ios-orange opacity-10" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
              <text x="380" y="145" textAnchor="middle" className="font-bold fill-ios-orange text-sm">系统偷建的假子类</text>
              <text x="380" y="165" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">重写 setName: 方法</text>
              <text x="380" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">插入发送通知逻辑</text>

              <path d="M 380 80 L 380 120" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#kvo-arrow)" />

              <defs>
                <marker id="kvo-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                </marker>
              </defs>
            </svg>
          </div>
          
          当你调用 <code>addObserver</code> 的那一刻，Runtime 会在内存里偷偷创建一个你这个类的子类（叫 <code>NSKVONotifying_User</code>），然后把你的 <code>isa</code> 指针从 <code>User</code> 改指向这个新造的假子类。这个假子类重写了 <code>setName:</code> 方法，在里面插入了发送通知的代码！<br/><br/>
          由于它的实现完全依赖 Runtime 和字符串硬编码，如果不小心拼错了属性名（比如 <code>@"naem"</code>），编译不会报错，但运行直接崩溃。<br/>
          现代 Swift 使用了 Combine (发布订阅) 或 <code>@Published</code> 属性包装器，彻底解决了这个问题。
        </TipBox>

        <h2>KVC (键值编码)</h2>
        <p>说到 KVO 就必须提 KVC（Key-Value Coding）。</p>
        <p>在 JS 中，你想动态访问对象的属性，你会写 <code>obj["name"]</code>。在 OC 中，你用 KVC：<code>[user valueForKey:@"name"]</code> 和 <code>[user setValue:@"Alice" forKey:@"name"]</code>。</p>
        <p>即使 <code>name</code> 是个私有变量没有 setter，KVC 也能通过底层的 C 语言指针强行把它改掉！KVO 的实现也高度依赖 KVC。</p>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc/memory/retain-cycle"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 循环引用
        </Link>
        <Link
          to="/objc/advanced/delegate"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：Delegate 委托模式 →
        </Link>
      </div>
    </div>
  );
}