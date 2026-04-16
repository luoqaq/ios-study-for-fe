import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function SwiftUIKitMixed() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 SwiftUI 与 UIKit 混用</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        现实中的项目往往不是“纯 SwiftUI”或“纯 UIKit”，而是两者共存。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么必须学会混用</h2>
        <p>
          很多老项目基于 UIKit 构建，但新功能可能用 SwiftUI 开发；反之，纯 SwiftUI 项目中也经常需要嵌入 UIKit 的复杂控件（如地图、视频播放器、WebView）。混用是过渡期的常态。
        </p>

        <h2>在 SwiftUI 中嵌入 UIKit：UIViewRepresentable</h2>
        <p>
          如果你需要在 SwiftUI 中使用一个 UIKit 视图（比如 <code>MKMapView</code>、<code>WKWebView</code>），你需要实现 <code>UIViewRepresentable</code> 协议：
        </p>

        <CodeCompare
          title="在 SwiftUI 里用 UIKit 的 WebView"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL
    
    // 创建 UIKit 视图
    func makeUIView(context: Context) -> WKWebView {
        return WKWebView()
    }
    
    // 更新 UIKit 视图
    func updateUIView(_ webView: WKWebView, context: Context) {
        let request = URLRequest(url: url)
        webView.load(request)
    }
}

// 在 SwiftUI 中直接使用
struct ContentView: View {
    var body: some View {
        WebView(url: URL(string: "https://apple.com")!)
    }
}`}
          rightCode={`// React 中嵌入原生组件
function WebView({ url }) {
  return (
    <iframe 
      src={url} 
      style={{ width: '100%', height: '100%' }}
    />
  );
}

function ContentView() {
  return <WebView url="https://apple.com" />;
}`}
        />

        <TipBox type="tip" title="把 UIViewRepresentable 当成桥接层">
          它的角色类似于 React Native 的 <code>Native Module</code> 或小程序的 <code>原生组件</code>。你需要自己处理生命周期、代理回调、事件传递。
        </TipBox>

        <h2>在 UIKit 中嵌入 SwiftUI：UIHostingController</h2>
        <p>
          如果你要在 UIKit 的 <code>UIViewController</code> 里使用 SwiftUI 视图，只需要用一个 <code>UIHostingController</code> 包裹它：
        </p>

        <CodeCompare
          title="在 UIKit 里用 SwiftUI"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// UIKit ViewController
class MyViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let swiftUIView = MySwiftUIView()
        let hostingController = UIHostingController(rootView: swiftUIView)
        
        addChild(hostingController)
        view.addSubview(hostingController.view)
        hostingController.didMove(toParent: self)
        
        // 设置约束...
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
        ])
    }
}`}
          rightCode={`// 把 React 组件渲染到原生容器里
// 概念上类似把 Vue/React 组件挂载到 DOM 节点
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MySwiftUIView />);`}
        />

        <h2>混用时的状态传递</h2>
        <p>
          当 SwiftUI 和 UIKit 需要共享状态时，通常借助 <code>ObservableObject</code> 或 <code>@ObservedObject</code>，让两边都能订阅同一数据源。也可以利用闭包、委托模式进行事件回调。
        </p>

        <TipBox type="warning" title="生命周期是最常见的坑">
          SwiftUI 的 View 是值类型，重建成本低；UIKit 的 View 是引用类型，需要手动管理内存和生命周期。混用时要注意：谁在持有谁，避免循环引用。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/swiftui/navigation"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← SwiftUI 路由
        </Link>
        <Link
          to="/swift/swiftui/data-flow"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：数据流与状态管理深入 →
        </Link>
      </div>
    </div>
  );
}
