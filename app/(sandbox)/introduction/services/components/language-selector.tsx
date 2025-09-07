"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./code-block";

interface LanguageExample {
  curl: string;
  javascript: string;
  python: string;
  php: string;
  java: string;
}

interface LanguageSelectorProps {
  examples: LanguageExample;
  title?: string;
}

const languages = [
  { key: "curl", label: "cURL" },
  { key: "javascript", label: "JavaScript" },
  { key: "python", label: "Python" },
  { key: "php", label: "PHP" },
  { key: "java", label: "Java" },
] as const;

export function LanguageSelector({
  examples,
  title = "Request Example",
}: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof LanguageExample>("curl");

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
        <h4 className="text-sm sm:text-base font-medium">{title}</h4>
        <div className="flex flex-wrap gap-1">
          {languages.map((lang) => (
            <Badge
              key={lang.key}
              variant={selectedLanguage === lang.key ? "default" : "outline"}
              className="cursor-pointer text-xs hover:bg-accent transition-colors"
              onClick={() => setSelectedLanguage(lang.key)}
            >
              {lang.label}
            </Badge>
          ))}
        </div>
      </div>
      <CodeBlock
        code={examples[selectedLanguage]}
        language={selectedLanguage === "curl" ? "bash" : selectedLanguage}
        title={`${languages.find((l) => l.key === selectedLanguage)?.label} Example`}
      />
    </div>
  );
}
