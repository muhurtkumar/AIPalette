import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js';

// Initialize the Express application
const app = express();

// Database connection
await connectDB()
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res)=> res.send("API Working"))
app.use('/api/users', userRoutes);

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})