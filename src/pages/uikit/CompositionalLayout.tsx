import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function CompositionalLayoutIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">复杂列表布局</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        当首页不再是简单列表，而是多 section、横竖混排、卡片组合时，你需要 Compositional Layout。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端做复杂首页通常会用一个大的列表组件，里面嵌套各种子组件和横向滚动轮播。
          iOS 中从 iOS 13 开始，<code>UICollectionViewCompositionalLayout</code> 让这种复杂布局变得原生且高效。
          它的核心思想是：<strong>Item → Group → Section → Layout</strong>，层层组合。
        </p>

        <h2>Compositional Layout 的核心层级</h2>
        <ol>
          <li><strong>NSCollectionLayoutItem：</strong> 单个 Cell 的大小</li>
          <li><strong>NSCollectionLayoutGroup：</strong> 一行/一列怎么排（水平、垂直、嵌套）</li>
          <li><strong>NSCollectionLayoutSection：</strong> 一个 Section 的布局规则</li>
          <li><strong>UICollectionViewCompositionalLayout：</strong> 把多个 Section 组合成完整布局</li>
        </ol>

        <CodeCompare
          title="三列网格布局"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift: Compositional Layout 三列网格
let itemSize = NSCollectionLayoutSize(
    widthDimension: .fractionalWidth(1.0 / 3.0),
    heightDimension: .absolute(100)
)
let item = NSCollectionLayoutItem(layoutSize: itemSize)
item.contentInsets = NSDirectionalEdgeInsets(
    top: 5, leading: 5, bottom: 5, trailing: 5
)

let groupSize = NSCollectionLayoutSize(
    widthDimension: .fractionalWidth(1.0),
    heightDimension: .absolute(100)
)
let group = NSCollectionLayoutGroup.horizontal(
    layoutSize: groupSize,
    subitems: [item]
)

let section = NSCollectionLayoutSection(group: group)
let layout = UICollectionViewCompositionalLayout(section: section)`}
          rightCode={`// React: CSS Grid 三列网格
function Grid() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10
        }}>
            {items.map(item => <Card key={item.id} />)}
        </div>
    );
}`}
        />

        <h2>Section 内横向滚动</h2>
        <p>
          很多首页都有"横向滑动的分类栏目"或"推荐商品条"。
          Compositional Layout 通过 <code>orthogonalScrollingBehavior</code> 让一个 Section 独立横向滚动，
          而不需要嵌套一个额外的 UICollectionView。
        </p>

        <pre><code className="language-swift">{`let section = NSCollectionLayoutSection(group: group)
// 让这一组可以横向分页滚动
section.orthogonalScrollingBehavior = .groupPagingCentered`}</code></pre>

        <TipBox type="tip" title="不同 Section 用不同布局">
          <code>UICollectionViewCompositionalLayout</code> 的初始化方法支持一个闭包，
          你可以根据 <code>sectionIndex</code> 返回不同的 <code>NSCollectionLayoutSection</code>。
          这意味着：第一个 Section 是 Banner，第二个是横向分类，第三个是瀑布流，第四个是常规列表，全都可以在一个 CollectionView 里实现。
        </TipBox>

        <h2>Supplementary Views：Header 和 Footer</h2>
        <p>
          复杂首页通常每个 Section 都有标题头（Header）或"查看更多"尾（Footer）。
          在 Compositional Layout 中，通过 <code>NSCollectionLayoutBoundarySupplementaryItem</code> 来定义。
        </p>

        <pre><code className="language-swift">{`let headerSize = NSCollectionLayoutSize(
    widthDimension: .fractionalWidth(1.0),
    heightDimension: .absolute(44)
)
let header = NSCollectionLayoutBoundarySupplementaryItem(
    layoutSize: headerSize,
    elementKind: UICollectionView.elementKindSectionHeader,
    alignment: .top
)
section.boundarySupplementaryItems = [header]`}</code></pre>

        <h2>实战建议</h2>
        <ul>
          <li><strong>先拆 Section，再定布局：</strong> 把首页按业务模块拆成 Section，每个 Section 负责一种布局</li>
          <li><strong>善用 fractionalWidth：</strong> 用比例而不是绝对值，适配不同屏幕尺寸</li>
          <li><strong>配合 DiffableDataSource：</strong> 现代 iOS 列表的黄金组合</li>
          <li><strong>iOS 16+ 的 Variable Sizing：</strong> 支持更灵活的动态高度和自适应布局</li>
        </ul>
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
