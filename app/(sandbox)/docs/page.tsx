"use client";

import { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { PageNavigation } from "../components/page-navigation";
import { getNavigation } from "../lib/navigation";

export default function APIOverview() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-2 xs:p-6 space-y-3 xs:space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-2 xs:pb-6">
        <h1 className="text-lg sm:text-4xl font-bold text-gray-900 dark:text-white mb-1 xs:mb-2 leading-tight">
          API Documentation
        </h1>
        <p className="text-xs sm:text-xl text-gray-600 dark:text-gray-300 leading-tight">
          Comprehensive guide to the Sandbox Platform APIs for Nigerian DPI
          services
        </p>
      </div>

      {/* Quick Start */}
      <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 xs:p-6">
        <h2 className="text-sm sm:text-2xl font-semibold text-green-800 dark:text-green-200 mb-2 xs:mb-3 leading-tight">
          🚀 Quick Start for Nigerian Startups
        </h2>
        <div className="space-y-1 xs:space-y-3 text-xs sm:text-xl text-green-700 dark:text-green-300">
          <p className="leading-tight">
            Get started with the Sandbox Platform in minutes:
          </p>
          <ol className="list-decimal list-inside space-y-0.5 xs:space-y-2 ml-1 xs:ml-4 text-xs sm:text-lg">
            <li>
              Contact administrators for account creation (closed sandbox - 9
              startups only)
            </li>
            <li>Receive your login credentials securely</li>
            <li>Login</li>
            <li>Start testing DPI services with Nigerian data formats</li>
          </ol>
        </div>
      </section>

      {/* DPI Services */}
      <section className="mt-6 xs:mt-8">
        <button
          onClick={() => toggleSection("dpi")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-sm sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            🇳🇬 DPI Sandbox Services
          </h2>
          {expandedSections.includes("dpi") ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>

        {expandedSections.includes("dpi") && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-4">
              <div className="bg-white dark:bg-gray-800 p-2 xs:p-4 rounded-lg border">
                <h3 className="text-xs sm:text-lg font-semibold text-green-600 dark:text-green-400 leading-tight">
                  NIN Service
                </h3>
                <p className="text-[10px] sm:text-base mt-1 xs:mt-2 leading-tight">
                  Nigerian Identity Number verification via Dojah API
                </p>
                <div className="mt-1 xs:mt-3 space-y-0.5 xs:space-y-1">
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/nin/verify
                  </code>
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    GET /api/v1/nin/status/{"{nin}"}
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 xs:p-4 rounded-lg border">
                <h3 className="text-xs sm:text-lg font-semibold text-green-600 dark:text-green-400 leading-tight">
                  BVN Service
                </h3>
                <p className="text-[10px] sm:text-base mt-1 xs:mt-2 leading-tight">
                  Bank Verification Number validation
                </p>
                <div className="mt-1 xs:mt-3 space-y-0.5 xs:space-y-1">
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/bvn/verify
                  </code>
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    GET /api/v1/bvn/status/{"{bvn}"}
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 xs:p-4 rounded-lg border">
                <h3 className="text-xs sm:text-lg font-semibold text-green-600 dark:text-green-400 leading-tight">
                  SMS Service
                </h3>
                <p className="text-[10px] sm:text-base mt-1 xs:mt-2 leading-tight">
                  Nigerian SMS messaging and notifications
                </p>
                <div className="mt-1 xs:mt-3 space-y-0.5 xs:space-y-1">
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/sms/send
                  </code>
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/sms/send/bulk
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 xs:p-4 rounded-lg border">
                <h3 className="text-xs sm:text-lg font-semibold text-green-600 dark:text-green-400 leading-tight">
                  AI Service
                </h3>
                <p className="text-[10px] sm:text-base mt-1 xs:mt-2 leading-tight">
                  Nigerian-context content generation
                </p>
                <div className="mt-1 xs:mt-3 space-y-0.5 xs:space-y-1">
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/generate
                  </code>
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/analyze
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 xs:p-4 rounded-lg border">
                <h3 className="text-xs sm:text-lg font-semibold text-green-600 dark:text-green-400 leading-tight">
                  IVR Service
                </h3>
                <p className="text-[10px] sm:text-base mt-1 xs:mt-2 leading-tight">
                  Voice interactions and call routing
                </p>
                <div className="mt-1 xs:mt-3 space-y-0.5 xs:space-y-1">
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/call
                  </code>
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    GET /api/v1/call/{"{id}"}
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 xs:p-4 rounded-lg border">
                <h3 className="text-xs sm:text-lg font-semibold text-green-600 dark:text-green-400 leading-tight">
                  Two-Way SMS
                </h3>
                <p className="text-[10px] sm:text-base mt-1 xs:mt-2 leading-tight">
                  Interactive SMS and response handling
                </p>
                <div className="mt-1 xs:mt-3 space-y-0.5 xs:space-y-1">
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/interactive
                  </code>
                  <code className="text-[8px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1 xs:px-2 py-0.5 xs:py-1 rounded block break-all leading-tight">
                    POST /api/v1/response
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Data Formats */}
      <section className="mt-6 xs:mt-8">
        <button
          onClick={() => toggleSection("formats")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-sm sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            📋 Nigerian Data Formats
          </h2>
          {expandedSections.includes("formats") ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>

        {expandedSections.includes("formats") && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 xs:p-4 rounded-lg">
                <h3 className="text-xs sm:text-lg font-semibold text-blue-800 dark:text-blue-200 leading-tight">
                  Phone Numbers
                </h3>
                <div className="mt-1 xs:mt-2 space-y-0.5 xs:space-y-1 text-[10px] sm:text-base">
                  <code className="block break-all leading-tight">
                    +234XXXXXXXXXX
                  </code>
                  <code className="block break-all leading-tight">
                    0XXXXXXXXXX
                  </code>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 xs:p-4 rounded-lg">
                <h3 className="text-xs sm:text-lg font-semibold text-blue-800 dark:text-blue-200 leading-tight">
                  NIN
                </h3>
                <div className="mt-1 xs:mt-2 text-[10px] sm:text-base">
                  <code className="break-all leading-tight">
                    11-digit National Identity Number
                  </code>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 xs:p-4 rounded-lg">
                <h3 className="text-xs sm:text-lg font-semibold text-blue-800 dark:text-blue-200 leading-tight">
                  BVN
                </h3>
                <div className="mt-1 xs:mt-2 text-[10px] sm:text-base">
                  <code className="break-all leading-tight">
                    11-digit Bank Verification Number
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Security & Compliance */}
      <section className="border-t border-gray-200 dark:border-gray-700 pt-4 xs:pt-6 mt-6 xs:mt-8">
        <h2 className="text-sm sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 xs:mb-4 leading-tight">
          🔒 Security & Compliance
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-6">
          <div>
            <h3 className="text-xs sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 xs:mb-2 leading-tight">
              Security Features
            </h3>
            <ul className="space-y-0.5 xs:space-y-1 text-[10px] sm:text-base text-gray-600 dark:text-gray-300">
              <li className="leading-tight">• JWT-based authentication</li>
              <li className="leading-tight">• Admin-only user management</li>
              <li className="leading-tight">• Secure token revocation</li>
              <li className="leading-tight">
                • Rate limiting & circuit breaking
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 xs:mb-2 leading-tight">
              Nigerian Compliance
            </h3>
            <ul className="space-y-0.5 xs:space-y-1 text-[10px] sm:text-base text-gray-600 dark:text-gray-300">
              <li className="leading-tight">
                • NDPR compliant data protection
              </li>
              <li className="leading-tight">• PII protection with hashing</li>
              <li className="leading-tight">• 7-year audit trail retention</li>
              <li className="leading-tight">• Phone number masking</li>
            </ul>
          </div>
        </div>
      </section>
      <PageNavigation {...getNavigation("/docs")} />
    </div>
  );
}
