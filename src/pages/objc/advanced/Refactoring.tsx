import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function Refactoring() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🔧 老项目重构策略</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        不是推倒重来，而是小步快跑、逐步替换。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端重构老项目也会遇到类似问题：jQuery 改 React、Class 组件改 Hooks、CommonJS 改 ESM。
          iOS 老项目的重构更谨慎，因为一旦崩溃就是直接闪退，且发版周期比 Web 长得多。
        </p>

        <h2>重构前先回答三个问题</h2>
        <ol>
          <li><strong>为什么要重构？</strong> 是为了性能、可维护性，还是为了引入 Swift/SwiftUI？</li>
          <li><strong>边界在哪里？</strong> 哪些模块必须动，哪些可以保留？</li>
          <li><strong>如何验证正确性？</strong> 有没有足够的测试覆盖，能不能灰度发布？</li>
        </ol>

        <h2>推荐的渐进式重构路径</h2>
        <table>
          <thead>
            <tr>
              <th>阶段</th>
              <th>动作</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1. 防腐层</td><td>先建立清晰的模块边界，新代码不要直接依赖老代码的内部细节</td></tr>
            <tr><td>2. 局部试点</td><td>选一个不复杂但又有代表性的模块先重写，验证流程和工具链</td></tr>
            <tr><td>3. 核心下沉</td><td>把网络层、缓存层、数据模型层先现代化，减少上层改动阻力</td></tr>
            <tr><td>4. 界面替换</td><td>最后动 UI 层，因为 UI 改动最容易被用户感知，也最容易出回归问题</td></tr>
            <tr><td>5. 清理遗产</td><td>等新模块稳定后，逐步删除旧的兼容层和废弃代码</td></tr>
          </tbody>
        </table>

        <h2>OC 项目引入 Swift 的实践经验</h2>
        <ul>
          <li><strong>从独立新模块开始：</strong> 比如写一个纯 Swift 的网络中间件，通过 Bridging Header 暴露给 OC</li>
          <li><strong>保持编译通过：</strong> 每次提交都保证项目能编译、能跑通核心流程</li>
          <li><strong>优先重写工具类：</strong> 工具类没有 UI 生命周期，迁移风险最低</li>
          <li><strong>混合编译时间监控：</strong> OC + Swift 混编会增加编译时间，注意 CI 构建效率</li>
        </ul>

        <TipBox type="warning" title="不要追求一次到位">
          老项目重构最怕“大Rewrite”。几个月不发布主分支，合并时冲突爆炸，回归测试也做不完。
          正确的策略是：每个迭代重构一小块，持续发布，持续验证。
        </TipBox>

        <h2>风险控制清单</h2>
        <ul>
          <li>重构前写好单元测试，重构后跑一遍全量用例</li>
          <li>保留旧实现一段时间，通过 Feature Flag 随时回滚</li>
          <li>使用 Instruments 对比重构前后的性能、内存、启动时间</li>
          <li>关键路径（登录、支付、下单）优先做灰度或 AB 测试</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/bridging"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← OC / Swift 桥接进阶
        </Link>
        <Link
          to="/objc-maintenance"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          返回 OC 维护总览 →
        </Link>
      </div>
    </div>
  );
}
