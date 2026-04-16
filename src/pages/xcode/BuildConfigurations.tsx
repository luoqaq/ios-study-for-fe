import { Link } from "react-router-dom";
import CompareTable from "@/components/CompareTable";

export default function BuildConfigurationsIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Scheme / Build Configuration 深入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        当项目开始区分开发、测试、生产环境时，你需要的不只是能运行工程，而是能控制构建流程。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <CompareTable
          headers={["概念", "你可以先怎么理解"]}
          rows={[
            ["`Scheme`", "当前选中的运行与打包流程组合"],
            ["`Build Configuration`", "一组编译参数与环境差异配置"],
            ["`Debug / Release`", "开发与发布最基础的两套配置"],
          ]}
        />

        <h2>为什么会卡在这里</h2>
        <p>
          一旦项目接入测试环境、预发环境、多包名、多 Target，你就会发现“能跑起来”和“能正确跑到指定环境”是两回事。
        </p>

        <h2>这部分最常见的真实问题</h2>
        <ul>
          <li>明明是测试包，却连到了正式环境</li>
          <li>本地能跑，CI 打包配置不一致</li>
          <li>多个 Target 共享代码但签名和资源不同</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/starter/project-config" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← Info.plist / Target / Scheme
        </Link>
        <Link
          to="/advanced"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          进入高级进阶 →
        </Link>
      </div>
    </div>
  );
}
