import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Intro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🚀 SwiftUI 简介</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        苹果给前端开发者的一份大礼。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="⚛️"
          title="和 React 相同的精神：View = f(State)"
          description="抛弃了命令式编程（我要在这个坐标画个矩形，然后设置颜色，再添加到屏幕上），转向了声明式编程（我需要一个红色的矩形在这里）。状态变了，UI 自动重新计算并更新。"
          frontend-ref="非常接近 React 函数式组件 (Functional Component) 的思想。"
        />

        <h2>为什么前端会觉得 SwiftUI 亲切？</h2>
        <p>
          在 UIKit 的时代，如果你要写一个居中的红色文字标签，你需要：<br/>
          <code>UILabel *lbl = [[UILabel alloc] init];</code><br/>
          <code>lbl.text = @"Hello";</code><br/>
          <code>lbl.textColor = [UIColor redColor];</code><br/>
          <code>lbl.textAlignment = NSTextAlignmentCenter;</code><br/>
          <code>[self.view addSubview:lbl];</code><br/>
          最后，你还得自己去算坐标 <code>frame</code> 或者是写天书一样的 AutoLayout 代码把她居中。
        </p>

        <p>
          在 SwiftUI 中，由于 Swift 语言引入了强大的 <code>@resultBuilder</code>（结果构造器）语法糖，你能用几乎像 HTML 一样的缩进层次，直接把界面搭出来：
        </p>

        <CodeCompare
          title="搭积木一样的 UI 代码"
          leftLang="swift"
          rightLang="tsx"
          leftCode={`// SwiftUI
struct ContentView: View {
    // body 必须返回 "某个符合 View 协议的东西"
    var body: some View {
        // VStack = 垂直排列 (类似 flex-col)
        VStack(spacing: 20) {
            Text("Hello, iOS!")
                .font(.largeTitle)
                .foregroundColor(.red)
                
            Button("Click Me") {
                print("Clicked")
            }
            .padding()
            .background(Color.blue)
            .cornerRadius(10)
            .foregroundColor(.white)
        }
    }
}`}
          rightCode={`// React JSX
function ContentView() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-4xl text-red-500">
        Hello, iOS!
      </h1>
      
      <button 
        onClick={() => console.log("Clicked")}
        className="p-4 bg-blue-500 rounded-lg text-white"
      >
        Click Me
      </button>
    </div>
  );
}`}
        />

        <TipBox type="info" title="链式调用是真正的“修改器 (Modifier)”">
          注意 SwiftUI 里的点语法 <code>.padding().background()</code>。它们不是修改了原来的 <code>Button</code>，而是返回了一个全新的、包裹了新属性的 <code>View</code>（因为 Struct 是值类型）！这和 React 里通过给 Component 外面套各种 <code>&lt;div style=...&gt;</code> 是一个道理。
        </TipBox>

        <h2>三大布局容器 (VStack / HStack / ZStack)</h2>
        <p>如果你熟悉 CSS Flexbox，理解 SwiftUI 的布局简直秒懂：</p>
        <ul>
          <li><strong>VStack (Vertical Stack)：</strong> 垂直排列。等价于 <code>display: flex; flex-direction: column;</code></li>
          <li><strong>HStack (Horizontal Stack)：</strong> 水平排列。等价于 <code>display: flex; flex-direction: row;</code></li>
          <li><strong>ZStack (Z-Axis Stack)：</strong> 沿 Z 轴层叠（像千层饼一样）。等价于 <code>position: absolute;</code> 把几个元素叠放在一起（比如把文字叠在图片上面）。</li>
        </ul>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/swift/advanced/combine"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Combine 响应式编程
        </Link>
        <Link
          to="/swift/swiftui/state-binding"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：状态与绑定 →
        </Link>
      </div>
    </div>
  );
}