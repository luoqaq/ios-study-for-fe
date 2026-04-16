# iOS 成长路线站 (For Front-End Developers)

这是一个面向前端开发者的 iOS 学习项目，目标不是只做一套语法对照文档，而是逐步建设成一条从入门到高级的成长路线站点。

项目当前重点覆盖 4 条主线：

- Swift 与现代 iOS 开发
- UIKit 业务开发
- Objective-C 老项目维护
- 工程化与高级进阶

## 当前信息架构

站点已经从旧结构 `guide / objc / swift / xcode / practice` 重构到新的阶段化结构：

- `roadmap`
  成长地图与认知迁移
- `starter`
  开发起步，承接原 Xcode 模块
- `uikit`
  UIKit 与传统 iOS 开发主线
- `swift`
  Swift 与现代开发主线
- `objc-maintenance`
  Objective-C 与老项目维护路线
- `advanced`
  高级进阶与工程化能力

当前仍保留旧路径兼容，避免历史链接失效，但新入口和新导航已经全部以新结构为准。

## 项目特点

- 用前端视角解释 iOS 概念，不从“什么是变量”开始讲。
- 大量使用 Objective-C / Swift 与 JavaScript / TypeScript 的对照方式讲解。
- 明确保留 Objective-C 路线，服务真实的老项目维护场景。
- 把 UIKit 单独提升为主线，而不是散落在工具页和实战页里。
- 正在逐步从“模块目录”演进到“阶段成长地图”。

## 本地运行

```bash
npm install
npm run dev
```

默认访问地址：

`http://localhost:5173`

## 验证命令

```bash
npm run lint
npm run build
```

## 当前已补的关键页面

### 第一批（骨架与核心页面）
- `Swift 基础导论`
- `UIKit 总览`
- `高级进阶总览`
- `UIViewController 生命周期`
- `导航与页面跳转`
- `Auto Layout`
- `UICollectionView`
- `表单与输入`
- `Info.plist / Target / Scheme`
- `KVC`
- `GCD`
- `OC / Swift 混编`
- `Runtime 入门`
- `CocoaPods`

### 第二批（已接入导航与路由）
- `复杂列表布局`（Compositional Layout）
- `键盘与表单校验`
- `Scheme / Build Configuration 深入`
- `Swizzling 与关联对象`
- `SPM vs CocoaPods`

## 目录说明

- `src/data/config.ts`
  顶部导航、侧边栏和路径归类逻辑
- `src/App.tsx`
  路由总入口与兼容路由
- `src/pages/Home.tsx`
  首页阶段地图
- `src/pages/uikit/`
  UIKit 主线内容
- `src/pages/swift/`
  Swift 与 SwiftUI 主线内容
- `src/pages/objc/`
  Objective-C 与老项目维护相关内容
- `src/pages/xcode/`
  原 Xcode 内容，现由 `starter` 路由承接
- `src/pages/practice/`
  历史实战页，正在逐步归位到 `uikit / swift / advanced`

## 当前阶段

当前进度：

1. 第 1 项“兼容入口和路径收口”已经完成。
2. 第 2 项“补第二批内容页”已经完成两小轮，共 10 个高优页面已接入导航和路由，并通过 `lint` 与 `build` 验证。

## 后续计划

第二批内容补充已完成两轮。当前已经落地：

**第一批 5 个：**
1. `UICollectionView`
2. 表单与输入
3. `Info.plist / Target / Scheme`
4. Runtime 入门
5. CocoaPods

**第二批 5 个：**
6. 复杂列表布局（Compositional Layout）
7. 键盘与表单校验
8. Scheme / Build Configuration 深入
9. Swizzling 与关联对象
10. SPM vs CocoaPods

## 开源协议

MIT License
