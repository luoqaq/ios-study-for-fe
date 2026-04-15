import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeCompareProps {
  title?: string;
  leftTitle?: string;
  rightTitle?: string;
  leftLang?: string;
  rightLang?: string;
  leftCode: string;
  rightCode: string;
}

export default function CodeCompare({
  title,
  leftTitle = "Objective-C / Swift",
  rightTitle = "JavaScript / TypeScript",
  leftLang = "objectivec",
  rightLang = "javascript",
  leftCode,
  rightCode,
}: CodeCompareProps) {
  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      {title && (
        <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-medium text-gray-800 dark:text-gray-200">
          {title}
        </div>
      )}

      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
        {/* Left Side - iOS */}
        <div className="flex-1 w-full bg-gray-50 dark:bg-[#1e1e1e]">
          <div className="px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <span className="w-2 h-2 rounded-full bg-ios-blue"></span>
            {leftTitle}
          </div>
          <div className="p-0 overflow-x-auto text-sm">
            <SyntaxHighlighter
              language={leftLang}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
              }}
            >
              {leftCode.trim()}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Right Side - Web */}
        <div className="flex-1 w-full bg-gray-50 dark:bg-[#1e1e1e]">
          <div className="px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <span className="w-2 h-2 rounded-full bg-[#F7DF1E]"></span>
            {rightTitle}
          </div>
          <div className="p-0 overflow-x-auto text-sm">
            <SyntaxHighlighter
              language={rightLang}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
              }}
            >
              {rightCode.trim()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
