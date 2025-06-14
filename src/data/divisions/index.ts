// src/data/divisions/index.ts
// Central export file for all division configurations

export { strategyDivisionConfig } from './strategy';
export { digitalworksDivisionConfig } from './digitalworks';
export { labsDivisionConfig } from './labs';
export { studioDivisionConfig } from './studio';
export { aiDivisionConfig } from './ai';
export { productsDivisionConfig } from './products';

import { DivisionConfig, DivisionId } from '@/types/divisions';
import { strategyDivisionConfig } from './strategy';
import { digitalworksDivisionConfig } from './digitalworks';
import { labsDivisionConfig } from './labs';
import { studioDivisionConfig } from './studio';
import { aiDivisionConfig } from './ai';
import { productsDivisionConfig } from './products';

export const allDivisionsConfig: Record<DivisionId, DivisionConfig> = {
  strategy: strategyDivisionConfig,
  digitalworks: digitalworksDivisionConfig,
  labs: labsDivisionConfig,
  studio: studioDivisionConfig,
  ai: aiDivisionConfig,
  products: productsDivisionConfig,
};

export function getDivisionConfig(divisionId: DivisionId): DivisionConfig {
  const config = allDivisionsConfig[divisionId];
  if (!config) {
    throw new Error(`Division configuration not found for: ${divisionId}`);
  }
  return config;
}

export function getAllDivisionIds(): DivisionId[] {
  return Object.keys(allDivisionsConfig) as DivisionId[];
}

export function getDivisionsList(): { id: DivisionId; name: string; tagline: string }[] {
  return getAllDivisionIds().map(id => ({
    id,
    name: allDivisionsConfig[id].name,
    tagline: allDivisionsConfig[id].tagline
  }));
}

// Helper function for navigation and routing
export function getDivisionPath(divisionId: DivisionId): string {
  return `/divisions/${divisionId}`;
}

// Helper function to get related divisions (excluding current)
export function getRelatedDivisions(currentDivisionId: DivisionId): DivisionConfig[] {
  return getAllDivisionIds()
    .filter(id => id !== currentDivisionId)
    .map(id => allDivisionsConfig[id]);
}