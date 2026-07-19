import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const getThemeIcon = (t) => {
    switch (t) {
      case 'light':
        return <Sun size={17} className="text-theme-accent" />;
      case 'dark':
        return <Moon size={17} className="text-theme-accent" />;
      case 'system':
      default:
        return <Monitor size={17} className="text-theme-muted" />;
    }
  };

  const getThemeLabel = (t) => {
    switch (t) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      default: return '';
    }
  };

  const options = ['light', 'dark', 'system'];

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Change color theme. Current theme is ${getThemeLabel(theme)}`}
        className="flex items-center justify-center w-9 h-9 rounded-xl border border-theme-border bg-theme-toggle hover:bg-theme-hover focus-ring transition-all duration-200"
      >
        {getThemeIcon(theme)}
      </button>

      {/* Dropdown Options Menu */}
      {isOpen && (
        <ul
          role="listbox"
          aria-label="Theme options"
          tabIndex={-1}
          className="absolute right-0 mt-2.5 w-32 rounded-2xl border border-theme-border bg-theme-card p-1.5 shadow-theme z-50 animate-fade-in focus:outline-none"
        >
          {options.map((opt) => {
            const isActive = theme === opt;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setTheme(opt);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer select-none transition-colors duration-150 ${
                  isActive
                    ? 'bg-theme-toggleActive text-theme-heading shadow-sm'
                    : 'text-theme-body hover:bg-theme-hover hover:text-theme-heading'
                }`}
              >
                {getThemeIcon(opt)}
                <span>{getThemeLabel(opt)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
