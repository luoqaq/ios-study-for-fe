import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function CollectionViewApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🛒 实战：CollectionView 电商首页</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        用 UICollectionView + Compositional Layout 搭建一个完整的首页。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>需求拆解</h2>
        <p>一个典型电商首页通常包含三个 Section：</p>
        <ol>
          <li><strong>轮播 Banner：</strong> 全屏宽度，横向分页滚动</li>
          <li><strong>分类入口：</strong> 10 个图标，分两行五列排列</li>
          <li><strong>商品瀑布流：</strong> 两列卡片，高度自适应</li>
        </ol>

        <h2>页面结构</h2>
        <p>
          使用 <code>UICollectionViewCompositionalLayout</code> 的 Section Provider，
          根据 sectionIndex 返回不同的布局：
        </p>

        <CodeCompare
          title="Compositional Layout Section Provider"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`let layout = UICollectionViewCompositionalLayout { 
    (sectionIndex, layoutEnvironment) -> NSCollectionLayoutSection? in
    
    switch sectionIndex {
    case 0:
        return createBannerSection()
    case 1:
        return createCategorySection()
    case 2:
        return createProductSection()
    default:
        return nil
    }
}`}
          rightCode={`// React 中通常用条件渲染不同组件
function Home() {
    return (
        <div>
            <BannerCarousel />
            <CategoryGrid />
            <ProductList />
        </div>
    );
}`}
        />

        <h2>Banner Section：横向分页</h2>
        <pre><code className="language-swift">{`func createBannerSection() -> NSCollectionLayoutSection {
    let itemSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1.0),
        heightDimension: .fractionalHeight(1.0)
    )
    let item = NSCollectionLayoutItem(layoutSize: itemSize)
    
    let groupSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1.0),
        heightDimension: .absolute(180)
    )
    let group = NSCollectionLayoutGroup.horizontal(
        layoutSize: groupSize,
        subitems: [item]
    )
    
    let section = NSCollectionLayoutSection(group: group)
    section.orthogonalScrollingBehavior = .groupPagingCentered
    return section
}`}</code></pre>

        <h2>分类 Section：网格布局</h2>
        <pre><code className="language-swift">{`func createCategorySection() -> NSCollectionLayoutSection {
    let itemSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(0.2),
        heightDimension: .absolute(80)
    )
    let item = NSCollectionLayoutItem(layoutSize: itemSize)
    
    let groupSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1.0),
        heightDimension: .absolute(80)
    )
    let group = NSCollectionLayoutGroup.horizontal(
        layoutSize: groupSize,
        subitems: Array(repeating: item, count: 5)
    )
    
    return NSCollectionLayoutSection(group: group)
}`}</code></pre>

        <h2>商品 Section：两列瀑布流</h2>
        <p>
          这里使用 <code>.estimated(200)</code> 让 Cell 根据内容自动计算高度，
          配合 Self-Sizing Cell 实现瀑布流效果。
        </p>
        <pre><code className="language-swift">{`func createProductSection() -> NSCollectionLayoutSection {
    let itemSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(0.5),
        heightDimension: .estimated(200)
    )
    let item = NSCollectionLayoutItem(layoutSize: itemSize)
    item.contentInsets = NSDirectionalEdgeInsets(
        top: 5, leading: 5, bottom: 5, trailing: 5
    )
    
    let groupSize = NSCollectionLayoutSize(
        widthDimension: .fractionalWidth(1.0),
        heightDimension: .estimated(200)
    )
    let group = NSCollectionLayoutGroup.horizontal(
        layoutSize: groupSize,
        subitems: [item]
    )
    
    return NSCollectionLayoutSection(group: group)
}`}</code></pre>

        <h2>数据源与 Cell 注册</h2>
        <p>
          建议配合 <code>UICollectionViewDiffableDataSource</code> 使用，
          三个 Section 使用不同的 Cell 类型（BannerCell、CategoryCell、ProductCell）。
        </p>

        <TipBox type="tip" title="实战中的性能注意">
          首页通常数据量大、图片多。务必开启图片缓存、后台线程解码、Cell 复用，
          并在快速滑动时降低图片加载优先级。
        </TipBox>

        <h2>下一步挑战</h2>
        <ul>
          <li>给 Banner 添加自动轮播定时器</li>
          <li>给分类入口添加点击高亮和选中态</li>
          <li>给商品卡片添加收藏按钮和加入购物车动画</li>
          <li>下拉刷新和上拉加载更多</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/tableview-optimization"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← TableView 性能优化
        </Link>
        <Link
          to="/uikit/practice/todo-app"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          实战：Todo App →
        </Link>
      </div>
    </div>
  );
}
