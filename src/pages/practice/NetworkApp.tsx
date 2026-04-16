import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function NetworkApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">
        💻 实战 2：网络请求 App
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        告别 fetch() 和 axios，拥抱 URLSession。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>📋 需求描述</h2>
        <p>
          实现一个简单的 App，从远程 API 获取用户列表，解析 JSON
          数据，并显示在界面上。
        </p>

        <h2>前端视角：对应的概念</h2>
        <p>
          前端请求网络非常简单，一个 <code>fetch()</code> 加{" "}
          <code>.json()</code> 就搞定了。 在 iOS
          原生中，处理网络请求需要面对静态语言对数据结构的严格要求。
        </p>
        <ul>
          <li>
            <strong>请求库：</strong> 对应原生的是 <code>URLSession</code>。
          </li>
          <li>
            <strong>JSON 解析：</strong>
            <ul>
              <li>
                在前端，<code>JSON.parse()</code> 返回的是可以随便点（
                <code>.</code>）的动态对象。
              </li>
              <li>
                在 iOS 中，你必须提前定义好对应的数据模型（Class/Struct）。在
                Swift 中，这由 <code>Codable</code> 协议来完成。
              </li>
            </ul>
          </li>
          <li>
            <strong>异步处理：</strong> 前端用 Promise 或 async/await。Swift
            现在也完全支持了 <code>async/await</code>（长得一模一样）。
          </li>
          <li>
            <strong>UI 更新：</strong> 原生开发的一个铁律：
            <strong>必须在主线程更新 UI</strong>。
          </li>
        </ul>

        <h2>🎯 核心代码实现</h2>

        <h3>1. 定义数据模型</h3>
        <p>
          在 Swift 中，只需要让结构体遵循 <code>Codable</code>{" "}
          协议，编译器就会自动帮你完成 JSON 到对象的映射。
        </p>

        <CodeCompare
          title="模型定义"
          leftTitle="Swift (Codable)"
          rightTitle="TypeScript (Interface)"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// 定义用户模型
struct User: Codable {
    let id: Int
    let name: String
    let email: String
}`}
          rightCode={`// 定义接口
interface User {
  id: number;
  name: string;
  email: string;
}`}
        />

        <h3>2. 发起网络请求</h3>

        <TipBox type="tip" title="Swift 的 async/await">
          Apple 在 Swift 5.5 引入了与 JS 几乎完全一致的 async/await
          语法，极大地简化了之前基于 Block 的嵌套回调问题。
        </TipBox>

        <CodeCompare
          title="获取数据"
          leftTitle="Swift (async/await)"
          rightTitle="JavaScript (Fetch)"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`func fetchUsers() async {
    guard let url = URL(string: "https://api.example.com/users") else { return }
    
    do {
        // 发起请求
        let (data, _) = try await URLSession.shared.data(from: url)
        
        // JSON 解析为结构体数组
        let users = try JSONDecoder().decode([User].self, from: data)
        
        // 🚨 切回主线程更新 UI
        await MainActor.run {
            self.users = users
            self.tableView.reloadData()
        }
    } catch {
        print("请求失败: \\(error)")
    }
}`}
          rightCode={`async function fetchUsers() {
    try {
        const url = "https://api.example.com/users";
        
        // 发起请求
        const response = await fetch(url);
        
        // 解析 JSON
        const users = await response.json();
        
        // 更新 UI 状态
        setUsers(users);
        
    } catch (error) {
        console.error("请求失败:", error);
    }
}`}
        />

        <TipBox type="warning" title="主线程陷阱 (Main Thread)">
          网络请求会在后台线程完成。在 iOS 中，所有的 UI 操作必须在主线程（Main
          Thread）中进行。 如果你在后台线程尝试调用{" "}
          <code>tableView.reloadData()</code>，程序会直接崩溃！
          <br />
          （这就是为什么上面的 Swift 代码要使用 <code>MainActor.run</code>
          ，或者老版本的 <code>DispatchQueue.main.async</code>）。
        </TipBox>

        <h2>进阶思考</h2>
        <p>
          真实的生产环境里，网络层还需要处理：超时、缓存、Token 拦截器、HTTPS
          证书校验等。iOS 常用的第三方网络库是 <code>Alamofire</code>
          （类似前端的 axios）。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/publish-end-to-end"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 从零发布一个 App
        </Link>
        <Link
          to="/advanced"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          返回高级进阶总览 →
        </Link>
      </div>
    </div>
  );
}
