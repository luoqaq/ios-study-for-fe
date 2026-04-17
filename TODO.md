# 当前待办

## 交接结论

- 第 1 项"兼容入口和路径收口"已经完成，旧路径现在主要作为跳转层保留。
- 第 2 项"补第二批内容页"已完成两轮，共 10 个高优页面已创建并接入导航和路由。
- 第 3 项"第三批内容页"已完成：SwiftUI 路由、SwiftUI 与 UIKit 混用接入导航，以及 5 个高级进阶页面创建完成。
- 第 4 项"第四批内容页"已完成：6 个新页面（涵盖高级进阶架构/测试/发布、SwiftUI 数据流、UIKit 动画、OC 桥接）。
- 第 5 项"第五批内容页"已完成：6 个新页面（涵盖 Auto Layout 进阶、GCD 实战、Core Animation、App 安全、Swift 泛型进阶、错误处理深入）。
- 第 6 项"第六批内容页"已完成：6 个新页面（涵盖 CollectionView 实战、TableView 优化、闭包内存管理、Combine、Runtime 深入、老项目重构）。
- 第 7 项"第七批内容页"已完成：6 个新页面（涵盖 WKWebView、推送通知、相册相机、MapKit、SwiftData、Widget）。
- 第 8 项"第八批内容页"已完成：6 个新页面（涵盖 HealthKit、ARKit、SiriKit、iPad 多窗口、WatchKit、App Clip）。
- 第 9 项"第九批内容页"已完成：6 个新页面（涵盖 Instruments 调试实战、UIKit 表单实战、Swift 并发排查、OC 内存泄漏实战、App Store 审核、iOS 18 适配）。
- 第 10 项"第十批内容页"已完成：6 个新页面（涵盖 Swift 值类型与引用类型深入、属性与存储深入、UIKit 导航模式深入、OC 消息转发机制、Instruments 性能优化案例、从零发布一个 App）。
- 第 11 项"第十一批内容页"已完成：2 个新页面 + 3 个模块总览升级（涵盖手势与触摸事件、学习路径详解、UIKit 模块总览升级、Advanced 模块总览升级、CollectionView 升级为完整实战）。
- 第 12 项"第十二批内容页"已完成：6 个早期页面的内容升级（涵盖表单与输入、复杂列表布局、TableView 性能优化、开发起步模块总览、UIViewController 生命周期、持久化与缓存基础）。
- 第 13 项"第十三批内容页"已完成：3 个实战项目新建（涵盖 CollectionView 电商首页、UIKit 动画实战、Swift POP 网络层实战），并统一了相邻页面的前后链接。
- 第 14 项"第十四批内容页"已完成：质量优化与导航补全（涵盖 PracticeIndex 升级、TableViewApp 和 OC Intro 添加前后导航链接）。
- 第 15 项"第十五批内容页"已完成：Vite 代码拆分优化（`manualChunks`），按模块拆分页面组件，消除 build chunk size 警告。
- 第 16 项"第十六批内容页"已完成：3 个实战项目新建（涵盖性能排查检查清单、SwiftData 待办清单、OC Delegate 模式实战），均已接入路由、导航和前后链接。
- 上一轮（第十六批）已经通过 `lint` 和 `build` 验证，文档同步已完成。
- 当前工作区是未提交状态，适合直接继续开发下一批页面或进行质量优化。

## 已完成到哪一步

### 信息架构

- 首页、顶部导航、侧边栏已经切到新结构：
  - `roadmap`
  - `starter`
  - `uikit`
  - `swift`
  - `objc-maintenance`
  - `advanced`
- 旧 `guide / xcode / objc / practice` 路径已经收口为兼容跳转。

### 已补内容页（共 67 个，另有 12 个模块/早期页面升级/补全）

**第一批 5 个高优页面：**
- `src/pages/uikit/CollectionView.tsx`
- `src/pages/uikit/FormInput.tsx`
- `src/pages/xcode/ProjectConfig.tsx`
- `src/pages/objc/advanced/Runtime.tsx`
- `src/pages/objc/advanced/CocoaPods.tsx`

