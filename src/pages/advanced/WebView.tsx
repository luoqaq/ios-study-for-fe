import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function WebView() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🌐 WKWebView 与 JS 交互</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iOS 里的“浏览器内核”，也是 Hybrid App 和 H5 容器的基石。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端在浏览器里运行，JavaScript 可以直接调用系统 API 的能力非常有限。
          iOS 中的 <code>WKWebView</code> 相当于一个嵌入式的 Safari 内核，
          通过 JSBridge 可以实现 Web 和 Native 的双向通信。
        </p>

        <h2>WKWebView vs UIWebView</h2>
        <p>
          <code>UIWebView</code> 已经被苹果废弃，新项目必须用 <code>WKWebView</code>。
          WKWebView 运行在独立进程，内存和性能都更好，但也因此有一些限制
          （比如无法直接访问 UIWebView 时代的一些私有 API）。
        </p>

        <h2>Native 调用 JS</h2>
        <p>
          通过 <code>evaluateJavaScript</code> 方法，Native 可以直接执行 JS 代码：
        </p>
        <pre><code>{`webView.evaluateJavaScript("document.title") { result, error in
    print(result)
}`}</code></pre>

        <h2>JS 调用 Native</h2>
        <p>
          JS 无法直接调用 Native 方法，需要通过 <strong>WKUserContentController</strong> 注册消息处理器：
        </p>

        <CodeCompare
          title="JSBridge 基础实现"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Native 端注册
let config = WKWebViewConfiguration()
config.userContentController.add(self, name: "AppBridge")

// 实现 WKScriptMessageHandler
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    if message.name == "AppBridge" {
        let body = message.body as? [String: Any]
        print(body)
    }
}`}
          rightCode={`// Web 端调用
window.webkit.messageHandlers.AppBridge.postMessage({
    action: "openCamera",
    params: { quality: "high" }
});`}
        />

        <TipBox type="tip" title="设计清晰的 Bridge 协议">
          和前端与后端的 REST API 一样，JSBridge 也需要统一的消息格式：
          建议包含 action、params、callbackId 字段，方便 Native 处理完后异步回调给 JS。
        </TipBox>

        <h2>常见应用场景</h2>
        <ul>
          <li><strong>Hybrid App：</strong> 用 H5 做活动页，Native 做核心功能</li>
          <li><strong>富文本编辑器：</strong> Web 端有成熟的编辑器，嵌入到 Native App 中</li>
          <li><strong>在线客服：</strong> 很多客服系统以 H5 形式接入</li>
          <li><strong>小程序容器：</strong> 底层渲染离不开 WebView</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/security"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← App 安全
        </Link>
        <Link
          to="/advanced/notifications"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：推送通知 →
        </Link>
      </div>
    </div>
  );
}
