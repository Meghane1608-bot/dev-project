import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow React frontend
app.use(express.json());

// Root Endpoint GET /
app.get('/', async (req, res) => {
  try {
    // Test PGlite query
    const dbResult = await db.query("SELECT 'PGlite is connected!' AS db_status, NOW() AS server_time;");
    
    res.json({
      status: 'success',
      message: 'Welcome to the Stego Backend API!',
      database: dbResult.rows[0],
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});