import { Link } from "lucide-react";

interface ConceptCardProps {
  emoji: string;
  title: string;
  description: string;
  frontendRef?: string;
}

export default function ConceptCard({
  emoji,
  title,
  description,
  frontendRef,
}: ConceptCardProps) {
  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 flex items-start gap-4 transition-all hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl dark:bg-gray-800">
        {emoji}
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="!mt-0 !mb-1 text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
          {description}
        </p>

        {frontendRef && (
          <div className="mt-3 flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-ios-blue dark:bg-blue-900/20 dark:text-blue-300">
            <Link className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong className="mr-1 font-semibold">前端视角：</strong>
              {frontendRef}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
