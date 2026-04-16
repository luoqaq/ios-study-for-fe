import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function SiriKit() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🎙️ SiriKit 与 Shortcuts</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        让 App 的能力通过语音和快捷指令被系统调用。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端没有直接等价物。SiriKit 和 Shortcuts 是 iOS 系统级能力，
          让用户可以通过语音（Siri）或自动化脚本（Shortcuts）调用 App 的特定功能。
        </p>

        <h2>SiriKit 的两种集成方式</h2>
        <ul>
          <li><strong>内置 Intent Domain：</strong> 苹果预定义了打车、支付、消息、健身、订餐厅等场景，App 只需要填充数据即可被 Siri 识别</li>
          <li><strong>自定义 Intent（Custom Intent）：</strong> 如果你的业务不在内置 Domain 中，可以定义自己的 Intent，让用户通过 Siri 或 Shortcuts 触发任意操作</li>
        </ul>

        <h2>Shortcuts：把 App 能力积木化</h2>
        <p>
          Shortcuts（快捷指令）让用户可以把多个 App 的操作串成自动化流程。
          比如：
        </p>
        <ul>
          <li>“早上 7 点自动播报今日待办事项”</li>
          <li>“到达公司后自动打开考勤 App 并打卡”</li>
          <li>“睡前一键关闭所有智能家居并播放白噪音”</li>
        </ul>
        <p>
          你的 App 通过定义 <strong>App Intent</strong>，就可以成为 Shortcuts 流程中的一块积木。
        </p>

        <TipBox type="info" title="iOS 16+ 推荐用 App Intents">
          传统的 Intent Definition File 方式正在被 Swift 原生的 <code>AppIntents</code> 框架取代。
          新项目中建议直接使用 <code>AppIntent</code> 协议，代码更简洁，类型更安全。
        </TipBox>

        <h2>实现流程</h2>
        <ol>
          <li>定义 Intent：声明名称、参数、返回值</li>
          <li>实现 Intent Handler：处理用户请求并执行 App 逻辑</li>
          <li> donating Intent：在用户使用相关功能时把 Intent 捐赠给系统，让 Siri 学习用户的习惯</li>
          <li>在 Shortcuts App 中测试和配置</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/arkit"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← ARKit
        </Link>
        <Link
          to="/advanced/ipad-multitasking"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：iPad 多窗口 →
        </Link>
      </div>
    </div>
  );
}
