import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function ClassObject() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 类与对象</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        为什么写一个类要两个文件？探秘 .h 和 .m。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📄"
          title="接口与实现分离"
          description="Objective-C 强制要求类的声明写在 Header (.h) 文件中，类的实现写在 Message (.m) 文件中。"
          frontend-ref="有点像 TypeScript 中把 interface 放在一个文件，class implementation 放在另一个文件，或者是 C/C++ 的传统风格。"
        />

        <h2>头文件 (.h) - 类的说明书</h2>
        <p>
          头文件用来告诉别人（以及编译器），你的类叫什么名字，有哪些属性，有哪些公开的方法。
          <strong>注意：私有方法和私有属性不需要写在头文件里。</strong>
        </p>

        <CodeCompare
          title="声明一个类"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Person.h
#import <Foundation/Foundation.h>

// @interface 表示类的声明，继承自 NSObject
@interface Person : NSObject

// 声明属性 (用 @property)
@property (nonatomic, copy) NSString *name;
@property (nonatomic, assign) NSInteger age;

// 声明实例方法 (- 开头)
- (void)sayHello;

// 声明类方法 (+ 开头，类似 JS 的 static)
+ (instancetype)personWithName:(NSString *)name;

@end`}
          rightCode={`// TypeScript 中的等价概念
interface IPerson {
    name: string;
    age: number;
    sayHello(): void;
}

// 静态方法通常写在类本身
class Person implements IPerson {
    static personWithName(name: string): Person {
        return new Person(name);
    }
    // ...
}`}
        />

        <h2>实现文件 (.m) - 类的血肉</h2>
        <p>
          在 <code>.m</code> 文件中，你需要导入自己的 <code>.h</code>
          文件，然后使用 <code>@implementation</code> 块来编写具体的方法逻辑。
        </p>

        <CodeCompare
          title="实现一个类"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Person.m
#import "Person.h"

@implementation Person

// 实例方法的实现
- (void)sayHello {
    // 内部通过 self 访问自己的属性
    NSLog(@"Hello, my name is %@", self.name);
}

// 类方法的实现
+ (instancetype)personWithName:(NSString *)name {
    Person *p = [[Person alloc] init];
    p.name = name;
    return p;
}

@end`}
          rightCode={`// JavaScript
class Person {
    constructor() {
        this.name = "";
        this.age = 0;
    }

    sayHello() {
        console.log(\`Hello, my name is \${this.name}\`);
    }

    static personWithName(name) {
        const p = new Person();
        p.name = name;
        return p;
    }
}`}
        />

        <h2>为什么满屏幕都是 @ 符号？</h2>
        <p>这是 Objective-C 最有辨识度的地方。为了把面向对象的特性（类、方法等）“嫁接”到纯 C 语言上，苹果的发明者们使用 <code>@</code> 符号作为所有扩展关键字的前缀，从而不与 C 语言本身的关键字冲突。</p>
        
        <TipBox type="info" title="常见的 @ 修饰符大全">
          <ul>
            <li><strong><code>@interface</code>：</strong> 类的“接口声明”。告诉编译器这个类叫什么名字，继承自谁，有哪些对外的公开方法和属性。它就像是产品的“说明书”。（通常写在 <code>.h</code> 文件）</li>
            <li><strong><code>@implementation</code>：</strong> 类的“具体实现”。在它和 <code>@end</code> 之间，你需要编写在 <code>@interface</code> 中声明的所有方法的具体业务逻辑大括号。它就像是产品的“内部零件”。（通常写在 <code>.m</code> 文件）</li>
            <li><strong><code>@end</code>：</strong> 配套使用，告诉编译器，当前的 <code>@interface</code> 或者 <code>@implementation</code> 代码块到此结束了。</li>
            <li><strong><code>@property</code>：</strong> 属性声明魔法。写上它，编译器会在背后默默帮你生成：一个带下划线的私有变量（如 <code>_name</code>）、一个获取值的方法（getter）和一个设置值的方法（setter）。</li>
            <li><strong><code>@protocol</code>：</strong> 声明一个协议（类似 TypeScript 的 Interface）。</li>
            <li><strong><code>@"Hello"</code>：</strong> 创建一个 <code>NSString</code> 字符串对象。如果不加 <code>@</code>，<code>"Hello"</code> 只是一个普通的 C 语言字符数组。</li>
            <li><strong><code>@[]</code> 和 <code>@&#123;&#125;</code>：</strong> 快速创建 OC 的数组（<code>NSArray</code>）和字典（<code>NSDictionary</code>）对象。</li>
          </ul>
        </TipBox>

        <h2>实例化对象 (alloc / init)</h2>
        <p>
          在 JavaScript 中，我们用 <code>new Person()</code>
          创建对象。在传统的 OC 中，创建对象需要两步：
        </p>
        <ol>
          <li>
            <strong>alloc (分配内存)：</strong>
            在堆上为对象开辟内存空间。
          </li>
          <li>
            <strong>init (初始化)：</strong>
            设置对象的初始状态（类似 constructor）。
          </li>
        </ol>

        <CodeCompare
          title="创建并使用对象"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
// 经典的两步走（永远连在一起写）
Person *bob = [[Person alloc] init];
bob.name = @"Bob";
[bob sayHello];

// 使用自定义的工厂方法 (类方法)
Person *alice = [Person personWithName:@"Alice"];
[alice sayHello];`}
          rightCode={`// JavaScript
// new 关键字在底层同时做了分配内存和调用 constructor 的事
const bob = new Person();
bob.name = "Bob";
bob.sayHello();

const alice = Person.personWithName("Alice");
alice.sayHello();`}
        />

        <TipBox type="tip" title="new 的缩写">
          其实 OC 也有 <code>new</code> 方法：<code>Person *bob = [Person new];</code>。<br/>
          它等价于 <code>[[Person alloc] init]</code>，但在 iOS 开发中，大家极少使用 <code>new</code>，因为 <code>alloc / init</code> 的组合允许你调用带有参数的初始化方法，比如 <code>[[Person alloc] initWithName:@"Bob"]</code>。
        </TipBox>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/basics/functions"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 函数与 Block
        </Link>
        <Link
          to="/objc-maintenance/oop/inheritance"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：继承与多态 →
        </Link>
      </div>
    </div>
  );
}
