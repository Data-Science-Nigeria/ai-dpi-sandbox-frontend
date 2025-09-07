"use client";

import { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { PageNavigation } from "../components/page-navigation";
import { getNavigation } from "../lib/navigation";

export default function APIDocumentation() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const SectionHeader = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <section className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full text-left py-2"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {expandedSections.includes(id) ? (
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {expandedSections.includes(id) && (
        <div className="mt-4 text-gray-700 dark:text-gray-300 space-y-4">
          {children}
        </div>
      )}
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          API Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          DPI Sandbox Services - Comprehensive API Guide
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Modular, Nigerian-focused digital public infrastructure services for
          rapid integration and scalability
        </p>
      </div>

      {/* Platform Overview */}
      <SectionHeader id="overview" title="📋 Platform Overview">
        <div className="space-y-4">
          <p>
            The platform provides modular, Nigerian-focused digital public
            infrastructure (DPI) services, each accessible via RESTful APIs.
            These services are designed for rapid integration, scalability, and
            compliance with local standards.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Architecture
            </h3>
            <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
              <li>Microservices built with FastAPI</li>
              <li>Containerized with Docker, orchestrated via Kubernetes</li>
              <li>Centralized configuration using .env and YAML files</li>
              <li>Unified API Gateway for authentication and routing</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Security Features
            </h3>
            <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-300">
              <li>Role-based access control</li>
              <li>API key management</li>
              <li>Encrypted data transmission</li>
              <li>Input validation and rate limiting</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
              Monitoring & Development
            </h3>
            <ul className="list-disc list-inside space-y-1 text-purple-700 dark:text-purple-300">
              <li>Health endpoints, logging, metrics, and alerting</li>
              <li>Modular structure for easy extension and testing</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      {/* AI Service */}
      <SectionHeader id="ai" title="🤖 AI Service">
        <div className="space-y-4">
          <p className="font-medium">
            Purpose: Generate content, analyze data, and build intelligent
            applications tailored for Nigerian contexts.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Nigerian context awareness (local market, language, culture)
              </li>
              <li>
                Text generation, data analysis, sentiment analysis,
                summarization
              </li>
              <li>
                Business-ready applications (marketing, business plans,
                chatbots)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Endpoints:</h3>
            <div className="space-y-2">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/generate - Generate content
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/analyze - Analyze data
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/summarize - Summarize text
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/chat - Chat interface
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/health - Health check
              </code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Use Cases:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Content creation for Nigerian market</li>
              <li>Business intelligence and analytics</li>
              <li>Customer service automation</li>
              <li>Localized chatbot development</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      {/* BVN Service */}
      <SectionHeader id="bvn" title="🏦 BVN Service (Bank Verification Number)">
        <div className="space-y-4">
          <p className="font-medium">
            Purpose: Validate Nigerian Bank Verification Numbers for financial
            identity checks.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Real-time verification with Dojah API</li>
              <li>Structured responses with banking details</li>
              <li>Error handling and timeout management</li>
              <li>Dockerized for easy deployment</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Endpoints:</h3>
            <div className="space-y-2">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/bvn/verify - Full BVN verification
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/bvn/lookup/&#123;bvn&#125; - Basic BVN lookup
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/bvn/status/&#123;bvn&#125; - Check verification
                status
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/bvn/health - Health check
              </code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Use Cases:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bank account opening processes</li>
              <li>Loan application verification</li>
              <li>Anti-fraud checks in financial services</li>
              <li>KYC compliance for fintech applications</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      {/* IVR Service */}
      <SectionHeader
        id="ivr"
        title="📞 IVR Service (Interactive Voice Response)"
      >
        <div className="space-y-4">
          <p className="font-medium">
            Purpose: Build automated voice systems for Nigerian customers with
            local language support.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Nigerian language support (English, Hausa, Yoruba, Igbo)</li>
              <li>Text-to-speech and speech recognition</li>
              <li>DTMF input handling</li>
              <li>Call routing, recording, and analytics</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Endpoints:</h3>
            <div className="space-y-2">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/ivr/flow - Create IVR flow
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/ivr/call - Handle incoming calls
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs sm:text-sm break-all">
                GET /api/v1/ivr/status/&#123;call_id&#125; - Check call status
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/ivr/tts - Text-to-speech conversion
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/ivr/health - Health check
              </code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Use Cases:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Customer support automation</li>
              <li>Banking services and account inquiries</li>
              <li>Survey and feedback collection</li>
              <li>Appointment booking systems</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      {/* NIN Service */}
      <SectionHeader id="nin" title="🆔 NIN Service (National Identity Number)">
        <div className="space-y-4">
          <p className="font-medium">
            Purpose: Instantly verify Nigerian National Identity Numbers (NIN)
            for KYC, fraud prevention, and compliance.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                Real-time validation using official NIMC data via Dojah API
              </li>
              <li>Strict format enforcement (11 digits, numeric only)</li>
              <li>Status tracking and lookup endpoints</li>
              <li>Secure, privacy-compliant data handling</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Endpoints:</h3>
            <div className="space-y-2">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/nin/verify - Verify NIN
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/nin/lookup/&#123;nin&#125; - Lookup NIN details
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/nin/status/&#123;nin&#125; - Check verification
                status
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/nin/health - Health check
              </code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Use Cases:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Fintech customer onboarding</li>
              <li>Banking KYC processes</li>
              <li>Digital identity validation</li>
              <li>Government service verification</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      {/* SMS Service */}
      <SectionHeader id="sms" title="📱 SMS Service">
        <div className="space-y-4">
          <p className="font-medium">
            Purpose: Send SMS messages to Nigerian phone numbers across all
            major networks with high delivery rates.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Multi-network support (MTN, Airtel, Glo, 9mobile)</li>
              <li>High delivery rates with real-time delivery reports</li>
              <li>Bulk messaging capabilities</li>
              <li>OTP, notifications, and marketing campaigns</li>
              <li>Secure transmission and delivery confirmation</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Endpoints:</h3>
            <div className="space-y-2">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/sms/send - Send single SMS
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/sms/send/bulk - Send bulk SMS
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs sm:text-sm break-all">
                GET /api/v1/sms/status/&#123;message_id&#125; - Check delivery
                status
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/sms/balance - Check SMS balance
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/sms/health - Health check
              </code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Use Cases:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>OTP verification for authentication</li>
              <li>Customer notifications and alerts</li>
              <li>Marketing campaigns and promotions</li>
              <li>Transaction confirmations</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      {/* Two-Way SMS Service */}
      <SectionHeader id="two-way-sms" title="💬 Two-Way SMS Service">
        <div className="space-y-4">
          <p className="font-medium">
            Purpose: Enable bidirectional SMS conversations for customer
            support, surveys, and interactive campaigns.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Receive and reply to SMS messages</li>
              <li>Conversation threading and context management</li>
              <li>Context-aware automated replies</li>
              <li>Keyword-based automation</li>
              <li>AI-powered response generation</li>
              <li>Conversation analytics and reporting</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Endpoints:</h3>
            <div className="space-y-2">
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/two-way-sms/receive - Receive SMS (webhook)
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/two-way-sms/reply - Send reply message
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                POST /api/v1/two-way-sms/workflow - Create automated workflow
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/two-way-sms/conversations - List conversations
              </code>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded">
                GET /api/v1/two-way-sms/health - Health check
              </code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Use Cases:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Interactive customer support</li>
              <li>Survey and feedback collection</li>
              <li>Order tracking and status updates</li>
              <li>Appointment scheduling and management</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      {/* Getting Started */}
      <SectionHeader id="getting-started" title="🚀 Getting Started">
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Quick Start Steps
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-green-700 dark:text-green-300">
              <li>
                Contact administrators for account creation (closed sandbox - 9
                startups only)
              </li>
              <li>Receive your login credentials securely</li>
              <li>Login to the platform</li>
              <li>Start testing DPI services with Nigerian data formats</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Authentication</h3>
            <p>
              All API requests require JWT token authentication. Include the
              token in the Authorization header:
            </p>
            <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">
              Authorization: Bearer YOUR_JWT_TOKEN
            </code>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Base URL</h3>
            <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs sm:text-sm break-all">
              https://api.sandbox.example.com
            </code>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Response Format</h3>
            <p>All API responses follow a consistent JSON format:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-2 overflow-x-auto">
              {`{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00Z"
}`}
            </pre>
          </div>
        </div>
      </SectionHeader>

      {/* Integration Guide */}
      <SectionHeader id="integration" title="🔧 Integration Guide">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Environment Configuration</h3>
            <p>Configure your environment using the centralized .env file:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-2 overflow-x-auto">
              {`# API Configuration
API_BASE_URL=https://api.sandbox.example.com
API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret

# Service-specific settings
DOJAH_API_KEY=your_dojah_key
SMS_PROVIDER_KEY=your_sms_key`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Rate Limiting</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Standard rate limit: 100 requests per minute</li>
              <li>Bulk operations: 10 requests per minute</li>
              <li>Rate limit headers included in all responses</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Error Handling</h3>
            <p>Standard HTTP status codes are used. Error responses include:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-2 overflow-x-auto">
              {`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input format",
    "details": {...}
  },
  "timestamp": "2024-01-01T00:00:00Z"
}`}
            </pre>
          </div>
        </div>
      </SectionHeader>

      {/* Support */}
      <SectionHeader id="support" title="📞 Support & Resources">
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Contact Information
            </h3>
            <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
              <li>Technical Support: </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Additional Resources</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>API Testing Interface: Available in this platform</li>
            </ul>
          </div>
        </div>
      </SectionHeader>

      <div className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">
          DPI Sandbox Platform - Empowering Nigerian Digital Infrastructure
        </p>
      </div>

      <PageNavigation {...getNavigation("/docs")} />
    </div>
  );
}
