import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function CrashSymbolication() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">💥 崩溃定位与符号化</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        线上崩溃堆栈全是十六进制地址？学会符号化，才能真正定位问题根因。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端报错时，浏览器控制台直接给出文件名、行号、调用栈。
          iOS 发布到 App Store 后，用户设备上的崩溃日志默认是<strong>未符号化</strong>的，
          你看到的是内存地址，比如 <code>0x1002345a0</code>，必须通过 <strong>dSYM</strong> 文件翻译回函数名和行号。
        </p>

        <h2>常见崩溃类型</h2>
        <ul>
          <li><strong>EXC_BAD_ACCESS：</strong> 访问了已释放的内存（野指针）。前端没有指针概念，但类似“访问了一个已经 unmount 的组件引用”。</li>
          <li><strong>EXC_BAD_INSTRUCTION：</strong> 执行了非法指令，常见于 Swift 的强制解包失败、数组越界。</li>
          <li><strong>Signal SIGABRT：</strong> 程序被系统或第三方库主动终止，常见于断言失败、资源不足。</li>
          <li><strong>主线程卡死（Watchdog）：</strong> 主线程被阻塞超过一定时间，系统强制杀死 App。</li>
        </ul>

        <h2>什么是符号化（Symbolication）</h2>
        <p>
          编译 Release 版本时，编译器会把函数名、文件名、行号等信息剥离出来，单独生成一个 <strong>dSYM（debug symbols）</strong> 文件。
          崩溃日志里的地址 + dSYM = 人类可读的调用栈。
        </p>

        <TipBox type="warning" title="dSYM 必须和崩溃版本严格对应">
          每次构建生成的 dSYM 都是唯一的。如果丢失了某个版本的 dSYM，那个版本的崩溃日志就再也无法符号化。建议接入 CI 自动归档 dSYM。
        </TipBox>

        <h2>符号化的三种方式</h2>

        <h3>1. Xcode 自动符号化</h3>
        <p>
          如果崩溃来自 TestFlight 或已连接的设备，Xcode 的 Organizer → Crashes 面板会自动尝试符号化
          （前提是你本地有对应的 dSYM 或已开启 Bitcode 重编译）。
        </p>

        <h3>2. 命令行 symbolicatecrash</h3>
        <p>
          Apple 提供了 <code>symbolicatecrash</code> 工具，可以把原始崩溃日志和 dSYM 一起处理：
        </p>
        <pre><code>export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
/Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources/symbolicatecrash crashlog.crash MyApp.app.dSYM &gt; output.log</code></pre>

        <h3>3. 第三方崩溃平台</h3>
        <p>
          生产环境通常接入第三方崩溃统计平台，如 Firebase Crashlytics、Bugly、Sentry 等。
          这些平台要求你上传 dSYM，之后它们会自动帮你符号化线上崩溃。
        </p>

        <h2>崩溃排查流程</h2>
        <ol>
          <li>收集崩溃日志（Xcode Organizer / 第三方平台 / 用户导出）</li>
          <li>确认 App 版本和对应的 dSYM 是否存在</li>
          <li>符号化，获得可读调用栈</li>
          <li>定位崩溃线程和最后执行的函数</li>
          <li>结合代码分析根因（内存管理、线程安全、空值解包等）</li>
          <li>修复后在相同设备/系统版本上验证</li>
        </ol>

        <TipBox type="info" title="保留现场的技巧">
          如果崩溃很难复现，可以在代码关键路径添加更多日志和断言，下一次发版后通过日志反推崩溃时的上下文状态。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/instruments-case"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Instruments 性能优化案例
        </Link>
        <Link
          to="/advanced/architecture"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：架构选型 →
        </Link>
      </div>
    </div>
  );
}
