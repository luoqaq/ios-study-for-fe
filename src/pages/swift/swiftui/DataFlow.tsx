import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function DataFlow() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🌊 Swift 数据流与状态管理深入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        当页面变多、状态变复杂，@State 就不够用了。理解数据流的全景，才能设计可维护的 SwiftUI 应用。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端有 props drilling → Context → Redux/Zustand 的状态管理演进路线。
          SwiftUI 中也有类似的分层：@State → @ObservedObject → @EnvironmentObject → 自定义 Store。
        </p>

        <h2>@State：组件级私有状态</h2>
        <p>
          适合简单计数器、开关状态、输入框内容。生命周期由 SwiftUI 管理，View 重建时会保留。
        </p>

        <h2>@StateObject：需要稳定引用的可观察对象</h2>
        <p>
          如果你要在 View 中创建 <code>ObservableObject</code>，必须用 <code>@StateObject</code> 而不是 <code>@ObservedObject</code>。
          区别在于：StateObject 保证只初始化一次，ObservedObject 在 View 重建时可能被重新创建。
        </p>

        <CodeCompare
          title="ViewModel 的创建方式"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`struct ProfileView: View {
    // ✅ 正确：只在首次创建时初始化
    @StateObject private var viewModel = ProfileViewModel()
    
    var body: some View {
        VStack {
            Text(viewModel.userName)
            Button("刷新") {
                viewModel.fetchUser()
            }
        }
    }
}`}
          rightCode={`// React：useState 初始化只执行一次
function ProfileView() {
  const [viewModel] = useState(() => new ProfileViewModel());
  
  return (
    <div>
      <p>{viewModel.userName}</p>
      <button onClick={() => viewModel.fetchUser()}>刷新</button>
    </div>
  );
}`}
        />

        <h2>@ObservedObject：从外部注入的依赖</h2>
        <p>
          当 ViewModel 由父组件或 Router 传入时，使用 <code>@ObservedObject</code>。
          这非常像 React 中把 store 作为 prop 传进子组件。
        </p>

        <h2>@EnvironmentObject：全局依赖注入</h2>
        <p>
          对应 React 的 <code>Context Provider</code> 或 Vue 的 <code>provide/inject</code>。
          在根视图注入一个对象，深层子视图通过 <code>@EnvironmentObject</code> 直接读取，无需层层传递。
        </p>

        <CodeCompare
          title="全局状态注入"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// 根视图注入
@main
struct MyApp: App {
    @StateObject private var appState = AppState()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appState)
        }
    }
}

// 任意子视图读取
struct SettingsView: View {
    @EnvironmentObject var appState: AppState
    
    var body: some View {
        Toggle("深色模式", isOn: $appState.isDarkMode)
    }
}`}
          rightCode={`// React Context 等价写法
const AppStateContext = createContext(null);

function App() {
  const [appState] = useState(new AppState());
  return (
    <AppStateContext.Provider value={appState}>
      <ContentView />
    </AppStateContext.Provider>
  );
}

function SettingsView() {
  const appState = useContext(AppStateContext);
  return (
    <label>
      <input 
        type="checkbox" 
        checked={appState.isDarkMode} 
        onChange={...} 
      />
      深色模式
    </label>
  );
}`}
        />

        <h2>选择指南</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐方案</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>简单的局部状态（布尔、数字、字符串）</td><td>@State</td></tr>
            <tr><td>View 内部创建 ViewModel</td><td>@StateObject</td></tr>
            <tr><td>父组件传入的 ViewModel</td><td>@ObservedObject</td></tr>
            <tr><td>全局主题、用户登录态、配置</td><td>@EnvironmentObject</td></tr>
            <tr><td>超大型应用的多模块状态管理</td><td>自定义 Store + Combine/ TCA</td></tr>
          </tbody>
        </table>

        <TipBox type="warning" title="避免过度使用 EnvironmentObject">
          和 React Context 一样，EnvironmentObject 虽然方便，但滥用会导致数据流难以追踪。只在真正全局的状态上使用它。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/swiftui/mixed-ui"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← SwiftUI 与 UIKit 混用
        </Link>
        <Link
          to="/swift/swiftdata/intro"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：SwiftData 入门 →
        </Link>
      </div>
    </div>
  );
}
