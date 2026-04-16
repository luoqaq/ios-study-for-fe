import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function IOS18Adaptation() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 iOS 18 新特性适配要点</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        每年 WWDC 都会带来新 API 和新的系统行为变化，提前了解才能避免上架后踩坑。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端开发者也需要关注浏览器新特性（如 Chrome 的 Privacy Sandbox、新 CSS 特性）。
          iOS 开发者同样需要每年跟进 iOS 和 Xcode 的更新，
          因为系统行为变化可能直接影响已有功能的可用性和审核策略。
        </p>

        <h2>1. 深色模式与动态颜色</h2>
        <p>
          从 iOS 13 开始支持深色模式，到 iOS 18 用户对一致性的要求更高。
          建议使用 <code>UIColor</code> 的动态颜色系统（如 <code>.systemBackground</code>、<code>.label</code>），
          而不是硬编码黑白颜色。SwiftUI 中则使用 <code>Color(.systemBackground)</code>。
        </p>

        <h2>2. 隐私清单文件（Privacy Manifest）</h2>
        <p>
          iOS 17.4 / Xcode 15 之后，苹果要求所有 App 和第三方 SDK 必须包含 Privacy Manifest 文件，
          声明使用了哪些“必要原因 API”（如文件时间戳、磁盘空间、系统启动时间等）。
          如果你的 App 或依赖库没有正确声明，上传 App Store Connect 时会收到警告，未来可能直接被拒。
        </p>

        <TipBox type="warning" title="第三方库也要检查">
          很多老版本的第三方 SDK（如旧版 Firebase、AFNetworking）可能没有包含 Privacy Manifest。
          升级到支持该特性的最新版本是避免审核问题的最直接方式。
        </TipBox>

        <h2>3. Swift 6 与严格并发检查</h2>
        <p>
          Swift 6 引入了更严格的并发安全模式，默认会报出更多的数据竞争警告。
          如果你的项目开启了 Swift 6 语言模式，一些以前能编译通过的共享可变状态代码可能需要重构为 actor 隔离。
        </p>

        <h2>4. 控件样式与交互更新</h2>
        <ul>
          <li>TabBar 和 NavigationBar 的样式在不同系统版本间可能有细微差异</li>
          <li>Sheet 弹窗的默认高度和交互手势可能变化</li>
          <li>新 API 的最低版本要求不断提高，注意 Deployment Target 的权衡</li>
        </ul>

        <h2>适配建议清单</h2>
        <table>
          <thead>
            <tr>
              <th>检查项</th>
              <th>建议动作</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Privacy Manifest</td><td>检查主工程和所有第三方库是否已配置</td></tr>
            <tr><td>废弃 API</td><td>用 Xcode 的 deprecation warning 扫描替换旧 API</td></tr>
            <tr><td>深色模式</td><td>全链路使用动态颜色，避免硬编码</td></tr>
            <tr><td>新机型屏幕尺寸</td><td>在最新模拟器和真机上验证 UI 布局</td></tr>
            <tr><td>Swift 并发模式</td><td>逐步迁移到 actor 和 Sendable 安全模型</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/appstore-review"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← App Store 审核
        </Link>
        <Link
          to="/advanced/publish-end-to-end"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：从零发布一个 App →
        </Link>
      </div>
    </div>
  );
}
