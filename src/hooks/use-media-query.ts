import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Define the event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    media.addEventListener('change', listener);

    // Cleanup function
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

// Common breakpoint hooks
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsSmall = () => useMediaQuery('(max-width: 640px)');

// Dark mode detection
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

// Motion preferences
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)'); 