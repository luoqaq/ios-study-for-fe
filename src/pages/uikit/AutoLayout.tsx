import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function AutoLayout() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Auto Layout</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iOS 不用 Flexbox，但你仍然是在描述元素之间的空间关系。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>不要把它当成“另一个 CSS”</h2>
        <p>
          Auto Layout 的核心不是从上到下写样式，而是给视图之间建立约束关系：
          谁贴着谁、间距多少、宽高如何决定、内容撑开时怎么压缩。
        </p>

        <CompareTable
          headers={["前端概念", "Auto Layout 里的对应感觉"]}
          rows={[
            ["`display: flex`", "没有完全等价物，更像“关系网 + 约束求解”"],
            ["margin / padding", "leading/trailing/top/bottom constant"],
            ["width / height", "固定宽高约束"],
            ["内容撑开布局", "content hugging / compression resistance"],
            ["响应式适配", "safe area + size class + 约束组合"],
          ]}
        />

        <h2>初学时先掌握这 4 件事</h2>
        <ol>
          <li>Safe Area 是什么。</li>
          <li>四边约束怎么贴。</li>
          <li>固定尺寸和相对尺寸怎么配合。</li>
          <li>为什么约束会冲突或不完整。</li>
        </ol>

        <TipBox type="tip" title="最实用的入门策略">
          先别急着手写所有约束。先在 Storyboard 里理解“贴边、居中、固定宽高、上下堆叠”这几类基础动作，再回头看纯代码布局，会容易很多。
        </TipBox>

        <h2>和业务开发的关系</h2>
        <p>
          列表页、表单页、详情页、弹窗页几乎都离不开布局问题。不会 Auto
          Layout，后面 UIKit 页面写到一半就会被卡住。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/navigation-advanced"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 导航模式深入
        </Link>
        <Link
          to="/uikit/auto-layout-advanced"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Auto Layout 进阶 →
        </Link>
      </div>
    </div>
  );
}
