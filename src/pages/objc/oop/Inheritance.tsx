import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Inheritance() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 继承与多态</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        严格的单继承，调用父类方法的 super。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🌳"
          title="基于类的单继承"
          description="和 ES6 的 class 一样，Objective-C 支持单继承。子类继承父类的属性和方法，并可以重写（Override）它们。"
          frontend-ref="`@interface Child : Parent` 完全等价于 `class Child extends Parent`。"
        />

        <h2>定义子类</h2>
        <p>
          在头文件中，冒号 <code>:</code> 后面跟着的就是父类。如果不写继承，或者不知道继承谁，一律继承 <code>NSObject</code>（它是绝大多数 OC 类的基类，类似 JS 的 <code>Object.prototype</code>）。
        </p>

        <CodeCompare
          title="继承语法"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Student.h
#import "Person.h"

// 继承自 Person 类
@interface Student : Person

@property (nonatomic, copy) NSString *school;

- (void)study;

@end`}
          rightCode={`// JavaScript
class Student extends Person {
    constructor() {
        super();
        this.school = "";
    }
    
    study() { }
}`}
        />

        <h2>重写方法 (Override) 与 super</h2>
        <p>
          在 OC 的 <code>.m</code> 文件中，直接写出和父类同名的方法，编译器就知道你是在重写。
          <strong>不需要任何特殊的 <code>override</code> 关键字</strong>（这是它不如 Swift 安全的地方）。
        </p>
        <p>
          如果要在重写时保留父类的逻辑，使用 <code>[super methodName]</code>。这和 JS 里的 <code>super.methodName()</code> 完全一致。
        </p>

        <CodeCompare
          title="重写与 super"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Student.m
#import "Student.h"

@implementation Student

// 重写父类的 sayHello
- (void)sayHello {
    // 调用父类实现
    [super sayHello];
    // 增加自己的逻辑
    NSLog(@"I am a student at %@", self.school);
}

- (void)study {
    NSLog(@"Studying hard...");
}

@end`}
          rightCode={`// JavaScript
class Student extends Person {
    
    // 重写 sayHello
    sayHello() {
        // 调用父类
        super.sayHello();
        
        console.log(\`I am a student at \${this.school}\`);
    }
}`}
        />

        <h2>多态 (Polymorphism)</h2>
        <p>
          因为有了继承，父类指针可以指向子类对象。这就是多态。当你向这个对象发送消息时，运行时（Runtime）会聪明地找到对象<strong>真实类型</strong>对应的方法去执行。
        </p>

        <CodeCompare
          title="多态表现"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Objective-C
// 父类指针指向子类对象
Person *p = [[Student alloc] init];
p.name = @"Alice";
// 强转以便使用子类属性
((Student *)p).school = @"MIT";

// 运行时会执行 Student 重写后的 sayHello！
[p sayHello];`}
          rightCode={`// TypeScript
// 父类类型指向子类实例
let p: Person = new Student();
p.name = "Alice";
(p as Student).school = "MIT";

// 执行子类重写的方法
p.sayHello();`}
        />

        <TipBox type="warning" title="判断对象类型">
          由于多态的存在，有时候你需要知道某个对象到底是不是某个子类。在 JS 中你用 <code>instanceof</code>。在 OC 中：<br/>
          <code>if ([p isKindOfClass:[Student class]]) &#123; ... &#125;</code>
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/oop/class-object"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 类与对象
        </Link>
        <Link
          to="/objc-maintenance/oop/protocol"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：协议 Protocol →
        </Link>
      </div>
    </div>
  );
}
