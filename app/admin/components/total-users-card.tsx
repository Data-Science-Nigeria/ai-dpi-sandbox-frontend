import { Users } from "lucide-react";

interface TotalUsersCardProps {
  totalUsers: number;
  selectedMonth: number | null;
  selectedYear: number | null;
  availableMonths: number[];
  availableYears: number[];
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function TotalUsersCard({
  totalUsers,
  selectedMonth,
  selectedYear,
  availableMonths,
  availableYears,
  onMonthChange,
  onYearChange,
}: TotalUsersCardProps) {
  return (
    <div className="bg-white dark:bg-[#1C1E22] rounded-lg border p-4 h-full relative">
      <div className="xl:flex xl:items-center xl:justify-between mb-4">
        <div className="flex items-center gap-2 mb-2 sm:mb-0 lg:mb-2 xl:mb-0">
          <Users className="w-4 h-4 text-[#00A859]" />
          <h3 className="text-lg font-semibold">Total Users</h3>
        </div>
        <div className="flex gap-1 z-10 relative sm:absolute sm:top-4 sm:right-4 lg:relative lg:top-auto lg:right-auto xl:static xl:top-auto xl:right-auto">
          <select
            id="month-select"
            value={selectedMonth || ""}
            onChange={(e) => onMonthChange(Number(e.target.value))}
            className="px-2 py-1 border rounded text-xs w-18 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white relative z-20"
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString("default", {
                  month: "short",
                })}
              </option>
            ))}
          </select>
          <select
            id="year-select"
            value={selectedYear || ""}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="px-2 py-1 border rounded text-xs w-18 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white relative z-20"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-end justify-center flex-1 pb-4">
        <div className="text-7xl font-bold text-[#00A859] mt-8">
          {totalUsers.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
