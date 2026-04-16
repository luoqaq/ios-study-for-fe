import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import CompareTable from "@/components/CompareTable";
import TipBox from "@/components/TipBox";

export default function StateBinding() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 状态与绑定</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        React 有 useState，Vue 有 ref()，SwiftUI 有 @State。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="⚡️"
          title="数据驱动视图"
          description="使用 `@State` 标记的变量发生改变时，框架会自动找出哪些 View 用到了它，并仅仅触发那部分的重新渲染（Re-evaluation）。"
          frontend-ref="和 React 的 `useState` 核心概念一模一样：UI 是状态的一面镜子。"
        />

        <h2>@State：属于自己的状态</h2>
        <p>
          在 SwiftUI 中，<code>View</code> 是一个 <code>struct</code>（值类型），一旦创建，它自己是不可变的！那怎么让界面“动”起来呢？<br/>
          苹果设计了 <code>@State</code> 属性包装器。你是在告诉框架：“请帮我把这个变量存到框架的堆内存里，每次我改了它，你重新调用一次我的 <code>body</code> 给我画个新界面出来。”
        </p>

        <CodeCompare
          title="Counter 计数器"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// SwiftUI
struct CounterView: View {
    // 状态定义（通常是 private）
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("当前计数: \\(count)")
            
            Button("点我加 1") {
                // 直接修改，View 就会重新渲染
                count += 1
            }
        }
    }
}`}
          rightCode={`// React
import { useState } from 'react';

function CounterView() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <p>当前计数: {count}</p>
      
      <button onClick={() => setCount(count + 1)}>
        点我加 1
      </button>
    </div>
  );
}`}
        />

        <TipBox type="tip" title="不用写 setState()">
          和 React 不同，由于 Swift 有属性拦截（Property Wrapper），你不需要调用 <code>setCount</code>。你直接 <code>count += 1</code>，框架在底层 setter 中帮你截获并触发了重渲染。
        </TipBox>

        <h2>@Binding：双向绑定 (把状态借给别人)</h2>
        <p>
          在 React 中，如果子组件要修改父组件的状态，你需要把 <code>count</code> 和 <code>setCount</code> 两个东西当做 <code>props</code> 传下去。
          在 SwiftUI 中，你可以直接传一个“指针”（在 Swift 中叫 Binding）。
        </p>

        <CodeCompare
          title="父子组件通信 (@Binding 传值)"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// 子组件 (Toggle 需要一个能够被修改的布尔值)
struct ChildView: View {
    // 我没有自己的状态，我接收别人的
    @Binding var isOn: Bool
    
    var body: some View {
        // Toggle (开关) 会自动修改绑定的值
        Toggle("是否开启", isOn: $isOn)
    }
}

// 父组件
struct ParentView: View {
    // 真正的状态在这里
    @State private var isOn = false
    
    var body: some View {
        VStack {
            // 给子组件传值时，用 $ 符号！
            ChildView(isOn: $isOn)
            
            Text("当前状态: \\(isOn ? "开" : "关")")
        }
    }
}`}
          rightCode={`// React 的等价实现
function ChildView({ isOn, onToggle }) {
  return (
    <label>
      是否开启
      <input 
        type="checkbox" 
        checked={isOn} 
        onChange={e => onToggle(e.target.checked)} 
      />
    </label>
  );
}

function ParentView() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      {/* 必须把 setter 传下去 */}
      <ChildView isOn={isOn} onToggle={setIsOn} />
      <p>当前状态: {isOn ? "开" : "关"}</p>
    </div>
  );
}`}
        />

        <TipBox type="warning" title="$ 符号的奥秘">
          这是最容易搞混的地方：<br/>
          如果你只是想<strong>读取</strong>，不需要修改，你传 <code>count</code>。<br/>
          如果你需要<strong>修改</strong>，你想传一个“引用/通道”给别人，你在变量前面加 <code>$</code>（比如 <code>$count</code>）。
          在底层，<code>$count</code> 返回的就是一个 <code>Binding</code> 结构体！
        </TipBox>

        <h2>SwiftUI 数据流总结表</h2>
        <CompareTable
          headers={['场景', 'SwiftUI', 'React', 'Vue']}
          rows={[
            ['组件内部私有状态', '`@State`', '`useState`', '`ref()` / `reactive()`'],
            ['父组件把状态借给子组件修改', '`@Binding` (传 `$value`)', '传递 setter 回调', '`v-model`'],
            ['传递大量嵌套的层级数据', '`@Environment`', '`Context / useContext`', '`provide / inject`'],
            ['全局可观察对象 (如 Redux/Vuex)', '`@ObservedObject` (Observable)', 'Redux / Zustand', 'Pinia / Vuex'],
          ]}
        />
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/swiftui/intro"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← SwiftUI 简介
        </Link>
        <Link
          to="/swift/swiftui/navigation"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：SwiftUI 路由 →
        </Link>
      </div>
    </div>
  );
}
