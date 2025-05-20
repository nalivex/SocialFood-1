const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { pool, connectDB } = require("./db/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes);


async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

startServer();