import { PGlite } from '@electric-sql/pglite';

// Persist database data to disk under the `./pgdata` directory
// Use PGlite.create() to ensure waitReady resolves cleanly
const db = await PGlite.create('./pgdata');

// Initialize initial schema
await db.exec(`
  CREATE TABLE IF NOT EXISTS system_status (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;