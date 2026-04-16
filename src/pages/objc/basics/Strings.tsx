import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Strings() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 字符串</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        告别简单的加号拼接，适应 NSString 的严谨逻辑。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🔤"
          title="可变与不可变分离"
          description="OC 中的字符串分为只读的 NSString 和可修改的 NSMutableString。试图修改 NSString 会导致崩溃。"
          frontend-ref="JavaScript 的字符串永远是不可变的（每次修改都会返回新字符串）。"
        />

        <h2>创建与基础操作</h2>
        <p>
          如前所述，OC 的字符串字面量必须以 <code>@</code> 开头，否则会被当成 C
          语言的字符数组。
        </p>

        <CodeCompare
          title="字符串创建与长度"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
NSString *greeting = @"Hello, iOS";
NSUInteger len = [greeting length]; // 10

// 是否为空
BOOL isEmpty = (greeting.length == 0);`}
          rightCode={`// JavaScript
const greeting = "Hello, iOS";
const len = greeting.length; // 10

// 是否为空
const isEmpty = (greeting.length === 0);`}
        />

        <h2>字符串拼接（最折磨前端的地方）</h2>
        <p>
          在 JavaScript 中，我们习惯了 <code>a + b</code> 或者模板字符串{" "}
          <code>{`hi \${name}`}</code>。 在 OC 中，你
          <strong>不能用加号拼接字符串</strong>，必须调用专门的方法。
        </p>

        <CodeCompare
          title="字符串拼接与格式化"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
NSString *name = @"Bob";
NSInteger age = 20;

// 1. 简单的两端拼接
NSString *str1 = [name stringByAppendingString:@" is learning OC"];

// 2. 模板格式化 (最常用！)
// %@ 代表对象，%ld 代表整数，%f 代表浮点数
NSString *str2 = [NSString stringWithFormat:@"%@ is %ld years old", name, (long)age];`}
          rightCode={`// JavaScript
const name = "Bob";
const age = 20;

// 1. 加号拼接
const str1 = name + " is learning OC";

// 2. 模板字符串
const str2 = \`\${name} is \${age} years old\`;`}
        />

        <h2>字符串截取与查找</h2>
        <p>OC 提供了丰富（但名字极其冗长）的方法来操作字符串。</p>

        <CodeCompare
          title="常用操作"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
NSString *url = @"https://apple.com";

// 是否包含前缀/后缀
BOOL isSecure = [url hasPrefix:@"https"];

// 字符串截取 (从第 8 个字符截取到最后)
NSString *domain = [url substringFromIndex:8]; // "apple.com"

// 字符串查找 (返回一个 NSRange 结构体)
NSRange range = [url rangeOfString:@"apple"];
if (range.location != NSNotFound) {
    NSLog(@"找到了，位置在: %lu", range.location);
}`}
          rightCode={`// JavaScript
const url = "https://apple.com";

// 是否包含前缀/后缀
const isSecure = url.startsWith("https");

// 字符串截取
const domain = url.substring(8); // "apple.com"

// 字符串查找
const index = url.indexOf("apple");
if (index !== -1) {
    console.log(\`找到了，位置在: \${index}\`);
}`}
        />

        <TipBox type="tip" title="可变字符串 NSMutableString">
          如果你需要在一个循环里不断向字符串追加内容，请使用{" "}
          <code>NSMutableString</code>。 频繁地使用{" "}
          <code>stringWithFormat:</code> 生成新字符串会造成较大的内存开销。
          <br />
          <code>NSMutableString *str = [NSMutableString string];</code>
          <br />
          <code>[str appendString:@"A"];</code>
        </TipBox>

        <h2>相等性判断：千万别用 ==</h2>
        <p>
          在 OC 中，由于字符串是指针（包含 <code>*</code>），使用{" "}
          <code>==</code> 判断的是<strong>两个指针的内存地址是否相同</strong>
          ，而不是内容是否相同！
        </p>

        <CodeCompare
          title="比较字符串"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
NSString *a = @"Hello";
NSString *b = [NSString stringWithFormat:@"Hel%@", @"lo"];

// ❌ 错误：比较的是内存地址
if (a == b) { }

// ✅ 正确：比较字符串内容
if ([a isEqualToString:b]) {
    NSLog(@"内容相等");
}`}
          rightCode={`// JavaScript
const a = "Hello";
const b = "Hel" + "lo";

// ✅ JS 中 === 就是比较值
if (a === b) {
    console.log("内容相等");
}`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/basics/datatypes"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 数据类型
        </Link>
        <Link
          to="/objc-maintenance/basics/arrays"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：数组与字典 →
        </Link>
      </div>
    </div>
  );
}
