"use client";

import React, { useState } from "react";
import { TrendingUp, Calendar } from "lucide-react";

interface User {
  created_at: string;
}

interface UserGrowthChartProps {
  userRoleUsers?: User[];
}

export function UserGrowthChart({ userRoleUsers = [] }: UserGrowthChartProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    value: number;
    month: string;
  } | null>(null);
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Sync calendar with selected date
  React.useEffect(() => {
    setCalendarYear(selectedDate.getFullYear());
    setCalendarMonth(selectedDate.getMonth());
  }, [selectedDate]);

  // Calculate chart data based on selected date
  const chartData = React.useMemo(() => {
    if (!userRoleUsers.length) return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const selectedYear = selectedDate.getFullYear();
    const monthlyData = new Array(12).fill(0);

    // Set selected date to end of day for proper comparison
    const endOfSelectedDate = new Date(selectedDate);
    endOfSelectedDate.setHours(23, 59, 59, 999);

    userRoleUsers.forEach((user) => {
      const createdDate = new Date(user.created_at);
      if (
        createdDate.getFullYear() === selectedYear &&
        createdDate <= endOfSelectedDate
      ) {
        monthlyData[createdDate.getMonth()]++;
      }
    });

    console.log(
      "Selected date:",
      selectedDate.toLocaleDateString(),
      "Chart data:",
      monthlyData
    );
    return monthlyData;
  }, [userRoleUsers, selectedDate]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Fixed Y-axis scale as requested: 100, 75, 50, 25, 0
  const yAxisValues = {
    max: 100,
    three_quarters: 75,
    half: 50,
    quarter: 25,
    zero: 0,
  };

  const scaledMaxValue = 100; // Fixed scale of 100

  // Create SVG path for line chart
  const createPath = () => {
    if (chartData.length < 2) return "";
    const width = 500;
    const height = 160;
    const points = chartData.map((value, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - (value / scaledMaxValue) * 160;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  // Get days in month for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white dark:bg-[#1C1E22] rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#00A859]" />
          <h3 className="text-lg font-semibold">User Growth</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
            >
              <Calendar className="w-4 h-4" />
            </button>
            {showCalendar && (
              <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border rounded-lg p-3 shadow-lg z-30 w-64">
                {/* Year Selection */}
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setCalendarYear(calendarYear - 1)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    ←
                  </button>
                  <span className="font-medium">{calendarYear}</span>
                  <button
                    onClick={() => setCalendarYear(calendarYear + 1)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    →
                  </button>
                </div>

                {/* Month Selection */}
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() =>
                      setCalendarMonth(
                        calendarMonth === 0 ? 11 : calendarMonth - 1
                      )
                    }
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    ←
                  </button>
                  <span className="font-medium text-sm">
                    {monthNames[calendarMonth]}
                  </span>
                  <button
                    onClick={() =>
                      setCalendarMonth(
                        calendarMonth === 11 ? 0 : calendarMonth + 1
                      )
                    }
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    →
                  </button>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <div
                      key={index}
                      className="text-xs text-center p-1 font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Empty cells for first week */}
                  {Array.from({
                    length: getFirstDayOfMonth(calendarYear, calendarMonth),
                  }).map((_, index) => (
                    <div key={`empty-${index}`} className="p-1"></div>
                  ))}

                  {/* Days */}
                  {Array.from({
                    length: getDaysInMonth(calendarYear, calendarMonth),
                  }).map((_, index) => {
                    const day = index + 1;
                    const date = new Date(calendarYear, calendarMonth, day);
                    const isSelected =
                      selectedDate &&
                      selectedDate.getDate() === day &&
                      selectedDate.getMonth() === calendarMonth &&
                      selectedDate.getFullYear() === calendarYear;

                    return (
                      <button
                        key={day}
                        onClick={() => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const clickedDate = new Date(date);
                          clickedDate.setHours(0, 0, 0, 0);

                          if (clickedDate <= today) {
                            setSelectedDate(date);
                            setShowCalendar(false);
                          }
                        }}
                        className={`text-xs p-1 rounded ${
                          isSelected
                            ? "bg-[#00A859] text-white"
                            : date > new Date()
                              ? "text-gray-300 cursor-not-allowed"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        disabled={date > new Date()}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Clear Button - only show if not already on today */}
                {(() => {
                  const today = new Date();
                  const isToday =
                    selectedDate.toDateString() === today.toDateString();
                  return !isToday ? (
                    <button
                      onClick={() => {
                        setSelectedDate(new Date());
                        setCalendarYear(new Date().getFullYear());
                        setCalendarMonth(new Date().getMonth());
                        setShowCalendar(false);
                      }}
                      className="w-full text-xs p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      Return to Today
                    </button>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-48 relative">
        <div className="relative h-40 ml-8">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 500 160"
            className="overflow-visible"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <line
                key={index}
                x1="0"
                y1={160 - ratio * 160}
                x2="500"
                y2={160 - ratio * 160}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="1"
              />
            ))}

            {/* Line chart */}
            {chartData.length > 1 && (
              <path
                d={createPath()}
                fill="none"
                stroke="#00A859"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data points */}
            {chartData.map((value, index) => {
              const x =
                chartData.length === 1
                  ? 250
                  : (index / (chartData.length - 1)) * 500;
              const y = 160 - (value / scaledMaxValue) * 160;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#00A859"
                  className="hover:r-6 transition-all cursor-pointer"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      show: true,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10,
                      value,
                      month: months[index],
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}

            {/* Month labels */}
            {months.map((month, index) => {
              const x =
                chartData.length === 1
                  ? 250
                  : (index / (months.length - 1)) * 500;
              return (
                <text
                  key={month}
                  x={x}
                  y="180"
                  fontSize="10"
                  fill="currentColor"
                  opacity="0.6"
                  textAnchor="middle"
                >
                  {month}
                </text>
              );
            })}
          </svg>

          {/* Y-axis labels positioned outside SVG */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
            <span>{yAxisValues.max}</span>
            <span>{yAxisValues.three_quarters}</span>
            <span>{yAxisValues.half}</span>
            <span>{yAxisValues.quarter}</span>
            <span>{yAxisValues.zero}</span>
          </div>
        </div>
      </div>

      {/* Selected Date Display */}
      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        Showing data up to: {selectedDate.toLocaleDateString()}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg z-50 pointer-events-none"
          style={{
            left: tooltip.x - 30,
            top: tooltip.y - 35,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-medium">{tooltip.month}</div>
          <div>
            {tooltip.value} {tooltip.value === 1 ? "user" : "users"}
          </div>
        </div>
      )}
    </div>
  );
}
