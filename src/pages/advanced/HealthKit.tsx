import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function HealthKit() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">❤️ HealthKit 与运动数据</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        接入苹果健康生态，读取和写入用户的健康与运动数据。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端网页无法直接访问设备的传感器和健康数据。
          iOS 通过 <strong>HealthKit</strong> 为 App 提供了一个统一的健康数据仓库，
          涵盖步数、心率、睡眠、体温、卡路里等多种指标。
        </p>

        <h2>HealthKit 的核心概念</h2>
        <ul>
          <li><strong>HKHealthStore：</strong> 所有 HealthKit 操作的入口，类似数据库连接池</li>
          <li><strong>HKQuantityType：</strong> 可量化的数据类型，如步数、距离、心率</li>
          <li><strong>HKCategoryType：</strong> 分类数据，如睡眠分析、月经记录</li>
          <li><strong>HKSample：</strong> 一条具体的数据记录，包含值、类型和时间范围</li>
        </ul>

        <h2>严格的权限模型</h2>
        <p>
          HealthKit 数据属于高度敏感的个人隐私，苹果有极其严格的审核和权限控制：
        </p>
        <ul>
          <li>必须在 Info.plist 中明确声明读取/写入的数据类型和用途</li>
          <li>用户可以对每种数据类型分别授权或拒绝</li>
          <li>App 不能读取未明确请求授权的数据类型</li>
          <li>健康类 App 的审核周期通常更长</li>
        </ul>

        <TipBox type="warning" title="不要随便申请用不到的权限">
          如果你申请了读取心率但 App 里根本没有心率相关功能，审核大概率会被拒。
          只申请你真实需要的数据类型。
        </TipBox>

        <h2>常见应用场景</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>关键数据类型</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>运动健身 App</td><td>步数、跑步距离、活跃卡路里</td></tr>
            <tr><td>睡眠监测</td><td>睡眠分析、心率、血氧</td></tr>
            <tr><td>饮食管理</td><td>膳食能量、碳水化合物、蛋白质</td></tr>
            <tr><td>医疗健康</td><td>体温、血压、血糖（需医疗器械资质）</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/widget"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Widget 与 Extension
        </Link>
        <Link
          to="/advanced/arkit"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：ARKit →
        </Link>
      </div>
    </div>
  );
}
