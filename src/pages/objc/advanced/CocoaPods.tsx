import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function CocoaPodsIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 CocoaPods</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        很多老项目不会直接用 SPM，而是长期依赖 CocoaPods。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么它仍然重要</h2>
        <p>
          你现在新开项目可能更偏向 SPM，但历史项目里大量第三方依赖、组件化子库、私有库体系都还挂在 CocoaPods 上。
        </p>

        <CompareTable
          headers={["工具", "更常见于什么场景"]}
          rows={[
            ["`SPM`", "较新项目、官方默认方案"],
            ["`CocoaPods`", "老项目、复杂依赖、私有仓库体系"],
          ]}
        />

        <h2>你至少要会的事</h2>
        <ol>
          <li>看懂 `Podfile`</li>
          <li>知道为什么要打开 `.xcworkspace`</li>
          <li>知道 `pod install` 和 `pod update` 的区别</li>
          <li>遇到依赖冲突时能先定位问题在哪一层</li>
        </ol>

        <TipBox type="warning" title="别把它只当成“iOS 的 npm install”">
          CocoaPods 不只是下载依赖，它还会改工程结构、生成 workspace、改构建配置。它比前端包管理更深地介入了工程本身。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/forwarding"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 消息转发机制
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
