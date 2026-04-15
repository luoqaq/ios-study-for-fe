import React from "react";
import { AlertCircle, Info, AlertTriangle, Lightbulb } from "lucide-react";

type TipType = "tip" | "warning" | "danger" | "info";

interface TipBoxProps {
  type?: TipType;
  title?: string;
  children: React.ReactNode;
}

export default function TipBox({ type = "tip", title, children }: TipBoxProps) {
  const config = {
    tip: {
      color: "text-ios-green dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800/50",
      icon: <Lightbulb className="h-5 w-5" />,
      defaultTitle: "提示",
    },
    warning: {
      color: "text-ios-orange dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-200 dark:border-orange-800/50",
      icon: <AlertTriangle className="h-5 w-5" />,
      defaultTitle: "注意",
    },
    danger: {
      color: "text-ios-red dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800/50",
      icon: <AlertCircle className="h-5 w-5" />,
      defaultTitle: "警告",
    },
    info: {
      color: "text-ios-blue dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800/50",
      icon: <Info className="h-5 w-5" />,
      defaultTitle: "信息",
    },
  };

  const style = config[type];

  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border p-4 ${style.bg} ${style.border}`}
    >
      <div className={`shrink-0 mt-0.5 ${style.color}`}>{style.icon}</div>
      <div className="flex-1 text-gray-800 dark:text-gray-200">
        <h4 className={`m-0 font-bold mb-1 ${style.color}`}>
          {title || style.defaultTitle}
        </h4>
        <div className="text-sm leading-relaxed prose-p:my-1 prose-a:text-ios-blue hover:prose-a:underline">
          {children}
        </div>
      </div>
    </div>
  );
}
