import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function ARKit() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">👓 ARKit 入门</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        把虚拟内容叠加到真实世界里，iOS 上最成熟的移动 AR 开发平台。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端也有 WebXR（原 WebVR/WebAR），但受限于浏览器权限和性能，体验远不如原生 AR。
          ARKit 是 Apple 的原生 AR 框架，可以直接调用摄像头、LiDAR、运动传感器，
          实现空间追踪、平面检测、人脸追踪、环境光估计等功能。
        </p>

        <h2>ARKit 的核心能力</h2>
        <ul>
          <li><strong>World Tracking：</strong> 追踪设备在 3D 空间中的位置和方向</li>
          <li><strong>Plane Detection：</strong> 自动识别水平面和垂直面（地面、桌面、墙壁）</li>
          <li><strong>Face Tracking：</strong> 捕捉面部表情，用于 Animoji、美颜滤镜</li>
          <li><strong>Scene Reconstruction：</strong> 通过 LiDAR 扫描并重建真实环境的几何结构</li>
          <li><strong>Body Tracking：</strong> 识别和追踪人体骨骼点</li>
        </ul>

        <h2>ARSession 与 ARSCNView</h2>
        <p>
          <code>ARSession</code> 是 ARKit 的核心，负责管理摄像头流和运动追踪数据。
          <code>ARSCNView</code> 是 SceneKit 和 ARKit 的结合体，可以方便地把 3D 模型渲染到真实场景中。
          如果你用 SwiftUI，需要用 <code>UIViewRepresentable</code> 把 ARSCNView 包装进去。
        </p>

        <TipBox type="tip" title="从简单的平面放置开始">
          第一次接触 ARKit 不要一上来就做复杂交互。先实现：
          打开相机 → 检测平面 → 点击平面放置一个 3D 立方体。
          这是最经典的 AR 入门路径。
        </TipBox>

        <h2>硬件要求</h2>
        <p>
          基础 World Tracking 需要 A9 及以上芯片（iPhone 6s+）。
          带有 LiDAR 的机型（iPhone 12 Pro 及以后的部分机型、iPad Pro）
          可以实现更精准的空间扫描和 occlusion（虚拟物体被真实物体遮挡）。
        </p>

        <h2>常见应用场景</h2>
        <ul>
          <li>家具电商：把沙发虚拟摆放到客厅里看效果</li>
          <li>教育：解剖模型、太阳系、化学分子的 3D 展示</li>
          <li>游戏：Pokemon GO 式的虚实结合体验</li>
          <li>导航：箭头直接叠加在真实街道上指路</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/healthkit"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← HealthKit
        </Link>
        <Link
          to="/advanced/sirikit"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：SiriKit →
        </Link>
      </div>
    </div>
  );
}
