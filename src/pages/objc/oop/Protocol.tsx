import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Protocol() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 协议 Protocol</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Objective-C 中的 Interface，实现多继承和解耦的利器。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📝"
          title="接口与规范"
          description="和 TypeScript 里的 Interface 一模一样：它声明了一组方法，谁“遵守（Conform）”这个协议，谁就必须实现这些方法。"
          frontend-ref="TypeScript 的 `interface` 和 `implements`。"
        />

        <h2>协议的定义与遵循</h2>
        <p>
          在 Objective-C 中，因为是单继承，如果你想让一个类同时具备多种能力（比如飞、游泳），你只能通过实现多个协议来完成。
        </p>

        <CodeCompare
          title="定义协议"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Flyable.h
#import <Foundation/Foundation.h>

// 使用 @protocol 定义协议
@protocol Flyable <NSObject>

// 默认是必须实现的 (@required)
- (void)fly;

// 标记为可选实现的 (@optional)
@optional
- (void)land;

@end`}
          rightCode={`// TypeScript 中的等价概念
interface Flyable {
    // 必须实现
    fly(): void;
    
    // 可选实现 (使用 ?)
    land?(): void;
}`}
        />

        <p>
          在类的 <code>.h</code> 文件中，用尖括号 <code>&lt; &gt;</code> 来表示遵循哪些协议，多个协议之间用逗号分隔。
        </p>

        <CodeCompare
          title="类遵循协议"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Bird.h
#import "Flyable.h"
#import "Swimmable.h"

// 遵循多个协议
@interface Bird : NSObject <Flyable, Swimmable>

@end

// Bird.m
@implementation Bird

// 必须实现协议要求的方法
- (void)fly {
    NSLog(@"Bird is flying");
}

- (void)swim {
    NSLog(@"Bird is swimming");
}

@end`}
          rightCode={`// TypeScript
class Bird implements Flyable, Swimmable {
    
    // 必须实现接口要求的方法
    fly() {
        console.log("Bird is flying");
    }
    
    swim() {
        console.log("Bird is swimming");
    }
}`}
        />

        <h2>协议作为类型 (多态)</h2>
        <p>这是协议最强大的地方：当你编写一个函数接收参数时，你不必关心对方是什么具体的类，你只关心它<strong>有没有遵守某个协议</strong>。</p>

        <CodeCompare
          title="面向接口编程"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Objective-C
// 这个函数接收任何遵循 Flyable 协议的对象
// id<Flyable> 意思是：一个对象 (id)，且遵守了 Flyable (<Flyable>)
- (void)makeItFly:(id<Flyable>)flier {
    // 如果是可选方法，调用前要检查它有没有实现！
    if ([flier respondsToSelector:@selector(land)]) {
        [flier land];
    }
    
    // 必选方法直接调用
    [flier fly];
}

// 调用
Bird *b = [[Bird alloc] init];
[self makeItFly:b];`}
          rightCode={`// TypeScript
// 接收实现了 Flyable 接口的参数
function makeItFly(flier: Flyable) {
    // JS 中判断方法是否存在
    if (typeof flier.land === 'function') {
        flier.land();
    }
    
    flier.fly();
}

// 调用
const b = new Bird();
makeItFly(b);`}
        />

        <TipBox type="info" title="Delegation 委托模式的核心">
          在后续的高级特性里你会学到 <code>Delegate</code>（委托模式）。iOS 几乎所有的 UI 事件回调（比如点击列表的一行、输入框文字变化）都是通过协议（Protocol）来实现的，而不是像 JS 那样直接传递回调函数（Block / Arrow function）。理解协议是理解 iOS 开发模式的第一步。
        </TipBox>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc/oop/inheritance"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 继承与多态
        </Link>
        <Link
          to="/objc/oop/category"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：分类 Category →
        </Link>
      </div>
    </div>
  );
}