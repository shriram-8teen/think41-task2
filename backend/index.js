import express from 'express';
import cors from 'cors';
import {
  getTopSoldProducts,
  getOrderStatus,
  getStockForProduct
} from './chatbot.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/top-products', async (req, res) => {
  const result = await getTopSoldProducts();
  res.json(result);
});

app.get('/order-status/:id', async (req, res) => {
  const result = await getOrderStatus(req.params.id);
  res.json(result);
});

app.get('/stock', async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Missing product name" });
  const result = await getStockForProduct(name);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
