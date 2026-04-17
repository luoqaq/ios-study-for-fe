import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function Persistence() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">💾 持久化与缓存基础</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iOS 中数据存哪里？从简单键值对到结构化数据库一网打尽。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端存数据的选择很简单：localStorage / sessionStorage / IndexedDB。
          iOS 中对应的选择更多，每种都有不同的适用场景和限制。
        </p>

        <h2>1. UserDefaults：对应 localStorage</h2>
        <p>
          <code>UserDefaults</code> 是 iOS 最简单的键值存储，适合保存配置项、开关状态、用户偏好等小型数据。
          它和 localStorage 一样不能存敏感信息，也不适合存大量数据。
        </p>

        <CodeCompare
          title="键值存储对比"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// UserDefaults
let defaults = UserDefaults.standard
defaults.set("dark", forKey: "theme")
defaults.set(true, forKey: "isLoggedIn")

let theme = defaults.string(forKey: "theme")`}
          rightCode={`// localStorage
localStorage.setItem("theme", "dark");
localStorage.setItem("isLoggedIn", "true");

const theme = localStorage.getItem("theme");`}
        />

        <TipBox type="warning" title="不要滥用 UserDefaults">
          UserDefaults 会在 App 启动时全部加载到内存，如果存了几 MB 的数据，会明显拖慢启动速度。
        </TipBox>

        <h2>2. Keychain：安全的敏感信息存储</h2>
        <p>
          如果前端把 Token、密码存在 localStorage 里，安全审计一定不过关。
          iOS 中对应的安全存储是 <strong>Keychain</strong>，系统会加密并受设备密码/生物识别保护。
        </p>

        <TipBox type="info" title="通常封装第三方库使用">
          原生 Keychain API 是 C 接口，非常繁琐。生产环境一般用 <code>KeychainAccess</code> 或 <code>SwiftKeychainWrapper</code> 这类封装库。
        </TipBox>

        <h2>3. FileManager：文件系统读写</h2>
        <p>
          和前端不同，iOS App 只能访问自己的沙盒目录。常用的沙盒子目录有：
        </p>
        <ul>
          <li><strong>Documents：</strong> 用户可见的重要文件，会被 iCloud 备份。</li>
          <li><strong>Library/Caches：</strong> 可再生的缓存数据，不会被 iCloud 备份，系统可能在磁盘紧张时清理。</li>
          <li><strong>tmp：</strong> 临时文件，随时可能被系统清除。</li>
        </ul>

        <CodeCompare
          title="写入沙盒文件"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// Swift: 写入 Documents 目录
let url = FileManager.default
    .urls(for: .documentDirectory, in: .userDomainMask)[0]
    .appendingPathComponent("data.json")

try data.write(to: url)`}
          rightCode={`// 前端没有直接文件系统权限
// 浏览器中使用 IndexedDB 或 Cache API
indexedDB.open("myDB", 1);`}
        />

        <h2>4. Core Data：ORM + 本地数据库</h2>
        <p>
          如果需要存储复杂的结构化数据，并支持查询、关系、版本迁移，就要用到 <code>Core Data</code>。
          它有点像前端的 IndexedDB + ORM 的综合体，但学习曲线更陡。
        </p>

        <CodeCompare
          title="Core Data 基础查询"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`// Swift: Core Data 查询
let context = persistentContainer.viewContext
let fetchRequest: NSFetchRequest<User> = User.fetchRequest()
fetchRequest.predicate = NSPredicate(
    format: "age > %d", 18
)
fetchRequest.sortDescriptors = [
    NSSortDescriptor(key: "name", ascending: true)
]

do {
    let users = try context.fetch(fetchRequest)
    // 使用 users
} catch {
    print("查询失败: \\(error)")
}`}
          rightCode={`// TypeScript: Prisma 风格查询
const users = await prisma.user.findMany({
    where: { age: { gt: 18 } },
    orderBy: { name: 'asc' }
});`}
        />

        <TipBox type="tip" title="现代替代方案">
          如果只是需要轻量级的对象持久化，可以考虑 <code>SwiftData</code>（iOS 17+），它的 API 比 Core Data 现代很多，声明式语法更接近 SwiftUI 风格。
        </TipBox>

        <h2>选型速查表</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>推荐方案</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>用户配置、开关状态</td><td>UserDefaults</td></tr>
            <tr><td>Token、密码、证书</td><td>Keychain</td></tr>
            <tr><td>图片/JSON 缓存</td><td>FileManager (Caches)</td></tr>
            <tr><td>复杂结构化数据 + 查询</td><td>Core Data / SwiftData</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 高级进阶总览
        </Link>
        <Link
          to="/advanced/network-layer"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：网络层封装 →
        </Link>
      </div>
    </div>
  );
}
