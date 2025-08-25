import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface PasswordInputProps {
  label: string;
  error?: string;
  placeholder?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, placeholder = '********', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-white">
          {label}
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            ref={ref}
            placeholder={placeholder}
            className="mt-1 w-full rounded border p-2 pr-10 focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none dark:text-white"
            {...props}
          />
          <button
            className="absolute top-4 right-2 cursor-pointer text-sm text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
