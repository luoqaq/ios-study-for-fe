import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function Intro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 Objective-C 简介</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        消息传递机制：OC 最大的特色。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <ConceptCard
          emoji="✉️"
          title="消息传递 (Message Passing)"
          description="OC 不叫『调用对象的方法』，而叫『向对象发送消息』。语法用中括号包裹：[receiver message]。"
          frontend-ref="类似 JavaScript 动态调用 object[methodName]()"
        />

        <h2>方法调用（发送消息）</h2>
        <p>
          这是前端同学看到 OC 代码时最不习惯的地方：到处都是中括号{" "}
          <code>[]</code>。
        </p>

        <CodeCompare
          title="无参数的方法调用"
          leftCode='// Objective-C
NSString *str = @"Hello";
NSUInteger len = [str length];
NSLog(@"长度: %lu", len);'
          rightCode='// JavaScript
const str = "Hello";
const len = str.length;
console.log(`长度: ${len}`);'
        />

        <p>
          在 OC 中，方法名可以被拆分成多段（称为 <code>Selector</code>
          ），每个参数都跟着一段名字，这使得代码读起来像英语句子：
        </p>

        <CodeCompare
          title="带多个参数的方法调用"
          leftCode='// Objective-C (注意方法名是 insertObject:atIndex:)
NSMutableArray *arr = [NSMutableArray array];
[arr insertObject:@"Apple" atIndex:0];'
          rightCode='// JavaScript
const arr = [];
arr.splice(0, 0, "Apple");'
        />

        <h2>向 nil 发送消息</h2>
        <p>
          在 JavaScript 中，如果尝试访问 <code>undefined</code> 或{" "}
          <code>null</code> 的属性，会抛出令人头疼的{" "}
          <code>Cannot read property of undefined</code> 错误。
        </p>
        <p>
          而在 OC 中，向 <code>nil</code> 发送任何消息，
          <strong>都不会崩溃</strong>，而是静默失败并返回 <code>nil</code> 或{" "}
          <code>0</code>（这有点像 JS 里的可选链操作符 <code>?.</code>{" "}
          的全局生效版）。
        </p>

        <CodeCompare
          title="安全的消息传递"
          leftCode="// Objective-C
NSString *emptyStr = nil;
// 不会崩溃，len 得到 0
NSUInteger len = [emptyStr length];"
          rightCode="// JavaScript
const emptyStr = null;
// 必须用可选链，否则会报错
const len = emptyStr?.length || 0;"
        />

        <h2>@ 符号的魔力</h2>
        <p>
          由于 OC 是 C 语言的扩展，为了区分 C 的基础类型和 OC 的对象类型，Apple
          引入了 <code>@</code> 符号。
        </p>
        <ul>
          <li>
            <code>"Hello"</code> 是 C 语言的字符串。
          </li>
          <li>
            <code>@"Hello"</code> 是 OC 的 <code>NSString</code> 对象。
          </li>
          <li>
            <code>@[@"A", @"B"]</code> 是 OC 的 <code>NSArray</code> 数组对象。
          </li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← OC 维护总览
        </Link>
        <Link
          to="/objc-maintenance/basics/datatypes"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：数据类型 →
        </Link>
      </div>
    </div>
  );
}
