import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";

export default function Interface() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔨 界面导览</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        面对满屏的按钮和检查器，前端开发者如何找到自己的“VS Code”。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🖥️"
          title="四大核心区域"
          description="和网页开发常常把编辑器铺满不同，Xcode 采用了经典的 Navigator（导航器） + Editor（编辑器） + Inspector（检查器） + Debug（调试区） 的布局。"
          frontend-ref="类似你同时打开了 VS Code 的侧边栏、Chrome DevTools 的 Elements 面板、以及控制台（Console）。"
        />

        <h2>Xcode 主界面拆解</h2>
        <p>
          当你第一次打开 Xcode 时，你会被它复杂的布局震惊。
          其实，你只需要关注四个主要的区块：
        </p>

        <div className="my-8 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/>
            </svg>
          </div>
          <ol className="space-y-6 list-none pl-0">
            <li className="flex gap-4 relative z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ios-blue text-white font-bold">1</div>
              <div>
                <h3 className="!mt-0 !mb-2 text-lg">左侧：导航器 (Navigator)</h3>
                <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
                  这就相当于 VS Code 最左侧的 <strong>Explorer（文件树）</strong>。
                  最上面有一排小图标：第一个是文件目录，第二个是版本控制，第七个是断点列表。
                  <br/><em>快捷键：<code>⌘ + 1</code> 到 <code>⌘ + 9</code> 切换。</em>
                </p>
              </div>
            </li>
            <li className="flex gap-4 relative z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ios-green text-white font-bold">2</div>
              <div>
                <h3 className="!mt-0 !mb-2 text-lg">中间：编辑器 (Editor)</h3>
                <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
                  写代码的地方。如果打开的是 <code>.storyboard</code> 文件，这里会变成可视化的画布；如果打开的是 SwiftUI，右侧会自动分出一半变成实时预览（Canvas）。
                </p>
              </div>
            </li>
            <li className="flex gap-4 relative z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ios-orange text-white font-bold">3</div>
              <div>
                <h3 className="!mt-0 !mb-2 text-lg">右侧：检查器 (Inspectors)</h3>
                <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
                  这是最不“前端”的地方！这里相当于 <strong>Chrome DevTools 的 Elements 面板 + 属性编辑</strong>。
                  当你在画布里选中一个按钮，在这里可以像填表一样设置它的颜色、文字、字体，甚至拖拽连线。
                  <br/><em>快捷键：<code>⌥ + ⌘ + 0</code> 显示/隐藏。</em>
                </p>
              </div>
            </li>
            <li className="flex gap-4 relative z-10">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white font-bold">4</div>
              <div>
                <h3 className="!mt-0 !mb-2 text-lg">下方：调试区 (Debug Area)</h3>
                <p className="m-0 text-sm text-gray-600 dark:text-gray-400">
                  这就是你的 <strong>Console（控制台）</strong>。
                  当代码走到断点时，左半部分显示变量的值（类似 VS Code 的 Variables），右半部分是日志输出窗口（<code>print</code> 和 <code>NSLog</code> 的归宿），也是你输入 LLDB 调试命令的地方。
                  <br/><em>快捷键：<code>⇧ + ⌘ + Y</code> 显示/隐藏。</em>
                </p>
              </div>
            </li>
          </ol>
        </div>

        <h2>顶部的控制中心（The Toolbar）</h2>
        <p>
          顶部正中间是你经常要看的地方。
        </p>
        <ul>
          <li><strong>运行按钮 (Play)：</strong>相当于 <code>npm run start</code>。编译代码并启动模拟器。<em>(快捷键：<code>⌘ + R</code>)</em></li>
          <li><strong>停止按钮 (Stop)：</strong>杀掉正在运行的 App 进程。<em>(快捷键：<code>⌘ + .</code>)</em></li>
          <li><strong>Scheme / 设备选择器：</strong>在这里选择你是要在 iPhone 15 Pro 模拟器上跑，还是要插上线在自己的真机上跑。</li>
          <li><strong>状态显示区：</strong>如果编译失败，这里会变成刺眼的红色并告诉你 <code>Build Failed</code>。</li>
        </ul>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/xcode/setup"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 安装与配置
        </Link>
        <Link
          to="/xcode/project"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：创建项目 →
        </Link>
      </div>
    </div>
  );
}