import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function AutoLayoutAdvanced() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Auto Layout 进阶与 Size Classes</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从“能贴边”走向“能适配各种屏幕尺寸和方向”。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么需要 Size Classes</h2>
        <p>
          iPhone 有 mini、标准、Plus、Max；iPad 分屏后宽度更是千变万化。
          Size Classes（Compact / Regular）是苹果对设备尺寸和方向的抽象，
          让你可以针对“窄屏”和“宽屏”写不同的布局约束，而不是为每个机型单独适配。
        </p>

        <h2>两种 Size Class</h2>
        <ul>
          <li><strong>Compact (紧凑)：</strong> 通常对应 iPhone 竖屏的宽度、iPhone 横屏的高度</li>
          <li><strong>Regular (宽松)：</strong> 通常对应 iPad 的宽和高、iPhone Plus/Max 横屏的宽度</li>
        </ul>

        <TipBox type="tip" title="不要死记机型对应表">
          Size Classes 的设计目的就是让你忘记具体机型。你只需要思考：
          当屏幕宽度是 Compact 时怎么排，是 Regular 时怎么排。
        </TipBox>

        <h2>约束优先级（Priority）</h2>
        <p>
          当多个约束冲突时，优先级高的胜出。常用场景：
        </p>
        <ul>
          <li>按钮宽度最大 200，但如果屏幕很宽可以再大一点 → 给“最大 200”设低优先级</li>
          <li>两个标签并排，空间不够时右边标签被压缩 → 调整 Content Compression Resistance 优先级</li>
        </ul>

        <h2>Anchor 布局 vs VFL</h2>
        <p>
          现代 iOS 开发推荐用 <strong>NSLayoutAnchor</strong> 纯代码写约束，链式 API 可读性高：
        </p>
        <pre><code>{`NSLayoutConstraint.activate([
    titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 16),
    titleLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
    titleLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16)
])`}</code></pre>
        <p>
          VFL（Visual Format Language）是更古老的写法，字符串描述布局，可读性差，新项目不建议使用。
        </p>

        <h2>安全区域（Safe Area）</h2>
        <p>
          从 iPhone X 开始引入了刘海、圆角、Home Indicator。Safe Area 保证你的内容不会被这些系统 UI 遮挡。
          <strong>永远把关键内容约束到 safeAreaLayoutGuide，而不是 superview 的边缘。</strong>
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/auto-layout"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Auto Layout 基础
        </Link>
        <Link
          to="/uikit/collection-view"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：UICollectionView →
        </Link>
      </div>
    </div>
  );
}
