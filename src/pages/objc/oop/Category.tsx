import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Category() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 分类 Category</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        不需要继承，动态给已有的类添加方法（打补丁）。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🧩"
          title="Mixin 或原型链扩展"
          description="分类（Category）允许你在不修改原始类源码、不创建子类的情况下，直接为现有的类添加新的方法。这和 JavaScript 中直接给原型（prototype）添加方法非常相似。"
          frontend-ref="类似 JavaScript 中的 `String.prototype.myNewMethod = function() {}`"
        />

        <h2>为什么需要分类？</h2>
        <p>
          假设你觉得系统的 <code>NSString</code> 少了一个判断是不是邮箱地址的方法。如果你用继承，你就得造一个 <code>MyString</code> 类，然后到处去强转类型，非常痛苦。<br/>
          如果你用分类，你就可以直接对 <code>NSString</code> 说：“嘿，你现在会判断邮箱了！”
        </p>

        <CodeCompare
          title="给 NSString 添加分类"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// NSString+Email.h
#import <Foundation/Foundation.h>

// 语法：@interface 类名 (分类名)
@interface NSString (Email)

// 声明我们要给 NSString 添加的新方法
- (BOOL)isValidEmail;

@end

// NSString+Email.m
#import "NSString+Email.h"

@implementation NSString (Email)

// 提供方法的实现
- (BOOL)isValidEmail {
    // 内部可以用 self 访问字符串本身
    return [self containsString:@"@"];
}

@end`}
          rightCode={`// JavaScript (通过原型链扩展)
// 通常不推荐在大型工程里这么干，但原理相似

String.prototype.isValidEmail = function() {
    // this 指向调用该方法的字符串
    return this.includes("@");
};`}
        />

        <h2>如何使用分类</h2>
        <p>非常简单，只要在你要用的地方 <code>#import</code> 这个分类的头文件，所有的 <code>NSString</code> 就会瞬间获得这个能力。</p>

        <CodeCompare
          title="使用分类方法"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// ViewController.m
#import "NSString+Email.h" // 必须导入

NSString *testStr = @"user@example.com";

// 直接调用新添加的方法
if ([testStr isValidEmail]) {
    NSLog(@"是一个合法的邮箱！");
}`}
          rightCode={`// JavaScript
// 只要上面的代码执行过一次，全局生效

const testStr = "user@example.com";

if (testStr.isValidEmail()) {
    console.log("是一个合法的邮箱！");
}`}
        />

        <TipBox type="warning" title="分类的局限性：不能添加属性">
          分类最大的限制是：<strong>你只能给类添加方法（行为），不能添加实例变量（存储状态）。</strong><br/>
          （这是由于对象在内存中的大小在编译时就固定了。虽然可以用 Runtime 黑魔法关联对象来绕过这个限制，但对于初学者不推荐）。<br/>
          这也是它区别于普通继承的地方。
        </TipBox>

        <h2>分离代码结构</h2>
        <p>除了给系统类“打补丁”，分类在 iOS 开发中还有一个重要用途：<strong>把一个巨大的类按功能拆分到不同的文件里。</strong></p>
        <p>比如 <code>ViewController</code> 有网络请求逻辑、有表格代理逻辑，你可以拆出 <code>ViewController+Network.m</code> 和 <code>ViewController+Table.m</code>，这样主类会变得非常干净。（Swift 中的 Extension 继承并发扬光大了这一思想）。</p>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/oop/protocol"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 协议 Protocol
        </Link>
        <Link
          to="/objc-maintenance/oop/property"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：属性 Property →
        </Link>
      </div>
    </div>
  );
}
