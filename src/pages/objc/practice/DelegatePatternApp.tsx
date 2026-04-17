import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function DelegatePatternApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📨 实战：Objective-C Delegate 模式</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        用 Delegate 实现一个自定义弹窗组件，理解 OC 中最核心的设计模式之一。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>需求描述</h2>
        <p>
          实现一个自定义的确认弹窗（CustomAlertView），包含标题、内容和"确定"/"取消"两个按钮。
          点击按钮后，通过 Delegate 把事件传回给调用方（ViewController）。
        </p>

        <h2>Step 1：定义 Delegate 协议</h2>
        <p>
          在 OC 中，协议（Protocol）用来声明一组方法规范。
          我们的弹窗需要让调用方知道用户点击了确定还是取消。
        </p>

        <CodeCompare
          title="Delegate 协议定义"
          leftLang="objc"
          rightLang="typescript"
          leftCode={`// CustomAlertView.h
#import <UIKit/UIKit.h>

@protocol CustomAlertViewDelegate <NSObject>
- (void)alertViewDidConfirm:(UIView *)alertView;
@optional
- (void)alertViewDidCancel:(UIView *)alertView;
@end

@interface CustomAlertView : UIView
@property (nonatomic, weak) id<CustomAlertViewDelegate> delegate;
- (void)showInView:(UIView *)parentView;
@end`}
          rightCode={`// TypeScript 接口类比
interface AlertViewDelegate {
    onConfirm(alertView: HTMLElement): void;
    onCancel?(alertView: HTMLElement): void;
}

class CustomAlertView {
    delegate: AlertViewDelegate;
    showInView(parent: HTMLElement) { }
}`}
        />

        <h2>Step 2：实现弹窗并触发 Delegate</h2>
        <p>
          在弹窗的按钮点击事件里，检查 delegate 是否实现了对应方法，然后调用它。
          注意：Delegate 属性必须声明为 <code>weak</code>，否则会造成循环引用。
        </p>

        <pre><code className="language-objc">{`// CustomAlertView.m
#import "CustomAlertView.h"

@implementation CustomAlertView

- (void)confirmButtonTapped {
    if ([self.delegate respondsToSelector:@selector(alertViewDidConfirm:)]) {
        [self.delegate alertViewDidConfirm:self];
    }
    [self removeFromSuperview];
}

- (void)cancelButtonTapped {
    if ([self.delegate respondsToSelector:@selector(alertViewDidCancel:)]) {
        [self.delegate alertViewDidCancel:self];
    }
    [self removeFromSuperview];
}

@end`}</code></pre>

        <h2>Step 3：调用方实现 Delegate</h2>
        <p>
          ViewController 遵循 <code>CustomAlertViewDelegate</code> 协议，
          设置自己为弹窗的 delegate，然后处理回调。
        </p>

        <pre><code className="language-objc">{`// ViewController.m
#import "ViewController.h"
#import "CustomAlertView.h"

@interface ViewController () <CustomAlertViewDelegate>
@end

@implementation ViewController

- (void)showAlert {
    CustomAlertView *alert = [[CustomAlertView alloc] init];
    alert.delegate = self;
    [alert showInView:self.view];
}

#pragma mark - CustomAlertViewDelegate

- (void)alertViewDidConfirm:(UIView *)alertView {
    NSLog(@"用户点击了确定");
    // 执行删除、提交等操作
}

- (void)alertViewDidCancel:(UIView *)alertView {
    NSLog(@"用户点击了取消");
}

@end`}</code></pre>

        <TipBox type="warning" title="Delegate 必须是 weak">
          如果把 delegate 写成 strong，ViewController 持有弹窗，弹窗又强引用 ViewController，就会形成循环引用，
          导致页面返回后对象无法释放。
        </TipBox>

        <h2>前端对比</h2>
        <p>
          前端中类似的概念是回调函数（callback）或事件监听（addEventListener）。
          OC 的 Delegate 模式更正式：它通过协议明确了调用方必须实现哪些方法，
          并且利用 <code>respondsToSelector:</code> 实现了可选方法（类似 TypeScript 的可选属性）。
        </p>

        <h2>常见变体</h2>
        <ul>
          <li><strong>UITableViewDelegate / UITableViewDataSource：</strong> 最经典的 Delegate 应用</li>
          <li><strong>NSURLConnectionDelegate（已废弃）：</strong> 网络请求的状态回调</li>
          <li><strong>CLLocationManagerDelegate：</strong> 定位权限和位置更新回调</li>
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/delegate"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Delegate 委托
        </Link>
        <Link
          to="/objc-maintenance"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          返回 OC 维护总览 →
        </Link>
      </div>
    </div>
  );
}
