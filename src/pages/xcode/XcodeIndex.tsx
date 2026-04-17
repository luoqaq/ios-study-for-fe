import { Link } from "react-router-dom";

export default function XcodeIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">开发起步</h1>
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
        <p>这一模块按实际开发流程来熟悉 Xcode 和工程基础：</p>

        <h3>环境搭建</h3>
        <ul>
          <li><Link to="/starter/setup">环境安装与配置</Link>：下载 Xcode 并配置开发者证书</li>
          <li><Link to="/starter/interface">界面导览</Link>：认识 Xcode 复杂的面板分布</li>
        </ul>

        <h3>项目与构建</h3>
        <ul>
          <li><Link to="/starter/project">创建项目</Link>：从新建一个工程开始，理解目录结构</li>
          <li><Link to="/starter/build-run">构建与运行</Link>：编译、签名、安装到设备的全流程</li>
          <li><Link to="/starter/project-config">Info.plist / Target / Scheme</Link>：理解工程配置的三要素</li>
          <li><Link to="/starter/build-configurations">Scheme / Build Configuration 深入</Link>：Debug / Release、多环境配置</li>
        </ul>

        <h3>调试与运行</h3>
        <ul>
          <li><Link to="/starter/simulator">运行与模拟器</Link>：第一次把你的 App 跑起来</li>
          <li><Link to="/starter/debugging">断点与调试</Link>：像在浏览器打断点一样在 Xcode 中排查 Bug</li>
          <li><Link to="/starter/debugging-advanced">调试与 Instruments 结合实战</Link>：从 print 排查升级到用工具说话</li>
        </ul>

        <h3>UI 搭建</h3>
        <ul>
          <li><Link to="/starter/storyboard">可视化 UI (Storyboard)</Link>：了解经典的可视化搭建方式</li>
        </ul>

        <h2>接下来该去哪</h2>
        <p>
          完成开发起步后，下一步就是进入{" "}
          <Link to="/uikit">UIKit</Link>，学习页面生命周期、导航和列表，
          把真正做业务的能力建立起来。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/roadmap"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 成长地图
        </Link>
        <Link
          to="/starter/setup"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          安装与配置 Xcode →
        </Link>
      </div>
    </div>
  );
}
