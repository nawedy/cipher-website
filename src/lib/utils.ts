// src/lib/utils.ts
// Comprehensive utility functions organized by category with no duplicates

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Division } from "@/types";

// Purpose: Merge Tailwind CSS classes with proper precedence
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Purpose: Type guard for division validation
export function isValidDivision(value: string): value is Division {
  const validDivisions: Division[] = ['cig', 'cs', 'cdw', 'cl', 'cst', 'cai'];
  return validDivisions.includes(value as Division);
}

// Purpose: Format price for display (alias for numberUtils.formatCurrency)
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Date utilities
const dateUtils = {
  // Format date to readable string
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    });
  },

  // Format date and time
  formatDateTime: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Get relative time (e.g., "2 hours ago")
  getRelativeTime: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  },

  // Check if date is today
  isToday: (date: Date | string): boolean => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    return d.toDateString() === today.toDateString();
  },

  // Check if date is this week
  isThisWeek: (date: Date | string): boolean => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return d >= weekStart && d <= weekEnd;
  },

  // Add days to date
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  // Get start of day
  startOfDay: (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  },

  // Get end of day
  endOfDay: (date: Date): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  },
};

// String utilities
const stringUtils = {
  // Capitalize first letter
  capitalize: (str: string): string => 
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),

  // Convert to title case
  toTitleCase: (str: string): string =>
    str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    ),

  // Convert to kebab case
  toKebabCase: (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2')
       .replace(/[\s_]+/g, '-')
       .toLowerCase(),

  // Convert to camel case
  toCamelCase: (str: string): string =>
    str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : ''),

  // Convert to snake case
  toSnakeCase: (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, '$1_$2')
       .replace(/[\s-]+/g, '_')
       .toLowerCase(),

  // Truncate string with ellipsis
  truncate: (str: string, length: number, suffix = '...'): string =>
    str.length <= length ? str : str.substring(0, length) + suffix,

  // Remove HTML tags
  stripHtml: (str: string): string =>
    str.replace(/<[^>]*>/g, ''),

  // Generate slug from string
  slugify: (str: string): string =>
    str.toLowerCase()
       .replace(/[^\w\s-]/g, '')
       .replace(/[\s_-]+/g, '-')
       .replace(/^-+|-+$/g, ''),

  // Extract initials from name
  getInitials: (name: string): string =>
    name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2),

  // Mask sensitive data (e.g., email, phone)
  maskEmail: (email: string): string => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  },

  maskPhone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})\d{3}(\d{4})/, '$1***$2');
  },

  // Validate email format
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number format
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },
};

// Number utilities
const numberUtils = {
  // Format currency
  formatCurrency: (amount: number, currency = 'USD', locale = 'en-US'): string =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount),

  // Format percentage
  formatPercentage: (value: number, decimals = 1): string =>
    `${(value * 100).toFixed(decimals)}%`,

  // Format large numbers (e.g., 1.2K, 1.5M)
  formatCompact: (num: number): string => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
    return `${(num / 1000000000).toFixed(1)}B`;
  },

  // Format numbers with proper separators
  formatNumber: (num: number, options?: Intl.NumberFormatOptions): string =>
    new Intl.NumberFormat('en-US', options).format(num),

  // Clamp number between min and max
  clamp: (num: number, min: number, max: number): number =>
    Math.min(Math.max(num, min), max),

  // Generate random number between min and max
  random: (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min,

  // Round to specific decimal places
  round: (num: number, decimals: number): number =>
    Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals),

  // Check if number is even
  isEven: (num: number): boolean => num % 2 === 0,

  // Check if number is odd
  isOdd: (num: number): boolean => num % 2 !== 0,

  // Convert percentage string to decimal
  percentageToDecimal: (percentage: string | number): number => {
    const num = typeof percentage === 'string' ? parseFloat(percentage.replace('%', '')) : percentage;
    return num / 100;
  },
};

// Array utilities
const arrayUtils = {
  // Remove duplicates from array
  unique: <T>(arr: T[]): T[] => [...new Set(arr)],

  // Group array by key
  groupBy: <T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> =>
    arr.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>),

  // Chunk array into smaller arrays
  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  // Shuffle array
  shuffle: <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Get random item from array
  sample: <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)],

  // Sort array by key
  sortBy: <T, K extends keyof T>(arr: T[], key: K, direction: 'asc' | 'desc' = 'asc'): T[] =>
    [...arr].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    }),

  // Find item by key-value pair
  findBy: <T, K extends keyof T>(arr: T[], key: K, value: T[K]): T | undefined =>
    arr.find(item => item[key] === value),

  // Check if array is empty
  isEmpty: <T>(arr: T[]): boolean => arr.length === 0,

  // Get last item
  last: <T>(arr: T[]): T | undefined => arr[arr.length - 1],

  // Get first item
  first: <T>(arr: T[]): T | undefined => arr[0],

  // Create array with length and optional fill function
  createArray: <T>(length: number, fillFn?: (index: number) => T): T[] => {
    return Array.from({ length }, (_, index) => fillFn ? fillFn(index) : (index as unknown as T));
  },

  // Get unique items by key
  uniqueBy: <T, K>(array: T[], keyFn: (item: T) => K): T[] => {
    const seen = new Set<K>();
    return array.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  },
};

