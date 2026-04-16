import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Hammer, Layers3, Wrench } from "lucide-react";
import { nav } from "@/data/config";

const stages = [
  {
    badge: "L1",
    title: "入门认知",
    desc: "完成前端到 iOS 的心智切换，先看懂工具链、内存模型和运行时差异。",
    path: "/roadmap",
    outcome: "学完后能看懂 iOS 基本概念和工程入口",
  },
  {
    badge: "L2",
    title: "页面开发",
    desc: "先把 Xcode 和 UIKit 跑通，能做列表、导航、简单表单和页面跳转。",
    path: "/starter",
    outcome: "学完后能独立完成基础页面需求",
  },
  {
    badge: "L3",
    title: "业务进阶",
    desc: "进入 Swift、并发、网络请求和 SwiftUI，补齐现代 iOS 开发主线。",
    path: "/swift",
    outcome: "学完后能完成中等复杂度业务模块",
  },
  {
    badge: "L4",
    title: "OC 维护",
    desc: "针对 UIKit/Objective-C 历史项目，重点理解 Delegate、KVO、ARC 和常见包袱。",
    path: "/objc-maintenance",
    outcome: "学完后能接手老项目并定位常见问题",
  },
  {
    badge: "L5",
    title: "高级开发",
    desc: "从实现需求升级到架构、性能、稳定性与发布治理。",
    path: "/advanced",
    outcome: "学完后具备中高级 iOS 工程能力",
  },
];

const focusAreas = [
  {
    icon: <BookOpen className="h-5 w-5 text-ios-blue" />,
    title: "成长地图优先",
    desc: "不是直接扔给你一堆语法点，而是先告诉你学习顺序和阶段目标。",
  },
  {
    icon: <Hammer className="h-5 w-5 text-ios-green" />,
    title: "先能做业务",
    desc: "UIKit、导航、列表、网络请求这些能直接落地到工作里的内容优先。",
  },
  {
    icon: <Layers3 className="h-5 w-5 text-ios-orange" />,
    title: "兼顾现代与历史",
    desc: "Swift 和 SwiftUI 负责未来，Objective-C 和 UIKit 负责现实维护。",
  },
  {
    icon: <Wrench className="h-5 w-5 text-red-500" />,
    title: "对准老项目维护",
    desc: "OC、Delegate、KVO、ARC 不是选修，而是维护老项目的刚需能力。",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full max-w-6xl px-4 py-16 md:py-24">
        <div className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-12 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 md:px-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-ios-blue">
              Front-End To iOS Roadmap
            </p>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-6xl">
              从前端视角学习 iOS，
              <br />
              目标不是入门，而是能维护、能进阶、能走到高级开发。
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              这个项目现在被重构成一条阶段化成长路线：先完成认知迁移，再掌握
              Xcode 和 UIKit 基础，然后进入 Swift / SwiftUI，最后补齐
              Objective-C 老项目维护与工程化能力。
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/roadmap"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ios-blue px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg"
              >
                先看成长地图
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/objc-maintenance"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                直接看 OC 维护路线
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-6xl px-4 pb-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800">
                {item.icon}
              </div>
              <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl px-4 pb-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ios-blue">
              Stage Map
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              分阶段学习，而不是按目录硬啃
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {stages.map((stage) => (
            <Link
              key={stage.title}
              to={stage.path}
              className="group flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-ios-blue/40 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-ios-blue/40"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold tracking-[0.18em] text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {stage.badge}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-ios-blue" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {stage.title}
              </h3>
              <p className="mb-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                {stage.desc}
              </p>
              <div className="mt-auto rounded-2xl bg-gray-50 px-4 py-4 text-sm font-medium leading-7 text-gray-700 dark:bg-gray-800/70 dark:text-gray-300">
                {stage.outcome}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full max-w-6xl px-4 pb-24">
        <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                当前站点的新入口
              </h2>
              <p className="mt-3 text-base leading-8 text-gray-600 dark:text-gray-400">
                第一轮调整先把站点的导航语义改对。旧文章还保留，但顶部导航和首页已经切换成阶段型入口，后面会继续补 UIKit、OC 维护和高级进阶缺失内容。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:w-[28rem]">
              {nav.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className="rounded-2xl border border-gray-200 px-4 py-4 transition-colors hover:border-ios-blue hover:bg-blue-50/60 dark:border-gray-800 dark:hover:border-ios-blue dark:hover:bg-gray-800"
                >
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {item.text}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {item.summary}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
