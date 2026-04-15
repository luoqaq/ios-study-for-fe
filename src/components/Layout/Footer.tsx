import { Apple } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 mt-auto">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
            <Apple className="h-5 w-5" />
            <span>iOS 学习指南</span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} 为前端开发者打造的 iOS 开发教程。
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-ios-blue dark:text-gray-400 dark:hover:text-ios-blue transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-ios-blue dark:text-gray-400 dark:hover:text-ios-blue transition-colors"
            >
              贡献指南
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
