import CodeCompare from "@/components/CodeCompare";
import TipBox from "@/components/TipBox";

export default function TableViewApp() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">
        💻 实战 3：无限滚动列表
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        核心控件 UITableView，原生性能的秘诀。
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h2>📋 需求描述</h2>
        <p>
          实现一个展示成千上万条数据的列表，要求滑动流畅，且内存占用极低。在底部加载更多数据（上拉加载）。
        </p>

        <h2>前端视角：虚拟滚动原理</h2>
        <p>
          在 Web 前端，如果我们把 10 万个 DOM
          节点直接插入页面，浏览器必死无疑。通常的解决方案是使用{" "}
          <strong>Virtual List（虚拟列表）</strong>，
          只渲染可视区域及其上下文的节点。
        </p>
        <p>
          在 iOS 原生中，所有的列表都自带这个机制，名为{" "}
          <strong>Cell Reuse（单元格复用机制）</strong>。
        </p>

        <TipBox type="tip" title="复用池原理 (Dequeue)">
          想象一个屏幕最多只能显示 10 个 Cell，系统内存中实际只创建了 12 个
          Cell。 当向上滑动时，最上面的 Cell
          离开屏幕，它并不会被销毁，而是被放进一个“复用池”；
          同时，最下方即将出现的 Cell 会从这个池子里“借用”刚才那个 Cell
          的壳子，只替换里面的数据（文字/图片）。
          <br />
          <strong>
            无论列表有 100 行还是 10 万行，内存中始终只有十几个 Cell！
          </strong>
        </TipBox>

        <h2>🎯 核心代码实现</h2>

        <h3>1. 注册与复用</h3>

        <CodeCompare
          title="列表复用机制"
          leftTitle="Swift (UITableView)"
          rightTitle="Objective-C"
          leftLang="swift"
          rightLang="objectivec"
          leftCode={`// 1. 注册 Cell (告诉列表要复用什么样式的行)
tableView.register(UITableViewCell.self, forCellReuseIdentifier: "MyCell")

// 2. 代理方法：返回特定行的 Cell
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    
    // 从池子里取出或创建 Cell
    let cell = tableView.dequeueReusableCell(withIdentifier: "MyCell", for: indexPath)
    
    // 给复用出来的空壳子塞数据
    cell.textLabel?.text = "第 \\(indexPath.row) 行"
    
    return cell
}`}
          rightCode={`// 1. 注册 Cell
[self.tableView registerClass:[UITableViewCell class] forCellReuseIdentifier:@"MyCell"];

// 2. 代理方法：返回特定行的 Cell
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    // 取出 Cell
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"MyCell" forIndexPath:indexPath];
    
    // 塞数据
    cell.textLabel.text = [NSString stringWithFormat:@"第 %ld 行", (long)indexPath.row];
    
    return cell;
}`}
        />

        <h3>2. 上拉加载更多 (Load More)</h3>
        <p>
          前端我们可能会监听 <code>scroll</code> 事件或者使用{" "}
          <code>IntersectionObserver</code>。在 iOS
          中也有类似的机制，最简单的方法是实现 <code>UIScrollViewDelegate</code>
          （因为 <code>UITableView</code> 继承自 <code>UIScrollView</code>）。
        </p>

        <CodeCompare
          title="监听滚动"
          leftTitle="Swift (Delegate)"
          rightTitle="JavaScript (Scroll Event)"
          leftLang="swift"
          rightLang="javascript"
          leftCode={`// 代理方法：列表滚动时不断触发
func scrollViewDidScroll(_ scrollView: UIScrollView) {
    let offsetY = scrollView.contentOffset.y
    let contentHeight = scrollView.contentSize.height
    let height = scrollView.frame.size.height
    
    // 判断是否滑动到底部 (加了 100pt 的预加载距离)
    if offsetY > contentHeight - height - 100 {
        if !isLoading {
            loadMoreData()
        }
    }
}`}
          rightCode={`// Web 前端监听滚动
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // 判断滑动到底部
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (!isLoading) {
            loadMoreData();
        }
    }
});`}
        />

        <h2>常见坑点</h2>
        <p>
          由于 Cell
          是被复用的，如果你在一个行里修改了状态（例如将它的背景色改成了红色），如果不做清理，当它被滑到屏幕下方复用给另一条数据时，那条数据也会变成红色！
          <br />
          <strong>解决：</strong>
          在数据绑定时，必须每次都显式设置所有状态，或者实现{" "}
          <code>prepareForReuse</code> 方法清理状态。这就是命令式 UI
          的痛苦之处（SwiftUI 和 React 完美解决了这个问题）。
        </p>
      </div>
    </div>
  );
}
