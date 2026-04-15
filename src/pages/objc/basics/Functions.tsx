import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";
import CompareTable from "@/components/CompareTable";
import { Link } from "react-router-dom";

export default function Functions() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 函数与 Block</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        前端最熟悉的闭包，在 iOS 里长什么样？
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="Block（闭包）"
          description="Objective-C 中的闭包语法，用于捕获和保存代码块，通常用于异步回调、事件处理。"
          frontend-ref="类似 JavaScript 的箭头函数 () => {} / 闭包"
        />

        <h2>基本函数定义（方法）</h2>
        <p>
          在 OC 中，函数通常被称为“方法”（Method）。这是体现它纯正的面向对象（Object-Oriented）血统的地方。
          最重要的是，它严格区分了<strong>实例方法</strong>和<strong>类方法</strong>。
        </p>

        <CompareTable
          headers={["", "实例方法 (Instance Method)", "类方法 (Class Method)"]}
          rows={[
            ["修饰符", "减号 `-` 开头", "加号 `+` 开头"],
            ["调用者", "具体的对象实例（比如某个特定的用户 `bob`）", "类本身（比如 `User` 这个抽象概念）"],
            ["能否使用属性", "✅ 可以使用 `self.name` 访问自己的实例属性", "❌ 不能，因为此时还没有具体的实例产生"],
            ["JS/TS 对应概念", "普通的 class 方法", "带有 `static` 关键字的方法"],
            ["典型使用场景", "执行具体的业务逻辑：`[bob sayHello]`", "工厂方法创建对象：`[User userWithName:@\"Bob\"]`"]
          ]}
        />

        <CodeCompare
          title="定义与调用方法"
          leftCode="// Objective-C
- (NSInteger)addWithA:(NSInteger)a b:(NSInteger)b {
    return a + b;
}

// 调用实例方法 (使用 self，类似 this)
NSInteger result = [self addWithA:1 b:2];"
          rightCode="// JavaScript Class Method
add(a, b) {
    return a + b;
}

// 调用
const result = this.add(1, 2);"
        />

        <h2>Block 语法：那串奇怪的 ^ 符号</h2>
        <p>
          前端同学第一次看到 OC 的 Block 语法通常会感到极度不适。 记住一个口诀：
          <strong>带有 `^` 的就是 Block（闭包/回调函数）</strong>。
        </p>

        <CodeCompare
          title="Block 声明与调用 vs 箭头函数"
          leftCode='// Objective-C 的 Block
// 声明一个返回值是 void，参数是 NSString* 的 Block
void (^greet)(NSString *) = ^(NSString *name) {
    NSLog(@"Hello, %@!", name);
};

// 调用 Block (不再使用中括号，像 C 语言函数调用)
greet(@"World");'
          rightCode='// JavaScript 箭头函数
const greet = (name) => {
    console.log(`Hello, ${name}!`);
};

// 调用
greet("World");'
        />

        <h2>将 Block 作为参数（回调）</h2>
        <p>这也是最常见的使用场景，例如网络请求成功后的回调。</p>

        <CodeCompare
          title="异步回调"
          leftCode='// Objective-C 方法定义，参数是一个 Block
- (void)fetchDataWithCompletion:(void (^)(NSData *data, NSError *error))completion {
    // 模拟网络请求...
    if (completion) {
        completion(data, nil); // 执行回调
    }
}

// 调用该方法并传入 Block
[self fetchDataWithCompletion:^(NSData *data, NSError *error) {
    if (!error) {
        NSLog(@"请求成功: %@", data);
    }
}];'
          rightCode='// JavaScript 方法定义，参数是 callback 函数
fetchData(completion) {
    // 模拟网络请求...
    if (typeof completion === "function") {
        completion(data, null); // 执行回调
    }
}

// 调用
this.fetchData((data, error) => {
    if (!error) {
        console.log(`请求成功: ${data}`);
    }
});'
        />

        <TipBox type="info" title="局部变量捕获（闭包特性）">
          与 JavaScript 闭包类似，Block 可以捕获其外部环境的局部变量。
          <br />
          但在 OC 中，<strong>默认捕获的是值的副本（不可变）</strong>。如果想在
          Block 内部修改外部变量，必须在外部声明时用 <code>__block</code>{" "}
          修饰该变量。
        </TipBox>

        <TipBox type="warning" title="循环引用 (Retain Cycle)">
          前端写 React 时也常遇到 useEffect 闭包陷阱。在 OC 中，如果 Block
          内部强引用了 <code>self</code>，而 <code>self</code> 又持有这个
          Block，就会导致循环引用（内存泄漏）。
          <br />
          <strong>标准解法：</strong>使用{" "}
          <code>__weak typeof(self) weakSelf = self;</code>，然后在 Block
          内部使用 <code>weakSelf</code>。
        </TipBox>

        <h2>总结对比表</h2>
        <CompareTable
          headers={["特性", "Objective-C Block", "JavaScript 箭头函数"]}
          rows={[
            ["语法标志", "^returnType(params){}", "(params) => {}"],
            [
              "捕获外部变量",
              "默认捕获值副本（需 __block 修改）",
              "捕获变量引用（可读写）",
            ],
            ["调用方式", "直接调用 greet()", "直接调用 greet()"],
            [
              "循环引用风险",
              "极高（需 __weak self）",
              "中等（涉及 DOM 或全局监听需注意清理）",
            ],
            ["主要用途", "异步回调、动画闭包", "回调、高阶函数 (map/filter)"],
          ]}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc/basics/intro"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 简介
        </Link>
        <Link
          to="/objc/oop/class-object"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：类与对象 →
        </Link>
      </div>
    </div>
  );
}
