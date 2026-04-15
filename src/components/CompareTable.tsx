interface CompareTableProps {
  headers: string[];
  rows: string[][];
}

export default function CompareTable({ headers, rows }: CompareTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <table className="w-full min-w-max text-left text-sm text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="whitespace-nowrap px-6 py-3 font-semibold border-b border-gray-200 dark:border-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 ${
                    colIndex === 0
                      ? "font-medium text-gray-900 dark:text-gray-100"
                      : ""
                  }`}
                >
                  {/* Auto-format code blocks wrapped in backticks */}
                  {cell.split("`").map((part, i) =>
                    i % 2 === 1 ? (
                      <code
                        key={i}
                        className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-ios-orange dark:bg-gray-800"
                      >
                        {part}
                      </code>
                    ) : (
                      part
                    ),
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
