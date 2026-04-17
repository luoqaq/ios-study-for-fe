import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function FormValidationIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">键盘与表单校验</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        会摆输入框只是开始，真正麻烦的是键盘行为、焦点流转和提交校验。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>这部分为什么值得单独讲</h2>
        <p>
          登录、搜索、发布、资料编辑，这些页面看起来简单，但最容易出现体验 bug：
          键盘遮挡、滚动区域错位、错误提示时机不对、提交按钮状态混乱。
        </p>

        <h2>重点不在控件，在流程</h2>
        <ul>
          <li>输入开始时怎么聚焦</li>
          <li>键盘弹出后页面怎么避让</li>
          <li>何时校验，何时展示错误</li>
          <li>提交中状态如何锁定</li>
        </ul>

        <TipBox type="warning" title="原生表单 bug 往往不是语法问题">
          很多表单问题最后都不是“这个 API 不会用”，而是页面滚动容器、键盘通知、状态同步三者没设计好。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/uikit/compositional-layout" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← 复杂列表布局
        </Link>
        <Link
          to="/uikit/gestures"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：手势与触摸事件 →
        </Link>
      </div>
    </div>
  );
}
