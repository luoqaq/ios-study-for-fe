import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Delegate() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 Delegate 委托模式</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        最最最重要的 iOS 设计模式：不要自己动手，雇个代理帮你干活。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="🤝"
          title="把回调函数打包成一个对象"
          description="如果你写过 Vue 或 React，你会通过 `@click='handleClick'` 传递一个回调函数给子组件。但在 iOS 中，列表滚动、按钮点击，往往不是传递孤立的闭包，而是传递一个完整的『对象指针』，这个对象被称为 Delegate（代理/委托）。"
          frontend-ref="相当于 React 中把包含多个回调函数（onSuccess, onError, onProgress）的 this 直接传给子组件，子组件通过调用 this.onSuccess() 告诉父组件发生了什么。"
        />

        <h2>一图看懂 Delegate 模式的运作流程</h2>
        <p>
          在 Delegate 模式中，有两个核心角色：
          <br />1. <strong>委托方 (Delegator / 老板)：</strong> 遇到自己不想干（或干不了）的事情时，定义好规则，然后把任务甩给代理。
          <br />2. <strong>代理方 (Delegate / 员工)：</strong> 按照老板定好的规则（协议），实现具体的业务逻辑。
        </p>

        <div className="my-8 rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center overflow-x-auto">
          <svg width="600" height="320" viewBox="0 0 600 320" className="text-gray-800 dark:text-gray-200">
            {/* Definer / Delegator Box */}
            <rect x="40" y="40" width="200" height="240" rx="8" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-ios-blue"/>
            <text x="140" y="25" textAnchor="middle" className="font-bold fill-current" fontSize="14">委托方 (Downloader)</text>
            
            <rect x="60" y="60" width="160" height="40" rx="4" className="fill-ios-blue" />
            <text x="140" y="85" textAnchor="middle" className="fill-white font-semibold text-xs">1. 制定招人协议</text>
            
            <rect x="60" y="110" width="160" height="40" rx="4" className="fill-ios-blue opacity-80" />
            <text x="140" y="135" textAnchor="middle" className="fill-white font-semibold text-xs">2. 留出 delegate 空位</text>
            
            <rect x="60" y="220" width="160" height="40" rx="4" className="fill-ios-blue" />
            <text x="140" y="245" textAnchor="middle" className="fill-white font-semibold text-xs">4. 干完活，丢给 delegate</text>

            {/* Receiver / Delegate Box */}
            <rect x="360" y="40" width="200" height="240" rx="8" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-ios-green"/>
            <text x="460" y="25" textAnchor="middle" className="font-bold fill-current" fontSize="14">代理方 (ViewController)</text>
            
            <rect x="380" y="110" width="160" height="40" rx="4" className="fill-ios-green" />
            <text x="460" y="135" textAnchor="middle" className="fill-white font-semibold text-xs">3. dl.delegate = self (应聘)</text>

            <rect x="380" y="220" width="160" height="40" rx="4" className="fill-ios-green opacity-80" />
            <text x="460" y="245" textAnchor="middle" className="fill-white font-semibold text-xs">5. 收到数据，更新 UI</text>

            {/* Arrows */}
            <path d="M 380 130 L 230 130" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="305" y="120" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-xs italic">认领任务</text>

            <path d="M 140 160 L 140 210" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" markerEnd="url(#arrow)" />
            <text x="175" y="190" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-xs">下载中...</text>

            <path d="M 230 240 L 370 240" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="300" y="230" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400 text-xs italic">触发回调</text>

            {/* SVG Definitions for Arrowhead */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </div>

        <h2>完整代码实战：写一个图片下载器</h2>
        <p>我们用一个完整的图片下载器的例子，严格区分<strong>“定义方/委托方”</strong>和<strong>“接收方/代理方”</strong>的代码。</p>

        <h3>第一步：在委托方（老板）的代码里制定规则</h3>

        <CodeCompare
          title="Downloader.h / Downloader.m"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// ========================================
// Downloader.h (委托方头文件)
// ========================================
#import <Foundation/Foundation.h>

// 1. 制定协议 (合同)：你想当我的代理，就必须实现这几个方法
@protocol DownloaderDelegate <NSObject>

// 必选方法：下载成功
- (void)downloader:(id)downloader didFinishWithData:(NSData *)data;

@optional
// 可选方法：下载失败
- (void)downloader:(id)downloader didFailWithError:(NSError *)error;

@end

@interface Downloader : NSObject

// 2. 留一个工位保存代理人 (必须用 weak！)
@property (nonatomic, weak) id<DownloaderDelegate> delegate;

- (void)startDownloadURL:(NSString *)url;

@end

// ========================================
// Downloader.m (委托方实现)
// ========================================
#import "Downloader.h"

@implementation Downloader

- (void)startDownloadURL:(NSString *)url {
    NSLog(@"开始下载：%@", url);
    
    // 模拟 2 秒后下载完成
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
        
        NSData *mockData = [@"Image Data" dataUsingEncoding:NSUTF8StringEncoding];
        
        // 3. 检查代理在不在？代理有没有实现这个方法？
        if (self.delegate && [self.delegate respondsToSelector:@selector(downloader:didFinishWithData:)]) {
            
            // 4. 把活甩给代理干！(通常把自己 self 也传过去，方便代理区分是哪个下载器)
            [self.delegate downloader:self didFinishWithData:mockData];
        }
    });
}
@end`}
          rightCode={`// JavaScript (回调函数的实现方式)
