import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function SwiftUINavigation() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 SwiftUI 路由</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从单页面走向多页面，SwiftUI 的导航方式与前端 Router 有何不同？
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>NavigationStack： SwiftUI 的页面栈</h2>
        <p>
          SwiftUI 从 iOS 16 开始主推 <code>NavigationStack</code>，它很像前端路由中的 history stack：你可以 push、pop，也可以程序化地导航到某个目标页面。
        </p>

        <CodeCompare
          title="页面导航对比"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// SwiftUI NavigationStack
NavigationStack {
    List {
        NavigationLink("去详情页", value: "detail")
    }
    .navigationDestination(for: String.self) { value in
        if value == "detail" {
            DetailView()
        }
    }
}`}
          rightCode={`// React Router
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<DetailView />} />
    </Routes>
  );
}

// Home.tsx
function Home() {
  const navigate = useNavigate();
  return (
    <ul>
      <li onClick={() => navigate('/detail')}>
        去详情页
      </li>
    </ul>
  );
}`}
        />

        <TipBox type="info" title="没有 URL 的概念">
          在纯 SwiftUI 中，<code>NavigationStack</code> 维护的是一个视图栈，而不是像 Web 那样的 URL 路径。你可以通过 <code>navigationDestination</code> 把某个数据类型映射到一个视图。如果你需要类似浏览器的深层链接（Deep Link），通常要结合 <code>Universal Link</code> 或 <code>URL Schemes</code> 来处理。
        </TipBox>

        <h2>声明式 vs 命令式导航</h2>
        <p>
          <code>NavigationLink</code> 是声明式的：用户点击，系统自动 push。如果你需要在按钮点击后、网络请求成功后再跳转，就要用到命令式导航：
        </p>

        <CodeCompare
          title="命令式跳转"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// SwiftUI
@State private var path = NavigationPath()

var body: some View {
    NavigationStack(path: $path) {
        LoginView()
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .home: HomeView()
                case .profile: ProfileView()
                }
            }
    }
}

// 登录成功后
func onLoginSuccess() {
    path.append(Route.home)
}`}
          rightCode={`// React Router
const navigate = useNavigate();

function onLoginSuccess() {
    navigate('/home');
}`}
        />

        <h2>TabView：底部标签栏</h2>
        <p>
          对应前端移动端常见的底部 Tab 栏，SwiftUI 提供了 <code>TabView</code>。每个 <code>Tab</code> 对应一个根级页面：
        </p>

        <CodeCompare
          title="底部 Tab 对比"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`TabView {
    HomeView()
        .tabItem {
            Label("首页", systemImage: "house")
        }
    
    ProfileView()
        .tabItem {
            Label("我的", systemImage: "person")
        }
}`}
          rightCode={`// React (Ant Mobile / Taro)
<TabBar>
  <TabBar.Item title="首页" icon={<HomeIcon />}>
    <HomeView />
  </TabBar.Item>
  <TabBar.Item title="我的" icon={<ProfileIcon />}>
    <ProfileView />
  </TabBar.Item>
</TabBar>`}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/swiftui/state-binding"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 状态与绑定
        </Link>
        <Link
          to="/swift/swiftui/mixed-ui"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：SwiftUI 与 UIKit 混用 →
        </Link>
      </div>
    </div>
  );
}
