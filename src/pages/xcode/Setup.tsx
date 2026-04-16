import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";

export default function Setup() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔨 安装与配置 Xcode</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        准备好迎接这个庞大而全能的 IDE。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="⚙️"
          title="不再是轻量级编辑器"
          description="VS Code 只是一个文本编辑器，你需要自己配置 ESLint、Prettier、Webpack/Vite、Jest 才能开始干活。而 Xcode 是一个全家桶 IDE：编译器、模拟器、界面设计器、性能分析工具全都在里面。"
          frontend-ref="就像你下载了一个 10GB 大小，内置了所有 Npm 包和打包工具，并且只能在 Mac 上运行的 WebStorm。"
        />

        <h2>1. 获取 Xcode</h2>
        <p>
          对于前端来说，你可以用 <code>npm install</code> 搞定一切。但 iOS
          开发的工具链是闭源的。
        </p>
        <p>你只有两种官方途径获取 Xcode：</p>
        <ol>
          <li>
            <strong>Mac App Store（推荐新手）：</strong> 打开你 Mac 上的 App
            Store，搜索 Xcode，点击获取。这需要下载大约十几 GB
            的数据，安装后占用可能达到三十 GB 左右。请确保你的硬盘空间足够。
          </li>
          <li>
            <strong>Apple 开发者官网（推荐进阶）：</strong> 访问{" "}
            <a
              href="https://developer.apple.com/download/all/"
              target="_blank"
              rel="noreferrer"
            >
              Developer 下载页
            </a>
            ，你可以下载 <code>.xip</code> 格式的安装包，支持安装历史版本和 Beta
            版本。
          </li>
        </ol>

        <h2>2. 命令行工具 (Command Line Tools)</h2>
        <p>
          如果你曾经在 Mac 上使用过 <code>git</code>，或者安装过
          Homebrew，系统可能已经弹框提示你安装过这个工具了。它是 Xcode
          剥离出来的一些基础编译工具（如 <code>clang</code>, <code>gcc</code>,{" "}
          <code>make</code>）。
        </p>
        <p>如果你没有安装，在终端执行以下命令：</p>
        <pre>
          <code className="language-bash">xcode-select --install</code>
        </pre>

        <h2>3. 注册开发者账号 (Apple ID)</h2>
        <p>
          在前端开发中，你在 localhost 跑代码不需要向 W3C 注册。但在 iOS
          开发中，即使你只是想把你自己写的 App 安装到你<strong>自己</strong>的
          iPhone 上（真机调试），你也必须登录一个 Apple ID。
        </p>
        <ol>
          <li>
            打开 Xcode，在菜单栏选择 <strong>Xcode &gt; Settings...</strong>
          </li>
          <li>
            选择 <strong>Accounts</strong> 选项卡。
          </li>
          <li>
            点击左下角的 <strong>+</strong> 号，选择 <strong>Apple ID</strong>{" "}
            并登录你的账号。
          </li>
        </ol>
        <p>
          <em>
            注：普通的 Apple ID
            可以免费进行真机调试（有设备数量和证书过期时间的限制）。如果你想把
            App 发布到 App Store，则需要付费加入 Apple Developer
            Program（个人账号 $99/年）。
          </em>
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/starter"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 开发起步
        </Link>
        <Link
          to="/starter/interface"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：界面导览 →
        </Link>
      </div>
    </div>
  );
}
