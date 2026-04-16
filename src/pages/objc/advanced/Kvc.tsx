import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function Kvc() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 KVC 键值编码</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        先理解 KVC，再看 KVO。因为观察的前提，往往是能按 key 读写对象。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>KVC 是什么</h2>
        <p>
          KVC 全称是 Key-Value Coding。它允许你不用直接调用 getter / setter，
          而是通过字符串 key 去读写对象属性。
        </p>

        <CodeCompare
          title="动态读写属性"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`User *user = [[User alloc] init];
[user setValue:@"Alice" forKey:@"name"];

NSString *name = [user valueForKey:@"name"];`}
          rightCode={`const user = {};
user["name"] = "Alice";

const name = user["name"];`}
        />

        <h2>为什么老项目里它很常见</h2>
        <ol>
          <li>模型映射时会用到。</li>
          <li>一些动态表单、配置驱动页面会用到。</li>
          <li>KVO 的底层使用和设计思路与 KVC 强相关。</li>
        </ol>

        <TipBox type="warning" title="它很强，也很危险">
          KVC 的问题不在于不好用，而在于它把很多编译期错误推迟到了运行期。key 写错、类型不对、对象不支持这个 key，都会在运行时出问题。
        </TipBox>

        <h2>什么时候要特别警惕</h2>
        <ul>
          <li>依赖字符串拼接 key 的地方。</li>
          <li>跨层直接修改对象内部状态的地方。</li>
          <li>为了“省事”绕开类型系统的地方。</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/practice/memory-debug"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 内存泄漏实战排查
        </Link>
        <Link
          to="/objc-maintenance/advanced/kvo"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：KVO →
        </Link>
      </div>
    </div>
  );
}
