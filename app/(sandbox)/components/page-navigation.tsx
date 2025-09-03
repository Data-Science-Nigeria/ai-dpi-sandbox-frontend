"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface NavigationItem {
  title: string;
  href: string;
}

interface PageNavigationProps {
  previous?: NavigationItem;
  next?: NavigationItem;
}

export function PageNavigation({ previous, next }: PageNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
      {previous ? (
        <Link
          href={previous.href}
          className="relative flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-3 hover:shadow-sm flex-1"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          <div className="flex-1 text-right">
            <div className="mb-1 text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
              Previous
            </div>
            <div className="truncate text-sm sm:text-base font-medium leading-5 sm:leading-6 text-gray-900 dark:text-white">
              {previous.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="relative flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-3 hover:shadow-sm flex-1"
        >
          <div className="flex-1">
            <div className="mb-1 text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
              Next
            </div>
            <div className="truncate text-sm sm:text-base font-medium leading-5 sm:leading-6 text-gray-900 dark:text-white">
              {next.title}
            </div>
          </div>
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 flex-shrink-0" />
        </Link>
      ) : (
        <div className="hidden sm:block flex-1" />
      )}
    </div>
  );
}
