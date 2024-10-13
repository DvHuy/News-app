const { connectSQL } = require('../config/db'); // Đường dẫn đến file kết nối của bạn
const sql = require('mssql/msnodesqlv8'); // Nhập khẩu đúng cách


// Hàm lấy tất cả bài viết
const getAllNews = async (req, res) => {
    const startTime = Date.now();
    try {
        const conn = await connectSQL(); // Kết nối đến SQL Server
        const result = await conn.request().query('SELECT Title, Summary, Content FROM Posts'); // Thực hiện truy vấn
        const queryTime = Date.now() - startTime;
        res.json({success: true, posts: result.recordset, queryTime: queryTime}); // Trả về dữ liệu
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Error retrieving posts' }); // Trả về lỗi nếu có
    }
};

// Hàm tìm kiếm bài viết
// Hàm này viết nhưng không xài vì chuyển sang dùng filter của JS
const searchNews = async (req, res) => {
    const keyword = req.query.keyword.trim().replace(/\s+/g, ' ') || ''; // Lấy từ khóa tìm kiếm từ query params
    const startTime = Date.now();
    try {
        const conn = await connectSQL(); // Kết nối đến SQL Server
        const query = `
            SELECT Title, Summary, Content FROM Posts 
            WHERE Title LIKE @keyword
        `; // Tìm kiếm chỉ theo Title
        
        const result = await conn.request()
            .input('keyword', sql.NVarChar, `%${keyword}%`) // Thêm tham số vào truy vấn
            .query(query);
        const queryTime = Date.now() - startTime;
        res.json({success:true, posts: result.recordset, queryTime: queryTime}); // Trả về dữ liệu tìm kiếm
       
        
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ error: 'Error searching posts' }); // Trả về lỗi nếu có
    }
};

module.exports = { getAllNews, searchNews };
