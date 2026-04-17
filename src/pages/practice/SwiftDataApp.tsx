import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function SwiftDataApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🗄️ 实战：SwiftData 待办清单</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        用 SwiftData 做一个本地持久化的 Todo App。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>需求描述</h2>
        <p>实现一个支持增删改查的待办清单，数据使用 SwiftData 持久化到本地。要求：</p>
        <ul>
          <li>可以添加新的待办事项</li>
          <li>可以标记完成/未完成</li>
          <li>可以删除事项</li>
          <li>重启 App 后数据不丢失</li>
        </ul>

        <h2>Step 1：定义数据模型</h2>
        <p>
          用 <code>@Model</code> 宏标记一个普通 Swift class，
          它就自动具备了持久化能力。
        </p>

        <CodeCompare
          title="Todo 模型定义"
          leftLang="swift"
          rightLang="typescript"
          leftCode={`import SwiftData

@Model
class TodoItem {
    var title: String
    var isCompleted: Bool
    var createdAt: Date
    
    init(title: String, isCompleted: Bool = false) {
        self.title = title
        self.isCompleted = isCompleted
        self.createdAt = Date()
    }
}`}
          rightCode={`// TypeScript + Prisma 风格
model TodoItem {
  id          Int      @id @default(autoincrement())
  title       String
  isCompleted Boolean  @default(false)
  createdAt   DateTime @default(now())
}`}
        />

        <h2>Step 2：配置 ModelContainer</h2>
        <p>
          在 App 的入口（或 Scene）中注入 <code>ModelContainer</code>，
          这样整个应用都能访问到同一个数据库上下文。
        </p>

        <pre><code className="language-swift">{`@main
struct TodoApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: TodoItem.self)
    }
}`}</code></pre>

        <h2>Step 3：查询数据</h2>
        <p>
          在 SwiftUI View 中使用 <code>@Query</code> 宏，
          它会自动监听数据变化并刷新视图。
        </p>

        <pre><code className="language-swift">{`struct TodoListView: View {
    @Query(sort: \\TodoItem.createdAt, order: .reverse) 
    var items: [TodoItem]
    
    var body: some View {
        List(items) { item in
            TodoRow(item: item)
        }
    }
}`}</code></pre>

        <h2>Step 4：增删改查</h2>
        <p>
          通过 <code>@Environment(\.modelContext)</code> 获取上下文，
          然后执行插入、删除、保存操作。
        </p>

        <pre><code className="language-swift">{`struct TodoRow: View {
    @Bindable var item: TodoItem
    @Environment(\\.modelContext) private var context
    
    var body: some View {
        HStack {
            Toggle("", isOn: $item.isCompleted)
            Text(item.title)
                .strikethrough(item.isCompleted)
            Spacer()
            Button("删除") {
                context.delete(item)
            }
        }
    }
}

struct AddTodoView: View {
    @Environment(\\.modelContext) private var context
    @State private var title = ""
    
    func addTodo() {
        let newItem = TodoItem(title: title)
        context.insert(newItem)
        try? context.save()
    }
}`}</code></pre>

        <TipBox type="warning" title="不要忘记 save">
          SwiftData 会自动追踪已插入/删除对象的变更，但显式调用 <code>context.save()</code> 能确保数据立即写入磁盘。
          如果只依赖自动保存，可能在 App 异常退出时丢失最近的操作。
        </TipBox>

        <h2>下一步挑战</h2>
        <ul>
          <li>给 TodoItem 添加分类（Category），建立一对多关系</li>
          <li>实现按完成状态筛选的查询</li>
          <li>给列表添加搜索功能</li>
          <li>尝试数据迁移（Model Migration）</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/swiftdata/intro"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← SwiftData 入门
        </Link>
        <Link
          to="/swift"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          返回 Swift 总览 →
        </Link>
      </div>
    </div>
  );
}
