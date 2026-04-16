import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function RuntimeTechniquesIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 Swizzling 与关联对象</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        这是 Runtime 最常见、也最容易被滥用的两类技巧。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>Method Swizzling</h2>
        <p>
          本质上是替换方法实现。它常用于埋点、全局拦截、兼容旧行为，但也最容易制造难以追踪的副作用。
        </p>

        <h2>Associated Object</h2>
        <p>
          本质上是给现有对象在运行期“外挂属性”。它很灵活，但如果滥用，会让对象真实状态变得难以推理。
        </p>

        <TipBox type="warning" title="这类技巧必须带边界意识">
          如果团队里有人把它们当成“遇到限制就绕过去”的默认武器，项目复杂度会迅速失控。应该先问：有没有更普通、更显式的设计方式？
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/objc-maintenance/advanced/runtime" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← Runtime 入门
        </Link>
        <Link
          to="/objc-maintenance/advanced/spm-vs-cocoapods"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：SPM vs CocoaPods →
        </Link>
      </div>
    </div>
  );
}
