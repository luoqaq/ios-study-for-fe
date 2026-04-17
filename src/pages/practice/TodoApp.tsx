import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function TodoApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">💻 实战 1：Todo App</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        这是 iOS 开发的 "Hello World"，教你如何管理基础 UI 与数据。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>📋 需求描述</h2>
        <p>实现一个待办事项应用，包含以下功能：</p>
        <ul>
          <li>展示待办事项列表。</li>
          <li>点击“+”按钮弹出一个输入框，可以添加新的待办事项。</li>
          <li>点击每一项可以标记为完成/未完成。</li>
          <li>支持左滑删除待办事项。</li>
        </ul>

        <h2>前端视角：对应技术栈</h2>
        <p>
          在 React 中，你可能会用 <code>useState</code> 来存储数组，然后用{" "}
          <code>map</code> 渲染出 <code>&lt;li&gt;</code> 列表。在 iOS 中：
        </p>
        <ul>
          <li>
            <strong>数组状态：</strong> 存在 <code>NSMutableArray</code> (OC) 或{" "}
            <code>[String]</code> (Swift) 里。
          </li>
          <li>
            <strong>渲染列表：</strong> 用 <code>UITableView</code>，通过实现{" "}
            <code>DataSource</code> 协议来告诉列表有多少行，每一行显示什么。
          </li>
          <li>
            <strong>组件复用：</strong> <code>UITableViewCell</code>，iOS
            会自动帮你回收不可见的节点，极大地优化内存（前端虚拟列表的鼻祖）。
          </li>
        </ul>

        <h2>🎯 核心代码实现</h2>

        <TipBox type="tip" title="选择你的流派">
          以下展示了使用 UIKit (Objective-C 和 Swift)
          的经典实现方式。如果你对声明式 UI 更感兴趣，可以跳到{" "}
          <Link to="/swift/practice/mini-swiftui">SwiftUI 小项目</Link>。
        </TipBox>

        <h3>1. 数据源与代理协议</h3>
        <p>
          在 iOS 中，列表不需要我们手动写 <code>map</code>
          ，而是通过“代理模式”向我们索要数据。
        </p>

        <CodeCompare
          title="列表的核心实现"
          leftTitle="Swift (UIKit)"
          rightTitle="React (对比)"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`class TodoViewController: UIViewController, UITableViewDataSource {
    var todos = ["买菜", "写代码", "健身"]
    let tableView = UITableView()
    
    // 1. 告诉列表有多少行
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return todos.count
    }
    
    // 2. 告诉列表每一行长什么样
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // 从复用池中取出一个 Cell (虚拟列表核心)
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        
        // 绑定数据
        cell.textLabel?.text = todos[indexPath.row]
        return cell
    }
}`}
          rightCode={`function TodoApp() {
  const [todos, setTodos] = useState(["买菜", "写代码", "健身"]);

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}`}
        />

        <h3>2. 添加数据与刷新</h3>
        <p>
          React 中你调用 <code>setTodos</code>，触发组件重新渲染。但在 iOS
          原生（命令式 UI）中，你需要手动修改数据源，并通知 UI 刷新。
        </p>

        <CodeCompare
          title="添加新任务"
          leftTitle="Swift"
          rightTitle="Objective-C"
          leftLang="swift"
          rightLang="objectivec"
          leftCode={`// 响应添加按钮点击
@objc func addTodo() {
    let newTodo = "新任务"
    
    // 1. 修改数据源
    todos.append(newTodo)
    
    // 2. 命令 UI 刷新
    tableView.reloadData()
}`}
          rightCode={`// 响应添加按钮点击
- (void)addTodo {
    NSString *newTodo = @"新任务";
    
    // 1. 修改数据源
    [self.todos addObject:newTodo];
    
    // 2. 命令 UI 刷新
    [self.tableView reloadData];
}`}
        />

        <h2>下一步挑战</h2>
        <p>
          你可以在 Xcode
          中新建一个项目，尝试将上面的代码补全。接下来，我们将挑战更加复杂的场景：
          <Link to="/advanced/practice/network-app">网络请求与 JSON 解析</Link>。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/practice/collection-view-app"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← CollectionView 电商首页
        </Link>
        <Link
          to="/uikit/practice/tableview-app"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：列表复用与滚动 →
        </Link>
      </div>
    </div>
  );
}
