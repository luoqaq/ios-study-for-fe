import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function WatchKit() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">⌚ WatchKit 与 watchOS 开发</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        把 App 延伸到手腕上，健康、通知、快捷操作是手表的核心场景。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端无法直接为 Apple Watch 开发应用。
          watchOS 应用使用 <strong>SwiftUI</strong> 或 <strong>WatchKit</strong> 构建，
          运行在独立于 iPhone 的 watchOS 系统上（watchOS 6+ 支持独立 App）。
        </p>

        <h2>Watch App 的架构</h2>
        <ul>
          <li><strong>Watch App：</strong> 安装在手表上的主应用，负责 UI 展示和用户交互</li>
          <li><strong>Watch Extension：</strong>  historically 是运行在 iPhone 上的逻辑层，现在已逐步被独立 Watch App 取代</li>
          <li><strong>Complication：</strong> 表盘小组件，让用户在抬腕时就能看到关键数据</li>
        </ul>

        <h2>SwiftUI 是 watchOS 的未来</h2>
        <p>
          Apple 已经明确将 SwiftUI 作为 watchOS 的首选 UI 框架。
          新项目中应优先使用 SwiftUI，而不是老旧的 WatchKit Storyboard。
          手表的屏幕极小，交互以 Digital Crown、轻点、滑动为主，界面设计要极度精简。
        </p>

        <TipBox type="tip" title="手表的核心使用场景">
          用户在手表上停留的时间以秒计算。优秀的 Watch App 只做三件事：
          看一眼就懂、两秒内操作、与手机形成互补而非重复。
        </TipBox>

        <h2>与 iPhone 的数据同步</h2>
        <p>
          Watch App 和 iPhone App 通过 <strong>WatchConnectivity</strong> 框架通信，
          可以发送消息、传输文件、同步应用状态。
          同时，HealthKit 数据在 iPhone 和 Apple Watch 之间是自动同步的。
        </p>

        <h2>常见应用场景</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>手表端价值</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>运动健身</td><td>实时查看心率、配速、卡路里</td></tr>
            <tr><td>消息通知</td><td>快速浏览、语音回复、表情回复</td></tr>
            <tr><td>日程提醒</td><td>震动提示、快捷确认参会</td></tr>
            <tr><td>智能家居</td><td>一键开关灯、调节温度</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/ipad-multitasking"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← iPad 多窗口
        </Link>
        <Link
          to="/advanced/app-clip"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：App Clip →
        </Link>
      </div>
    </div>
  );
}
