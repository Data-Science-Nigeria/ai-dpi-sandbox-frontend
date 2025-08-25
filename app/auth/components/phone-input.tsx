'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  iso: string;
}

const countries: Country[] = [
  { code: '+93', name: 'Afghanistan', iso: 'af' },
  { code: '+355', name: 'Albania', iso: 'al' },
  { code: '+213', name: 'Algeria', iso: 'dz' },
  { code: '+376', name: 'Andorra', iso: 'ad' },
  { code: '+244', name: 'Angola', iso: 'ao' },
  { code: '+54', name: 'Argentina', iso: 'ar' },
  { code: '+374', name: 'Armenia', iso: 'am' },
  { code: '+61', name: 'Australia', iso: 'au' },
  { code: '+43', name: 'Austria', iso: 'at' },
  { code: '+994', name: 'Azerbaijan', iso: 'az' },
  { code: '+973', name: 'Bahrain', iso: 'bh' },
  { code: '+880', name: 'Bangladesh', iso: 'bd' },
  { code: '+375', name: 'Belarus', iso: 'by' },
  { code: '+32', name: 'Belgium', iso: 'be' },
  { code: '+229', name: 'Benin', iso: 'bj' },
  { code: '+975', name: 'Bhutan', iso: 'bt' },
  { code: '+591', name: 'Bolivia', iso: 'bo' },
  { code: '+387', name: 'Bosnia and Herzegovina', iso: 'ba' },
  { code: '+267', name: 'Botswana', iso: 'bw' },
  { code: '+55', name: 'Brazil', iso: 'br' },
  { code: '+673', name: 'Brunei', iso: 'bn' },
  { code: '+359', name: 'Bulgaria', iso: 'bg' },
  { code: '+226', name: 'Burkina Faso', iso: 'bf' },
  { code: '+257', name: 'Burundi', iso: 'bi' },
  { code: '+855', name: 'Cambodia', iso: 'kh' },
  { code: '+237', name: 'Cameroon', iso: 'cm' },
  { code: '+1', name: 'Canada', iso: 'ca' },
  { code: '+56', name: 'Chile', iso: 'cl' },
  { code: '+86', name: 'China', iso: 'cn' },
  { code: '+57', name: 'Colombia', iso: 'co' },
  { code: '+385', name: 'Croatia', iso: 'hr' },
  { code: '+53', name: 'Cuba', iso: 'cu' },
  { code: '+357', name: 'Cyprus', iso: 'cy' },
  { code: '+420', name: 'Czech Republic', iso: 'cz' },
  { code: '+45', name: 'Denmark', iso: 'dk' },
  { code: '+20', name: 'Egypt', iso: 'eg' },
  { code: '+372', name: 'Estonia', iso: 'ee' },
  { code: '+251', name: 'Ethiopia', iso: 'et' },
  { code: '+358', name: 'Finland', iso: 'fi' },
  { code: '+33', name: 'France', iso: 'fr' },
  { code: '+49', name: 'Germany', iso: 'de' },
  { code: '+233', name: 'Ghana', iso: 'gh' },
  { code: '+30', name: 'Greece', iso: 'gr' },
  { code: '+36', name: 'Hungary', iso: 'hu' },
  { code: '+354', name: 'Iceland', iso: 'is' },
  { code: '+91', name: 'India', iso: 'in' },
  { code: '+62', name: 'Indonesia', iso: 'id' },
  { code: '+98', name: 'Iran', iso: 'ir' },
  { code: '+964', name: 'Iraq', iso: 'iq' },
  { code: '+353', name: 'Ireland', iso: 'ie' },
  { code: '+972', name: 'Israel', iso: 'il' },
  { code: '+39', name: 'Italy', iso: 'it' },
  { code: '+81', name: 'Japan', iso: 'jp' },
  { code: '+962', name: 'Jordan', iso: 'jo' },
  { code: '+7', name: 'Kazakhstan', iso: 'kz' },
  { code: '+254', name: 'Kenya', iso: 'ke' },
  { code: '+965', name: 'Kuwait', iso: 'kw' },
  { code: '+371', name: 'Latvia', iso: 'lv' },
  { code: '+961', name: 'Lebanon', iso: 'lb' },
  { code: '+370', name: 'Lithuania', iso: 'lt' },
  { code: '+352', name: 'Luxembourg', iso: 'lu' },
  { code: '+60', name: 'Malaysia', iso: 'my' },
  { code: '+52', name: 'Mexico', iso: 'mx' },
  { code: '+212', name: 'Morocco', iso: 'ma' },
  { code: '+31', name: 'Netherlands', iso: 'nl' },
  { code: '+64', name: 'New Zealand', iso: 'nz' },
  { code: '+234', name: 'Nigeria', iso: 'ng' },
  { code: '+47', name: 'Norway', iso: 'no' },
  { code: '+968', name: 'Oman', iso: 'om' },
  { code: '+92', name: 'Pakistan', iso: 'pk' },
  { code: '+51', name: 'Peru', iso: 'pe' },
  { code: '+63', name: 'Philippines', iso: 'ph' },
  { code: '+48', name: 'Poland', iso: 'pl' },
  { code: '+351', name: 'Portugal', iso: 'pt' },
  { code: '+974', name: 'Qatar', iso: 'qa' },
  { code: '+40', name: 'Romania', iso: 'ro' },
  { code: '+7', name: 'Russia', iso: 'ru' },
  { code: '+966', name: 'Saudi Arabia', iso: 'sa' },
  { code: '+221', name: 'Senegal', iso: 'sn' },
  { code: '+65', name: 'Singapore', iso: 'sg' },
  { code: '+421', name: 'Slovakia', iso: 'sk' },
  { code: '+386', name: 'Slovenia', iso: 'si' },
  { code: '+27', name: 'South Africa', iso: 'za' },
  { code: '+82', name: 'South Korea', iso: 'kr' },
  { code: '+34', name: 'Spain', iso: 'es' },
  { code: '+94', name: 'Sri Lanka', iso: 'lk' },
  { code: '+46', name: 'Sweden', iso: 'se' },
  { code: '+41', name: 'Switzerland', iso: 'ch' },
  { code: '+66', name: 'Thailand', iso: 'th' },
  { code: '+90', name: 'Turkey', iso: 'tr' },
  { code: '+380', name: 'Ukraine', iso: 'ua' },
  { code: '+971', name: 'United Arab Emirates', iso: 'ae' },
  { code: '+44', name: 'United Kingdom', iso: 'gb' },
  { code: '+1', name: 'United States', iso: 'us' },
  { code: '+598', name: 'Uruguay', iso: 'uy' },
  { code: '+58', name: 'Venezuela', iso: 've' },
  { code: '+84', name: 'Vietnam', iso: 'vn' },
  { code: '+967', name: 'Yemen', iso: 'ye' },
  { code: '+260', name: 'Zambia', iso: 'zm' },
  { code: '+263', name: 'Zimbabwe', iso: 'zw' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export function PhoneInput({ value, onChange, error, placeholder = "Phone number" }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Parse existing value to extract country code and phone number
    if (value) {
      const country = countries.find(c => value.startsWith(c.code));
      if (country) {
        setSelectedCountry(country);
        setPhoneNumber(value.substring(country.code.length).trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, [value]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    const newValue = phoneNumber ? `${country.code} ${phoneNumber}` : country.code;
    onChange(newValue);
    setIsOpen(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhoneNumber(newPhone);
    
    if (selectedCountry) {
      onChange(newPhone ? `${selectedCountry.code} ${newPhone}` : selectedCountry.code);
    } else {
      onChange(newPhone);
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-10 sm:w-12 px-1 sm:px-2 py-2 border border-r-0 rounded-l focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none ${
            error ? 'border-red-500' : 'border-gray-300'
          } dark:bg-[#1C1E22] dark:text-white`}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
            {selectedCountry ? (
              <img
                src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                alt={selectedCountry.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs">🌍</span>
            )}
          </div>
        </button>
        
        <input
          type="tel"
          value={selectedCountry ? `${selectedCountry.code} ${phoneNumber}` : phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className={`flex-1 min-w-0 px-2 sm:px-3 py-2 border rounded-r focus:border-[#0A5A1A] focus:ring-[#0A5A1A] focus:outline-none dark:text-white dark:bg-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full max-w-xs sm:w-56 bg-white dark:bg-[#1C1E22] border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50 max-h-48 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleCountrySelect(country)}
              className="w-full px-2 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                <img
                  src={`https://flagcdn.com/w40/${country.iso}.png`}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="flex-1 text-sm dark:text-white">{country.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{country.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}