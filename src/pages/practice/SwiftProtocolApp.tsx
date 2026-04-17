import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function SwiftProtocolApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🧩 实战：Swift POP 网络层抽象</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        用面向协议编程（POP）搭建一个可测试、可替换的网络请求层。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>需求背景</h2>
        <p>
          业务开发中，网络层是最需要解耦的模块之一。今天我们用协议来抽象：
          <strong>请求定义</strong>、<strong>请求发送</strong>、<strong>数据解析</strong>三个职责，
          让网络层像搭积木一样灵活组合。
        </p>

        <h2>Step 1：定义请求协议</h2>
        <p>
          每个 API 请求都应该能描述自己的路径、方法、参数和返回类型。
          用一个协议来约束这些属性：
        </p>

        <CodeCompare
          title="请求协议定义"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`protocol APIRequest {
    associatedtype Response: Decodable
    
    var path: String { get }
    var method: String { get }
    var body: [String: Any]? { get }
}

// 默认实现：GET 请求，无 body
extension APIRequest {
    var method: String { "GET" }
    var body: [String: Any]? { nil }
}`}
          rightCode={`// TypeScript: 接口定义
interface APIRequest<T> {
    path: string;
    method?: string;
    body?: Record<string, any>;
}

// 没有默认实现，需要基类或工具函数辅助`}
        />

        <h2>Step 2：定义具体请求</h2>
        <p>
          比如我们要请求用户信息和文章列表，每个请求用一个 struct 实现协议：
        </p>
        <pre><code className="language-swift">{`struct UserRequest: APIRequest {
    typealias Response = User
    let path = "/user/profile"
}

struct ArticlesRequest: APIRequest {
    typealias Response = [Article]
    let path = "/articles"
    let method = "GET"
}`}</code></pre>

        <h2>Step 3：定义网络服务协议</h2>
        <p>
          把"怎么发请求"也抽象成协议。这样我们可以在测试时注入一个 Mock 实现，
          在生产环境用真实的 URLSession。
        </p>

        <pre><code className="language-swift">{`protocol NetworkService {
    func send<T: APIRequest>(
        _ request: T,
        completion: @escaping (Result<T.Response, Error>) -> Void
    )
}

// 真实实现
class URLSessionNetworkService: NetworkService {
    func send<T: APIRequest>(
        _ request: T,
        completion: @escaping (Result<T.Response, Error>) -> Void
    ) {
        let url = URL(string: "https://api.example.com" + request.path)!
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = request.method
        
        URLSession.shared.dataTask(with: urlRequest) { data, _, error in
            // 解析数据...
        }.resume()
    }
}`}</code></pre>

        <h2>Step 4：Mock 测试</h2>
        <p>
          因为网络层被协议化了，测试时完全不需要真的发起 HTTP 请求：
        </p>

        <pre><code className="language-swift">{`class MockNetworkService: NetworkService {
    var mockUser: User?
    
    func send<T: APIRequest>(
        _ request: T,
        completion: @escaping (Result<T.Response, Error>) -> Void
    ) {
        if let user = mockUser as? T.Response {
            completion(.success(user))
        } else {
            completion(.failure(NSError(domain: "Mock", code: -1)))
        }
    }
}`}</code></pre>

        <h2>Step 5：组合使用</h2>
        <p>
          ViewModel 只依赖 <code>NetworkService</code> 协议，而不关心底层用的是 URLSession 还是 Mock：
        </p>

        <CodeCompare
          title="ViewModel 依赖协议"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`class UserViewModel {
    let network: NetworkService
    
    init(network: NetworkService) {
        self.network = network
    }
    
    func loadUser() {
        network.send(UserRequest()) { result in
            switch result {
            case .success(let user):
                print(user.name)
            case .failure(let error):
                print(error)
            }
        }
    }
}

// 生产环境
let vm = UserViewModel(network: URLSessionNetworkService())

// 测试环境
let vm = UserViewModel(network: MockNetworkService())`}
          rightCode={`class UserViewModel {
    constructor(private network: NetworkService) {}
    
    async loadUser() {
        const result = await this.network.send(new UserRequest());
        // ...
    }
}`}
        />

        <TipBox type="tip" title="POP 的核心价值">
          通过协议，我们把"是什么"（请求定义）和"怎么做"（网络发送）完全解耦。
          这种方式比继承更灵活，比直接依赖具体类更易测试。
        </TipBox>

        <h2>进一步扩展</h2>
        <ul>
          <li>增加 <code>Cacheable</code> 协议，让特定请求支持本地缓存</li>
          <li>增加 <code>Authenticated</code> 协议，自动在 Header 中注入 Token</li>
          <li>增加 <code>Retryable</code> 协议，支持失败重试策略</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/oop/generics-advanced"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 泛型与协议导向编程
        </Link>
        <Link
          to="/swift/advanced/closure"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：闭包 Closure →
        </Link>
      </div>
    </div>
  );
}
