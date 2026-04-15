import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Debugging() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔨 调试技巧</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从 console.log 到 LLDB，掌握底层的魔法。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🐛"
          title="不再是满屏幕的 console.log"
          description="虽然你依然可以使用 `print()` 或者 `NSLog()`，但 Xcode 提供的断点（Breakpoint）、LLDB 命令台和 View Hierarchy 3D 视图层级查看器，是你排查复杂原生问题的神器。"
          frontend-ref="这是把 VS Code 的 Debug 侧边栏和 Chrome 的 Elements / Console 结合到了极致的体验。"
        />

        <h2>1. 打个断点 (Breakpoint)</h2>
        <p>
          和在 VS Code 里一样，点击代码行号左侧的边缘，就会出现一个蓝色的箭头（断点）。<br/>
          当你的 App 在模拟器运行到这一行时，整个世界会 <strong>暂停</strong>，然后你会看到 Xcode 下方弹出了两个区域：
        </p>

        <ul>
          <li><strong>左边 (Variables View)：</strong>列出了当前作用域内所有可用的变量，包括 <code>self</code>。你可以展开 <code>self</code> 查看它里面所有的属性和指针地址。</li>
          <li><strong>右边 (Console)：</strong>这是你能输入指令的地方，这里运行的不是 JS 引擎，而是苹果的底层调试器 <strong>LLDB</strong>。</li>
        </ul>

        <h2>2. LLDB：强大的终端控制台</h2>
        <p>
          在 Chrome Console 里，你会打出一个变量名，然后按回车看看它是什么对象。<br/>
          在 LLDB 里，最常用的两个命令是 <code>po</code> (Print Object) 和 <code>p</code> (Print)。
        </p>

        <CodeCompare
          title="控制台命令对应"
          leftLang="bash"
          rightLang="javascript"
          leftCode={`# 在 LLDB 提示符 (lldb) 后输入：

# 1. 打印一个对象 (比如某个 Array) 的详细信息
(lldb) po myFruitsArray
<__NSArrayI 0x6000000abcde>(
Apple,
Banana
)

# 2. 打印基本数据类型 (比如 Int)
(lldb) p self.age
(NSInteger) $1 = 25

# 3. 强行改变变量的值 (不改代码直接验证 bug!)
(lldb) expr self.age = 30`}
          rightCode={`// 在 Chrome DevTools Console 输入：

// 1. 打印对象
> myFruitsArray
(2) ['Apple', 'Banana']



// 2. 打印变量
> this.age
25

// 3. 修改变量
> this.age = 30
30`}
        />

        <TipBox type="tip" title="不用重新编译就能看效果！">
          使用 <code>expr</code> (Evaluate Expression) 命令，你可以在程序暂停时，直接执行一行完整的 Swift/OC 代码。<br/>
          比如 <code>expr self.view.backgroundColor = .red</code>，然后再按继续播放（Continue），你会发现你的界面真的变成红色了，而不需要花 1 分钟重新 <code>⌘ + R</code> 编译！
        </TipBox>

        <h2>3. 异常断点 (Exception Breakpoint)</h2>
        <p>
          有没有遇到过这种情况：App 突然闪退了，但控制台只打印了一句不知所云的 <code>libc++abi.dylib: terminating with uncaught exception</code>，代码直接跳到了 <code>main.m</code> 文件里？<br/>
          在前端，未捕获异常通常会在 Console 报红，你还能点开堆栈。但在 iOS 里，由于是底层崩溃，普通断点拦截不住。
        </p>

        <ol>
          <li>打开左侧的 Breakpoint Navigator（快捷键 <code>⌘ + 8</code>）。</li>
          <li>点击左下角的 <strong>+</strong> 号。</li>
          <li>选择 <strong>Exception Breakpoint...</strong>。</li>
        </ol>

        <p>加上这个全局异常断点后，下次 App 要崩溃的 <strong>那一瞬间</strong>，Xcode 就会暂停，并精准停在你写错的那行代码上（比如数组越界）。它是你修 Crash 的第一道防线。</p>

        <h2>4. View Hierarchy：3D UI 调试器</h2>
        <p>
          如果你想知道为什么你的按钮点不到？是不是被一个透明的 <code>UIView</code> 挡住了？<br/>
          在 Chrome 里，你会打开 Elements，用那个箭头小标图标（Inspect）在网页上点来点去。
        </p>
        <p>
          在 Xcode 里，当 App 运行在屏幕上时，点击下方调试栏的一个像三层叠纸一样的图标（<strong>Debug View Hierarchy</strong>）。<br/>
          你的 App 瞬间会被拆解成 3D 模型！你可以按住鼠标左键旋转你的界面层级，清清楚楚地看到谁在最上面，谁的长宽不对。在左侧的树状列表里选中，右侧的检查器还会告诉你它的 <code>frame</code> 坐标。
        </p>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/xcode/simulator"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 模拟器
        </Link>
        <Link
          to="/xcode/storyboard"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：Storyboard →
        </Link>
      </div>
    </div>
  );
}