**第二批 5 个高优页面：**
- `src/pages/uikit/CompositionalLayout.tsx`
- `src/pages/uikit/FormValidation.tsx`
- `src/pages/xcode/BuildConfigurations.tsx`
- `src/pages/objc/advanced/RuntimeTechniques.tsx`
- `src/pages/objc/advanced/SpmVsCocoaPods.tsx`

**第三批 7 个高优页面：**
- `src/pages/swift/swiftui/Navigation.tsx`
- `src/pages/swift/swiftui/MixedUI.tsx`
- `src/pages/advanced/Persistence.tsx`
- `src/pages/advanced/NetworkLayer.tsx`
- `src/pages/advanced/Instruments.tsx`
- `src/pages/advanced/LaunchOptimization.tsx`
- `src/pages/advanced/CrashSymbolication.tsx`

**第四批 6 个高优页面：**
- `src/pages/advanced/Architecture.tsx`
- `src/pages/advanced/Testing.tsx`
- `src/pages/advanced/Distribution.tsx`
- `src/pages/swift/swiftui/DataFlow.tsx`
- `src/pages/uikit/Animation.tsx`
- `src/pages/objc/advanced/Bridging.tsx`

**第五批 6 个高优页面：**
- `src/pages/uikit/AutoLayoutAdvanced.tsx`
- `src/pages/advanced/GcdPractical.tsx`
- `src/pages/advanced/CoreAnimation.tsx`
- `src/pages/advanced/Security.tsx`
- `src/pages/swift/oop/GenericsAdvanced.tsx`
- `src/pages/swift/advanced/ErrorHandlingDeep.tsx`

**第六批 6 个高优页面：**
- `src/pages/uikit/CollectionViewPractical.tsx`
- `src/pages/uikit/TableViewOptimization.tsx`
- `src/pages/swift/advanced/ClosureMemory.tsx`
- `src/pages/swift/advanced/CombineIntro.tsx`
- `src/pages/objc/advanced/RuntimeDeep.tsx`
- `src/pages/objc/advanced/Refactoring.tsx`

**第七批 6 个高优页面：**
- `src/pages/advanced/WebView.tsx`
- `src/pages/advanced/Notifications.tsx`
- `src/pages/advanced/PhotosCamera.tsx`
- `src/pages/advanced/MapKit.tsx`
- `src/pages/swift/swiftdata/Intro.tsx`
- `src/pages/advanced/Widget.tsx`

**第八批 6 个高优页面：**
- `src/pages/advanced/HealthKit.tsx`
- `src/pages/advanced/ARKit.tsx`
- `src/pages/advanced/SiriKit.tsx`
- `src/pages/advanced/IPadMultitasking.tsx`
- `src/pages/advanced/WatchKit.tsx`
- `src/pages/advanced/AppClip.tsx`

**第九批 6 个高优页面：**
- `src/pages/starter/DebuggingAdvanced.tsx`
- `src/pages/uikit/practice/FormApp.tsx`
- `src/pages/swift/advanced/ConcurrencyPractical.tsx`
- `src/pages/objc/practice/MemoryDebug.tsx`
- `src/pages/advanced/AppStoreReview.tsx`
- `src/pages/advanced/IOS18Adaptation.tsx`

**第十批 6 个高优页面：**
- `src/pages/swift/oop/ValueReferenceDeep.tsx`
- `src/pages/swift/oop/PropertiesDeep.tsx`
- `src/pages/uikit/NavigationAdvanced.tsx`
- `src/pages/objc/advanced/Forwarding.tsx`
- `src/pages/advanced/InstrumentsCase.tsx`
- `src/pages/advanced/PublishEndToEnd.tsx`

**第十一批 5 个高优页面/升级：**
- `src/pages/uikit/Gestures.tsx`（新建）
- `src/pages/roadmap/LearningPath.tsx`（新建）
- `src/pages/uikit/CollectionView.tsx`（升级为完整实战页）
- `src/pages/UIKitIndex.tsx`（升级为反映当前完整学习路径的模块总览）
- `src/pages/AdvancedIndex.tsx`（升级为反映当前所有专题的模块总览）

