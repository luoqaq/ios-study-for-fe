import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function SwiftDataIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🗄️ SwiftData 入门</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        iOS 17+ 的现代数据持久化方案，比 Core Data 更简洁、更 Swift 原生。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端做本地存储有 localStorage、IndexedDB、SQLite（通过 wasm）。
          iOS 中，SwiftData 相当于一个类型安全、声明式的本地 ORM，
          底层仍然基于 SQLite，但 API 完全现代化。
        </p>

        <h2>SwiftData vs Core Data</h2>
        <ul>
          <li><strong>Core Data：</strong> 历史悠久，API 繁重，配置复杂，学习曲线陡峭</li>
          <li><strong>SwiftData：</strong> 利用 Swift 的宏（Macro）和类型系统，模型定义像写普通 struct/class 一样简单</li>
        </ul>

        <h2>用宏定义数据模型</h2>
        <p>
          SwiftData 使用 <code>@Model</code> 宏标记一个类，让它自动具备持久化能力：
        </p>

        <CodeCompare
          title="模型定义对比"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`import SwiftData

@Model
class User {
    var name: String
    var email: String
    var joinDate: Date
    
    init(name: String, email: String, joinDate: Date) {
        self.name = name
        self.email = email
        self.joinDate = joinDate
    }
}`}
          rightCode={`// TypeScript + Prisma 风格类比
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  joinDate  DateTime @default(now())
}`}
        />

        <h2>查询数据：@Query</h2>
        <p>
          在 SwiftUI 中，<code>@Query</code> 宏让数据查询变得像声明状态一样简单：
        </p>
        <pre><code>{`struct UserList: View {
    @Query(sort: \\User.joinDate, order: .reverse) var users: [User]
    
    var body: some View {
        List(users) { user in
            Text(user.name)
        }
    }
}`}</code></pre>

        <h2>增删改查</h2>
        <p>
          通过 <code>ModelContext</code> 执行数据库操作，SwiftData 会自动追踪变更并持久化：
        </p>
        <ul>
          <li><code>context.insert(user)</code>：插入</li>
          <li><code>context.delete(user)</code>：删除</li>
          <li><code>try context.save()</code>：保存变更</li>
        </ul>

        <TipBox type="info" title="什么时候用 SwiftData">
          如果你的 App 最低支持版本是 iOS 17+，且只需要中等复杂度的本地数据持久化，
          SwiftData 是首选。如果还要支持 iOS 16 及以下，仍然需要用 Core Data 或第三方库（如 Realm）。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/swiftui/data-flow"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 数据流与状态管理深入
        </Link>
        <Link
          to="/swift/practice/swiftdata-app"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          实战：SwiftData 待办清单 →
        </Link>
      </div>
    </div>
  );
}
