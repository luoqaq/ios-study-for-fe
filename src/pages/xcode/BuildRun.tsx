import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function BuildRun() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔨 构建与运行</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从代码到安装包，最后一步。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📦"
          title="打包与发布 (Archive & Distribution)"
          description="类似于前端的 `npm run build` 生成一个 `dist` 文件夹，然后再传到 CDN。在 iOS 中，我们要把代码打包成一个特殊的归档文件（Archive），经过苹果极其严格的证书签名后，再通过 Xcode 或专用工具上传到 App Store Connect。"
          frontend-ref="就像是给你的前端打包产物盖一个无法伪造的公章，没有这个公章，任何手机都不会允许安装它。"
        />

        <h2>构建过程中的常见状态</h2>
        <ul>
          <li><strong>Build (编译, <code>⌘ + B</code>)：</strong> 只编译代码检查错误，不运行。这在你重构代码或者只是想看有没有红叉的时候非常有用（相当于 TypeScript 的 <code>tsc --noEmit</code>）。</li>
          <li><strong>Run (运行, <code>⌘ + R</code>)：</strong> 编译完直接在模拟器或真机启动。我们平时用得最多。</li>
          <li><strong>Clean (清理缓存, <code>⇧ + ⌘ + K</code>)：</strong> 遇到各种“昨天还能跑，今天早上起来就红了”或者“明明改了代码但是不起作用”的神奇灵异事件时，第一个动作就是 <strong>Clean Build Folder</strong>。这相当于前端的 <code>rm -rf node_modules/.cache && rm -rf dist</code>。</li>
          <li><strong>Archive (归档打包)：</strong> 当你准备发布测试版（TestFlight）或者正式上架 App Store 时使用。这个选项必须选中真机设备（或 Any iOS Device）才能点亮。它会生成一个优化过的 Release 版本。</li>
        </ul>

        <h2>证书与描述文件 (Certificates & Provisioning Profiles)</h2>
        <p>
          这是所有 iOS 开发者（包括老手）最头疼的一环：代码签名（Code Signing）。
        </p>

        <p><strong>为什么要有签名？</strong></p>
        <p>为了保证苹果生态的安全封闭。苹果要求每一个能安装到非越狱 iPhone 上的 App，都必须证明：</p>
        <ol>
          <li><strong>“是谁开发的？”</strong> -&gt; 开发者证书 (Certificate)，需要用你的 Mac 去苹果后台申请。</li>
          <li><strong>“这个 App 叫什么？”</strong> -&gt; App ID (Bundle Identifier)。</li>
          <li><strong>“它可以装在哪些手机上？”</strong> -&gt; 设备列表 (Devices)。</li>
          <li><strong>“它能用哪些高级功能？”</strong> -&gt; 权限配置 (Entitlements，如推送、Apple Pay)。</li>
        </ol>
        <p>以上四个东西打包在一起，苹果给你颁发一个文件，就叫 <strong>描述文件 (Provisioning Profile)</strong>。</p>

        <TipBox type="tip" title="Automatic Manage Signing 的救赎">
          早年间配置这套东西能折磨人一整天。现在，只要你在项目配置的 <code>Signing & Capabilities</code> 页面登录了你的 Apple ID，并勾选了 <strong>Automatically manage signing</strong>，Xcode 会自动帮你去服务器生成这些证书和描述文件并下载到本地。<br/>
          作为新手，你只需要确保你的 <strong>Bundle Identifier</strong> 是全球唯一的（比如 <code>com.yourname.MyApp</code>），剩下的都交给 Xcode。
        </TipBox>

        <h2>打包上架流程简介</h2>
        <ol>
          <li><strong>准备开发者账号：</strong> 交了 $99 年费的 Apple Developer 账号。</li>
          <li><strong>修改版本号：</strong> 在工程配置（General 选项卡）中，修改 <code>Version</code> (比如 1.0) 和 <code>Build</code> (比如 1，每次打包必须递增)。</li>
          <li><strong>选择真机设备：</strong> 在顶部 Scheme 栏选择 <code>Any iOS Device (arm64)</code>。</li>
          <li><strong>归档打包：</strong> 菜单栏点击 <code>Product -&gt; Archive</code>。</li>
          <li><strong>上传分发：</strong> 归档完成后会自动弹出一个 Organizer 窗口。点击右侧的 <code>Distribute App</code>，一路点 <code>Next</code>（期间会自动重新进行发布签名），最后上传到 <strong>App Store Connect</strong>。</li>
          <li><strong>在后台提交审核：</strong> 去苹果的网页后台，填写应用的截图、描述、隐私政策，选择刚刚上传的构建版本，提交苹果人工审核。如果顺利，1-2天后你的 App 就上架了！</li>
        </ol>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/xcode/storyboard"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Storyboard
        </Link>
        <Link
          to="/practice"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          进入 实战案例 →
        </Link>
      </div>
    </div>
  );
}