**第十二批 6 个页面升级：**
- `src/pages/uikit/FormInput.tsx`（从占位页升级为完整内容页）
- `src/pages/uikit/CompositionalLayout.tsx`（从占位页升级为完整内容页）
- `src/pages/uikit/TableViewOptimization.tsx`（增加代码示例与实战建议）
- `src/pages/xcode/XcodeIndex.tsx`（更新学习路径，覆盖全部子页面）
- `src/pages/uikit/ViewControllerLifecycle.tsx`（增加 loadView、布局时机、内存警告等深入探讨）
- `src/pages/advanced/Persistence.tsx`（增加 Core Data 查询代码示例）

**第十三批 3 个实战项目新建：**
- `src/pages/practice/CollectionViewApp.tsx`（CollectionView 电商首页实战）
- `src/pages/practice/AnimationApp.tsx`（UIKit 动画实战案例）
- `src/pages/practice/SwiftProtocolApp.tsx`（Swift POP 网络层抽象实战）

**第十四批 3 个质量优化/导航补全：**
- `src/pages/practice/PracticeIndex.tsx`（升级案例列表，覆盖全部实战项目）
- `src/pages/practice/TableViewApp.tsx`（补充前后导航链接）
- `src/pages/objc/basics/Intro.tsx`（补充前后导航链接）

**第十五批 1 个工程优化：**
- `vite.config.ts` 配置 `manualChunks`，按模块拆分页面组件，消除 chunk size 警告

**第十六批 3 个实战项目新建：**
- `src/pages/practice/PerformanceApp.tsx`（性能排查检查清单实战）
- `src/pages/practice/SwiftDataApp.tsx`（SwiftData 待办清单实战）
- `src/pages/objc/practice/DelegatePatternApp.tsx`（OC Delegate 模式实战）

以上页面均已接入 `src/data/config.ts` 和 `src/App.tsx`，验证通过。

## 下一个模型接手后先做什么

1. 评估当前内容页是否已经覆盖核心学习路径（已补 67 个页面 + 12 个升级/补全，骨架已非常完整）。
2. 如果继续补内容，建议优先级：
   - 检查是否还有早期创建的占位说明页需要升级
   - 补充各模块的"实战/练习"类页面，形成"学完即练"的闭环
   - 检查并统一所有页面的上一篇 / 下一篇链接一致性
3. 如果转向质量优化，建议：
   - 检查并统一所有页面的上一篇 / 下一篇链接一致性
   - 检查侧边栏分类与实际页面数量的匹配度
   - 考虑引入代码拆分（build 已持续报 chunk 过大警告）
4. 每轮改动后执行 `npm run lint` 和 `npm run build` 验证。
5. 如果改动影响对外说明或长期记忆，再同步 `README.md` / `PROJECT_MEMORY.md`。

## 建议继续补的内容顺序（仅供参考）

1. `Swift 协议与 POP 深入' → `/swift/oop/protocol`
2. `Swift 错误处理实战' → `/swift/advanced/error-handling`
3. `SwiftData 进阶' → `/swift/swiftdata/intro`
4. `UIKit 实战项目补充' → 新建更多 `/uikit/practice/*`
5. `Starter 模块查漏补缺' → 检查 `/starter/*` 早期页面内容深度

## 继续开发时要注意

- 不要删除旧兼容路由，当前策略是保留兼容层。
- 导航与侧边栏统一维护在 `src/data/config.ts`。
- 路由统一维护在 `src/App.tsx`。
- 如果新增内容页，优先同时补：
  - 路由
  - 导航入口
  - 上一篇 / 下一篇
  - 所属阶段语义
- 当前文档已经同步到最新状态，下一批页面完成后记得再次同步。

## 当前风险

- 无重大风险。站点内容骨架已非常完整（64 个页面 + 12 个升级/补全），可以继续做细节填充，也可以转向结构优化和体验提升。
- build 的 chunk size 警告已通过 `vite.config.ts` 的 `manualChunks` 配置消除：页面按模块拆分、第三方依赖独立成 chunk。
