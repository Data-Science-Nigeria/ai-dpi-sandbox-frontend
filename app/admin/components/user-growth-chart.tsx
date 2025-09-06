"use client";

import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

interface UserGrowthChartProps {
  data?: number[];
}

export function UserGrowthChart({ data = [] }: UserGrowthChartProps) {
  const maxValue = Math.max(...data, 1);
  return (
    <div className="bg-white dark:bg-[#1C1E22] rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">User Sign-ins</h3>
        <TrendingUp className="w-5 h-5 text-[#00A859]" />
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Day
          </Button>
          <Button variant="outline" size="sm">
            Month
          </Button>
          <Button variant="outline" size="sm">
            Year
          </Button>
        </div>

        <div className="h-48 flex items-end justify-between gap-2">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <div
                className="bg-[#00A859] rounded-t"
                style={{
                  height: `${(value / maxValue) * 160}px`,
                  width: "20px",
                }}
              />
              <span className="text-xs text-gray-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  );
}
