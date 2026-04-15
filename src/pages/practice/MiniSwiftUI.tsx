import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function MiniSwiftUI() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">
        💻 实战 4：SwiftUI 体验
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        欢迎来到声明式 UI 的世界，这才是前端的舒适区。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>📋 需求描述</h2>
        <p>
          如果你觉得前面三个案例里的 UIKit 那些 <code>add()</code>、
          <code>reloadData()</code> 实在太啰嗦， 那么这就是你想要的。我们用
          SwiftUI 重写一个简单的计数器（Counter）加上数据绑定。
        </p>

        <h2>前端视角：React Hooks 既视感</h2>
        <p>
          SwiftUI 的设计理念与 React 惊人的一致：
          <strong>
            UI 是状态（State）的函数。<code>View = f(State)</code>
          </strong>
          。
        </p>
        <ul>
          <li>
            <strong>函数式组件：</strong> SwiftUI 的 View 是 <code>struct</code>
            （值类型），而不是继承自 <code>UIView</code> 的笨重类。非常轻量。
          </li>
          <li>
            <strong>
              <code>@State</code> 对应 <code>useState</code>：
            </strong>{" "}
            当状态改变时，SwiftUI 会自动重新计算并渲染关联的视图。
          </li>
          <li>
            <strong>
              <code>@Binding</code> 对应父子组件通信：
            </strong>{" "}
            将父级的状态传给子级并允许子级修改，而不需要一层层传回调函数。
          </li>
        </ul>

        <h2>🎯 核心代码实现</h2>

        <TipBox type="info" title="再也没有繁琐的代码">
          不需要手动查找节点、不需要 <code>frame</code> 计算布局、不需要{" "}
          <code>addSubview</code>、不需要代理。只要描述你想要的 UI
          结构，并且绑定数据即可。
        </TipBox>

        <h3>1. 计数器组件</h3>

        <CodeCompare
          title="声明式 UI 结构"
          leftTitle="SwiftUI (Struct)"
          rightTitle="React (Function Component)"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`import SwiftUI

struct CounterView: View {
    // 状态定义 (类似 useState)
    @State private var count = 0
    
    // UI 描述结构 (必须返回 some View)
    var body: some View {
        VStack(spacing: 20) {
            Text("当前计数: \\(count)")
                .font(.largeTitle)
            
            HStack {
                Button("减 1") { count -= 1 }
                    .buttonStyle(.bordered)
                
                Button("加 1") { count += 1 }
                    .buttonStyle(.borderedProminent)
            }
        }
        .padding()
    }
}`}
          rightCode={`import { useState } from 'react';

export default function Counter() {
  // 状态定义
  const [count, setCount] = useState(0);

  // UI 描述 (JSX)
  return (
    <div className="flex flex-col gap-5 p-4">
      <h1 className="text-3xl">当前计数: {count}</h1>
      
      <div className="flex gap-4">
        <button onClick={() => setCount(c => c - 1)} className="btn">
          减 1
        </button>
        <button onClick={() => setCount(c => c + 1)} className="btn-primary">
          加 1
        </button>
      </div>
    </div>
  );
}`}
        />

        <h3>2. 列表渲染</h3>
        <p>
          在 UIKit 里写几十行代码的 <code>UITableView</code>，在 SwiftUI
          中只需要一个 <code>List</code> 容器。
        </p>

        <CodeCompare
          title="列表的声明式写法"
          leftTitle="SwiftUI (List / ForEach)"
          rightTitle="React (Array.map)"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`struct TodoList: View {
    @State private var todos = ["买菜", "写代码", "健身"]
    
    var body: some View {
        NavigationView {
            List {
                // 等同于 map 渲染 (id: \\.self 类似 key)
                ForEach(todos, id: \\.self) { todo in
                    Text(todo)
                }
                .onDelete(perform: delete) // 自带侧滑删除！
            }
            .navigationTitle("待办事项")
        }
    }
    
    // 删除逻辑
    func delete(at offsets: IndexSet) {
        todos.remove(atOffsets: offsets)
    }
}`}
          rightCode={`function TodoList() {
    const [todos, setTodos] = useState(["买菜", "写代码", "健身"]);
    
    // ...
    
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo}>
                    {todo}
                    {/* React 中需要自己手写滑动删除逻辑和样式 */}
                </li>
            ))}
        </ul>
    );
}`}
        />

        <h2>结语</h2>
        <p>
          如果你是刚入行 iOS 开发的前端，
          <strong>SwiftUI 是你最好的切入点</strong>
          。它让你立刻能利用现有的组件化思想和数据流理念，从而快速搭建出现代化的
          App 界面。但是，遇到历史包袱或者极端复杂的定制需求时，你仍然需要回到
          UIKit，这就是为什么我们要在前面的章节打牢基础。
        </p>
      </div>
    </div>
  );
}
