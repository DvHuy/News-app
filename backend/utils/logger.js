const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

const log = (message) => {
    const timeStamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `${timeStamp} - ${message}\n`);
};

module.exports = { log };
