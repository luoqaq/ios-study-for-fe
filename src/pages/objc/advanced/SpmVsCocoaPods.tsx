import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";

export default function SpmVsCocoaPodsIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 SPM vs CocoaPods</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        新项目更偏向 SPM，老项目仍大量停留在 CocoaPods。你要学会判断，不是站队。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <CompareTable
          headers={["维度", "SPM", "CocoaPods"]}
          rows={[
            ["集成方式", "官方原生支持", "外部依赖管理工具"],
            ["老项目覆盖", "较少", "非常常见"],
            ["工程侵入性", "相对低", "更深介入工程结构"],
            ["团队现实", "新项目优先", "历史包袱常见"],
          ]}
        />

        <h2>正确的判断方式</h2>
        <p>
          如果你接手的是历史项目，先看现状，不要一上来就推动“大一统迁移”。如果你负责的是新模块或新项目，再考虑是否逐步转向 SPM。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/objc-maintenance/advanced/runtime-techniques" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← Swizzling 与关联对象
        </Link>
        <Link
          to="/advanced"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          进入高级进阶 →
        </Link>
      </div>
    </div>
  );
}
