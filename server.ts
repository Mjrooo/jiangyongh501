import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("jiangyong.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    content TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT,
    user_phone TEXT,
    quantity INTEGER,
    total_price REAL,
    code TEXT,
    status TEXT DEFAULT 'paid',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/complaints", (req, res) => {
    const { name, phone, content } = req.body;
    const stmt = db.prepare("INSERT INTO complaints (name, phone, content) VALUES (?, ?, ?)");
    const info = stmt.run(name, phone, content);
    res.json({ id: info.lastInsertRowid, status: "success" });
  });

  app.post("/api/orders", (req, res) => {
    const { productName, phone, quantity, totalPrice } = req.body;
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const stmt = db.prepare("INSERT INTO orders (product_name, user_phone, quantity, total_price, code) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(productName, phone, quantity, totalPrice, code);
    res.json({ id: info.lastInsertRowid, code, status: "success" });
  });

  app.get("/api/weather", (req, res) => {
    // Mock weather and scenic spot data
    res.json([
      { name: "女书生态博物馆", weather: "晴 22℃", flow: "舒适", parking: "25/100" },
      { name: "上甘棠景区", weather: "多云 21℃", flow: "一般", parking: "12/80" },
      { name: "千家峒景区", weather: "晴 23℃", flow: "舒适", parking: "45/150" },
      { name: "勾蓝瑶寨", weather: "晴 22℃", flow: "拥挤", parking: "2/60" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
