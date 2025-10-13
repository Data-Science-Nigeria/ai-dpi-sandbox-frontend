"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Copy, Check, X } from "lucide-react";

interface FileToBase64ConverterProps {
  onBase64Generated: (base64: string) => void;
}

export function FileToBase64Converter({
  onBase64Generated,
}: FileToBase64ConverterProps) {
  const [isConverting, setIsConverting] = useState(false);
  const [base64Result, setBase64Result] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    setIsConverting(true);

    // Convert to JPEG if not already
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // Convert to JPEG with 0.9 quality
      const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      // Extract base64 data without the data URL prefix
      const base64Data = jpegDataUrl.split(",")[1];
      setBase64Result(base64Data);
      onBase64Generated(base64Data);
      setIsConverting(false);
    };

    img.onerror = () => {
      alert("Error processing image");
      setIsConverting(false);
    };

    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(base64Result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleClear = () => {
    setBase64Result("");
    setCopied(false);
    onBase64Generated("");
  };

  return (
    <div className="space-y-3 p-3 border rounded-md bg-muted/50">
      <div className="flex items-center gap-2">
        <Upload className="h-4 w-4" />
        <span className="text-sm font-medium">Image to Base64 Converter</span>
      </div>

      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="text-sm"
          disabled={isConverting}
        />

        {isConverting && (
          <p className="text-xs text-muted-foreground">Converting...</p>
        )}

        {base64Result && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                size="sm"
                className="h-7"
              >
                {copied ? (
                  <Check className="h-3 w-3 mr-1" />
                ) : (
                  <Copy className="h-3 w-3 mr-1" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="h-7"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
              <span className="text-xs text-muted-foreground">
                {Math.round(base64Result.length / 1024)}KB
              </span>
            </div>
            <textarea
              value={base64Result}
              readOnly
              className="w-full h-20 p-2 text-xs font-mono border rounded resize-none bg-background custom-scrollbar"
              placeholder="Base64 result will appear here..."
            />
          </div>
        )}
      </div>
    </div>
  );
}
