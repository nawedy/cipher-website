// Export all hooks from a central location
export { useAuth, AuthProvider } from './useAuth';
export type { SignUpData } from './useAuth';

export { useCart } from './useCart';

export { useCheckout } from './useCheckout';

export { useLocalStorage } from './useLocalStorage';

export { useDebounce, useDebounceCallback } from './useDebounce';

export { 
  useMediaQuery, 
  useIsDesktop, 
  useIsTablet, 
  useIsMobile, 
  useIsSmall,
  usePrefersDarkMode,
  usePrefersReducedMotion 
} from './use-media-query'; 