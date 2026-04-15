import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function DataTypes() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 数据类型</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从弱类型到强类型，认识 NS 前缀的家族。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🏷️"
          title="静态类型系统"
          description="变量在声明时必须指定类型，一旦指定不能改变（除非类型转换）。"
          frontend-ref="类似 TypeScript 的显式类型声明"
        />

        <h2>基本数据类型 (C 语言类型)</h2>
        <p>
          由于 OC 是 C 语言的超集，最基础的数字、布尔值直接使用了 C
          语言的原始类型，这些类型<strong>不是对象</strong>，不能调用方法。
        </p>

        <CodeCompare
          title="基本类型声明"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Objective-C
NSInteger age = 25;       // 整数 (根据 32/64 位系统自动调整大小)
CGFloat height = 1.75;    // 浮点数 (UI 布局常用)
BOOL isDeveloper = YES;   // 布尔值 (YES / NO)`}
          rightCode={`// TypeScript
let age: number = 25;
let height: number = 1.75;
let isDeveloper: boolean = true;`}
        />

        <TipBox type="warning" title="YES 和 NO">
          在 OC 中，布尔值习惯使用 <code>YES</code> 和 <code>NO</code>，而不是{" "}
          <code>true</code> 和 <code>false</code>。实际上它们在底层被定义为 1 和
          0。
        </TipBox>

        <h2>对象类型 (NS 前缀)</h2>
        <p>
          除了基本数值，绝大多数复杂数据结构（字符串、数组、字典、日期等）都是
          <strong>对象</strong>。在 OC 中，对象类型的变量必须带有指针符号{" "}
          <code>*</code>。
        </p>

        <CodeCompare
          title="对象类型声明"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Objective-C 对象 (注意 * 号)
NSString *name = @"Alice";
NSNumber *score = @98.5;  // 基本类型的对象包装
NSDate *today = [NSDate date];`}
          rightCode={`// TypeScript
let name: string = "Alice";
let score: number = 98.5;
let today: Date = new Date();`}
        />

        <h3>为什么到处都是 NS？</h3>
        <p>
          前端同学肯定会好奇为什么这么多类都以 <code>NS</code> 开头。
          这源于苹果的历史：<code>NS</code> 代表 <strong>NextSTEP</strong>
          ，是乔布斯离开苹果后创办的公司 NeXT 开发的操作系统。 苹果收购 NeXT
          后，这套底层框架（Foundation 框架）被沿用至今。
        </p>

        <h2>id 类型：OC 中的 any</h2>
        <p>
          如果你怀念 JavaScript 的无拘无束，OC 提供了一个特殊的类型{" "}
          <code>id</code>。它可以指向任何类型的 OC 对象。
        </p>

        <CodeCompare
          title="动态类型 id"
          leftLang="objectivec"
          rightLang="typescript"
          leftCode={`// Objective-C
id something = @"Hello";
something = @42; // 合法，改变了对象类型

// 注意：id 类型没有 * 号
// 向 id 发送任何消息，编译期都不会报错，但运行时可能崩溃！`}
          rightCode={`// TypeScript
let something: any = "Hello";
something = 42; // 合法`}
        />

        <h2>类型转换总结</h2>
        <CompareTable
          headers={[
            "JavaScript",
            "Objective-C 基本类型",
            "Objective-C 对象类型",
          ]}
          rows={[
            ["`Number`", "`NSInteger`, `CGFloat`", "`NSNumber *`"],
            ["`String`", "`char *` (C语言)", "`NSString *`"],
            ["`Boolean`", "`BOOL`", "`NSNumber *` (包装布尔)"],
            ["`Array`", "无", "`NSArray *`"],
            ["`Object`", "无", "`NSDictionary *`"],
            ["`any`", "无", "`id`"],
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
          to="/objc/basics/strings"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：字符串 →
        </Link>
      </div>
    </div>
  );
}
