"use client";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export function PhoneInput({
  value,
  onChange,
  error,
  placeholder = "Phone number",
}: PhoneInputProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Remove all non-numeric characters except + at the beginning
    inputValue = inputValue.replace(/[^0-9+]/g, "");

    // Handle different input patterns
    if (inputValue.startsWith("+234")) {
      // Format: +234 XXXXXXXXXX (max 14 characters)
      if (inputValue.length <= 14) {
        onChange(inputValue);
      }
    } else if (inputValue.startsWith("0")) {
      // Format: 0XXXXXXXXXX (max 11 characters)
      if (inputValue.length <= 11) {
        onChange(inputValue);
      }
    } else if (inputValue.startsWith("+")) {
      // Only allow +234
      if ("+234".startsWith(inputValue)) {
        onChange(inputValue);
      }
    } else if (inputValue.length > 0) {
      // If it doesn't start with + or 0, assume it's a local number starting with 0
      onChange("0" + inputValue.slice(0, 10));
    } else {
      onChange(inputValue);
    }
  };

  const formatDisplayValue = (val: string) => {
    if (val.startsWith("+234") && val.length > 4) {
      return `+234 ${val.slice(4)}`;
    }
    return val;
  };

  return (
    <div className="relative">
      <input
        type="tel"
        value={formatDisplayValue(value)}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded focus:border-[#0A5A1A] focus:outline-none dark:text-white dark:bg-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <div className="text-xs text-gray-500 mt-1">
        Format: +234 XXXXXXXXXX or 0XXXXXXXXXX
      </div>
    </div>
  );
}
