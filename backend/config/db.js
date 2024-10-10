require("mssql");
const sql = require("mssql/msnodesqlv8");
const { log } = require("../utils/logger");


async function connectSQL() {
    let conn;
    const sqlConfig = {
        user: process.env.SQL_USERNAME,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DB,
        server: process.env.SQL_SERVER,
        driver: "msnodesqlv8",
        options: {
            trustServerCertificate: true,
        },
    };
    try {
        conn = await new sql.ConnectionPool(sqlConfig).connect();
        console.log("Connected to SQL Server successfully");
        
    } catch (error) {
        console.error("Connect to SQL Server failed - " + error);
    }
    return conn;
}

module.exports = { connectSQL };

