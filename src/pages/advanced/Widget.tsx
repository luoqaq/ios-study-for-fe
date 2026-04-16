import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Widget() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🧩 Widget 与 App Extension</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        让用户在主屏幕、锁屏、手表上也能看到你的 App。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端没有直接等价物，因为 Web 应用无法在手机主屏幕放置常驻小组件。
          iOS 14 引入的 <strong>WidgetKit</strong> 让 App 可以把信息展示扩展到系统桌面和锁屏，
          这是提升用户留存和曝光的重要入口。
        </p>

        <h2>Widget 的本质</h2>
        <p>
          Widget 不是独立的 App，它是一个 <strong>App Extension</strong>。
          它以时间线（Timeline）的方式向系统提供未来一段时间内的展示内容，
          系统会在合适的时机刷新并渲染它。
        </p>

        <h2>Widget 的三种尺寸</h2>
        <ul>
          <li><strong>small：</strong> 占用 1x1 图标格子，适合展示单一数据（如天气温度）</li>
          <li><strong>medium：</strong> 占用 2x1 图标格子，适合展示带标题的列表</li>
          <li><strong>large：</strong> 占用 2x2 图标格子，适合展示更丰富的图表或详情</li>
        </ul>

        <TipBox type="tip" title="Widget 不能交互，只能跳转">
          点击 Widget 只能打开主 App 或 deep link 到特定页面。
          它不支持按钮点击、输入框、滚动等复杂交互。
          如果需要交互，考虑用 Live Activity（灵动岛）。
        </TipBox>

        <h2>Timeline Provider</h2>
        <p>
          Widget 通过实现 <code>TimelineProvider</code> 协议来告诉系统：
          “我现在有什么内容，未来什么时候会更新”。
          系统根据这个时间表来决定何时刷新 Widget，以节省电量。
        </p>

        <h2>常见的 App Extension 类型</h2>
        <table>
          <thead>
            <tr>
              <th>Extension</th>
              <th>用途</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Widget Extension</td><td>主屏幕/锁屏小组件</td></tr>
            <tr><td>Share Extension</td><td>系统分享面板中接入 App</td></tr>
            <tr><td>Today Extension</td><td>通知中心插件（已被 Widget 取代）</td></tr>
            <tr><td>Action Extension</td><td>系统 action sheet 中接入 App</td></tr>
            <tr><td>Live Activity</td><td>锁屏/灵动岛实时活动</td></tr>
          </tbody>
        </table>

        <h2>数据共享</h2>
        <p>
          App 和 Extension 运行在不同的进程沙盒中，不能直接共享内存。
          通常通过 <strong>App Groups</strong> 共享 UserDefaults 或文件容器来交换数据。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/mapkit"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← MapKit 与定位
        </Link>
        <Link
          to="/advanced/healthkit"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：HealthKit →
        </Link>
      </div>
    </div>
  );
}
