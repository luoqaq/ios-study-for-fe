import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Arrays() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 数组与字典</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        NSArray 和 NSDictionary：掌控数据的容器。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="不可变设计"
          description="和字符串一样，NSArray（数组）和 NSDictionary（字典）一旦创建就不能增删改。"
          frontend-ref="JavaScript 数组和对象默认是可变的（除非用 Object.freeze()）。"
        />

        <h2>数组 NSArray 和 NSMutableArray</h2>
        <p>
          如果你想使用类似 JS 的 <code>push()</code>、<code>pop()</code>、
          <code>splice()</code>，必须显式地创建一个{" "}
          <strong>NSMutableArray</strong>（可变数组）。
        </p>

        <CodeCompare
          title="创建与基础操作"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C (不可变数组，加 @ 符号)
NSArray *fruits = @[@"Apple", @"Banana", @"Orange"];
NSUInteger count = fruits.count;

// Objective-C (可变数组)
NSMutableArray *mutableFruits = [NSMutableArray array];

// 追加元素 (相当于 push)
[mutableFruits addObject:@"Grape"];

// 删除元素
[mutableFruits removeObjectAtIndex:0];`}
          rightCode={`// JavaScript (默认可变)
const fruits = ["Apple", "Banana", "Orange"];
const count = fruits.length;

const mutableFruits = [];

// push 追加
mutableFruits.push("Grape");

// 删除 (splice 或 shift)
mutableFruits.shift();`}
        />

        <TipBox type="warning" title="数组中的越界">
          在 JS 中，读取 <code>arr[100]</code> 会返回 <code>undefined</code>。
          <br />
          但在 OC 中，如果你尝试 <code>[arr objectAtIndex:100]</code>，
          <strong>程序会当场崩溃（Index out of bounds）</strong>！必须先判断{" "}
          <code>count</code>。
        </TipBox>

        <h2>字典 NSDictionary (对象/Map)</h2>
        <p>
          在前端，最常用的数据结构就是对象 <code>{}</code>。在 OC 中对应的概念是{" "}
          <strong>字典 (Dictionary)</strong>
          。键（Key）和值（Value）必须成对出现。
        </p>
        <p>
          现代 OC 提供了一种类似于 JSON 的简写字面量语法，但注意：
          <strong>
            在 OC 的字面量中，键和值是用冒号 `:` 分隔，每对之间用逗号 `,`
            分隔。键也必须带有 `@`。
          </strong>
        </p>

        <CodeCompare
          title="字典的创建与访问"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C (不可变字典)
NSDictionary *person = @{
    @"name": @"Alice",
    @"age": @25 // 注意数字也要包成对象
};

// 获取值 (支持通过下标访问)
NSString *n = person[@"name"]; // 或 [person objectForKey:@"name"]

// Objective-C (可变字典)
NSMutableDictionary *mutPerson = [NSMutableDictionary dictionary];

// 设置值
mutPerson[@"name"] = @"Bob"; // 或 [mutPerson setObject:@"Bob" forKey:@"name"]

// 删除键值对
[mutPerson removeObjectForKey:@"name"];`}
          rightCode={`// JavaScript (对象 / Map)
const person = {
    name: "Alice",
    age: 25
};

// 获取值
const n = person.name;

const mutPerson = {};

// 设置值
mutPerson.name = "Bob";

// 删除键
delete mutPerson.name;`}
        />

        <TipBox type="danger" title="不能放入 nil">
          无论在数组还是字典中，
          <strong>
            你都不能插入 <code>nil</code>！
          </strong>
          （强行插入会崩溃）。如果确实需要表示“空”，必须使用{" "}
          <code>[NSNull null]</code> 对象。
          <br />
          相比之下，JS 数组里放什么 <code>null / undefined</code> 都无所谓。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/basics/strings"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 字符串
        </Link>
        <Link
          to="/objc-maintenance/basics/control-flow"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：控制流 →
        </Link>
      </div>
    </div>
  );
}
