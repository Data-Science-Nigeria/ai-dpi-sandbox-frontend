"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "json",
  title,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative border rounded-lg w-full ${className}`}>
      {title && (
        <div className="px-2 xs:px-3 py-1.5 xs:py-2 bg-muted border-b text-xs xs:text-sm font-medium">
          {title}
        </div>
      )}
      <div className="relative w-full">
        <button
          onClick={handleCopy}
          className="absolute top-1.5 xs:top-2 right-1.5 xs:right-2 p-1 xs:p-1.5 rounded bg-background/80 hover:bg-background border text-[10px] xs:text-xs flex items-center gap-0.5 xs:gap-1 z-10"
        >
          {copied ? (
            <>
              <Check className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
              <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
        <div className="w-full" style={{ overflow: "hidden" }}>
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "0.75rem",
              paddingTop: "2.5rem",
              fontSize: "0.75rem",
              lineHeight: "1.4",
              background: "hsl(var(--muted))",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              overflowWrap: "anywhere",
              maxWidth: "100%",
              overflow: "hidden",
              width: "100%",
            }}
            wrapLines={true}
            wrapLongLines={true}
            showLineNumbers={false}
            className="text-xs md:text-sm max-w-full"
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
