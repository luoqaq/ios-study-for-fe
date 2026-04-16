import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Security() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔒 App 安全与代码混淆</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        线上不是测试环境，敏感数据和业务逻辑都需要防护。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端代码几乎完全暴露在浏览器里，最多做源码混淆和接口鉴权。
          iOS App 虽然编译成了二进制，但仍然可以被反编译（class-dump、Hopper、IDA）。
          安全策略需要从代码层、网络层、运行环境层同时下手。
        </p>

        <h2>1. 敏感数据存储：Keychain 是底线</h2>
        <p>
          Token、用户密码、证书等绝不要存在 UserDefaults 或 plist 中。
          Keychain 是 iOS 唯一加密存储区，受系统密码和 Secure Enclave 保护。
        </p>

        <h2>2. 网络安全：HTTPS + SSL Pinning</h2>
        <p>
          仅靠 HTTPS 还不够，中间人攻击可以通过伪造证书实现。
          <strong>SSL Pinning</strong> 把服务器证书或公钥硬编码在 App 中，
          只有匹配时才建立连接，防止证书被替换。
        </p>

        <TipBox type="warning" title="SSL Pinning 的代价">
          如果服务器证书轮换（过期、更新），而 App 里的公钥没同步，所有用户都会连不上网。
          需要设计好证书更新和降级策略。
        </TipBox>

        <h2>3. 代码混淆与加固</h2>
        <ul>
          <li><strong>符号剥离：</strong> Release 构建默认会去掉调试符号，增加反编译难度</li>
          <li><strong>方法名混淆：</strong> 使用工具（如 ipaguard、ollvm）把有意义的类名、方法名变成随机字符</li>
          <li><strong>逻辑加密：</strong> 核心算法用 C/C++ 写，甚至拆分到服务端计算</li>
          <li><strong>反调试：</strong> 检测是否被 lldb、Frida、Cycript 附加，检测到则主动退出</li>
        </ul>

        <h2>4. 越狱检测</h2>
        <p>
          越狱设备失去了沙盒保护，恶意应用可以读取其他 App 的数据。
          常见检测手段：检查是否能访问 /Applications/Cydia.app、是否能执行 system() 等。
          但要注意：越狱检测可以被绕过，不能作为唯一的安全屏障。
        </p>

        <h2>安全分层策略</h2>
        <table>
          <thead>
            <tr>
              <th>层级</th>
              <th>措施</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>存储层</td><td>Keychain、数据加密、避免硬编码密钥</td></tr>
            <tr><td>网络层</td><td>HTTPS、SSL Pinning、接口签名校验</td></tr>
            <tr><td>代码层</td><td>符号剥离、混淆、核心逻辑下沉到 C</td></tr>
            <tr><td>运行层</td><td>越狱检测、反调试、完整性校验</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/core-animation"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Core Animation
        </Link>
        <Link
          to="/advanced/webview"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：WKWebView →
        </Link>
      </div>
    </div>
  );
}