// 前端不需要定义复杂的协议接口，直接约定好回调参数即可

class Downloader {
    constructor() {
        // 对应 OC 的 delegate，前端直接存几个 Function
        this.onSuccess = null; 
        this.onError = null;
    }

    startDownloadURL(url) {
        console.log(\`开始下载: \${url}\`);
        
        // 模拟 2 秒后完成
        setTimeout(() => {
            const mockData = "Image Data";
            
            // 触发回调
            if (typeof this.onSuccess === "function") {
                this.onSuccess(this, mockData);
            }
        }, 2000);
    }
}`}
        />

        <h3>第二步：在代理方（员工）的代码里实现逻辑</h3>

        <CodeCompare
          title="ViewController.m"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// ========================================
// ViewController.m (代理方)
// ========================================
#import "ViewController.h"
#import "Downloader.h"

// 5. 声明自己遵守这套协议
@interface ViewController () <DownloaderDelegate>
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 实例化下载器
    Downloader *dl = [[Downloader alloc] init];
    
    // 6. 认领任务：把下载器的代理设置为自己！
    dl.delegate = self; 
    
    [dl startDownloadURL:@"https://apple.com/logo.png"];
}

// 7. 乖乖实现协议里约定的方法
- (void)downloader:(id)downloader didFinishWithData:(NSData *)data {
    NSString *str = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    NSLog(@"ViewController 收到数据了：%@", str);
    // 在这里更新 UI 界面...
}

// 可选方法，想写就写
- (void)downloader:(id)downloader didFailWithError:(NSError *)error {
    NSLog(@"下载惨遭失败");
}

@end`}
          rightCode={`// JavaScript
class ViewController {
    viewDidLoad() {
        const dl = new Downloader();
        
        // 把当前类的箭头函数传进去 (绑定 this)
        dl.onSuccess = (downloader, data) => {
            console.log(\`ViewController 收到数据了: \${data}\`);
            // 在这里更新 UI 界面...
        };
        
        dl.onError = (downloader, error) => {
            console.log("下载惨遭失败");
        };
        
        dl.startDownloadURL("https://apple.com/logo.png");
    }
}`}
        />

        <h2>这句咒语到底是什么意思？</h2>
        <p>很多新手会对委托方里的这行代码感到一头雾水：<br/><code>@property (nonatomic, weak) id&lt;DownloaderDelegate&gt; delegate;</code></p>
        <p>我们把它拆开来，用前端熟悉的 TypeScript 翻译一下：</p>
        <ul>
          <li><strong><code>@property</code>：</strong> 这是在声明一个属性。</li>
          <li><strong><code>(nonatomic, weak)</code>：</strong> 属性修饰符。<code>nonatomic</code> 表示非原子性（性能更好）；<code>weak</code> 表示这是一个<strong>弱引用</strong>，不会增加对象的引用计数（防止和 ViewController 互相强引用导致内存泄漏）。</li>
          <li><strong><code>id</code>：</strong> OC 里的 <code>any</code>，表示它可以是任何类型的对象（只要是个对象就行，不限制是哪个具体的 Class）。</li>
          <li><strong><code>&lt;DownloaderDelegate&gt;</code>：</strong> 这是类型约束，尖括号在这里不是泛型，而是代表<strong>“遵循某某协议”</strong>。它告诉编译器：“我不管你是谁（id），但你必须实现了 DownloaderDelegate 协议里的方法，否则不许给你赋值”。</li>
          <li><strong><code>delegate</code>：</strong> 属性的名字。</li>
        </ul>
        <p>所以，这句代码翻译成大白话就是：<br/><strong>“我要保存一个叫 delegate 的弱指针，我不关心你是谁（id），但你必须答应我会干 DownloaderDelegate 里的活儿（&lt;...&gt;）。”</strong></p>

        <TipBox type="danger" title="为什么 delegate 必须是 weak？">
          如果不小心写成了 <code>strong</code>：<br/>
          在 <code>ViewController</code> 中，你创建了 <code>Downloader</code>（你<strong>强引用</strong>了它）。<br/>
          当你写了 <code>dl.delegate = self;</code>，此时下载器也<strong>强引用</strong>了你。<br/>
          你们俩就构成了著名的<strong>循环引用死结</strong>！所以代理属性必须是 <code>weak</code>。
        </TipBox>

        <h2>为什么 Apple 那么喜欢 Delegate？</h2>
        <p>
          相比于 JS 满天飞的闭包（导致恶心的回调地狱 Callback Hell），Delegate 模式强制你将代码组织在类的一级方法中。这带来几个好处：
        </p>
        <ol>
          <li><strong>协议签名极度明确：</strong> 参数叫什么，类型是什么，一目了然，甚至比 TypeScript 还要清晰。</li>
          <li><strong>代码结构扁平化：</strong> 无论逻辑多复杂，回调都在外层方法里，不会越嵌套越深。</li>
          <li><strong>双向沟通 (DataSource)：</strong> 代理不仅可以用来接收通知（“下载完成了”），还可以用来给组件<strong>提供数据</strong>（“列表的第 5 行要显示什么？”）。iOS 的虚拟列表 <code>UITableView</code> 也是通过这种 <code>DataSource</code> 代理模式驱动的。</li>
        </ol>

      </div>

      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          to="/objc-maintenance/advanced/kvo"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← 键值观察 KVO
        </Link>
        <Link
          to="/objc-maintenance/advanced/notification"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：通知中心 →
        </Link>
      </div>
    </div>
  );
}
