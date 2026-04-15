import { Link } from "react-router-dom";

export default function XcodeIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Xcode 使用教程</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        抛弃 VS Code 的轻量级，迎接庞大但全能的 Apple 官方 IDE。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>从前端到 iOS 的工具链切换</h2>
        <p>
          如果你是纯粹的前端开发者，你可能习惯了 <code>npm install</code>、
          <code>yarn dev</code>、然后在浏览器或者 Chrome DevTools 里调试。
          但是，做原生的 iOS 应用，<strong>一切都在 Xcode 中发生</strong>。
        </p>

        <h3>Xcode 包含什么？</h3>
        <ul>
          <li>
            <strong>代码编辑器：</strong>{" "}
            提供代码高亮、自动补全（虽然有时候比较笨）、代码重构。
          </li>
          <li>
            <strong>界面构建器 (Interface Builder / Storyboard)：</strong>{" "}
            拖拽式 UI 设计，所见即所得。即使后来推出了声明式的
            SwiftUI，可视化预览也依然是 Xcode 的核心。
          </li>
          <li>
            <strong>编译器 (LLVM / Clang)：</strong>{" "}
            把你的代码变成可以在手机上跑的二进制机器码。
          </li>
          <li>
            <strong>调试器 (LLDB)：</strong>{" "}
            设置断点、单步执行、查看内存堆栈和视图层级。
          </li>
          <li>
            <strong>模拟器 (Simulator)：</strong> 在 Mac 上运行各种型号的
            iPhone/iPad 环境。
          </li>
          <li>
            <strong>性能分析工具 (Instruments)：</strong> 查找内存泄漏、CPU
            瓶颈、卡顿问题（类似 Chrome 的 Performance 面板）。
          </li>
        </ul>

        <h2>学习路径</h2>
        <p>我们将按实际开发流程来熟悉 Xcode：</p>

        <ol>
          <li>
            <Link to="/xcode/setup">环境安装与配置</Link>：下载 Xcode
            并配置开发者证书。
          </li>
          <li>
            <Link to="/xcode/interface">界面导览</Link>：认识 Xcode
            复杂的面板分布。
          </li>
          <li>
            <Link to="/xcode/project">创建项目</Link>
            ：从新建一个工程开始，理解目录结构。
          </li>
          <li>
            <Link to="/xcode/simulator">运行与模拟器</Link>：第一次把你的 App
            跑起来。
          </li>
          <li>
            <Link to="/xcode/debugging">断点与调试</Link>
            ：像在浏览器打断点一样在 Xcode 中排查 Bug。
          </li>
          <li>
            <Link to="/xcode/storyboard">可视化 UI (Storyboard)</Link>
            ：了解经典的可视化搭建方式。
          </li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Swift 教程
        </Link>
        <Link
          to="/xcode/setup"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          安装与配置 Xcode →
        </Link>
      </div>
    </div>
  );
}
