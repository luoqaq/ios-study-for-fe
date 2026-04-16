import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function ProjectConfigIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Info.plist / Target / Scheme</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        前端工程里配置分散在多个文件里，iOS 工程则把大量关键配置集中到 Target 和构建体系里。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <CompareTable
          headers={["概念", "你可以先怎么理解"]}
          rows={[
            ["`Info.plist`", "应用元信息与权限声明表"],
            ["`Target`", "一个可构建产物的完整配置单元"],
            ["`Scheme`", "选择当前运行/调试/打包哪套流程"],
          ]}
        />

        <h2>为什么这部分重要</h2>
        <p>
          很多前端同学在 iOS 工程里第一次卡住，不是因为不会写页面，而是因为：
          “为什么这个权限弹窗不出来”“为什么这个 Target 不能运行”“为什么我明明改了配置但没生效”。
        </p>

        <TipBox type="tip" title="先建立分层认知">
          你可以先把 `Info.plist` 理解成 App 级声明文件，把 `Target`
          理解成构建对象，把 `Scheme` 理解成当前选中的执行流程。
        </TipBox>

        <h2>最常见场景</h2>
        <ul>
          <li>配置相机、相册、定位等权限说明</li>
          <li>区分开发、测试、生产环境</li>
          <li>多 Target 共用同一套源码</li>
          <li>打包时选择不同构建配置</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/starter/build-run" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← 构建与运行
        </Link>
        <Link
          to="/uikit"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          进入 UIKit 主线 →
        </Link>
      </div>
    </div>
  );
}
