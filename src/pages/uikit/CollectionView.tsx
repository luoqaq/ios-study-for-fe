import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function CollectionViewIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">UICollectionView</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        当列表不再只是竖向一列时，UICollectionView 基本就是你的默认答案。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>什么时候该想到它</h2>
        <ul>
          <li>宫格布局</li>
          <li>卡片流</li>
          <li>横向滑动栏目</li>
          <li>多 section 复杂首页</li>
        </ul>

        <CompareTable
          headers={["控件", "更适合什么场景"]}
          rows={[
            ["`UITableView`", "简单列表、设置页、线性信息流"],
            ["`UICollectionView`", "复杂布局、卡片、多列、横向滚动"],
          ]}
        />

        <h2>前端类比</h2>
        <p>
          如果 `UITableView` 更像一列稳定渲染的列表，那么 `UICollectionView`
          更像你在前端里写一个可复用数据源加自定义 layout 的组合容器。
        </p>

        <TipBox type="tip" title="不要把它只理解成“宫格控件”">
          现代 iOS 复杂首页，很多最终都会走向 `UICollectionView`，因为它的布局表达能力远强于 `UITableView`。
        </TipBox>

        <h2>学习重点</h2>
        <ol>
          <li>Cell 复用</li>
          <li>Section / item 数据组织</li>
          <li>FlowLayout 与 compositional layout</li>
          <li>复杂首页拆 section 的方式</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/uikit/auto-layout-advanced" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← Auto Layout 进阶
        </Link>
        <Link
          to="/uikit/collection-view-practical"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：CollectionView 实战技巧 →
        </Link>
      </div>
    </div>
  );
}
