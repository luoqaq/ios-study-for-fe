import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function AppClip() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">⚡ App Clip 轻应用</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        无需下载完整 App，扫码或轻触即可体验的轻量级入口。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端小程序（微信小程序、支付宝小程序）的核心理念是“即用即走、无需安装”。
          iOS 中的 <strong>App Clip</strong> 就是苹果版的轻应用，
          用户通过 NFC 标签、二维码、Safari、地图、短信等方式快速触发，无需去 App Store 下载。
        </p>

        <h2>App Clip 的限制</h2>
        <p>
          为了保证轻量和快速启动，App Clip 有严格的资源限制：
        </p>
        <ul>
          <li><strong>包大小限制：</strong> 初始下载包不能超过 15MB</li>
          <li><strong>功能限制：</strong> 不能访问完整的设备能力（如 HealthKit、HomeKit、部分传感器）</li>
          <li><strong>有效期：</strong> 用户一段时间未使用后，系统可能自动清理</li>
          <li><strong>支付限制：</strong> 必须使用 Apple Pay 或 App Store 内购，不能集成第三方支付</li>
        </ul>

        <h2>触发方式</h2>
        <ul>
          <li><strong>App Clip Code / QR Code：</strong> 扫码触发</li>
          <li><strong>NFC Tag：</strong> 靠近 NFC 标签触发</li>
          <li><strong>Safari Smart App Banner：</strong> 网页上点击打开</li>
          <li><strong>地图 / Siri Suggestions：</strong> 基于位置推荐</li>
          <li><strong>Messages：</strong> 通过 iMessage 分享卡片</li>
        </ul>

        <TipBox type="tip" title="App Clip 是完整 App 的入口，不是替代品">
          好的 App Clip 设计应该是：让用户在 30 秒内完成一个核心任务，
          然后提供清晰的引导，鼓励用户下载完整 App 解锁更多功能。
        </TipBox>

        <h2>开发与完整 App 的关系</h2>
        <p>
          App Clip 和主 App 共享同一个 Xcode 项目，但目标是不同的 binary。
          你可以复用主 App 的代码、资源、数据模型，
          通过编译条件（Active Compilation Conditions）或模块拆分来区分 Clip 专属逻辑。
        </p>

        <h2>配置流程</h2>
        <ol>
          <li>在 Apple Developer 后台注册 App Clip Experience 和关联域名</li>
          <li>在 Xcode 中添加 App Clip target</li>
          <li>配置 Associated Domains 和 Apple App Site Association 文件</li>
          <li>处理调用 URL（ invocation URL ），根据参数进入对应页面</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/watchkit"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← WatchKit
        </Link>
        <Link
          to="/advanced/appstore-review"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：App Store 审核 →
        </Link>
      </div>
    </div>
  );
}
