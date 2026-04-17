import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function CollectionViewIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">UICollectionView 完整实战</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从简单的纵向列表到复杂的首页布局，这是 UIKit 中最核心的列表控件。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          如果你把 <code>UITableView</code> 比作前端的一个简单 <code>&lt;ul&gt;</code> 列表，
          那么 <code>UICollectionView</code> 更像是 React 中一个高度可配置的 Grid 组件：
          它可以纵向滚动、横向滚动、多列布局、嵌套组合，甚至能撑起整个 App 的首页。
        </p>

        <h2>核心四件套</h2>
        <p>想要让 CollectionView 跑起来，你必须理解这四个角色的分工：</p>
        <ul>
          <li><strong>UICollectionView：</strong> 容器本身，负责滚动和复用</li>
          <li><strong>UICollectionViewCell：</strong> 最小的展示单元</li>
          <li><strong>UICollectionViewLayout：</strong> 决定每个 Cell 的位置和大小</li>
          <li><strong>UICollectionViewDataSource：</strong> 提供数据（Section / Item 数量、Cell 内容）</li>
        </ul>

        <h2>Cell 注册与复用</h2>
        <p>
          和 TableView 一样，CollectionView 通过复用池管理 Cell。
          你必须先注册一个 Cell 类型（通过 Class 或 Nib），然后在 <code>cellForItemAt</code> 中通过 identifier 取出复用实例。
        </p>

        <CodeCompare
          title="基础 CollectionView 搭建"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`class ViewController: UIViewController {
    var collectionView: UICollectionView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let layout = UICollectionViewFlowLayout()
        layout.itemSize = CGSize(width: 100, height: 100)
        
        collectionView = UICollectionView(
            frame: view.bounds, 
            collectionViewLayout: layout
        )
        
        // 注册 Cell
        collectionView.register(
            MyCell.self, 
            forCellWithReuseIdentifier: "cell"
        )
        
        collectionView.dataSource = self
        view.addSubview(collectionView)
    }
}

extension ViewController: UICollectionViewDataSource {
    func collectionView(
        _ collectionView: UICollectionView, 
        numberOfItemsInSection section: Int
    ) -> Int {
        return 50
    }
    
    func collectionView(
        _ collectionView: UICollectionView, 
        cellForItemAt indexPath: IndexPath
    ) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(
            withReuseIdentifier: "cell", 
            for: indexPath
        ) as! MyCell
        cell.label.text = "\\(indexPath.item)"
        return cell
    }
}`}
          rightCode={`function GridList() {
    const items = Array.from({ length: 50 }, (_, i) => i);
    
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 100px)',
            gap: 10
        }}>
            {items.map(i => (
                <div key={i} style={{ width: 100, height: 100 }}>
                    {i}
                </div>
            ))}
        </div>
    );
}`}
        />

        <h2>Compositional Layout：现代布局方式</h2>
        <p>
          从 iOS 13 开始，Apple 推出了 <code>UICollectionViewCompositionalLayout</code>。
          它通过 <code>Item → Group → Section → Layout</code> 的层级来描述布局，
          写复杂首页不再需要自定义 Layout 子类。
        </p>

        <TipBox type="tip" title="新项目首选 Compositional Layout">
          如果你不需要兼容 iOS 12，直接用 Compositional Layout。
          它内置了orthogonal scrolling（section 内横向滚动）、header/footer、动态间距等现代能力。
        </TipBox>

        <h2>DiffableDataSource：告别 indexPath 地狱</h2>
        <p>
          传统的 <code>UICollectionViewDataSource</code> 需要你手动管理 Section 和 Item 的数量，
          增删改数据时很容易因为数量不一致而崩溃。
          <code>UICollectionViewDiffableDataSource</code>（iOS 13+）通过快照（Snapshot）自动计算差异并执行动画刷新。
        </p>

        <pre><code className="language-swift">{`// 定义 DiffableDataSource
typealias DataSource = UICollectionViewDiffableDataSource<Section, Item>

var dataSource: DataSource!

func applySnapshot() {
    var snapshot = NSDiffableDataSourceSnapshot<Section, Item>()
    snapshot.appendSections([.main])
    snapshot.appendItems(items)
    dataSource.apply(snapshot, animatingDifferences: true)
}`}</code></pre>

        <h2>实战建议</h2>
        <ul>
          <li><strong>Cell 保持轻量：</strong> 不要在 <code>cellForItemAt</code> 中做复杂计算或网络请求</li>
          <li><strong>图片异步解码：</strong> 大图在主线程解码会卡滚动，后台解码后再赋值</li>
          <li><strong>预加载（Prefetching）：</strong> 实现 <code>UICollectionViewDataSourcePrefetching</code> 提前请求下一页数据</li>
          <li><strong>Self-sizing Cell：</strong> 使用 Auto Layout 约束让 Cell 根据内容自动计算高度</li>
        </ul>

        <TipBox type="info" title="现代 iOS 首页 ≈ CollectionView + Compositional Layout">
          几乎所有大厂 App 的首页（如淘宝、抖音、小红书）都是基于 CollectionView 搭建的。
          掌握好这个控件，你就掌握了 UIKit 业务开发最核心的技能。
        </TipBox>
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
