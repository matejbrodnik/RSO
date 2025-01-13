import express from "express";
import { join } from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

const staticPath = join(__dirname, "dist"); // Adjust if your frontend build is in a different directory
app.use(express.static(staticPath));

app.use(
  "/api/login",
  createProxyMiddleware({
    target: "http://rsoas.rso.svc.cluster.local/login",
    changeOrigin: true,
  })
);

app.use(
  "/api/register",
  createProxyMiddleware({
    target: "http://rsoas.rso.svc.cluster.local/register",
    changeOrigin: true,
  })
);

app.use(
  "/api/location",
  createProxyMiddleware({
    target: "http://rsogs.rso.svc.cluster.local/location",
    changeOrigin: true,
  })
);
  
app.use(
  "/api/locationlist",
  createProxyMiddleware({
    target: "http://rsogs.rso.svc.cluster.local/locationlist",
    changeOrigin: true,
  })
);

app.use(
  "/api/weather",
  createProxyMiddleware({
    target: "http://rsows.rso.svc.cluster.local/weather",
    changeOrigin: true,
  })
);

app.use(
  "/getkey",
  createProxyMiddleware({
    target: "http://rsogs.rso.svc.cluster.local/getkey",
    changeOrigin: true,
  })
);

app.get("*", (req, res) => {
  res.sendFile(join(staticPath, "index.html"));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
