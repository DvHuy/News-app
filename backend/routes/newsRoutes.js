const express = require('express');
const { searchNews, getAllNews } = require('../controllers/newsController.js');
const router = express.Router();


router.get('/', getAllNews);
router.get('/search', searchNews);

module.exports = router;
