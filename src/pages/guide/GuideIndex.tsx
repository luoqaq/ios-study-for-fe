import { Link } from "react-router-dom";

export default function GuideIndex() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">学习指南</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从前端转向 iOS 开发的系统路线图。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么要有这份指南？</h2>
        <p>
          作为前端开发者，你已经掌握了 UI
          渲染、事件响应、异步网络请求等核心概念。然而，iOS
          开发的世界在语言（Objective-C /
          Swift）、内存管理（ARC）以及生命周期上有着自己独特的设计。
        </p>
        <p>
          传统的 iOS 教程通常预设读者是纯新手或是从 C/C++
          转来的后端开发者，因此会花大量篇幅讲解什么是变量、什么是函数。
          本指南假定你已经是一名合格的前端工程师，我们将通过{" "}
          <strong>“对比类比”</strong> 的方式， 将 iOS 的概念映射到你熟悉的
          JavaScript / TypeScript 概念上，帮你十倍速上手。
        </p>

        <h2>学习路线建议</h2>

        <h3>1. 了解基础与环境</h3>
        <ul>
          <li>
            阅读 <Link to="/roadmap/before-start">开始之前</Link>
            ，建立正确的心智模型。
          </li>
          <li>
            浏览 <Link to="/starter">开发起步</Link>，熟悉开发工具。
          </li>
        </ul>

        <h3>2. 选择一门主力语言</h3>
        <p>iOS 开发目前面临 Objective-C 和 Swift 双语言并存的局面：</p>
        <ul>
          <li>
            <strong>如果你维护老项目：</strong> 必须学习{" "}
            <Link to="/objc-maintenance">Objective-C</Link>，它是支撑大量国民级应用的基础。
          </li>
          <li>
            <strong>如果你开发新项目：</strong> 强烈推荐学习{" "}
            <Link to="/swift">Swift</Link>，它的语法非常现代化，你会觉得它像
            TypeScript 的表亲。
          </li>
        </ul>

        <h3>3. 动手实践</h3>
        <p>
          不要只看不练。进入 <Link to="/uikit">UIKit</Link> 模块，从 Todo
          App 开始， 亲手敲入每一行代码，体会 iOS
          的委托模式（Delegate）和视图控制器（ViewController）是怎么工作的。
        </p>

        <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
          <div></div>
          <Link
            to="/roadmap/before-start"
            className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
          >
            下一篇：开始之前 →
          </Link>
        </div>
      </div>
    </div>
  );
}
