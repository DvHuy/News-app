const { faker } = require('@faker-js/faker');
const { connectSQL } = require('./db.js'); 

// Hàm chèn dữ liệu vào SQL Server
const batchInsert = async (batchSize) => {
  try {
    // Kết nối đến SQL Server bằng hàm connectSQL
    const pool = await connectSQL();
    
    if (!pool) {
      console.log("Could not connect");
      
    }

    for (let i = 0; i < 20000; i += batchSize) {
      let values = [];
      
      // Tạo batchSize dòng dữ liệu giả
      for (let j = 0; j < batchSize; j++) {
        const title = faker.lorem.words(3);
        const summary = faker.lorem.sentence();
        const content = faker.lorem.paragraphs(2);
        values.push(`('${title}', '${summary}', '${content}')`);
      }

      // Ghép các giá trị vào câu lệnh SQL
      const query = `INSERT INTO posts (Title, Summary, Content) VALUES ${values.join(",")}`;
      
      // Thực hiện chèn dữ liệu
      await pool.request().query(query);
      console.log(`Inserted ${batchSize} rows`);
    }

    console.log('Completed inserting 20,000 rows.');
    pool.close(); // Đóng kết nối sau khi hoàn thành
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};
module.exports = {batchInsert};

