import fs from "fs";
import path from "path";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../db/connect.js";

dotenv.config();

const files = [
  "distribution_centers",
  "inventory_items",
  "order_items",
  "orders",
  "products",
  "users"
];

const loadCSVToMongo = async (collectionName, filePath) => {
  const collection = mongoose.connection.collection(collectionName);
  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", async () => {
        try {
          await collection.deleteMany({});
          await collection.insertMany(rows);
          console.log(` ${collectionName} imported`);
          resolve();
        } catch (err) {
          console.error(` Error inserting ${collectionName}:`, err);
          reject(err);
        }
      });
  });
};

const runIngestion = async () => {
  await connectDB();
  for (const file of files) {
    const filePath = path.resolve("data", `${file}.csv`);
    await loadCSVToMongo(file, filePath);
  }
  mongoose.disconnect();
};

runIngestion();
