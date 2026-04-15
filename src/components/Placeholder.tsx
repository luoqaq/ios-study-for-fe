export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        模块正在建设中，敬请期待...
      </p>

      <div className="prose prose-blue max-w-none dark:prose-invert">
        <div className="p-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-center bg-gray-50/50 dark:bg-gray-800/30">
          <p className="text-gray-500 dark:text-gray-400">
            我们正在努力编写这部分内容，将用前端开发的视角为你带来最通俗易懂的
            iOS 教程。
          </p>
        </div>
      </div>
    </div>
  );
}
