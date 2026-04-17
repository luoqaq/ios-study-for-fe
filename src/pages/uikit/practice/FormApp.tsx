import { Link } from "react-router-dom";
import TipBox from "@/components/TipBox";

export default function FormApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📝 实战：UIKit 表单案例</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        从登录页到资料编辑页，把表单流程完整地跑通一次。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>📋 需求描述</h2>
        <p>
          实现一个包含用户名、密码、确认密码、手机号四个输入框的注册页面。
          要求：键盘随输入框自动避让、实时校验格式、提交前检查完整性、提交时显示加载状态。
        </p>

        <h2>前端视角：对应的概念</h2>
        <ul>
          <li>
            <strong>输入框：</strong> 对应 <code>UITextField</code>（单行）或 <code>UITextView</code>（多行）。
            和 HTML 的 <code>&lt;input&gt;</code> 类似，但需要手动设置 placeholder、键盘类型、安全输入等。
          </li>
          <li>
            <strong>键盘避让：</strong> 前端靠 CSS <code>position: fixed</code> 或第三方库处理。
            iOS 中需要监听 <code>UIKeyboardWillShowNotification</code>，动态调整滚动容器的 contentInset。
          </li>
          <li>
            <strong>表单校验：</strong> 前端常用 Formik / VeeValidate。
            iOS 中一般自己写正则或封装一个轻量 Validator，在 <code>textFieldDidEndEditing</code> 或 <code>editingChanged</code> 事件里触发。
          </li>
          <li>
            <strong>提交状态：</strong> 前端用按钮的 disabled + loading 图标。
            iOS 中同样给 <code>UIButton</code> 设置 <code>isEnabled</code> 并替换为 Activity Indicator。
          </li>
        </ul>

        <h2>🎯 实现要点</h2>

        <h3>1. 监听键盘通知</h3>
        <pre><code>{`NotificationCenter.default.addObserver(
    self,
    selector: #selector(keyboardWillShow),
    name: UIResponder.keyboardWillShowNotification,
    object: nil
)`}</code></pre>
        <p>在 <code>keyboardWillShow</code> 方法里获取键盘高度，调整 ScrollView 的 <code>contentInset.bottom</code>，让当前聚焦的输入框不被遮挡。</p>

        <h3>2. 实时校验与错误提示</h3>
        <p>
          给 TextField 添加 <code>.editingChanged</code> 事件，在用户每次输入时检查格式。
          错误提示可以用一个小 Label 放在输入框下方，控制其 <code>isHidden</code> 和 <code>text</code>。
        </p>

        <h3>3. 点击空白处收起键盘</h3>
        <pre><code>{`override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
    view.endEditing(true)
}`}</code></pre>
        <p>这是提升表单体验的必备细节，和前端给 document 添加 click 事件收起键盘一个道理。</p>

        <TipBox type="warning" title="不要忽略密码安全输入">
          密码输入框必须设置 <code>textField.isSecureTextEntry = true</code>。
          同时建议关闭自动纠正（<code>autocorrectionType = .no</code>）和自动大写（<code>autocapitalizationType = .none</code>）。
        </TipBox>

        <h2>进阶思考</h2>
        <p>
          真实项目里，表单往往更复杂：联动选择器、日期选择器、图片上传、分步表单。
          这些内容在 UIKit 中都需要组合多个控件和代理协议来完成。
          如果项目支持 iOS 16+，用 SwiftUI 的 <code>Form</code> 会省力很多。
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/uikit/gestures"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 手势与触摸事件
        </Link>
        <Link
          to="/uikit/animation"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：动画与转场 →
        </Link>
      </div>
    </div>
  );
}
