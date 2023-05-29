import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = 8000;

const app = express();

app.get('/', (req, res) => {
  res.json('hi');
});

app.get('/news', (req, res) => {
  res.json('hi');
});

app.listen(PORT, () => console.log(`Server is runnign on port ${PORT}`));
