const express = require("express");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");
const dotenv = require("dotenv");
const { connectSQL } = require("./config/db.js");
const { batchInsert } = require("./config/insertPosts.js");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectSQL();
  // Chèn 1000 dòng mỗi lần để tối ưu
  //   batchInsert(1000); xài 1 lần 
});
