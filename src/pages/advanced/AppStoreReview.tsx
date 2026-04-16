import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function AppStoreReview() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🛡️ App Store 审核避坑指南</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        审核不是玄学，很多被拒原因都是可以提前规避的。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>审核被拒的常见类型</h2>
        <p>
          根据苹果开发者论坛和实际项目经验，被拒原因主要集中在以下几个方面。
          了解这些规律，可以大幅减少上架周期。
        </p>

        <h2>1. 功能不完整或存在崩溃</h2>
        <p>
          这是最直接、也最难申诉的一类。如果你的 App 在审核员测试的设备上崩溃了，
          或者核心流程跑不通（如注册失败、支付无响应、白屏），几乎必拒。
        </p>
        <ul>
          <li>上架前务必在多种机型和系统版本上跑通主流程</li>
          <li>检查 iPad 适配，即使你的目标用户主要是 iPhone</li>
          <li>确保弱网和无网环境下的提示友好，而不是直接卡死</li>
        </ul>

        <h2>2. 隐私权限描述不清晰</h2>
        <p>
          每次申请相机、麦克风、定位、相册、健康数据等权限时，Info.plist 中的描述文案必须让用户清楚知道用途。
          模糊的描述（如“需要访问您的位置”）容易被拒。
        </p>

        <h2>3. 支付绕过苹果内购</h2>
        <p>
          如果你在 App 内销售虚拟商品、会员、增值服务、游戏道具，
          <strong>必须使用 Apple 的 In-App Purchase（IAP）</strong>。
          使用微信支付、支付宝、银行卡等第三方支付渠道销售虚拟商品，是审核红线。
        </p>

        <TipBox type="warning" title="实物商品可以走第三方支付">
          电商 App 卖衣服、外卖 App 点餐、打车 App 付车费，这些属于实物/服务交易，
          可以使用微信/支付宝。但游戏充值、视频会员、虚拟礼物必须用 IAP。
        </TipBox>

        <h2>4. UI 设计过于简陋或抄袭</h2>
        <p>
          如果界面像未完成的 Demo，或者明显抄袭其他知名 App 的图标/界面，
          审核员可能以 4.0（Design）或 4.1（Copycats）为由拒绝。
        </p>

        <h2>5. 热更新与动态代码</h2>
        <p>
          苹果禁止 App 在运行时下载并执行可执行代码（如 JavaScriptCore 动态下发业务逻辑、
          使用私有 API 绕过审核）。React Native / Flutter 本身没问题，
          但如果你的热更新机制涉及 native 代码替换，就有被拒风险。
        </p>

        <h2>审核申诉与加速技巧</h2>
        <ul>
          <li>被拒后认真看 Resolution Center 的具体原因，不要敷衍回复</li>
          <li>如果是误判，可以提交 Appeal（申诉），说明业务场景</li>
          <li>重大 bug 修复后可以申请 Expedited Review（加急审核），但每月次数有限</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/app-clip"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← App Clip
        </Link>
        <Link
          to="/advanced/ios18-adaptation"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：iOS 18 适配 →
        </Link>
      </div>
    </div>
  );
}
