export interface NavItem {
  text: string;
  link: string;
}

export interface SidebarItem {
  text: string;
  items?: NavItem[];
  link?: string;
}

export interface SidebarConfig {
  [key: string]: SidebarItem[];
}

export const nav: NavItem[] = [
  { text: "指南", link: "/guide" },
  { text: "Objective-C", link: "/objc" },
  { text: "Swift", link: "/swift" },
  { text: "Xcode", link: "/xcode" },
  { text: "实战案例", link: "/practice" },
];

export const sidebar: SidebarConfig = {
  "/guide": [
    {
      text: "学习指南",
      items: [
        { text: "学习路线", link: "/guide" },
        { text: "开始之前", link: "/guide/before-start" },
      ],
    },
  ],
  "/objc": [
    { text: "简介", link: "/objc" },
    {
      text: "基础语法",
      items: [
        { text: "数据类型", link: "/objc/basics/datatypes" },
        { text: "字符串", link: "/objc/basics/strings" },
        { text: "数组与字典", link: "/objc/basics/arrays" },
        { text: "控制流", link: "/objc/basics/control-flow" },
        { text: "函数与 Block", link: "/objc/basics/functions" },
      ],
    },
    {
      text: "面向对象",
      items: [
        { text: "类与对象", link: "/objc/oop/class-object" },
        { text: "继承与多态", link: "/objc/oop/inheritance" },
        { text: "协议 Protocol", link: "/objc/oop/protocol" },
        { text: "分类 Category", link: "/objc/oop/category" },
        { text: "属性 Property", link: "/objc/oop/property" },
      ],
    },
    {
      text: "内存管理",
      items: [
        { text: "ARC 机制", link: "/objc/memory/arc" },
        { text: "循环引用", link: "/objc/memory/retain-cycle" },
      ],
    },
    {
      text: "高级特性",
      items: [
        { text: "KVO 键值观察", link: "/objc/advanced/kvo" },
        { text: "Delegate 委托", link: "/objc/advanced/delegate" },
        { text: "通知中心", link: "/objc/advanced/notification" },
      ],
    },
  ],
  "/swift": [
    { text: "简介", link: "/swift" },
    {
      text: "基础语法",
      items: [
        { text: "数据类型", link: "/swift/basics/datatypes" },
        { text: "可选型 Optionals", link: "/swift/basics/optionals" },
        { text: "字符串", link: "/swift/basics/strings" },
        { text: "集合类型", link: "/swift/basics/collections" },
        { text: "控制流", link: "/swift/basics/control-flow" },
      ],
    },
    {
      text: "面向对象",
      items: [
        { text: "类与结构体", link: "/swift/oop/class-struct" },
        { text: "枚举 Enum", link: "/swift/oop/enum" },
        { text: "协议 Protocol", link: "/swift/oop/protocol" },
        { text: "扩展 Extension", link: "/swift/oop/extension" },
        { text: "泛型 Generics", link: "/swift/oop/generics" },
      ],
    },
    {
      text: "高级特性",
      items: [
        { text: "闭包 Closure", link: "/swift/advanced/closure" },
        { text: "并发 async/await", link: "/swift/advanced/concurrency" },
        { text: "错误处理", link: "/swift/advanced/error-handling" },
        { text: "属性包装器", link: "/swift/advanced/property-wrapper" },
      ],
    },
    {
      text: "SwiftUI 入门",
      items: [
        { text: "SwiftUI 简介", link: "/swift/swiftui/intro" },
        { text: "状态与绑定", link: "/swift/swiftui/state-binding" },
      ],
    },
  ],
  "/xcode": [
    {
      text: "Xcode 使用教程",
      items: [
        { text: "安装与配置", link: "/xcode/setup" },
        { text: "界面导览", link: "/xcode/interface" },
        { text: "创建项目", link: "/xcode/project" },
        { text: "模拟器", link: "/xcode/simulator" },
        { text: "调试技巧", link: "/xcode/debugging" },
        { text: "Storyboard", link: "/xcode/storyboard" },
        { text: "构建与运行", link: "/xcode/build-run" },
      ],
    },
  ],
  "/practice": [
    {
      text: "实战案例",
      items: [
        { text: "Todo App", link: "/practice/todo-app/intro" },
        { text: "网络请求 App", link: "/practice/network-app/intro" },
        { text: "列表 App", link: "/practice/tableview-app/intro" },
        { text: "SwiftUI 小项目", link: "/practice/mini-swiftui/intro" },
      ],
    },
  ],
};
