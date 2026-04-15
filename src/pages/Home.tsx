import { Link } from "react-router-dom";
import { BookOpen, Code2, Hammer, Apple, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Apple className="h-6 w-6 text-ios-blue" />,
      title: "Objective-C 语法教程",
      desc: "从消息传递到内存管理，对比 JavaScript 深入理解 OC 的独特设计与运行机制。",
      link: "/objc",
    },
    {
      icon: <Code2 className="h-6 w-6 text-ios-orange" />,
      title: "Swift 语法教程",
      desc: "类型安全、可选型、协议、泛型... 掌握这门现代且优雅的苹果官方主力语言。",
      link: "/swift",
    },
    {
      icon: <Hammer className="h-6 w-6 text-ios-green" />,
      title: "Xcode 使用教程",
      desc: "从 VS Code 无缝切换到 Xcode，熟悉模拟器、断点调试与 Storyboard 界面搭建。",
      link: "/xcode",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
      title: "实战案例驱动",
      desc: "Todo 列表、网络请求、无限滚动，从零到一构建完整的 iOS 原生应用。",
      link: "/practice",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 py-20 md:py-32 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-7xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-purple-600 mb-2">
            iOS 学习指南
          </span>
          为前端开发者打造
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl leading-relaxed">
          不用从零开始重新学编程。我们为你建立了 JavaScript/TypeScript 与
          Objective-C/Swift 之间的心智映射，利用你已有的前端知识，十倍加速 iOS
          开发学习。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/guide/before-start"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ios-blue px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5"
          >
            开始学习
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/swift"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-8 py-3.5 text-sm font-semibold text-gray-900 dark:text-white transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Swift 教程
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-4 py-16 bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl mb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.link}
              className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md hover:border-ios-blue/50 dark:hover:border-ios-blue/50"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="w-full max-w-4xl px-4 pb-24 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          学习路线
        </h2>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 z-0 hidden md:block"></div>

          <div className="space-y-12 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="md:w-1/2 flex md:justify-end">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm md:text-right w-full md:w-5/6">
                  <h3 className="text-xl font-bold mb-2">1. 语言基础</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    先了解 Objective-C 或 Swift 的基本语法，对比 JS/TS
                    建立类型系统和面向对象概念。
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-ios-blue text-white flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white dark:border-gray-900 z-10 shrink-0">
                1
              </div>
              <div className="md:w-1/2"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 flex-col-reverse md:flex-row">
              <div className="md:w-1/2"></div>
              <div className="w-12 h-12 rounded-full bg-ios-green text-white flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white dark:border-gray-900 z-10 shrink-0">
                2
              </div>
              <div className="md:w-1/2 flex md:justify-start">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-left w-full md:w-5/6">
                  <h3 className="text-xl font-bold mb-2">2. 开发环境</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    熟悉 Xcode IDE
                    的使用，掌握断点调试、模拟器运行和基础的项目配置。
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="md:w-1/2 flex md:justify-end">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm md:text-right w-full md:w-5/6">
                  <h3 className="text-xl font-bold mb-2">3. UI 框架</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    学习 UIKit 或
                    SwiftUI，理解视图层级、生命周期、布局系统与事件响应。
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-ios-orange text-white flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white dark:border-gray-900 z-10 shrink-0">
                3
              </div>
              <div className="md:w-1/2"></div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 flex-col-reverse md:flex-row">
              <div className="md:w-1/2"></div>
              <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl shadow-lg border-4 border-white dark:border-gray-900 z-10 shrink-0">
                4
              </div>
              <div className="md:w-1/2 flex md:justify-start">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-left w-full md:w-5/6">
                  <h3 className="text-xl font-bold mb-2">4. 实战开发</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    通过 Todo
                    List、网络请求等实战案例，串联知识点，构建完整的原生应用。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
