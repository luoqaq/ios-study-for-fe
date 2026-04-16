import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Notifications() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔔 推送通知与本地通知</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        用户离开 App 后，如何把他们拉回来？通知系统是核心手段之一。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端有 Web Push API 和 Service Worker，可以向浏览器推送通知。
          iOS 中的通知体系更成熟，分为 <strong>远程推送（APNs）</strong> 和 <strong>本地通知（Local Notification）</strong> 两种。
        </p>

        <h2>远程推送（APNs）</h2>
        <p>
          Apple Push Notification service（APNs）是苹果提供的统一推送网关。
          无论 App 是否在运行，服务器都可以通过 APNs 把消息推送到用户设备。
        </p>
        <ol>
          <li>App 启动时向 APNs 请求 Device Token</li>
          <li>App 把 Device Token 发给业务服务器</li>
          <li>服务器通过 APNs 接口发送推送</li>
          <li>设备收到推送后显示在通知中心</li>
        </ol>

        <TipBox type="warning" title="iOS 推送必须经 APNs 中转">
          和 Android 不同，iOS 不允许 App 自己常驻后台连接推送服务器。
          所有远程推送必须经过苹果的 APNs 服务。
        </TipBox>

        <h2>本地通知（UNUserNotificationCenter）</h2>
        <p>
          不需要服务器，由 App 自己在本地触发。典型场景：
        </p>
        <ul>
          <li>闹钟提醒</li>
          <li>待办事项到期通知</li>
          <li>定时喝水/休息提醒</li>
        </ul>

        <h2>权限申请与通知分类</h2>
        <p>
          iOS 10 之后，通知权限需要显式申请，而且分为多个级别：
        </p>
        <ul>
          <li><strong>Authorization：</strong> 是否允许显示通知</li>
          <li><strong>Alert / Sound / Badge：</strong> 允许以哪种形式打扰用户</li>
          <li><strong>Critical Alert：</strong> 紧急通知，可绕过勿扰模式（需要特殊申请）</li>
        </ul>

        <h2>富通知与交互操作</h2>
        <p>
          现代 iOS 通知支持图片、视频、按钮等富媒体内容。
          通过 <code>UNNotificationServiceExtension</code> 可以在通知展示前下载附件，
          通过 <code>UNNotificationContentExtension</code> 可以自定义通知的 UI 界面。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/webview"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← WKWebView
        </Link>
        <Link
          to="/advanced/photos-camera"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：相册与相机 →
        </Link>
      </div>
    </div>
  );
}
