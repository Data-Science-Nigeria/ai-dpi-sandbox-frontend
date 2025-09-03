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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          API Documentation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Comprehensive guide to the Sandbox Platform APIs for Nigerian DPI
          services
        </p>
      </div>

      {/* Quick Start */}
      <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
          🚀 Quick Start for Nigerian Startups
        </h2>
        <div className="space-y-3 text-green-700 dark:text-green-300">
          <p>Get started with the Sandbox Platform in minutes:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
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
      <section>
        <button
          onClick={() => toggleSection("dpi")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  NIN Service
                </h3>
                <p className="text-sm mt-2">
                  Nigerian Identity Number verification via Dojah API
                </p>
                <div className="mt-3 space-y-1">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    POST /api/v1/nin/verify
                  </code>
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                    GET /api/v1/nin/status/{"{nin}"}
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  BVN Service
                </h3>
                <p className="text-sm mt-2">
                  Bank Verification Number validation
                </p>
                <div className="mt-3 space-y-1">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    POST /api/v1/bvn/verify
                  </code>
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                    GET /api/v1/bvn/status/{"{bvn}"}
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  SMS Service
                </h3>
                <p className="text-sm mt-2">
                  Nigerian SMS messaging and notifications
                </p>
                <div className="mt-3 space-y-1">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    POST /api/v1/sms/send
                  </code>
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                    POST /api/v1/sms/send/bulk
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  AI Service
                </h3>
                <p className="text-sm mt-2">
                  Nigerian-context content generation
                </p>
                <div className="mt-3 space-y-1">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    POST /api/v1/generate
                  </code>
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                    POST /api/v1/analyze
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  IVR Service
                </h3>
                <p className="text-sm mt-2">
                  Voice interactions and call routing
                </p>
                <div className="mt-3 space-y-1">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    POST /api/v1/call
                  </code>
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                    GET /api/v1/call/{"{id}"}
                  </code>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold text-green-600 dark:text-green-400">
                  Two-Way SMS
                </h3>
                <p className="text-sm mt-2">
                  Interactive SMS and response handling
                </p>
                <div className="mt-3 space-y-1">
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    POST /api/v1/interactive
                  </code>
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded block">
                    POST /api/v1/response
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Data Formats */}
      <section>
        <button
          onClick={() => toggleSection("formats")}
          className="flex items-center justify-between w-full text-left"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  Phone Numbers
                </h3>
                <div className="mt-2 space-y-1 text-sm">
                  <code className="block">+234XXXXXXXXXX</code>
                  <code className="block">0XXXXXXXXXX</code>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  NIN
                </h3>
                <div className="mt-2 text-sm">
                  <code>11-digit National Identity Number</code>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                  BVN
                </h3>
                <div className="mt-2 text-sm">
                  <code>11-digit Bank Verification Number</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Security & Compliance */}
      <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🔒 Security & Compliance
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Security Features
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>• JWT-based authentication</li>
              <li>• Admin-only user management</li>
              <li>• Secure token revocation</li>
              <li>• Rate limiting & circuit breaking</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Nigerian Compliance
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>• NDPR compliant data protection</li>
              <li>• PII protection with hashing</li>
              <li>• 7-year audit trail retention</li>
              <li>• Phone number masking</li>
            </ul>
          </div>
        </div>
      </section>
      <PageNavigation {...getNavigation("/docs")} />
    </div>
  );
}
