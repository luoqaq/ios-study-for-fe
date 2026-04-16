import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Distribution() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📦 签名、打包与发布</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        写代码只是第一步，把 App 安全地送到用户手里才是完整的闭环。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端发布一般就是 <code>npm run build</code> 然后把静态资源往 CDN 一扔。
          iOS 发布则要复杂得多：代码必须经过苹果签名、打包成 ipa、上传到 App Store Connect，再经过审核才能上架。
        </p>

        <h2>核心概念：证书与描述文件</h2>
        <ul>
          <li><strong>Certificate（证书）：</strong> 证明“这台 Mac 有权开发和发布这个 App”。由 Apple 颁发，分为 Development 和 Distribution 两种。</li>
          <li><strong>App ID：</strong> 标识你的 App，通常是反向域名字符串（如 <code>com.yourcompany.app</code>）。</li>
          <li><strong>Provisioning Profile（描述文件）：</strong> 把 Certificate、App ID、Device List 绑定在一起的“通行证”。没有它，App 装不到真机上，也发布不了。</li>
        </ul>

        <TipBox type="warning" title="证书管理是新手最容易卡壳的地方">
          很多人第一次打包失败，80% 是因为证书过期、描述文件不匹配、或者 Bundle Identifier 不一致。遇到打包失败，优先检查 Signing & Capabilities 面板里的报错信息。
        </TipBox>

        <h2>常见的发布方式</h2>

        <h3>1. 真机调试（Development）</h3>
        <p>
          需要 Development 证书 + 包含设备 UUID 的 Development Provisioning Profile。
          一个免费开发者账号最多可注册 3 台设备用于测试。
        </p>

        <h3>2. Ad Hoc 分发</h3>
        <p>
          不需要上架 App Store，把 ipa 直接发给预先注册的设备。
          适合内部测试或给客户演示。需要 Distribution 证书 + Ad Hoc 描述文件。
        </p>

        <h3>3. TestFlight 内测</h3>
        <p>
          最标准的内测方式。把 ipa 上传到 App Store Connect 后，可以邀请内部成员（最多 100 人）
          或外部测试者（最多 1 万人）通过 TestFlight App 安装测试版。
        </p>

        <h3>4. App Store 上架</h3>
        <p>
          正式发布的唯一官方渠道。需要：
        </p>
        <ol>
          <li>有效的 Apple Developer Program 会员资格（¥688/年）</li>
          <li>Distribution 证书 + App Store 描述文件</li>
          <li>在 App Store Connect 填写应用信息、截图、隐私政策</li>
          <li>通过 Xcode 或 Transporter 上传构建版本</li>
          <li>等待苹果审核（通常 1-3 个工作日）</li>
        </ol>

        <h2>自动化发布：Fastlane</h2>
        <p>
          如果每次发版都要手动点 Xcode Archive、选证书、填版本号、传截图，效率会很低。
          <strong>Fastlane</strong> 是 iOS/Android 最流行的发布自动化工具，可以一键完成：
        </p>
        <ul>
          <li>自动签名管理（match）</li>
          <li>自动截图（snapshot）</li>
          <li>自动上传 TestFlight / App Store（pilot / deliver）</li>
          <li>自动递增 Build Number</li>
        </ul>

        <TipBox type="info" title="CI/CD 是进阶必备">
          团队规模上去后，建议把 Fastlane 集成到 GitLab CI、GitHub Actions 或 Jenkins 中，实现"合并代码后自动上传 TestFlight"。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/testing"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 单元测试与 UI 测试
        </Link>
        <Link
          to="/advanced/gcd-practical"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：多线程与 GCD 实战 →
        </Link>
      </div>
    </div>
  );
}