// Object utilities
const objectUtils = {
  // Deep clone object
  deepClone: <T>(obj: T): T => JSON.parse(JSON.stringify(obj)),

  // Check if object is empty
  isEmpty: (obj: Record<string, any>): boolean => 
    Object.keys(obj).length === 0,

  // Pick specific keys from object
  pick: <T extends Record<string, any>, K extends keyof T>(
    obj: T, 
    keys: K[]
  ): Pick<T, K> =>
    keys.reduce((result, key) => {
      if (key in obj) result[key] = obj[key];
      return result;
    }, {} as Pick<T, K>),

  // Omit specific keys from object
  omit: <T extends Record<string, any>, K extends keyof T>(
    obj: T, 
    keys: K[]
  ): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
  },

  // Deep merge objects
  deepMerge: <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] !== undefined) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
          result[key] = objectUtils.deepMerge(result[key] as any, source[key] as any);
        } else {
          result[key] = source[key] as any;
        }
      }
    }
    
    return result;
  },

  // Get nested property safely
  get: (obj: Record<string, any>, path: string, defaultValue?: any): any => {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result?.[key] === undefined) return defaultValue;
      result = result[key];
    }
    
    return result;
  },

  // Set nested property
  set: (obj: Record<string, any>, path: string, value: any): void => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    let current = obj;
    
    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[lastKey] = value;
  },
};

// URL utilities
const urlUtils = {
  // Build URL with parameters
  buildUrl: (base: string, params: Record<string, string | number>): string => {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
    return url.toString();
  },

  // Parse query string to object
  parseQuery: (queryString: string): Record<string, string> => {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },

  // Join URL parts
  joinUrl: (...parts: string[]): string =>
    parts
      .map(part => part.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/'),

  // Check if URL is absolute
  isAbsolute: (url: string): boolean =>
    /^https?:\/\//.test(url),

  // Get domain from URL
  getDomain: (url: string): string => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  },
};

// Local storage utilities
const storageUtils = {
  // Set item with expiration
  setWithExpiry: (key: string, value: any, ttl: number): void => {
    if (typeof window === 'undefined') return;
    const now = new Date();
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  // Get item with expiration check
  getWithExpiry: (key: string): any => {
    if (typeof window === 'undefined') return null;
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch {
      return null;
    }
  },

  // Clear expired items
  clearExpired: (): void => {
    if (typeof window === 'undefined') return;
    const now = new Date();
    Object.keys(localStorage).forEach(key => {
      try {
        const itemStr = localStorage.getItem(key);
        if (itemStr) {
          const item = JSON.parse(itemStr);
          if (item.expiry && now.getTime() > item.expiry) {
            localStorage.removeItem(key);
          }
        }
      } catch {
        // Ignore parsing errors
      }
    });
  },
};

// Color utilities
const colorUtils = {
  // Convert hex to RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  },

  // Convert RGB to hex
  rgbToHex: (r: number, g: number, b: number): string =>
    `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`,

  // Generate random color
  randomColor: (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  // Check if color is light or dark
  isLight: (hex: string): boolean => {
    const rgb = colorUtils.hexToRgb(hex);
    if (!rgb) return false;
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128;
  },
};

// File utilities
const fileUtils = {
  // Format file size
  formatSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Get file extension
  getExtension: (filename: string): string =>
    filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2),

  // Check if file is image
  isImage: (filename: string): boolean => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    return imageExtensions.includes(fileUtils.getExtension(filename).toLowerCase());
  },

  // Check if file is video
  isVideo: (filename: string): boolean => {
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
    return videoExtensions.includes(fileUtils.getExtension(filename).toLowerCase());
  },

  // Check if file is document
  isDocument: (filename: string): boolean => {
    const docExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
    return docExtensions.includes(fileUtils.getExtension(filename).toLowerCase());
  },
};

// Performance utilities
const performanceUtils = {
  // Debounce function
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Measure execution time
  measureTime: async <T>(fn: () => Promise<T> | T): Promise<{ result: T; time: number }> => {
    const start = performance.now();
    const result = await fn();
    const time = performance.now() - start;
    return { result, time };
  },
};

// General utilities
const generalUtils = {
  // Generate random ID for components
  generateId: (prefix: string = 'id'): string => 
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`,

  // Wait for specified time (async delay)
  sleep: (ms: number): Promise<void> => 
    new Promise(resolve => setTimeout(resolve, ms)),

  // Check if code is running in browser
  isBrowser: (): boolean => 
    typeof window !== 'undefined',

  // Check if code is running in development
  isDevelopment: (): boolean => 
    process.env.NODE_ENV === 'development',

  // Check if code is running in production
  isProduction: (): boolean => 
    process.env.NODE_ENV === 'production',

  // Safely parse JSON with fallback
  safeJsonParse: <T>(json: string, fallback: T): T => {
    try {
      return JSON.parse(json);
    } catch {
      return fallback;
    }
  },

  // Calculate reading time for content
  calculateReadingTime: (text: string): number => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },
};

// Export all utilities
export {
  dateUtils,
  stringUtils,
  numberUtils,
  arrayUtils,
  objectUtils,
  urlUtils,
  storageUtils,
  colorUtils,
  fileUtils,
  performanceUtils,
  generalUtils,
};