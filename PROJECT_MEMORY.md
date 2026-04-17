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

## 内容页规模
- 截至目前，站点已包含 **67 个内容页面** 和 **12 个模块总览/升级/补全**
- 所有新页面均已接入 `src/App.tsx` 路由和 `src/data/config.ts` 侧边栏
- 旧路径（`/guide`、`/xcode`、`/objc`、`/practice`）保留为兼容跳转层

## 工程优化
- `vite.config.ts` 已配置 `manualChunks`，按模块拆分页面组件：
  - `advanced`、`swift`、`uikit`、`objc`、`starter`、`practice`、`roadmap`
- 第三方依赖已拆分为独立 chunk：`vendor`、`router`、`icons`
- build 警告已消除，`npm run lint` 和 `npm run build` 均通过

## 当前兼容策略
- 旧路由仍保留，但已从“直接渲染旧内容”收口为“跳转到新 canonical 路径”。
- 新入口优先指向新路径。
- 正文主干链接已经切到新路径。
- `README.md`、`AGENTS.md`、`PROJECT_MEMORY.md`、`TODO.md` 四份文档口径一致。

## 当前判断
- 第 1 项“兼容入口和路径收口”已完成。
- 第 2 项“内容页大规模补充”已完成（累计 14 批次，64+ 页面）。
- 站点内容骨架已非常完整，后续工作重心可转向：
  1. 个别早期占位页的进一步升级
  2. 更多实战/练习类页面的补充
  3. 用户体验和性能的持续优化

## 最近验证结果
- `npm run lint` 通过
- `npm run build` 通过
- 代码拆分配置已生效，无 chunk size 警告
