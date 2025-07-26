import fs from 'fs';
import csv from 'csv-parser';

const DATA_DIR = './data';


function loadCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Top 5 most sold products
export async function getTopSoldProducts() {
  const orderItems = await loadCSV(`${DATA_DIR}/order_items.csv`);
  const products = await loadCSV(`${DATA_DIR}/products.csv`);

  const countMap = {};
  for (const item of orderItems) {
    const id = item.product_id;
    countMap[id] = (countMap[id] || 0) + 1;
  }

  const topProducts = Object.entries(countMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([productId, count]) => {
      const product = products.find(p => p.id === productId);
      return {
        name: product?.name || `Product ${productId}`,
        sold: count,
      };
    });

  return topProducts;
}

// Order status by ID
export async function getOrderStatus(orderId) {
  const orders = await loadCSV(`${DATA_DIR}/orders.csv`);
  const order = orders.find(o => o.order_id === orderId);
  if (!order) return { error: "Order not found" };
  return {
    order_id: order.order_id,
    status: order.status,
    created_at: order.created_at,
    shipped_at: order.shipped_at,
    delivered_at: order.delivered_at,
    returned_at: order.returned_at
  };
}

// Stock left for a product
export async function getStockForProduct(productName) {
  const inventory = await loadCSV(`${DATA_DIR}/inventory_items.csv`);
  const products = await loadCSV(`${DATA_DIR}/products.csv`);

  const productIDs = products
    .filter(p => p.name.toLowerCase().includes(productName.toLowerCase()))
    .map(p => p.id);

  const stockLeft = inventory.filter(i =>
    productIDs.includes(i.product_id) && !i.sold_at
  ).length;

  return {
    product: productName,
    stock_left: stockLeft
  };
}
