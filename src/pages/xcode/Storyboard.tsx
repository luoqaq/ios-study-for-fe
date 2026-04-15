import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Storyboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔨 可视化界面：Storyboard</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        前端没有这么爽的东西：用鼠标把界面“画”出来。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🖼️"
          title="所见即所得的 XML 描述文件"
          description="如果你打开过 Android Studio，那你会非常熟悉。Storyboard（故事板）或者 XIB（单个界面文件）本质上是一个巨大的 XML 文件。但 Xcode 为它提供了一个超级强大的可视化编辑器（Interface Builder）。"
          frontend-ref="这就像你不用写 HTML 和 CSS，只需要从左下角的组件库里拖一个 <code>&lt;button&gt;</code> 到屏幕中间，然后在右边的属性面板里把背景色改成蓝色。而更神奇的是，你能用鼠标从按钮拉一根线到你的 JS 代码里绑定点击事件！"
        />

        <h2>1. 认识 Interface Builder</h2>
        <p>
          在 Xcode 左侧的目录里，点击 <code>Main.storyboard</code> 文件。如果你的项目是按 SwiftUI 创建的，那就没有这个文件。<br/>
          稍等几秒钟渲染，你就会看到一个巨大的白色手机屏幕（画布），这就代表着你的 <code>ViewController</code>。
        </p>

        <p>
          按下快捷键 <code>⇧ + ⌘ + L</code>（或者点击右上角的 <code>+</code> 号），会弹出一个悬浮的<strong>组件库 (Object Library)</strong>。你可以从中拖拽 <code>Label</code>（文本）、<code>Button</code>（按钮）、<code>TextField</code>（输入框）、<code>ImageView</code>（图片）到白色的画布上。
        </p>

        <p>选中一个组件，按下 <code>⌥ + ⌘ + 0</code> 打开右侧的<strong>属性检查器 (Attributes Inspector)</strong>。在这里你可以设置文字内容、字体大小、文字颜色、背景色。这就像是在写内联的 CSS 样式。</p>

        <h2>2. 连线：代码与界面的桥梁 (Outlet 和 Action)</h2>
        <p>
          在前端，如果你要在 JS 里获取到这个 <code>&lt;button id="myBtn"&gt;</code>，你会写 <code>document.getElementById('myBtn')</code>。<br/>
          在 iOS 原生开发中，你不需要写获取元素的代码，因为 Xcode 提供了一个非常神奇的“魔法线”。
        </p>

        <ol>
          <li>按住键盘上的 <code>Option (⌥)</code> 键，然后点击左侧的 <code>ViewController.swift</code> 文件。这会让屏幕分成左右两半：左边是 Storyboard 画布，右边是你的代码文件（这叫 Assistant Editor 助理编辑器）。</li>
          <li><strong>属性绑定 (Outlet)：</strong> 按住 <code>Control (⌃)</code> 键，然后用鼠标把画布上的一个 Label 拖拽到你的代码 <code>class</code> 括号内部。松手，弹框提示你输入变量名（比如 <code>titleLabel</code>）。</li>
          <li><strong>事件绑定 (Action)：</strong> 按住 <code>Control (⌃)</code> 键，把一个 Button 拖拽到你的代码里（但要在普通方法外面）。松手，选择 <code>Action</code>，输入方法名（比如 <code>loginBtnTapped</code>）。</li>
        </ol>

        <CodeCompare
          title="连线生成的代码 (Swift)"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`class ViewController: UIViewController {

    // 1. 拖拽 Label 生成的 IBOutlet (弱引用 UI 控件)
    @IBOutlet weak var titleLabel: UILabel!

    // 2. 拖拽 Button 生成的 IBAction (点击事件)
    @IBAction func loginBtnTapped(_ sender: UIButton) {
        
        // 3. 直接在代码里修改刚连线的 UI 控件
        titleLabel.text = "登陆中..."
        titleLabel.textColor = .red
    }
}`}
          rightCode={`// 前端在 DOM 和事件中手动绑定
class ViewController {
    constructor() {
        // 1. document.querySelector (获取节点)
        this.titleLabel = document.getElementById("title");
        this.loginBtn = document.getElementById("loginBtn");
        
        // 2. 绑定事件
        this.loginBtn.addEventListener("click", this.loginBtnTapped.bind(this));
    }
    
    loginBtnTapped(event) {
        // 3. 修改节点属性
        this.titleLabel.innerText = "登陆中...";
        this.titleLabel.style.color = "red";
    }
}`}
        />

        <TipBox type="info" title="连线断了会怎样？">
          如果你在代码里不小心把 <code>@IBAction func loginBtnTapped</code> 删了，或者改了个名字，但 Storyboard 里还留着那根线。当你运行点击按钮时，程序会直接报错崩溃 (<code>unrecognized selector sent to instance</code>)。所以，改名必须先去画布里把原来的线点叉号删掉，再重新拉一遍。
        </TipBox>

        <h2>3. 约束布局 (Auto Layout)</h2>
        <p>在前端，如果你想把一个按钮居中，你会用 Flexbox：<code>justify-content: center; align-items: center;</code>。<br/>
        如果你在 Storyboard 里直接把按钮拖到屏幕中间，换个大屏手机，按钮的位置就不对了（因为拖拽是绝对定位）。</p>

        <p>你需要学会 <strong>Auto Layout（自动布局约束）</strong>：</p>
        <ol>
          <li>选中那个按钮。</li>
          <li>点击画布右下角一排小图标中间的 <strong>Align（对齐）</strong> 图标。</li>
          <li>勾选 <code>Horizontally in Container</code> 和 <code>Vertically in Container</code>。</li>
          <li>点击 <strong>Add 2 Constraints</strong>。</li>
        </ol>
        <p>你的按钮现在被加上了两根线（蓝色的辅助线），不论是 iPhone SE 还是 iPad，它都会死死地固定在屏幕正中央。</p>

        <h2>现代开发的选择</h2>
        <p>如今很多大厂团队不再使用 Storyboard，因为 XML 合并代码冲突非常痛苦，而且在组件复用上不如代码灵活。他们会选择手写 UI（比如使用 <code>Masonry / SnapKit</code> 这种纯代码约束库），或者直接拥抱完全代码化的 <code>SwiftUI</code>。</p>
        <p>但对于新手学习坐标系、理解生命周期，Storyboard 绝对是最直观、最能带来成就感的途径。</p>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/xcode/debugging"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 调试技巧
        </Link>
        <Link
          to="/xcode/build-run"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：构建与运行 →
        </Link>
      </div>
    </div>
  );
}