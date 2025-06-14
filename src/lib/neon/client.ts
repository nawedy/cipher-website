// src/lib/neon/client.ts
// NeonDB client configuration

import { neon } from '@neondatabase/serverless';
import { env } from '@/config/env';

// NeonDB configuration
export const neonConfig = {
  projectId: env.neon.projectId,
  connectionString: env.neon.databaseUrl,
  database: 'neondb',
  role: 'neondb_owner'
};

// Create NeonDB client
export const sql = neon(neonConfig.connectionString);

// Helper function to execute queries
export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  try {
    const result = await sql(query, params);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper function for single row queries
export async function executeQuerySingle<T = any>(query: string, params: any[] = []): Promise<T | null> {
  try {
    const result = await executeQuery<T>(query, params);
    return result[0] || null;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper function for insert/update/delete operations
export async function executeCommand(query: string, params: any[] = []): Promise<number> {
  try {
    const result = await sql(query, params);
    return Array.isArray(result) ? result.length : 0;
  } catch (error) {
    console.error('Database command error:', error);
    throw error;
  }
}

// Transaction helper
export async function withTransaction<T>(callback: (sqlClient: typeof sql) => Promise<T>): Promise<T> {
  // Note: Neon doesn't support explicit transactions in serverless mode
  // Each query is automatically wrapped in a transaction
  return await callback(sql);
} 