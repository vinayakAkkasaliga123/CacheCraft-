import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { cacheMiddleware } from "./cache/cacheMiddleware.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API endpoint with caching middleware
app.get("/api/products", cacheMiddleware, (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dataPath = path.join(__dirname, "data", "products.json");
  const products = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  // simulate delay to show cache improvement
  setTimeout(() => {
    res.json({
      success: true,
      source: "database",
      data: products
    });
  }, 2000);
});

// root
app.get("/", (req, res) => {
  res.send("Welcome to CacheCraft 🚀 - Custom Caching Layer for APIs ------ please visite the 'https://cachecraft-4.onrender.com/api/products' to see the demo and refresh it check the load time within 30 seconds and after 30 seconds and see the 'LOAD' difference");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







