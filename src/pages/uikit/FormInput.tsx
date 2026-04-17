import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function FormInputIntro() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">表单与输入</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        登录页、搜索页、编辑页、发布页，本质上都绕不开输入和键盘。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端一个 <code>&lt;input&gt;</code> 就能搞定的事情，在 iOS 原生里需要拆成：
          输入控件（UITextField / UITextView）、Delegate 回调、键盘通知、滚动避让。
          这是因为 iOS 没有浏览器帮你兜底键盘行为。
        </p>

        <h2>UITextField vs UITextView</h2>
        <ul>
          <li><strong>UITextField：</strong> 单行输入，带占位符（placeholder），适合用户名、密码、搜索框</li>
          <li><strong>UITextView：</strong> 多行输入，支持滚动，适合评论、备注、内容编辑</li>
        </ul>

        <CodeCompare
          title="基础输入控件对比"
          leftLang="swift"
          rightLang="html"
          leftCode={`// Swift: UITextField
let textField = UITextField()
textField.placeholder = "请输入用户名"
textField.borderStyle = .roundedRect
textField.keyboardType = .emailAddress
textField.returnKeyType = .next

// 设置委托
textField.delegate = self`}
          rightCode={`<!-- HTML / React -->
<input
  type="email"
  placeholder="请输入用户名"
/>`}
        />

        <h2>Delegate：监听输入变化</h2>
        <p>
          UITextField 的 <code>UITextFieldDelegate</code> 提供了多个钩子，
          让你能在用户开始编辑、结束编辑、点击回车、文本变化时插入自定义逻辑。
        </p>
        <pre><code className="language-swift">{`extension ViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        // 点击回车时切换到下一个输入框
        if textField == usernameField {
            passwordField.becomeFirstResponder()
        } else {
            textField.resignFirstResponder() // 收起键盘
        }
        return true
    }
    
    func textField(
        _ textField: UITextField, 
        shouldChangeCharactersIn range: NSRange, 
        replacementString string: String
    ) -> Bool {
        // 可以在这里做输入限制，比如只允许输入数字
        return true
    }
}`}</code></pre>

        <h2>键盘通知：处理弹出与遮挡</h2>
        <p>
          当键盘弹出时，iOS 会发送 <code>UIResponder.keyboardWillShowNotification</code> 通知。
          你需要监听这个通知，计算键盘高度，然后调整你的 ScrollView 或页面布局，避免输入框被键盘挡住。
        </p>

        <CodeCompare
          title="键盘避让处理"
          leftLang="swift"
          rightLang="css"
          leftCode={`// 注册键盘通知
NotificationCenter.default.addObserver(
    self,
    selector: #selector(keyboardWillShow),
    name: UIResponder.keyboardWillShowNotification,
    object: nil
)

@objc func keyboardWillShow(_ notification: Notification) {
    guard let userInfo = notification.userInfo,
          let frame = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect
    else { return }
    
    let keyboardHeight = frame.height
    scrollView.contentInset.bottom = keyboardHeight
    scrollView.scrollIndicatorInsets.bottom = keyboardHeight
}`}
          rightCode={`/* 浏览器自动处理键盘避让 */
input {
    scroll-margin-bottom: 20px;
}`}
        />

        <TipBox type="warning" title="不要忘记移除通知监听">
          在 <code>deinit</code> 或页面消失时，记得移除键盘通知的观察者，否则会造成内存泄漏或重复响应。
        </TipBox>

        <h2>焦点管理与用户体验</h2>
        <ul>
          <li><code>becomeFirstResponder()</code>：让输入框获得焦点并弹出键盘</li>
          <li><code>resignFirstResponder()</code>：让输入框失去焦点并收起键盘</li>
          <li>点击空白区域收起键盘：给背景 View 添加 TapGesture，调用 <code>endEditing(true)</code></li>
        </ul>

        <h2>常见业务场景</h2>
        <table>
          <thead>
            <tr>
              <th>场景</th>
              <th>关键处理</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>登录页</td><td>用户名 → 密码 → 回车登录，键盘避让</td></tr>
            <tr><td>搜索页</td><td>实时联想、清空按钮、搜索历史</td></tr>
            <tr><td>表单页</td><td>多字段校验、错误提示、提交按钮状态联动</td></tr>
            <tr><td>评论页</td><td>UITextView、字数限制、表情键盘切换</td></tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link to="/uikit/collection-view" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
          ← UICollectionView
        </Link>
        <Link
          to="/uikit/compositional-layout"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：复杂列表布局 →
        </Link>
      </div>
    </div>
  );
}
