export interface NavItem {
  text: string;
  link: string;
  summary?: string;
}

export interface SidebarLink {
  text: string;
  link: string;
}

export interface SidebarItem {
  text: string;
  items?: SidebarLink[];
  link?: string;
}

export interface SidebarConfig {
  [key: string]: SidebarItem[];
}

export const nav: NavItem[] = [
  {
    text: "成长地图",
    link: "/roadmap",
    summary: "先完成心智切换，再决定学习顺序。",
  },
  {
    text: "开发起步",
    link: "/starter",
    summary: "先把 Xcode、工程、调试跑通。",
  },
  {
    text: "UIKit",
    link: "/uikit",
    summary: "传统 iOS 业务开发主线，也是老项目主战场。",
  },
  {
    text: "Swift",
    link: "/swift",
    summary: "现代 iOS 开发主力语言与 SwiftUI 方向。",
  },
  {
    text: "OC 维护",
    link: "/objc-maintenance",
    summary: "面向老项目维护、Runtime 与历史包袱理解。",
  },
  {
    text: "高级进阶",
    link: "/advanced",
    summary: "从写页面走向架构、性能、稳定性与发布。",
  },
];

export const sidebar: SidebarConfig = {
  "/roadmap": [
    {
      text: "成长地图",
      items: [
        { text: "学习路线", link: "/roadmap" },
        { text: "开始之前", link: "/roadmap/before-start" },
        { text: "学习路径详解", link: "/roadmap/learning-path" },
      ],
    },
  ],
  "/starter": [
    {
      text: "开发起步",
      items: [
        { text: "模块总览", link: "/starter" },
        { text: "安装与配置", link: "/starter/setup" },
        { text: "界面导览", link: "/starter/interface" },
        { text: "创建项目", link: "/starter/project" },
        { text: "模拟器与真机", link: "/starter/simulator" },
        { text: "调试技巧", link: "/starter/debugging" },
        { text: "调试与 Instruments 实战", link: "/starter/debugging-advanced" },
        { text: "Storyboard", link: "/starter/storyboard" },
        { text: "构建与运行", link: "/starter/build-run" },
        { text: "Info.plist / Target / Scheme", link: "/starter/project-config" },
        { text: "Scheme / Build Configuration 深入", link: "/starter/build-configurations" },
      ],
    },
  ],
  "/uikit": [
    {
      text: "UIKit 主线",
      items: [
        { text: "模块总览", link: "/uikit" },
        { text: "UIViewController 生命周期", link: "/uikit/view-controller-lifecycle" },
        { text: "导航与页面跳转", link: "/uikit/navigation" },
        { text: "导航模式深入", link: "/uikit/navigation-advanced" },
        { text: "Auto Layout", link: "/uikit/auto-layout" },
        { text: "Auto Layout 进阶", link: "/uikit/auto-layout-advanced" },
        { text: "UICollectionView", link: "/uikit/collection-view" },
        { text: "CollectionView 实战技巧", link: "/uikit/collection-view-practical" },
        { text: "表单与输入", link: "/uikit/form-input" },
        { text: "复杂列表布局", link: "/uikit/compositional-layout" },
        { text: "键盘与表单校验", link: "/uikit/form-validation" },
        { text: "手势与触摸事件", link: "/uikit/gestures" },
        { text: "表单实战案例", link: "/uikit/practice/form-app" },
        { text: "动画与转场", link: "/uikit/animation" },
        { text: "动画实战案例", link: "/uikit/practice/animation-app" },
        { text: "TableView 性能优化", link: "/uikit/tableview-optimization" },
        { text: "CollectionView 电商首页", link: "/uikit/practice/collection-view-app" },
        { text: "Todo App", link: "/uikit/practice/todo-app" },
        { text: "列表复用与滚动", link: "/uikit/practice/tableview-app" },
      ],
    },
  ],
  "/swift": [
    {
      text: "Swift 与现代开发",
      items: [
        { text: "Swift 简介", link: "/swift" },
        { text: "Swift 基础导论", link: "/swift/basics/intro" },
        { text: "数据类型", link: "/swift/basics/datatypes" },
        { text: "可选型 Optionals", link: "/swift/basics/optionals" },
        { text: "字符串", link: "/swift/basics/strings" },
        { text: "集合类型", link: "/swift/basics/collections" },
        { text: "控制流", link: "/swift/basics/control-flow" },
      ],
    },
    {
      text: "进阶语言",
      items: [
        { text: "类与结构体", link: "/swift/oop/class-struct" },
        { text: "值类型与引用类型深入", link: "/swift/oop/value-reference-deep" },
        { text: "枚举 Enum", link: "/swift/oop/enum" },
        { text: "协议 Protocol", link: "/swift/oop/protocol" },
        { text: "扩展 Extension", link: "/swift/oop/extension" },
        { text: "属性与存储深入", link: "/swift/oop/properties-deep" },
        { text: "泛型 Generics", link: "/swift/oop/generics" },
        { text: "泛型与协议导向编程", link: "/swift/oop/generics-advanced" },
        { text: "实战：Swift POP 网络层", link: "/swift/practice/protocol-app" },
        { text: "闭包 Closure", link: "/swift/advanced/closure" },
        { text: "闭包捕获与内存管理", link: "/swift/advanced/closure-memory" },
        { text: "并发 async/await", link: "/swift/advanced/concurrency" },
        { text: "并发与数据竞争排查", link: "/swift/advanced/concurrency-practical" },
        { text: "错误处理", link: "/swift/advanced/error-handling" },
        { text: "错误处理与 Result 深入", link: "/swift/advanced/error-handling-deep" },
        { text: "属性包装器", link: "/swift/advanced/property-wrapper" },
        { text: "Combine 响应式编程", link: "/swift/advanced/combine" },
      ],
    },
    {
      text: "SwiftUI",
      items: [
        { text: "SwiftUI 简介", link: "/swift/swiftui/intro" },
        { text: "状态与绑定", link: "/swift/swiftui/state-binding" },
        { text: "SwiftUI 路由", link: "/swift/swiftui/navigation" },
        { text: "SwiftUI 与 UIKit 混用", link: "/swift/swiftui/mixed-ui" },
        { text: "数据流与状态管理深入", link: "/swift/swiftui/data-flow" },
        { text: "SwiftData 入门", link: "/swift/swiftdata/intro" },
        { text: "实战：SwiftData 待办清单", link: "/swift/practice/swiftdata-app" },
        { text: "Mini SwiftUI 实战", link: "/swift/practice/mini-swiftui" },
      ],
    },
  ],
  "/objc-maintenance": [
    {
      text: "OC 维护路线",
      items: [
        { text: "模块总览", link: "/objc-maintenance" },
        { text: "消息传递简介", link: "/objc-maintenance/basics/intro" },
        { text: "数据类型", link: "/objc-maintenance/basics/datatypes" },
        { text: "字符串", link: "/objc-maintenance/basics/strings" },
        { text: "数组与字典", link: "/objc-maintenance/basics/arrays" },
        { text: "控制流", link: "/objc-maintenance/basics/control-flow" },
        { text: "函数与 Block", link: "/objc-maintenance/basics/functions" },
      ],
    },
    {
      text: "对象与内存",
      items: [
        { text: "类与对象", link: "/objc-maintenance/oop/class-object" },
        { text: "继承与多态", link: "/objc-maintenance/oop/inheritance" },
        { text: "协议 Protocol", link: "/objc-maintenance/oop/protocol" },
        { text: "分类 Category", link: "/objc-maintenance/oop/category" },
        { text: "属性 Property", link: "/objc-maintenance/oop/property" },
        { text: "ARC 机制", link: "/objc-maintenance/memory/arc" },
        { text: "循环引用", link: "/objc-maintenance/memory/retain-cycle" },
        { text: "内存泄漏实战排查", link: "/objc-maintenance/practice/memory-debug" },
        { text: "实战：Delegate 模式", link: "/objc-maintenance/practice/delegate-pattern-app" },
      ],
    },
    {
      text: "老项目关键模式",
      items: [
        { text: "KVC", link: "/objc-maintenance/advanced/kvc" },
        { text: "KVO 键值观察", link: "/objc-maintenance/advanced/kvo" },
        { text: "Delegate 委托", link: "/objc-maintenance/advanced/delegate" },
        { text: "通知中心", link: "/objc-maintenance/advanced/notification" },
        { text: "GCD", link: "/objc-maintenance/advanced/gcd" },
        { text: "OC / Swift 混编", link: "/objc-maintenance/advanced/mixed-project" },
        { text: "Runtime 入门", link: "/objc-maintenance/advanced/runtime" },
        { text: "Runtime 消息机制深入", link: "/objc-maintenance/advanced/runtime-deep" },
        { text: "消息转发机制", link: "/objc-maintenance/advanced/forwarding" },
        { text: "CocoaPods", link: "/objc-maintenance/advanced/cocoapods" },
        { text: "Swizzling 与关联对象", link: "/objc-maintenance/advanced/runtime-techniques" },
        { text: "SPM vs CocoaPods", link: "/objc-maintenance/advanced/spm-vs-cocoapods" },
        { text: "OC / Swift 桥接进阶", link: "/objc-maintenance/advanced/bridging" },
        { text: "老项目重构策略", link: "/objc-maintenance/advanced/refactoring" },
      ],
    },
  ],
  "/advanced": [
    {
      text: "高级进阶",
      items: [
        { text: "模块总览", link: "/advanced" },
        { text: "持久化与缓存基础", link: "/advanced/persistence" },
        { text: "网络层封装", link: "/advanced/network-layer" },
        { text: "Instruments 入门", link: "/advanced/instruments" },
        { text: "启动优化", link: "/advanced/launch-optimization" },
        { text: "Instruments 性能优化案例", link: "/advanced/instruments-case" },
        { text: "崩溃定位与符号化", link: "/advanced/crash-symbolication" },
        { text: "架构选型", link: "/advanced/architecture" },
        { text: "单元测试与 UI 测试", link: "/advanced/testing" },
        { text: "签名、打包与发布", link: "/advanced/distribution" },
        { text: "多线程与 GCD 实战", link: "/advanced/gcd-practical" },
        { text: "Core Animation", link: "/advanced/core-animation" },
        { text: "App 安全", link: "/advanced/security" },
        { text: "WKWebView 与 JS 交互", link: "/advanced/webview" },
        { text: "推送通知与本地通知", link: "/advanced/notifications" },
        { text: "相册与相机权限处理", link: "/advanced/photos-camera" },
        { text: "MapKit 与定位服务", link: "/advanced/mapkit" },
        { text: "Widget 与 App Extension", link: "/advanced/widget" },
        { text: "HealthKit 与运动数据", link: "/advanced/healthkit" },
        { text: "ARKit 入门", link: "/advanced/arkit" },
        { text: "SiriKit 与 Shortcuts", link: "/advanced/sirikit" },
        { text: "iPad 多窗口与多任务", link: "/advanced/ipad-multitasking" },
        { text: "WatchKit 与 watchOS", link: "/advanced/watchkit" },
        { text: "App Clip 轻应用", link: "/advanced/app-clip" },
        { text: "App Store 审核避坑", link: "/advanced/appstore-review" },
        { text: "iOS 18 适配要点", link: "/advanced/ios18-adaptation" },
        { text: "从零发布一个 App", link: "/advanced/publish-end-to-end" },
        { text: "网络请求实战", link: "/advanced/practice/network-app" },
        { text: "实战：性能排查检查清单", link: "/advanced/practice/performance-app" },
      ],
    },
  ],
};

export function getSidebarKey(pathname: string) {
  if (
    pathname.startsWith("/uikit") ||
    pathname.startsWith("/practice/todo-app") ||
    pathname.startsWith("/practice/tableview-app")
  ) {
    return "/uikit";
  }

  if (pathname.startsWith("/roadmap") || pathname.startsWith("/guide")) {
    return "/roadmap";
  }

  if (pathname.startsWith("/starter") || pathname.startsWith("/xcode")) {
    return "/starter";
  }

  if (pathname.startsWith("/swift")) {
    return "/swift";
  }

  if (
    pathname.startsWith("/practice/mini-swiftui") ||
    pathname.startsWith("/swift/practice/mini-swiftui")
  ) {
    return "/swift";
  }

  if (
    pathname.startsWith("/objc-maintenance") ||
    pathname.startsWith("/objc")
  ) {
    return "/objc-maintenance";
  }

  if (
    pathname.startsWith("/advanced") ||
    pathname.startsWith("/practice/network-app") ||
    pathname.startsWith("/practice/performance-app")
  ) {
    return "/advanced";
  }

  if (pathname.startsWith("/practice")) {
    return "/uikit";
  }

  return null;
}
