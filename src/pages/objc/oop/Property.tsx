import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Property() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 属性 Property</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        @property 和下划线变量，不再让你一头雾水。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="Getter 和 Setter 的语法糖"
          description="在 OC 早期，你要自己写 `-(NSString *)name` (getter) 和 `-(void)setName:(NSString *)name` (setter)。`@property` 的出现，让编译器自动帮你生成了这一对方法，并且自动生成了一个带下划线 `_` 的底层存储变量。"
          frontend-ref="完全等同于 JavaScript/TypeScript class 里的 `get` 和 `set` 以及隐藏的 `#私有字段`。"
        />

        <h2>点语法与方法的渊源</h2>
        <p>
          前端同学看到 OC 代码中最迷惑的可能是：一会儿是 <code>person.name</code>，一会儿又是 <code>[person name]</code>。
        </p>
        <p>
          在 OC 中，属性的点语法 <code>.</code> 实际上就是<strong>调用 getter 和 setter 的语法糖</strong>。本质上它依然是在“发送消息”。
        </p>

        <CodeCompare
          title="点语法本质是方法调用"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// 定义属性
@interface Person : NSObject
@property (nonatomic, copy) NSString *name;
@end

// 使用点语法 (看起来像 JS)
person.name = @"Alice";
NSString *n = person.name;

// 编译器实际上把它变成了这样：
[person setName:@"Alice"]; // 调用 setter
NSString *n = [person name]; // 调用 getter`}
          rightCode={`// JavaScript 中的 Getter/Setter
class Person {
    constructor() {
        this._name = ""; // 底层私有存储
    }

    // getter (对应 [person name])
    get name() {
        return this._name;
    }

    // setter (对应 [person setName:])
    set name(value) {
        this._name = value;
    }
}

const person = new Person();
person.name = "Alice";
const n = person.name;`}
        />

        <h2>底层私有变量：带下划线的 <code>_name</code></h2>
        <p>
          当你在 <code>.h</code> 中写了 <code>@property NSString *name;</code>，编译器默默地在 <code>.m</code> 文件里给你生成了一个实例变量叫 <code>_name</code>（带下划线）。
        </p>

        <CodeCompare
          title="self.name vs _name"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`@implementation Person

// 重写 name 的 setter (比如加上判断逻辑)
- (void)setName:(NSString *)name {
    // ❌ 错误：不能写 self.name = name;
    // self.name 又是调用 setName，导致死循环崩溃！

    // ✅ 正确：直接给底层变量 _name 赋值
    if (name.length > 0) {
        _name = name; 
    }
}

@end`}
          rightCode={`// JavaScript
class Person {
    // ...
    set name(value) {
        // ❌ 错误：不能写 this.name = value;
        // 会导致 setter 死循环调用

        // ✅ 正确：给私有属性赋值
        if (value.length > 0) {
            this._name = value;
        }
    }
}`}
        />

        <TipBox type="tip" title="何时使用下划线？">
          作为最佳实践，苹果官方推荐：在重写 <code>getter</code> 和 <code>setter</code> 时，或者在 <code>init</code> 构造方法和 <code>dealloc</code> 析构方法中，<strong>直接使用 <code>_name</code> 访问底层变量，不要走 <code>self.name</code> 的方法调用</strong>。其余所有的业务代码，都应该用 <code>self.name</code> 点语法。
        </TipBox>

        <h2>属性修饰符（那串括号里是什么？）</h2>
        <p>
          前端没有这玩意儿。因为 OC 是一门底层语言（C语言超集），编译器需要知道多线程和内存管理策略，所以每次声明属性都要带一串修饰符：
        </p>
        <p><code>@property (nonatomic, copy) NSString *name;</code></p>

        <ul>
          <li><strong>nonatomic（非原子性）：</strong> 几乎所有属性都写这个。意味着在多线程访问时编译器不加锁，速度快。如果遇到多线程冲突你自己去处理。如果不写，默认是 <code>atomic</code>（原子性，加锁，极慢）。</li>
          <li><strong>strong（强引用）：</strong> 告诉 ARC 内存管理“我要持有这个对象，别给销毁了”。默认的修饰符。适用于大部分对象（数组、字典、自定义对象）。</li>
          <li><strong>weak（弱引用）：</strong> “我只要指着它就行了，它要是销毁了，这个变量自动变成 <code>nil</code>”。专治循环引用（比如 UI 控件、代理 Delegate）。</li>
          <li><strong>copy（拷贝）：</strong> 只有 <strong>NSString / NSArray / NSDictionary / Block</strong> 这几种自带“可变子类 (Mutable)”的类型，才必须用 <code>copy</code>。这是为了防止别人传个可变字符串进来，然后在外面悄悄改了内容，导致你的属性值在不知情下变化了。</li>
          <li><strong>assign（基本数据类型）：</strong> 用于不是指针的 C 语言基础类型（比如 <code>NSInteger</code>, <code>CGFloat</code>, <code>BOOL</code>）。</li>
        </ul>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/oop/category"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 分类 Category
        </Link>
        <Link
          to="/objc-maintenance/memory/arc"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：ARC 内存机制 →
        </Link>
      </div>
    </div>
  );
}
