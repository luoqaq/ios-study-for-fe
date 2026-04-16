import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function CompositionalLayoutIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">复杂列表布局</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        当首页不再是简单列表，而是多 section、横竖混排、卡片组合时，你需要更强的布局表达能力。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么要单独补这一页</h2>
        <p>
          很多业务首页最终都会演化成“一个 `UICollectionView` +
          多 section + 各种布局规则”的形态。这一步是从“会用控件”走向“能做复杂首页”的分水岭。
        </p>

        <h2>建议关注的点</h2>
        <ol>
          <li>section 级布局拆分</li>
          <li>横向滚动栏目</li>
          <li>不同 cell 尺寸混排</li>
          <li>首页模块化拆 section 的方式</li>
        </ol>

        <TipBox type="tip" title="先别急着记 API">
          复杂列表的关键不是记住每个布局类名，而是先把“首页应该拆成几个 section，每个 section 对应什么布局职责”想清楚。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/uikit/form-input" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← 表单与输入
        </Link>
        <Link
          to="/uikit/form-validation"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：键盘与表单校验 →
        </Link>
      </div>
    </div>
  );
}
