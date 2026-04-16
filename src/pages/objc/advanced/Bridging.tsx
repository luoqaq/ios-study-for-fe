import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function Bridging() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">🌉 Objective-C 与 Swift 桥接进阶</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        老项目引入 Swift、Swift 项目复用 OC 库，桥接是逃不开的必修课。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>
        <p>
          前端很少有"两种语言在同一个项目里混写"的场景，但 iOS 中非常常见。
          很多老项目的基础架构是 OC，但新功能用 Swift 写；或者 Swift 项目需要接入大量只提供 OC 接口的第三方 SDK。
        </p>

        <h2>Bridging Header：OC 暴露给 Swift</h2>
        <p>
          当你在 Swift 项目中第一次引入 OC 文件时，Xcode 会提示你创建一个 <strong>Bridging Header</strong>（通常叫 <code>ProjectName-Bridging-Header.h</code>）。
          在这个头文件里 <code>#import</code> 你想在 Swift 中使用的 OC 头文件即可。
        </p>

        <CodeCompare
          title="Bridging Header 示例"
          leftLang="objc"
          rightLang="typescript"
          leftCode={`// MyApp-Bridging-Header.h
#import "OldNetworkManager.h"
#import "UserModel.h"
#import <SDWebImage/SDWebImageManager.h>

// Swift 中直接可用
let manager = OldNetworkManager()
manager.fetchData()`}
          rightCode={`// 前端没有直接等价物
// 类似在 TypeScript 项目中通过声明文件 (.d.ts)
// 让 TS 能调用一个 JS 库

declare module 'old-lib' {
  export function fetchData(): Promise<any>;
}`}
        />

        <h2>Swift 暴露给 OC：@objc 和 @objcMembers</h2>
        <p>
          如果你想让 OC 代码调用 Swift 写的类或方法，需要显式标记：
        </p>
        <ul>
          <li><code>@objc</code>：让单个类/方法/属性对 OC 可见</li>
          <li><code>@objcMembers</code>：让类中所有成员默认对 OC 可见</li>
        </ul>

        <CodeCompare
          title="Swift 暴露给 OC"
          leftLang="swift"
          rightLang="objc"
          leftCode={`import Foundation

@objc public class SwiftLogger: NSObject {
    @objc public func log(message: String) {
        print(message)
    }
}`}
          rightCode={`// Objective-C 中调用 Swift
SwiftLogger *logger = [[SwiftLogger alloc] init];
[logger logWithMessage:@"Hello from OC"];`}
        />

        <TipBox type="warning" title="Swift 特有类型无法直接暴露给 OC">
          Swift 的枚举（带关联值）、元组、泛型、结构体等，OC 是看不懂的。
          如果要跨语言调用，参数和返回值必须是可以映射到 OC 的类型（如 NSString、NSArray、NSInteger 等）。
        </TipBox>

        <h2>混编项目的常见陷阱</h2>
        <ul>
          <li><strong>命名冲突：</strong> Swift 和 OC 中类名重复会导致编译错误</li>
          <li><strong>循环引用：</strong> 闭包回调中尤其要注意 OC Block 和 Swift Closure 的互相持有</li>
          <li><strong>空值安全：</strong> Swift 的可选型（Optional）映射到 OC 时，需要显式标注 <code>_Nullable / _Nonnull</code></li>
          <li><strong>模块导入：</strong> 纯 Swift 框架在 OC 中通过 <code>@import MySwiftModule;</code> 导入</li>
        </ul>

        <h2>Nullability 标注</h2>
        <p>
          为了让 Swift 正确识别 OC 指针是否可为 nil，需要在 OC 头文件中使用 nullability 标注：
        </p>
        <pre><code>// OldManager.h
NS_ASSUME_NONNULL_BEGIN

@interface OldManager : NSObject
- (NSString *)fetchUserName:(NSInteger)userId;
- (nullable NSDictionary *)configForKey:(NSString *)key;
@end

NS_ASSUME_NONNULL_END</code></pre>

        <TipBox type="info" title="混编是过渡态，但会持续很久">
          不要幻想一夜之间把 OC 项目全部重写成 Swift。正确的策略是：新模块用 Swift，老模块逐步重构，桥接层保持稳定。
        </TipBox>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/spm-vs-cocoapods"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← SPM vs CocoaPods
        </Link>
        <Link
          to="/objc-maintenance/advanced/refactoring"
          className="flex items-center gap-2 font-medium text-ios-blue hover:underline"
        >
          下一篇：老项目重构策略 →
        </Link>
      </div>
    </div>
  );
}
