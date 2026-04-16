import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function IPadMultitasking() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📐 iPad 多窗口与多任务</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iPad 不只是大号的 iPhone，多任务处理是它最核心的生产力场景。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端网页在 iPad 上通常只是全屏或响应式缩放。
          原生 iOS App 可以深度利用 iPad 的多任务能力：分屏（Split View）、侧拉（Slide Over）、
          画中画（Picture in Picture），以及 iPadOS 13+ 引入的多窗口（Multiple Windows）。
        </p>

        <h2>多窗口（Multiple Windows）</h2>
        <p>
          iPadOS 允许同一个 App 同时打开多个窗口，每个窗口有独立的场景（UIScene）。
          这非常像 macOS 上的多文档窗口，用户可以在不同的分屏组合中排列同一个 App 的多个实例。
        </p>
        <ul>
          <li>需要开启 <code>Supports multiple windows</code> 配置</li>
          <li>使用 <code>UISceneSession</code> 管理窗口的生命周期和状态恢复</li>
          <li>不同窗口间的数据需要通过共享存储或通知同步</li>
        </ul>

        <h2>Size Classes 与自适应布局</h2>
        <p>
          iPad 的分屏会让你的 App 宽度在 Compact 和 Regular 之间动态切换。
          如果还是用写死的大屏布局，分屏后界面会严重错位。
          必须基于 Size Classes + Auto Layout 实现真正的自适应。
        </p>

        <TipBox type="warning" title="不要把 iPad 当大屏 iPhone 做">
          很多 App 在 iPad 上只是简单放大，这是审核的红线之一。
          如果你的 App 支持 iPad，必须充分利用大屏幕空间，或至少保证在分屏/多窗口下布局正常。
        </TipBox>

        <h2>画中画（PiP）</h2>
        <p>
          视频类 App 通常需要支持画中画，让用户在浏览其他内容时视频以小窗悬浮。
          通过 <code>AVPictureInPictureController</code> 即可实现，
          同时要注意 PiP 模式下的音频会话和后台任务管理。
        </p>

        <h2>键盘与指针适配</h2>
        <p>
          iPad 用户经常使用外接键盘和鼠标/触控板。
          良好的 iPad App 应该支持：
        </p>
        <ul>
          <li>键盘快捷键（Command + S 保存、Command + T 新建标签页）</li>
          <li>指针悬停效果（Hover）</li>
          <li>Tab 键焦点导航</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/sirikit"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← SiriKit
        </Link>
        <Link
          to="/advanced/watchkit"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：WatchKit →
        </Link>
      </div>
    </div>
  );
}
