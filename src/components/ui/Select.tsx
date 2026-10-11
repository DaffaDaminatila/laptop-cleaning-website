import React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = "", id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-4 py-3 rounded-xl border transition-colors appearance-none bg-white/90 focus:ring-2 focus:ring-offset-0 text-gray-900 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          } ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onCheckedChange"> {
  label: string;
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", onCheckedChange, onChange, ...props }, ref) => (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        ref={ref}
        type="checkbox"
        className={`mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-colors ${className}`}
        onChange={(e) => {
          onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
          onCheckedChange?.(e.target.checked);
        }}
        {...props}
      />
      {label ? <span className="text-gray-700 text-sm leading-relaxed">{label}</span> : null}
    </label>
  )
);
Checkbox.displayName = "Checkbox";
