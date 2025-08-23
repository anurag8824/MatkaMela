// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/connection.js';
import userRoutes from './router/userRoutes.js';
import adminRoutes from './router/adminRoutes.js';
import { setupGameCronJobs } from './contollers/cronController.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use("/qrImage", express.static("qrImage"));

// Attach DB connection to every request
app.use((req, res, next) => {
    req.db = pool;
    next();
});

// Routes
app.use('/api', userRoutes);
app.use('/admin', adminRoutes);


// Start server after testing DB connection
const startServer = async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('✅ MySQL Connected:', rows[0].result);


        // 👇 Yahan cronjobs initialize kar do
        setupGameCronJobs(pool);

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ MySQL Connection Error:', err);
        process.exit(1);
    }
};

startServer();
