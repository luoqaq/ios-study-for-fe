import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";

export default function ControlFlow() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 控制流</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        条件判断与循环：前端同学毫无压力的部分。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🔄"
          title="近乎一致的语法"
          description="因为 JS 的基础语法深受 C 语言影响，而 OC 就是 C，所以在控制流上，两者的长相几乎一模一样。"
          frontend-ref="if/else, for, while, switch 的语法和 JavaScript 完全一样。"
        />

        <h2>if / else 条件判断</h2>
        <p>
          唯一的区别在于，JS 会对任何类型做隐式转换（所谓 Truthy /
          Falsy），比如空字符串 <code>""</code> 和数字 <code>0</code> 会被当成{" "}
          <code>false</code>。 在 OC
          中，条件表达式必须产生一个布尔值（或指针）。指针非 <code>nil</code>{" "}
          即为真。
        </p>

        <CodeCompare
          title="判断对象是否为空"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
NSString *name = @"Alice";

if (name) { // 判断指针是否为 nil
    NSLog(@"Name exists");
} else {
    NSLog(@"Name is nil");
}`}
          rightCode={`// JavaScript
const name = "Alice";

if (name) {
    console.log("Name exists");
} else {
    console.log("Name is null or undefined");
}`}
        />

        <h2>快速枚举 (for-in)</h2>
        <p>
          在前端，我们现在很少写传统的{" "}
          <code>for (let i = 0; i &lt; len; i++)</code>，而是用{" "}
          <code>for...of</code> 遍历数组，用 <code>forEach</code>。OC
          提供了一种专门用于遍历数组和字典集合的 <strong>快速枚举</strong>。
        </p>

        <CodeCompare
          title="遍历数组"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
NSArray *fruits = @[@"Apple", @"Banana", @"Orange"];

for (NSString *fruit in fruits) {
    NSLog(@"Fruit: %@", fruit);
}

// 字典遍历：遍历出来的是 Key
NSDictionary *dict = @{@"name": @"Alice", @"age": @25};
for (NSString *key in dict) {
    NSLog(@"Key: %@, Value: %@", key, dict[key]);
}`}
          rightCode={`// JavaScript
const fruits = ["Apple", "Banana", "Orange"];

for (const fruit of fruits) {
    console.log(\`Fruit: \${fruit}\`);
}

const dict = { name: "Alice", age: 25 };
for (const key in dict) {
    console.log(\`Key: \${key}, Value: \${dict[key]}\`);
}`}
        />

        <h2>基于 Block 的遍历 (类似 forEach)</h2>
        <p>
          这可能是前端最习惯的遍历方式。Apple 提供了基于 Block（回调）的遍历
          API。
        </p>

        <CodeCompare
          title="使用 Block 遍历"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
NSArray *fruits = @[@"Apple", @"Banana"];

[fruits enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
    NSLog(@"%lu: %@", idx, obj);
    
    // 如果想中途 break，修改指针即可
    if (idx == 0) {
        *stop = YES;
    }
}];`}
          rightCode={`// JavaScript
const fruits = ["Apple", "Banana"];

fruits.forEach((obj, idx) => {
    console.log(\`\${idx}: \${obj}\`);
    // 注意：forEach 不能中途 break (除非抛异常)
    // 要 break 请用 for...of 或者 some()
});`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc/basics/arrays"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 数组与字典
        </Link>
        <Link
          to="/objc/basics/functions"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：函数与 Block →
        </Link>
      </div>
    </div>
  );
}
