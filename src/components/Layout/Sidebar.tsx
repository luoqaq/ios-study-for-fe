import { Link, useLocation } from "react-router-dom";
import { sidebar, SidebarItem } from "@/data/config";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine which sidebar config to show based on current path
  let currentSidebar: SidebarItem[] = [];

  if (currentPath.startsWith("/guide")) {
    currentSidebar = sidebar["/guide"];
  } else if (currentPath.startsWith("/objc")) {
    currentSidebar = sidebar["/objc"];
  } else if (currentPath.startsWith("/swift")) {
    currentSidebar = sidebar["/swift"];
  } else if (currentPath.startsWith("/xcode")) {
    currentSidebar = sidebar["/xcode"];
  } else if (currentPath.startsWith("/practice")) {
    currentSidebar = sidebar["/practice"];
  }

  // Don't show sidebar on home page
  if (currentPath === "/") {
    return null;
  }

  const isExactActive = (path?: string) => {
    // 处理带尾斜杠和不带尾斜杠的匹配，或者恰好等于当前路径的情况
    return path && (currentPath === path || currentPath === path + "/");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto border-r border-gray-200 
        bg-white pt-16 transition-transform duration-300 ease-in-out md:translate-x-0 md:pt-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]
        dark:border-gray-800 dark:bg-gray-900 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <nav className="p-4 md:p-6 space-y-8">
          {currentSidebar.map((section, idx) => (
            <div key={idx}>
              {section.link ? (
                <Link
                  to={section.link}
                  onClick={() => setIsOpen(false)}
                  className={`block font-semibold mb-3 ${
                    isExactActive(section.link)
                      ? "text-ios-blue"
                      : "text-gray-900 dark:text-gray-100 hover:text-ios-blue dark:hover:text-ios-blue transition-colors"
                  }`}
                >
                  {section.text}
                </Link>
              ) : (
                <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
                  {section.text}
                </h2>
              )}

              {section.items && section.items.length > 0 && (
                <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800 ml-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className={`block -ml-px border-l px-4 py-1 text-sm transition-colors ${
                          isExactActive(item.link)
                            ? "border-ios-blue text-ios-blue font-medium"
                            : "border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-200"
                        }`}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
