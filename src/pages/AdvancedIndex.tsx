import { Link } from "react-router-dom";
import ConceptCard from "@/components/ConceptCard";

export default function AdvancedIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">高级进阶</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从"能写页面"走向"能设计工程、排查问题、治理性能与稳定性"。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <ConceptCard
          emoji="🚀"
          title="这一层解决的是工程问题"
          description="到了高级阶段，卡人的不再是某个 API 不会写，而是系统性的工程判断：为什么启动慢？为什么线上崩溃复现不了？老项目架构怎么治？"
          frontend-ref="类似前端从写页面走向工程化：Webpack 优化、性能监控、错误治理、CI/CD 和微前端架构。"
        />

        <h2>高级进阶学习地图</h2>

        <h3>性能与稳定性</h3>
        <ul>
          <li><Link to="/advanced/instruments">Instruments 入门</Link>：Time Profiler、Allocations、Network</li>
          <li><Link to="/advanced/instruments-case">Instruments 性能优化案例</Link>：真实场景的排查与优化流程</li>
          <li><Link to="/advanced/launch-optimization">启动优化</Link>：Pre-main、Main 阶段分析与提速</li>
          <li><Link to="/advanced/crash-symbolication">崩溃定位与符号化</Link>：从崩溃日志到根因定位</li>
        </ul>

        <h3>架构与工程化</h3>
        <ul>
          <li><Link to="/advanced/architecture">架构选型</Link>：MVC / MVVM / MVP / VIPER / TCA</li>
          <li><Link to="/advanced/persistence">持久化与缓存基础</Link>：UserDefaults、Keychain、FileManager、Core Data</li>
          <li><Link to="/advanced/network-layer">网络层封装</Link>：请求拦截、错误统一处理、缓存策略</li>
          <li><Link to="/advanced/gcd-practical">多线程与 GCD 实战</Link>：队列、栅栏、信号量、死锁排查</li>
          <li><Link to="/advanced/core-animation">Core Animation</Link>：CALayer、隐式动画、性能优化</li>
          <li><Link to="/advanced/security">App 安全</Link>：代码混淆、反调试、密钥保护、安全审计</li>
        </ul>

        <h3>测试与发布</h3>
        <ul>
          <li><Link to="/advanced/testing">单元测试与 UI 测试</Link>：XCTest、XCUITest、Mock、覆盖率</li>
          <li><Link to="/advanced/distribution">签名、打包与发布</Link>：证书、Provisioning Profile、TestFlight</li>
          <li><Link to="/advanced/appstore-review">App Store 审核避坑</Link>：常见拒审原因与应对策略</li>
          <li><Link to="/advanced/publish-end-to-end">从零发布一个 App</Link>：从开发到上架的端到端流程</li>
          <li><Link to="/advanced/ios18-adaptation">iOS 18 适配要点</Link>：新 API、隐私清单、兼容性处理</li>
        </ul>

        <h3>系统能力与扩展</h3>
        <ul>
          <li><Link to="/advanced/webview">WKWebView 与 JS 交互</Link>：原生与 H5 的通信桥梁</li>
          <li><Link to="/advanced/notifications">推送通知与本地通知</Link>：APNs、权限请求、通知内容扩展</li>
          <li><Link to="/advanced/photos-camera">相册与相机权限处理</Link>：UIImagePicker、PHPhotoLibrary、隐私合规</li>
          <li><Link to="/advanced/mapkit">MapKit 与定位服务</Link>：地图标注、轨迹绘制、定位精度</li>
          <li><Link to="/advanced/widget">Widget 与 App Extension</Link>：小组件开发、Timeline、数据共享</li>
          <li><Link to="/advanced/healthkit">HealthKit 与运动数据</Link>：健康数据读写、Workouts</li>
          <li><Link to="/advanced/arkit">ARKit 入门</Link>：空间追踪、平面检测、虚实结合</li>
          <li><Link to="/advanced/sirikit">SiriKit 与 Shortcuts</Link>：语音意图、快捷指令集成</li>
          <li><Link to="/advanced/ipad-multitasking">iPad 多窗口与多任务</Link>：Scene、分屏、Slide Over</li>
          <li><Link to="/advanced/watchkit">WatchKit 与 watchOS</Link>：手表 App、Complications、Health</li>
          <li><Link to="/advanced/app-clip">App Clip 轻应用</Link>：轻量入口、快速体验、无缝跳转</li>
        </ul>

        <h2>建议学习顺序</h2>
        <p>
          如果你是刚完成 UIKit / Swift 模块的开发者，建议先从{" "}
          <Link to="/advanced/persistence">持久化与缓存基础</Link> 和{" "}
          <Link to="/advanced/network-layer">网络层封装</Link> 开始，
          逐步过渡到性能和稳定性专题。
          如果你有明确的业务场景（比如要做推送、地图、小组件），可以直接跳到对应专题。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← OC 维护
        </Link>
        <Link
          to="/advanced/persistence"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          从持久化基础进入 →
        </Link>
      </div>
    </div>
  );
}
