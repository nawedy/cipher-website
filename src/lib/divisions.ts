// src/lib/divisions.ts
// Utility functions for division theming and configuration management

import { DivisionConfig, DivisionColors, DivisionId } from '@/types/divisions';

export function getDivisionColor(
  divisionId: DivisionId, 
  colorType: keyof DivisionColors,
  fallback: string = '#3b82f6'
): string {
  const colors = divisionColorMap[divisionId];
  return colors?.[colorType] || fallback;
}

export function getDivisionTheme(divisionId: DivisionId): DivisionColors {
  return divisionColorMap[divisionId] || divisionColorMap.strategy;
}

export function generateDivisionCSS(divisionId: DivisionId): Record<string, string> {
  const colors = getDivisionTheme(divisionId);
  
  return {
    '--division-primary': colors.primary,
    '--division-secondary': colors.secondary,
    '--division-accent': colors.accent,
    '--division-neon': colors.neon,
    '--division-background': colors.background,
    '--division-card-bg': colors.cardBackground,
    '--division-text-primary': colors.textPrimary,
    '--division-text-secondary': colors.textSecondary,
    '--division-border': colors.border,
  };
}

export function getDivisionGradient(divisionId: DivisionId, type: 'background' | 'card' | 'button' = 'background'): string {
  const colors = getDivisionTheme(divisionId);
  
  switch (type) {
    case 'background':
      return colors.backgroundGradient;
    case 'card':
      return `linear-gradient(135deg, ${colors.cardBackground}CC 0%, ${colors.primary}1A 100%)`;
    case 'button':
      return `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;
    default:
      return colors.backgroundGradient;
  }
}

export const divisionColorMap: Record<DivisionId, DivisionColors> = {
  strategy: {
    primary: '#073C32',
    secondary: '#00FFE7',
    accent: '#FF367B',
    neon: '#00FFE7',
    background: '#0a0f0d',
    backgroundGradient: 'linear-gradient(135deg, #073C32 0%, #0a0f0d 100%)',
    cardBackground: 'rgba(7, 60, 50, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(0, 255, 231, 0.15)'
  },
  digitalworks: {
    primary: '#088B8B',
    secondary: '#00FFF7',
    accent: '#FF2994',
    neon: '#2FE4FF',
    background: '#0a0f0f',
    backgroundGradient: 'linear-gradient(135deg, #088B8B 0%, #0a0f0f 100%)',
    cardBackground: 'rgba(8, 139, 139, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(47, 228, 255, 0.15)'
  },
  labs: {
    primary: '#00BFFF',
    secondary: '#312066',
    accent: '#9F5AFF',
    neon: '#64FFDA',
    background: '#0a0a0f',
    backgroundGradient: 'linear-gradient(135deg, #00BFFF 0%, #312066 100%)',
    cardBackground: 'rgba(0, 191, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(100, 255, 218, 0.15)'
  },
  studio: {
    primary: '#4B5665',
    secondary: '#C0C0C0',
    accent: '#2FE4FF',
    neon: '#2FE4FF',
    background: '#0f0f0f',
    backgroundGradient: 'linear-gradient(135deg, #4B5665 0%, #0f0f0f 100%)',
    cardBackground: 'rgba(75, 86, 101, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(47, 228, 255, 0.15)'
  },
  ai: {
    primary: '#222328',
    secondary: '#FF6B35',
    accent: '#A259FF',
    neon: '#FF6B35',
    background: '#0a0a0a',
    backgroundGradient: 'linear-gradient(135deg, #222328 0%, #0a0a0a 100%)',
    cardBackground: 'rgba(34, 35, 40, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(255, 107, 53, 0.15)'
  },
  products: {
    primary: '#1E40AF',
    secondary: '#3B82F6',
    accent: '#60A5FA',
    neon: '#3B82F6',
    background: '#0a0a0f',
    backgroundGradient: 'linear-gradient(135deg, #1E40AF 0%, #0a0a0f 100%)',
    cardBackground: 'rgba(30, 64, 175, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(59, 130, 246, 0.15)'
  }
};

export function validateDivisionId(id: string): id is DivisionId {
  return ['strategy', 'digitalworks', 'labs', 'studio', 'ai', 'products'].includes(id);
}

export function formatPrice(price: string, period?: string): string {
  if (price.toLowerCase() === 'custom') return 'Custom Pricing';
  if (!period) return price;
  return `${price}/${period}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}