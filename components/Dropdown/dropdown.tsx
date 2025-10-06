import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({
  children,
  options,
  onChange,
}: {
  children: React.ReactNode;
  options: React.ReactNode[] | string[];
  onChange?: (selected: React.ReactNode, index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleSelect = (option: React.ReactNode, idx: number) => {
    setOpen(false);
    if (onChange) {
      onChange(option, idx);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-[#222] rounded hover:bg-gray-200 dark:hover:bg-[#333] focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        {children}
        <svg
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-[#222] border border-gray-200 dark:border-gray-700 rounded shadow-lg">
          <ul className="py-1">
            {options.map((option, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer"
                onClick={() => handleSelect(option, idx)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
