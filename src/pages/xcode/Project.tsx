import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Project() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔨 创建项目</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        告别 <code>npm init</code>，欢迎使用 Xcode 模板。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📁"
          title="不再是一个简单的 package.json"
          description="在前端，一个项目本质上就是一个包含 `package.json` 的文件夹。而在 iOS 开发中，项目（Project）是一个包含了源代码、资源图片、编译配置、签名证书信息的复杂集合体（也就是你看到的那个以 `.xcodeproj` 结尾的神奇文件）。"
          frontend-ref="创建 iOS 项目的过程，就像你在网页端通过 Create React App 或者 Vite CLI 回答一堆问题并生成模板的过程。"
        />

        <h2>第一步：Create a new Xcode project</h2>
        <p>打开 Xcode，你会看到欢迎界面。点击 <strong>Create a new Xcode project</strong>，这就是你的入口。</p>

        <h3>1. 选择模板</h3>
        <p>在弹出的面板上方，确保选中的是 <strong>iOS</strong>（而不是 macOS 或 watchOS）。<br/>
        接着，在 <strong>Application</strong> 分类下，选择 <strong>App</strong>。点击 Next。</p>

        <h3>2. 填写项目信息 (最关键的一步)</h3>
        <p>这里的信息决定了你的 App 的“身份证”。</p>
        <ul>
          <li><strong>Product Name：</strong>你的应用名称。比如 <code>MyFirstApp</code>。</li>
          <li><strong>Team：</strong>你的开发者账号。如果你没有花钱买开发者账号，选择 <code>None</code>，你可以在模拟器上随意运行（但在真机上有时效限制）。</li>
          <li><strong>Organization Identifier：</strong>这是逆序域名的形式，用来保证全球唯一。比如你公司的域名是 <code>google.com</code>，这里就填 <code>com.google</code>。</li>
          <li><strong>Bundle Identifier（包名）：</strong>这会由上面的两项自动拼接而成：<code>com.google.MyFirstApp</code>。这在苹果生态里是绝对唯一的，就像 NPM 包的名字一样不能和别人重复。</li>
          <li><strong>Interface：</strong>界面开发方式。选择 <strong>Storyboard</strong>（传统 UIKit 方式，推荐新手先打基础） 或者 <strong>SwiftUI</strong>（现代化声明式方式）。</li>
          <li><strong>Language：</strong>选择 <strong>Swift</strong> 或 <strong>Objective-C</strong>。（如果上一项选了 SwiftUI，语言就会锁定为 Swift）。</li>
        </ul>

        <h2>第二步：认识项目的目录结构</h2>
        <p>创建成功后，在左侧的 <strong>Project Navigator（文件树）</strong>里，你会看到以下几个核心文件：</p>

        <CodeCompare
          title="iOS 基础工程目录 vs 前端目录"
          leftLang="markdown"
          rightLang="markdown"
          leftCode={`MyFirstApp/
├── AppDelegate.swift
│   // 相当于 index.js 入口，监听 App 启动和退出
├── SceneDelegate.swift
│   // 处理多窗口/后台切换生命周期
├── ViewController.swift
│   // 相当于 App.jsx，你的第一个页面代码
├── Main.storyboard
│   // 可视化拖拽 UI 的画板，相当于 index.html
├── Assets.xcassets
│   // 放图片和 App 图标的地方，类似 /public/images
├── Info.plist
│   // 极其重要！App 的配置表 (类似 package.json + webpack配置)
└── MyFirstApp.xcodeproj
    // 不要随便用 VS Code 碰它！Xcode 的工程核心文件`}
          rightCode={`frontend-app/
├── package.json
│   // 依赖和脚本配置
├── public/
│   ├── index.html (入口 HTML)
│   └── favicon.ico
├── src/
│   ├── index.js (JS 入口)
│   ├── App.jsx (根组件)
│   └── assets/ (图片等)
└── webpack.config.js / vite.config.ts
    // 打包配置`}
        />

        <TipBox type="warning" title="千万不要用 Finder 直接删文件！">
          在前端开发中，你在 Finder（访达）或者终端里用 <code>rm</code> 删掉一个文件，VS Code 的侧边栏马上就没了。<br/>
          但在原生的 iOS 开发中，<strong>文件在磁盘上（Finder）的存在，和文件在项目里（Xcode Navigator）的引用是两码事！</strong><br/>
          如果你在外部把文件删了，Xcode 编译时就会报出红色的“文件找不到”错误，因为在那个 <code>.xcodeproj</code> 配置文件里，还保留着对它的引用。<br/>
          <strong>正确做法：</strong>如果要增删改文件和目录，永远在 Xcode 的左侧面板里操作（右键 -&gt; Delete -&gt; Move to Trash）。
        </TipBox>

        <h2>什么是 Info.plist？</h2>
        <p>它是 Property List 的缩写。在这个文件里，你配置应用的版本号（Version）、请求用户的权限（比如弹框问你：是否允许访问相机、相册、定位）、配置支持的屏幕方向（是否允许横屏）。</p>
        <p>
          这就像是前端开发中的 <code>manifest.json</code> 或者 <code>meta</code> 标签。
        </p>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/starter/interface"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 界面导览
        </Link>
        <Link
          to="/starter/simulator"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：模拟器使用 →
        </Link>
      </div>
    </div>
  );
}
