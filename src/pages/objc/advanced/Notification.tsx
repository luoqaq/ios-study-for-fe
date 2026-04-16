import { Link } from "react-router-dom";
import CodeCompare from "@/components/CodeCompare";
import ConceptCard from "@/components/ConceptCard";
import TipBox from "@/components/TipBox";

export default function Notification() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">📱 通知中心</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        NSNotificationCenter：大声广播，谁想听谁听。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>🆚 前端对比概览</h2>

        <ConceptCard
          emoji="📢"
          title="发布 / 订阅模式 (Pub-Sub)"
          description="和 Node.js 里的 EventEmitter，或者浏览器里的 `window.addEventListener('event', cb)` 完全一样。它是一种一对多的全局广播机制。"
          frontend-ref="`[center postNotificationName:]` 等同于 `emit('event')`。`[center addObserver:]` 等同于 `on('event', cb)`。"
        />

        <h2>通知中心的三个角色</h2>
        <p>
          相比于 Delegate（一对一的紧密沟通），通知中心是松耦合的。它包含三个部分：
        </p>

        <div className="my-8 rounded-xl bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 shadow-sm flex justify-center overflow-x-auto">
          <svg width="600" height="260" viewBox="0 0 600 260" className="text-gray-800 dark:text-gray-200">
            
            {/* Sender */}
            <rect x="40" y="40" width="140" height="60" rx="8" className="fill-ios-orange opacity-20" stroke="currentColor" strokeWidth="2" />
            <text x="110" y="65" textAnchor="middle" className="font-bold fill-ios-orange">发送者 (Poster)</text>
            <text x="110" y="85" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">SettingsViewController</text>

            <rect x="40" y="160" width="140" height="60" rx="8" className="fill-ios-orange opacity-20" stroke="currentColor" strokeWidth="2" />
            <text x="110" y="185" textAnchor="middle" className="font-bold fill-ios-orange">系统 (System)</text>
            <text x="110" y="205" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Keyboard 等</text>

            {/* Notification Center */}
            <rect x="260" y="40" width="120" height="180" rx="16" className="fill-ios-blue opacity-10" stroke="currentColor" strokeWidth="2" />
            <text x="320" y="125" textAnchor="middle" className="font-bold fill-ios-blue">通知中心</text>
            <text x="320" y="145" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">单例调度器</text>

            {/* Receivers */}
            <rect x="460" y="40" width="120" height="60" rx="8" className="fill-ios-green opacity-20" stroke="currentColor" strokeWidth="2" />
            <text x="520" y="65" textAnchor="middle" className="font-bold fill-ios-green">接收者 A</text>
            <text x="520" y="85" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">ProfileVC</text>

            <rect x="460" y="160" width="120" height="60" rx="8" className="fill-ios-green opacity-20" stroke="currentColor" strokeWidth="2" />
            <text x="520" y="185" textAnchor="middle" className="font-bold fill-ios-green">接收者 B</text>
            <text x="520" y="205" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">HomeVC</text>

            {/* Arrows Sender -> Center */}
            <path d="M 180 70 L 250 100" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#noti-arrow)" className="text-ios-orange" />
            <text x="215" y="80" textAnchor="middle" className="text-xs fill-ios-orange">post</text>

            <path d="M 180 190 L 250 160" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#noti-arrow)" className="text-ios-orange" />
            <text x="215" y="190" textAnchor="middle" className="text-xs fill-ios-orange">post</text>

            {/* Arrows Center -> Receivers */}
            <path d="M 380 100 L 450 70" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#noti-arrow)" className="text-ios-blue" />
            <text x="415" y="80" textAnchor="middle" className="text-xs fill-ios-blue">广播分发</text>

            <path d="M 380 160 L 450 190" fill="none" stroke="currentColor" strokeWidth="2" markerEnd="url(#noti-arrow)" className="text-ios-blue" />
            <text x="415" y="190" textAnchor="middle" className="text-xs fill-ios-blue">广播分发</text>

            {/* Registration dotted arrows (Reverse) */}
            <path d="M 460 50 Q 320 10 320 40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-ios-green" />
            <text x="400" y="25" textAnchor="middle" className="text-[10px] fill-ios-green">addObserver(注册)</text>

            <path d="M 460 210 Q 320 250 320 220" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-ios-green" />
            <text x="400" y="245" textAnchor="middle" className="text-[10px] fill-ios-green">addObserver(注册)</text>

            <defs>
              <marker id="noti-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
          </svg>
        </div>

        <ol>
          <li><strong>发送者 (Poster)：</strong> 负责大喊一声：“某某事情发生了！”（顺便可以塞一份数据包 <code>userInfo</code>）。</li>
          <li><strong>接收者 (Observer)：</strong> 去向系统注册监听：“只要有人喊这句话，就叫我一声”。</li>
          <li><strong>通知中心 (NSNotificationCenter)：</strong> 负责传话的全局系统单例。</li>
        </ol>

        <CodeCompare
          title="注册监听与发送通知"
          leftLang="objectivec"
          rightLang="javascript"
          leftCode={`// Objective-C
// 1. 定义一个全局的通知名字常量
static NSString *const AppThemeDidChangeNotification = @"AppThemeDidChangeNotification";

// ----------------------------------------
// 【接收者】在某个 ViewController 里注册监听
- (void)viewDidLoad {
    [super viewDidLoad];
    
    // 告诉通知中心：当收到该名字的通知时，执行 changeTheme: 方法
    [[NSNotificationCenter defaultCenter] addObserver:self 
                                             selector:@selector(changeTheme:) 
                                                 name:AppThemeDidChangeNotification 
                                               object:nil];
}

// 收到通知后执行的方法
- (void)changeTheme:(NSNotification *)noti {
    // 解析传过来的 userInfo 字典包
    NSDictionary *userInfo = noti.userInfo;
    NSLog(@"收到主题改变：%@", userInfo[@"color"]);
}

// ----------------------------------------
// 【发送者】在设置页面，用户点击了切换按钮
- (void)userDidSwitchTheme {
    // 组装数据包
    NSDictionary *info = @{@"color": @"Dark"};
    
    // 大声广播！
    [[NSNotificationCenter defaultCenter] postNotificationName:AppThemeDidChangeNotification 
                                                        object:nil 
                                                      userInfo:info];
}`}
          rightCode={`// JavaScript (使用 EventEmitter)
import { EventEmitter } from 'events';

// 1. 全局单例
const center = new EventEmitter();
const AppThemeDidChange = "AppThemeDidChange";

// ----------------------------------------
// 【接收者】
class ViewController {
    constructor() {
        // 绑定 this，因为 JS 方法会丢失上下文
        this.changeTheme = this.changeTheme.bind(this);
        
        // 监听事件
        center.on(AppThemeDidChange, this.changeTheme);
    }
    
    changeTheme(userInfo) {
        console.log(\`收到主题改变：\${userInfo.color}\`);
    }
}

// ----------------------------------------
// 【发送者】
class Settings {
    userDidSwitchTheme() {
        const info = { color: "Dark" };
        
        // 广播事件！
        center.emit(AppThemeDidChange, info);
    }
}`}
        />

        <TipBox type="warning" title="永远记得注销监听！">
          和所有的事件绑定一样，如果在对象销毁前不移除监听，通知中心就会继续把消息发送给一个已经被销毁的对象内存地址（野指针），导致 <code>EXC_BAD_ACCESS</code> 崩溃。
          <br/>
          在 iOS 9 之后，对于使用 <code>selector</code> 注册的监听，系统会在观察者被释放时自动清理。但<strong>如果你使用的是 Block 方式注册的监听，依然必须手动 <code>removeObserver</code>！</strong><br/>
          良好的习惯是：<strong>在 <code>dealloc</code> 里一律写上：<code>[[NSNotificationCenter defaultCenter] removeObserver:self];</code></strong>
        </TipBox>

        <h2>常见的系统通知</h2>
        <p>你不仅可以自己发通知，iOS 系统每天也在狂发各种通知，比如：</p>
        <ul>
          <li><strong>UIKeyboardWillShowNotification</strong>：键盘即将弹出（你收到后可以把输入框往上挪）。</li>
          <li><strong>UIApplicationDidEnterBackgroundNotification</strong>：App 被切到了后台（你收到后可以暂停视频播放）。</li>
          <li><strong>UIDeviceOrientationDidChangeNotification</strong>：手机屏幕旋转了。</li>
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
          to="/objc-maintenance/advanced/gcd"
          className="flex items-center gap-2 text-ios-blue hover:underline font-medium"
        >
          下一篇：GCD →
        </Link>
      </div>
    </div>
  );
}
