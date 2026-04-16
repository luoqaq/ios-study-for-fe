import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function NetworkLayer() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🌐 网络层封装</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从散落的 URLSession 调用，走向可维护的网络架构。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么需要封装网络层</h2>
        <p>
          在页面上直接写 <code>URLSession.shared.dataTask</code> 当然可以跑通，
          但真实项目里你需要处理：超时、重试、Token 刷新、统一错误码、日志、Mock、缓存……
          把这些逻辑散落在每个 ViewController 里，项目很快会失控。
        </p>

        <h2>前端视角：对应什么</h2>
        <ul>
          <li>前端常用 axios/fetch 拦截器 → iOS 中需要自建 <code>NetworkManager</code> 单例</li>
          <li>前端的请求/响应拦截 → iOS 中通过 <code>URLProtocol</code> 或封装层实现</li>
          <li>前端的统一错误处理 → iOS 中定义 <code>NetworkError</code> 枚举</li>
        </ul>

        <h2>一个基础封装示例</h2>

        <CodeCompare
          title="网络管理器"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingFailed
}

actor NetworkManager {
    static let shared = NetworkManager()
    private init() {}
    
    func request<T: Decodable>(
        url: String,
        method: String = "GET",
        headers: [String: String]? = nil
    ) async throws -> T {
        guard let url = URL(string: url) else {
            throw NetworkError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.timeoutInterval = 30
        headers?.forEach { request.setValue($1, forKey: $0) }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.noData
        }
        
        do {
            return try JSONDecoder().decode(T.self, from: data)
        } catch {
            throw NetworkError.decodingFailed
        }
    }
}`}
          rightCode={`// TypeScript axios 封装类比
class NetworkManager {
  static instance = new NetworkManager();
  
  async request<T>(url: string, method = "GET", headers?: Record<string, string>): Promise<T> {
    const response = await fetch(url, {
      method,
      headers,
    });
    
    if (!response.ok) {
      throw new Error("Request failed");
    }
    
    return response.json() as Promise<T>;
  }
}`}
        />

        <h2>常见的封装维度</h2>
        <ul>
          <li><strong>请求模型化：</strong> 把参数、路径、方法封装成 <code>Request</code> 对象，而不是到处拼字符串。</li>
          <li><strong>响应统一化：</strong> 定义标准 <code>Response&lt;T&gt;</code>，包含 code、message、data 三层结构。</li>
          <li><strong>错误标准化：</strong> 网络断开、超时、JSON 解析失败、业务错误码，全部映射到明确的错误类型。</li>
          <li><strong>日志与调试：</strong> 在 Debug 模式下打印完整请求链路和响应体。</li>
          <li><strong>缓存策略：</strong> GET 请求可配置内存缓存或磁盘缓存，减少重复请求。</li>
        </ul>

        <TipBox type="tip" title="第三方库选择">
          如果不想从零封装，iOS 最常用的网络库是 <code>Alamofire</code>（类似 axios）。
          它提供了链式调用、请求拦截、上传下载进度、自动重试等高级功能。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/persistence"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 持久化与缓存基础
        </Link>
        <Link
          to="/advanced/instruments"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Instruments 入门 →
        </Link>
      </div>
    </div>
  );
}
