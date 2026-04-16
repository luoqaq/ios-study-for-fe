import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Simulator() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔨 模拟器与真机运行</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        让你的第一行代码真正在 iPhone 上跑起来。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📱"
          title="真假 iPhone？"
          description="和 Chrome 开发者工具里的 Device Mode（响应式切换 iPhone 尺寸）完全不同！iOS Simulator 跑的不仅是完整的 iOS 操作系统，还是专门为你 Mac 的芯片（Apple Silicon / Intel）重新编译的架构指令集 (x86_64 / arm64)。"
          frontend-ref="它不是一个只有壳子的网页浏览器，它是一台有着完整文件系统、相册、设置和沙盒环境的『虚拟手机』。"
        />

        <h2>1. 第一次编译运行 (Build & Run)</h2>
        <p>
          在 Xcode 顶部的工具栏正中央，有一个像播放键一样的按钮。或者按下快捷键 <code>⌘ + R</code>。<br/>
          这是你以后最常用的命令，它的作用等同于：
        </p>

        <CodeCompare
          title="编译流程的类比"
          leftLang="bash"
          rightLang="bash"
          leftCode={`# Xcode [Run] 的底层步骤：
1. 语法检查
2. LLVM/Clang 编译 Swift/OC 代码为机器指令
3. Asset Catalog 压缩图片资源
4. Linker 链接静态/动态库
5. 签名 (Code Signing) - 极重要！
6. 打包成一个 .app 格式的 Bundle (其实是个文件夹)
7. 把这个 .app 安装到模拟器沙盒中，启动进程！`}
          rightCode={`# 前端的等价步骤 (例如 npm start)：
1. ESLint / TypeScript 检查
2. Babel / Vite 进行转译和打包 (JS)
3. 压缩图片/CSS (Webpack Loader)
4. 将文件写入 dist / public 内存目录
5. - (前端在浏览器跑不需要签名)
6. 启动 Node.js 本地开发服务器
7. 自动打开 Chrome (localhost:3000)`}
        />

        <h2>2. 切换设备 (Scheme)</h2>
        <p>
          在那个 <code>Run</code> 按钮右边，显示了你当前工程的名字（Scheme），紧挨着的是一个可以选择设备的下拉菜单（比如 <code>iPhone 15 Pro</code>）。<br/>
          你可以随时切换到 iPad、Mac，甚至 Apple TV 的模拟器上（前提是你在创建项目时勾选了支持这些平台）。
        </p>

        <h2>3. 模拟器操作技巧</h2>
        <p>一旦 Simulator 弹出来，你就可以像用真手机一样用鼠标去点。但有些手势你必须通过菜单栏或者快捷键完成：</p>

        <ul>
          <li><strong>回主屏幕 (Home)：</strong> 快捷键 <code>⇧ + ⌘ + H</code>。</li>
          <li><strong>多任务切换 (App Switcher)：</strong> 连按两下 Home 键，快捷键是 <code>⇧ + ⌘ + H</code> 按两下。</li>
          <li><strong>旋转屏幕：</strong> 快捷键 <code>⌘ + 左/右方向键</code>。测试横屏 UI 时必备。</li>
          <li><strong>摇一摇 (Shake)：</strong> 快捷键 <code>^ + ⌘ + Z</code>。很多 App 的反馈收集是用这个触发的。</li>
          <li><strong>键盘弹出：</strong> 有时点击输入框不会出键盘（因为默认连了你 Mac 的物理键盘）。按 <code>⌘ + K</code> 调出软键盘。</li>
          <li><strong>查看系统日志：</strong> 除了在 Xcode 里看 <code>print</code>，你可以在 Simulator 的菜单栏 <code>Debug -&gt; Open System Log...</code> 看整个这台“虚拟手机”的系统报错（对排查底层崩溃极度有用）。</li>
        </ul>

        <h2>4. 为什么要在真机上跑？(真机调试)</h2>
        <p>虽然模拟器速度极快，而且现在 Apple Silicon 的 Mac 跑 ARM 架构的模拟器已经能达到原生速度，但有些功能 <strong>必须</strong> 在真机上测试：</p>
        <ol>
          <li><strong>硬件相关 API：</strong> 相机 (Camera)、蓝牙 (Bluetooth)、ARKit。模拟器里是没有摄像头的。</li>
          <li><strong>推送通知 (Push Notifications)：</strong> APNs 以前不支持模拟器（iOS 16+ 虽然有限支持了，但真机仍然最准）。</li>
          <li><strong>真实性能 (Instruments)：</strong> 模拟器跑的是 Mac 的 CPU 和 GPU，可能性能溢出了。如果有卡顿或发热问题，请务必连上真 iPhone 测试。</li>
        </ol>

        <TipBox type="warning" title="真机调试报错 (Code Signing)">
          当你在左上角选中了自己的真机，按 <code>⌘ + R</code> 却提示编译失败，大概率是因为 <strong>Code Signing (代码签名)</strong>。<br/>
          去项目配置的 <code>Signing & Capabilities</code> 页面，勾选 <code>Automatically manage signing</code>，然后选你在上一步配置的 Apple ID 团队。如果这是你的手机第一次装自己的 App，你还要去手机的 <strong>设置 -&gt; 通用 -&gt; VPN与设备管理</strong> 里面，信任你自己的证书。
        </TipBox>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/starter/project"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 创建项目
        </Link>
        <Link
          to="/starter/debugging"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：调试技巧 →
        </Link>
      </div>
    </div>
  );
}
