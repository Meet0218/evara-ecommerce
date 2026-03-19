import express from 'express';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import vendorRoutes from './routes/vendor.routes.js';
import authRoutes from './routes/auth.routes.js';
import path from 'path';
import cookieParser from "cookie-parser";
import 'dotenv/config';
import cors from "cors";
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';
import { notificationsocket } from './controller/socket.controller.js';

export const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files - use absolute path for Vercel serverless compatibility
app.use(express.static(path.join(__dirname, 'public')));

// Set current path for views
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// EJS template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Socket.io setup
const server = createServer(app);
const io = new Server(server);
io.on('connection', notificationsocket);

// All Routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/vendor', vendorRoutes);
app.use('/auth', authRoutes);

// Start server only when not running on Vercel (serverless)
const port = process.env.PORT || 3000;
if (process.env.VERCEL !== '1') {
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export default app;
