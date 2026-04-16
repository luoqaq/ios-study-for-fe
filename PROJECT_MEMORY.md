# PROJECT MEMORY

## 项目背景
- 仓库：`ios-study-for-fe`
- 目标：从前端开发者视角学习 iOS，覆盖：
  - Swift 现代开发
  - UIKit 业务开发
  - Objective-C 老项目维护
  - 工程化与高级进阶

## 已完成重构
- 已移除 Git 跟踪中的 `node_modules/` 和 `dist/`
- 已补 `.gitignore`
- 已补 `.eslintrc.cjs`
- 已修复 `lint`
- 已完成第一轮新信息架构骨架：
  - 新顶级导航
  - 新首页阶段地图
  - 新侧边栏归类逻辑
  - 新路径兼容层

## 当前信息架构
- `roadmap`：成长地图 / 认知迁移
- `starter`：开发起步（承接原 Xcode）
- `uikit`：UIKit 与传统开发主线
- `swift`：Swift 与现代开发
- `objc-maintenance`：Objective-C 老项目维护
- `advanced`：高级进阶

## 已新增内容页
### 骨架与核心页面
- `src/pages/swift/basics/Intro.tsx`
- `src/pages/UIKitIndex.tsx`
- `src/pages/AdvancedIndex.tsx`
- `src/pages/uikit/ViewControllerLifecycle.tsx`
- `src/pages/uikit/Navigation.tsx`
- `src/pages/uikit/AutoLayout.tsx`
- `src/pages/uikit/CollectionView.tsx`
- `src/pages/uikit/FormInput.tsx`
- `src/pages/xcode/ProjectConfig.tsx`
- `src/pages/objc/advanced/Kvc.tsx`
- `src/pages/objc/advanced/Gcd.tsx`
- `src/pages/objc/advanced/MixedProject.tsx`
- `src/pages/objc/advanced/Runtime.tsx`
- `src/pages/objc/advanced/CocoaPods.tsx`

### 第二批已接入页面
- `src/pages/uikit/CompositionalLayout.tsx`
- `src/pages/uikit/FormValidation.tsx`
- `src/pages/xcode/BuildConfigurations.tsx`
- `src/pages/objc/advanced/RuntimeTechniques.tsx`
- `src/pages/objc/advanced/SpmVsCocoaPods.tsx`

## 当前兼容策略
- 旧路由仍保留，但已从“直接渲染旧内容”收口为“跳转到新 canonical 路径”。
- 新入口优先指向新路径。
- 正文主干链接已经切到新路径。
- `practice/network-app` 与 `practice/mini-swiftui` 已增加更清晰的语义化别名：
  - `/advanced/practice/network-app`
  - `/swift/practice/mini-swiftui`
- `README.md` 已同步更新到新信息架构口径，不再描述旧站点结构。

## 当前判断
- 第 1 项“兼容入口和路径收口”已完成。
- 目前源码中已没有显式旧 `guide/xcode/objc/practice` 跳转残留。
- 保留旧路由是有意兼容，不是遗漏；旧路径现在作为跳转层存在。
- 当前对外说明、项目规则、项目记忆三份文档已经同步到新结构：
  - `README.md`
  - `AGENTS.md`
  - `PROJECT_MEMORY.md`

## 下一步计划
- 第 2 项内容建设已经开始，前两批共 10 个高优页面已完成并接入导航和路由：
  **第一批：** `UICollectionView`、表单与输入、`Info.plist / Target / Scheme`、Runtime 入门、CocoaPods
  **第二批：** 复杂列表布局、键盘与表单校验、Scheme / Build Configuration 深入、Swizzling 与关联对象、SPM vs CocoaPods
- 后续可继续补：
  1. SwiftUI 路由
  2. SwiftUI 与 UIKit 混用
  3. 持久化与缓存基础
  4. 网络层封装
  5. Instruments 入门
  6. 启动优化
  7. 崩溃定位与符号化

## 最近验证结果
- `npm run lint` 通过
- `npm run build` 通过
- 第二批 5 个新页面路由、导航、上一篇/下一篇链接均已验证无拼写或 import 问题
- 构建仍有大包 warning，暂未处理拆包
