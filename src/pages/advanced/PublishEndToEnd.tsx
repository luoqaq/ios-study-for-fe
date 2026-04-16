import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function PublishEndToEnd() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 从零发布一个 App</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从写第一行代码到用户下载，完整的端到端发布链路。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端发布通常是 CI 构建 → 推送到 CDN → 用户刷新网页即生效。
          iOS 发布则要经过编译、签名、上传、审核、上架等多个环节，
          任何一个环节卡住，都会影响最终到达用户的时间。
        </p>

        <h2>Step 1：项目创建与开发</h2>
        <p>
          在 Xcode 中创建项目，选择合适的模板（App、Game、Framework 等）。
          配置 Bundle Identifier、Team、Deployment Target。
          开发过程中使用 Git 进行版本管理，建议采用 Feature Branch 工作流。
        </p>

        <h2>Step 2：测试与质量门禁</h2>
        <ul>
          <li>单元测试覆盖核心逻辑（XCTest）</li>
          <li>UI 测试覆盖主流程（XCUITest）</li>
          <li>性能测试（启动时间、内存峰值、帧率）</li>
          <li>真机测试（不同机型、不同 iOS 版本）</li>
        </ul>

        <h2>Step 3：Archive 与上传</h2>
        <p>
          在 Xcode 中选择 Product → Archive，生成 Release 版本的 .ipa 包。
          使用 Organizer 验证并上传到 App Store Connect，
          或者通过命令行 / Fastlane 实现自动化上传。
        </p>

        <h2>Step 4：App Store Connect 配置</h2>
        <ul>
          <li>填写 App 名称、副标题、关键词、描述</li>
          <li>上传截图（不同尺寸 iPhone + iPad）</li>
          <li>配置隐私政策 URL、联系信息</li>
          <li>填写隐私清单中声明的数据使用类型</li>
        </ul>

        <h2>Step 5：提交审核与上架</h2>
        <p>
          选择构建版本，提交审核。苹果审核通常需要 1-3 个工作日。
          审核通过后，可以选择立即发布或定时发布。
          建议首发时配合 TestFlight 内测，提前收集反馈。
        </p>

        <TipBox type="info" title="发布后不是终点">
          App 上架后还需要持续关注：崩溃率、用户评分、版本兼容性、系统新特性适配。
          建立稳定的 CI/CD 流程和灰度发布机制，是成熟团队的标志。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/ios18-adaptation"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← iOS 18 适配
        </Link>
        <Link
          to="/advanced/practice/network-app"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          实战：网络请求案例 →
        </Link>
      </div>
    </div>
  );
}
