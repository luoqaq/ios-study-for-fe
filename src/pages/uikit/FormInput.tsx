import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function FormInputIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">表单与输入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        登录页、搜索页、编辑页、发布页，本质上都绕不开输入和键盘。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>为什么这部分要单独讲</h2>
        <p>
          前端同学往往低估 iOS 输入的复杂度。浏览器里一个 input
          已经帮你兜了很多事，但在原生里你需要明确处理：
        </p>
        <ul>
          <li>输入框焦点切换</li>
          <li>键盘弹出遮挡</li>
          <li>提交按钮状态</li>
          <li>表单校验</li>
          <li>多输入项联动</li>
        </ul>

        <TipBox type="warning" title="键盘不是浏览器默认帮你处理的">
          原生页面经常会遇到“键盘弹出把输入框遮住”“滚动区域没有顶起来”“返回时焦点状态不对”这类问题。它们都属于业务开发高频问题。
        </TipBox>

        <h2>建议学习顺序</h2>
        <ol>
          <li>`UITextField` / `UITextView` 基础</li>
          <li>delegate 回调</li>
          <li>键盘通知</li>
          <li>滚动容器中的输入处理</li>
          <li>表单校验与提交流程</li>
        </ol>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/uikit/collection-view" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← UICollectionView
        </Link>
        <Link
          to="/uikit/practice/todo-app"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          进入 UIKit 实战 →
        </Link>
      </div>
    </div>
  );
}
