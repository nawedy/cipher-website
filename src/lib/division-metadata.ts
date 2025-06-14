// src/lib/division-metadata.ts
// Utility functions for generating division-specific metadata

import type { Metadata } from 'next';

export function generateDivisionMetadata(
  divisionName: string,
  tagline: string,
  description: string,
  divisionId: string
): Metadata {
  return {
    title: `${divisionName} - ${tagline}`,
    description,
    openGraph: {
      title: `${divisionName} | Cipher Intelligence`,
      description,
      url: `https://cipherintelligence.com/divisions/${divisionId}`,
      images: [
        {
          url: `https://source.unsplash.com/1200x630/?${divisionId},ai,technology`,
          width: 1200,
          height: 630,
          alt: `${divisionName} - Cipher Intelligence`,
        },
      ],
    },
    twitter: {
      title: `${divisionName} | Cipher Intelligence`,
      description,
      images: [`https://source.unsplash.com/1200x630/?${divisionId},ai,technology`],
    },
    alternates: {
      canonical: `https://cipherintelligence.com/divisions/${divisionId}`,
    },
  };
} 