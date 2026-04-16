import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function Testing() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🧪 单元测试与 UI 测试</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        测试不是项目收尾的"附加项"，而是保证重构勇气和代码质量的底线。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端有 Jest（单元测试）、React Testing Library（组件测试）、Cypress/Playwright（E2E）。
          iOS 中对应的测试分层是：
        </p>
        <ul>
          <li><strong>Unit Tests (XCTest)：</strong> 对应 Jest，测函数、模型、ViewModel</li>
          <li><strong>UI Tests (XCUITest)：</strong> 对应 Cypress/Playwright，模拟用户点击和界面断言</li>
          <li><strong>Performance Tests：</strong> iOS 特有的性能基准测试</li>
        </ul>

        <h2>单元测试：XCTest 入门</h2>
        <p>
          XCTest 是 Apple 提供的标准测试框架。测试类继承 <code>XCTestCase</code>，测试方法以 <code>test</code> 开头。
        </p>

        <CodeCompare
          title="简单的单元测试对比"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`import XCTest
@testable import MyApp

class CalculatorTests: XCTestCase {
    func testAddition() {
        let calc = Calculator()
        XCTAssertEqual(calc.add(2, 3), 5)
    }
    
    func testDivisionByZeroThrows() {
        let calc = Calculator()
        XCTAssertThrowsError(try calc.divide(10, 0))
    }
}`}
          rightCode={`// Jest
import { Calculator } from './calculator';

describe('Calculator', () => {
  test('addition', () => {
    const calc = new Calculator();
    expect(calc.add(2, 3)).toBe(5);
  });

  test('division by zero throws', () => {
    const calc = new Calculator();
    expect(() => calc.divide(10, 0)).toThrow();
  });
});`}
        />

        <h2>常见断言方法</h2>
        <ul>
          <li><code>XCTAssertEqual(a, b)</code>：相等断言</li>
          <li><code>XCTAssertTrue / XCTAssertFalse</code>：布尔断言</li>
          <li><code>XCTAssertNil / XCTAssertNotNil</code>：空值断言</li>
          <li><code>XCTAssertThrowsError</code>：异常断言</li>
        </ul>

        <h2>UI 测试：XCUITest</h2>
        <p>
          XCUITest 在独立的进程里运行，通过 Accessibility 标识找到界面元素并模拟交互。
          前端开发者可以把它理解成 iOS 版的 Playwright。
        </p>

        <CodeCompare
          title="UI 测试对比"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`func testLoginFlow() throws {
    let app = XCUIApplication()
    app.launch()
    
    // 找到输入框并输入
    app.textFields["username"].tap()
    app.textFields["username"].typeText("admin")
    
    // 点击登录按钮
    app.buttons["loginButton"].tap()
    
    // 断言首页标题出现
    XCTAssertTrue(app.staticTexts["Welcome"].waitForExistence(timeout: 5))
}`}
          rightCode={`// Playwright
test('login flow', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="username"]', 'admin');
  await page.click('[data-testid="loginButton"]');
  await expect(page.locator('text=Welcome')).toBeVisible();
});`}
        />

        <TipBox type="tip" title="给关键元素加 Accessibility Identifier">
          UI 测试最稳定的定位方式不是文字内容，而是 <code>accessibilityIdentifier</code>。
          这和前端给元素加 <code>data-testid</code> 是一个道理。
        </TipBox>

        <h2>测试策略建议</h2>
        <ul>
          <li><strong>单元测试优先覆盖：</strong> 数据模型解析、网络层封装、工具函数、ViewModel 逻辑</li>
          <li><strong>UI 测试优先覆盖：</strong> 核心用户路径（登录 → 首页 → 下单 → 支付）</li>
          <li><strong>不要测系统框架：</strong> 不要写测试验证 <code>URLSession</code> 能不能发请求，测你自己的封装层即可</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/advanced/architecture"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 架构选型
        </Link>
        <Link
          to="/advanced/distribution"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：签名、打包与发布 →
        </Link>
      </div>
    </div>
  );
}
