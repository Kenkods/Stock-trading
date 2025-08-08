import express from 'express';
import dotenv from "dotenv";
import pool from './src/config/db.js'; 
import cors from "cors";
import userRoutes from './src/routes/userRoutes.js';
const app = express();

app.use(cors());
dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Stock Trading API');
});

app.use('/api', userRoutes);
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error:", err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

