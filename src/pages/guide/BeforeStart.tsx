import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";
import CompareTable from "@/components/CompareTable";

export default function BeforeStart() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">开始之前</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        心智模型转换：从前端浏览器到 iOS 原生环境。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>前端同学学习 iOS 的核心优势</h2>
        <p>你已经是一名开发者，这意味着：</p>
        <ul>
          <li>
            <strong>逻辑思维：</strong>{" "}
            变量、循环、分支、函数对你来说都是小儿科。
          </li>
          <li>
            <strong>UI 理念：</strong>{" "}
            你懂视图树（DOM）、事件驱动和布局（Flexbox / CSS）。
          </li>
          <li>
            <strong>网络与数据：</strong> 你熟悉异步请求、JSON
            数据解析和状态管理。
          </li>
        </ul>
        <p>
          只要能将 iOS
          中的对应概念与你脑中的前端模型建立联系，你就能迅速掌握开发思路。
        </p>

        <ConceptCard
          emoji="🧠"
          title="心智转换的核心"
          description="将解释型的动态语言和单线程的浏览器环境，切换为编译型的静态语言和底层系统级的掌控权。"
        />

        <h2>环境与语言特性对比</h2>

        <h3>1. 动态类型 vs 静态类型</h3>
        <p>
          在 JavaScript
          中，变量没有固定类型，你可以随时将一个字符串赋值给数字变量。 而在 iOS
          (Objective-C/Swift)
          中，变量必须在声明时确定类型（通过显式声明或类型推断）。
        </p>
        <p>
          如果你有使用 <strong>TypeScript</strong> 的经验，这一转变将毫不费力。
        </p>

        <h3>2. 内存管理：垃圾回收 vs 自动引用计数</h3>
        <p>
          JavaScript 引擎（如 V8）使用垃圾回收机制（Garbage
          Collection）自动清理不再使用的内存。你几乎不用关心内存泄漏（除非遇到闭包陷阱或未清理的定时器）。
        </p>
        <p>
          iOS 使用的是 <strong>ARC（自动引用计数）</strong>：
        </p>
        <ul>
          <li>
            编译器会在编译时，自动在合适的地方插入代码，增加或减少对象的“引用计数”。
          </li>
          <li>当计数降为 0 时，对象立即被销毁。</li>
        </ul>

        <TipBox type="warning" title="循环引用问题">
          由于没有垃圾回收器的“可达性分析”，当对象 A 强引用 B，且 B 也强引用 A
          时，它们的引用计数永远无法归零，导致内存泄漏（Retain Cycle）。
          <br />
          解决方案：将其中一个强引用（strong）改为弱引用（weak）。
        </TipBox>

        <h3>3. 编译运行流程</h3>
        <CompareTable
          headers={["步骤", "Web 前端", "iOS 开发"]}
          rows={[
            ["编写环境", "VS Code / WebStorm", "Xcode / AppCode"],
            ["语言", "JavaScript / TypeScript", "Objective-C / Swift"],
            ["运行方式", "解释执行 / JIT", "提前编译为机器码 (AOT)"],
            [
              "查看效果",
              "浏览器刷新 / 热重载 (HMR)",
              "重新编译，在模拟器或真机启动 App",
            ],
            [
              "调试工具",
              "Chrome DevTools",
              "Xcode LLDB 调试器 / View Hierarchy",
            ],
          ]}
        />

        <h2>环境准备</h2>
        <p>进入 iOS 开发，你需要：</p>
        <ol>
          <li>一台 Mac 电脑（必备）。</li>
          <li>
            在 Mac App Store 下载安装最新版的 <Link to="/starter">Xcode</Link>。
          </li>
          <li>注册一个 Apple ID（免费即可在模拟器或真机上调试）。</li>
        </ol>

        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
          <Link
            to="/roadmap"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            ← 学习路线
          </Link>
          <Link
            to="/roadmap/learning-path"
            className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
          >
            学习路径详解 →
          </Link>
        </div>
      </div>
    </div>
  );
}
