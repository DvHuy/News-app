const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const dotenv = require('dotenv')
const sql = require('./config/db.js');
const { connectSQL } = require("./config/db.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectSQL()
});
