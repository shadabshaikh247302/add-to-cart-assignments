import express from "express";
import dotenv from "dotenv";
import { database_connection } from "./config/db.js";
import router from "./router/order.router.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();
database_connection();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // your frontend Vite origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/order", router);

// const PORT = process.env.PORT || 10000;
app.listen(10000, () => {
  console.log(`Server is running on port `);
});
