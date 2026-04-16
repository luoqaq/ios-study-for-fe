import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function PhotosCamera() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📷 相册与相机权限处理</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        图片选择、拍照、视频录制，是大多数社交/电商 App 的必备能力。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端通过 HTML5 的 <code>&lt;input type="file" accept="image/*"&gt;</code> 调用系统相册，
          能力非常有限。iOS Native 可以直接深度集成相册和相机，获得更好的体验和更强的控制能力。
        </p>

        <h2>两种接入方式</h2>
        <ul>
          <li><strong>UIImagePickerController：</strong> 系统提供的原生选择器，最简单，但可定制性低</li>
          <li><strong>PHPickerViewController / Photos 框架：</strong> iOS 14+ 推荐的新相册选择器，支持多选，隐私性更好</li>
        </ul>

        <h2>隐私权限是红线</h2>
        <p>
          从 iOS 14 开始，苹果大幅收紧了相册和相机的隐私权限：
        </p>
        <ul>
          <li>访问相册需要在 Info.plist 中声明 <code>NSPhotoLibraryUsageDescription</code></li>
          <li>访问相机需要声明 <code>NSCameraUsageDescription</code></li>
          <li>iOS 14+ 引入了“部分照片”访问权限，用户只允许 App 访问选中的几张照片</li>
        </ul>

        <TipBox type="warning" title="权限弹窗文案要认真写">
          Info.plist 里的权限描述会原封不动显示在弹窗中。文案写得模糊（如“需要访问您的照片”），很容易被用户拒绝。
          应该写清楚用途，比如“需要访问相册以选择头像图片”。
        </TipBox>

        <h2>拍照与视频录制</h2>
        <p>
          使用 <code>AVCaptureSession</code> 可以构建完全自定义的相机界面，
          支持闪光灯、对焦、滤镜、实时美颜等高级功能。
          但实现复杂度远高于调用系统相机，通常只有社交/摄影类 App 才会深度定制。
        </p>

        <h2>图片压缩与上传</h2>
        <p>
          原图通常几 MB 甚至几十 MB，不适合直接上传。常见处理流程：
        </p>
        <ol>
          <li>按最大边长等比压缩</li>
          <li>转换为目标格式（JPEG/HEIC）</li>
          <li>控制文件大小（如不超过 2MB）</li>
          <li>上传前添加水印或旋转校正</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/notifications"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 推送通知
        </Link>
        <Link
          to="/advanced/mapkit"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：MapKit 与定位 →
        </Link>
      </div>
    </div>
  );
}
