import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export const concepts = [
  { id: 'street',  label: 'Street',    sublabel: 'Underground' },
  { id: 'premium', label: 'Exclusive', sublabel: 'Premium'     },
  { id: 'clean',   label: 'Clean',     sublabel: 'Modern'      },
];

export function ThemeProvider({ children }) {
  const [concept, setConcept] = useState('street');
  const [mode, setMode]       = useState('dark');
  const toggleMode = () => setMode(m => m === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ concept, setConcept, mode, toggleMode }}>
      <div className={`concept-${concept} mode-${mode} theme-root ${concept === 'street' ? 'street-noise' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
