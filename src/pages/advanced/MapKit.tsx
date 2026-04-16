import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function MapKit() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🗺️ MapKit 与定位服务</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        地图不是只有导航，它是 O2O、出行、社交场景的核心组件。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端集成地图一般用高德、百度或 Google Maps 的 JS SDK，在网页里嵌入 iframe 或 Canvas 渲染。
          iOS 原生有 Apple 官方的 <strong>MapKit</strong>，也可以接入高德/百度的 iOS SDK。
          MapKit 的优势是与系统深度整合，性能更好，且无需额外引入第三方库。
        </p>

        <h2>Core Location：获取用户位置</h2>
        <p>
          所有定位能力的基础是 <code>CoreLocation</code> 框架。
          通过 <code>CLLocationManager</code> 请求位置权限并获取坐标：
        </p>
        <ul>
          <li><strong>精确位置：</strong> 实时追踪、导航、外卖配送</li>
          <li><strong>模糊位置：</strong> iOS 14+ 新增，用户可只给大致区域而不是精确坐标</li>
        </ul>

        <TipBox type="warning" title="后台定位需要特殊声明">
          如果 App 需要在后台持续获取位置（如跑步记录、网约车司机端），
          必须在 Info.plist 声明 <code>UIBackgroundModes</code> 包含 location，
          并在审核时提供充分的业务说明。
        </TipBox>

        <h2>MapKit 的核心组件</h2>
        <ul>
          <li><strong>MKMapView：</strong> 地图视图，支持标准地图、卫星图、混合模式</li>
          <li><strong>MKAnnotation：</strong> 地图上的大头针标注</li>
          <li><strong>MKOverlay：</strong> 覆盖层，如路线、区域热力图</li>
          <li><strong>MKDirections：</strong> 路线规划 API</li>
        </ul>

        <h2>地理编码与反编码</h2>
        <p>
          <code>CLGeocoder</code> 可以把地址文字转换成经纬度（正向地理编码），
          也可以把经纬度转换成可读的地址文字（反向地理编码）。
          这在“显示当前位置名称”、“搜索附近门店”等场景中非常常用。
        </p>

        <h2>国产地图 SDK 的选择</h2>
        <p>
          如果业务主要在中国大陆，MapKit 的 POI 数据和路线规划能力不如高德、百度。
          很多国内 App 会选择：
        </p>
        <ul>
          <li><strong>高德地图 SDK：</strong> POI 丰富，路线规划准确，文档完善</li>
          <li><strong>百度地图 SDK：</strong>  similar，根据公司业务已有合作选择</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/photos-camera"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 相册与相机
        </Link>
        <Link
          to="/advanced/widget"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：Widget 与 Extension →
        </Link>
      </div>
    </div>
  );
}
