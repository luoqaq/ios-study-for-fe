# iOS 学习指南 (For Front-End Developers)

🍎 **这是一个专为前端开发者量身打造的 iOS 开发快速入门指南网站。**

本项目通过“心智映射”的方式，将 iOS 中晦涩的原生概念（如 ARC、Delegate、KVO、Protocol）与前端工程师烂熟于心的 JavaScript/TypeScript/React/Vue 概念进行双栏代码对比，帮助你实现十倍速的跨端技能转换！

## 🌟 核心特色

- 🆚 **双语对照**：所有代码块均提供 Objective-C / Swift 与 JavaScript / TypeScript 的逐行双栏对照。
- 🎨 **图文并茂**：使用 SVG 图表形象解释底层原理（如循环引用的死结、Delegate 的工作流、KVO 拦截机制）。
- 🛣️ **系统路线**：从历史包袱重的 Objective-C，到现代优雅的 Swift，再到声明式的 SwiftUI，平滑过渡。
- 🔨 **Xcode 导览**：手把手教你如何从轻量的 VS Code 切换到庞大但全能的官方 IDE Xcode。
- 💻 **实战驱动**：脱离枯燥的语法，提供 Todo List、网络请求解析、无限列表、SwiftUI 等实际项目的架构思路。

## 🛠️ 技术栈

网站本身也是采用前端现代技术栈构建的：

- **核心框架**：React 18 + TypeScript
- **构建工具**：Vite
- **路由管理**：React Router v6
- **样式方案**：Tailwind CSS (原生适配浅色/深色模式)
- **代码高亮**：react-syntax-highlighter (Prism.js)
- **图标图标**：Lucide React

## 🚀 本地运行

1. 克隆代码仓库：

   ```bash
   git clone git@github.com:luoqaq/ios-study-for-fe.git
   cd ios-study-for-fe
   ```

2. 安装依赖（推荐使用 npm 或 pnpm）：

   ```bash
   npm install
   ```

3. 启动开发服务器：

   ```bash
   npm run dev
   ```

4. 在浏览器中打开：

   默认地址：[http://localhost:5173](http://localhost:5173)

## 📦 编译与打包

如果你想将本站部署到静态托管服务（如 Vercel、GitHub Pages、Netlify）：

```bash
npm run build
```

打包产物将生成在 `dist` 目录中。

## 📖 目录结构说明

- `/src/pages/Home.tsx`：首页大纲与引导。
- `/src/pages/guide/`：学习前的宏观心智模型转换。
- `/src/pages/objc/`：Objective-C 语言教程（包含基础语法、OOP、内存管理 ARC、高级特性等）。
- `/src/pages/swift/`：Swift 语言教程（包含类型推断、可选型、POP 协议扩展、并发等）。
- `/src/pages/xcode/`：Xcode IDE 教程（界面导览、调试、断点、打包）。
- `/src/pages/practice/`：移动端实战案例解析。

## 🤝 参与贡献

欢迎通过 Issue 或 Pull Request 提交建议、纠正错别字或补充新的对比案例！

## 📄 开源协议

MIT License
