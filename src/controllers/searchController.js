const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')

const dao = require('../DAO/dao')

const searchByName = async (req, res) => {
  try {
    const searchName = req.body.searchName
    const searchNamelower = searchName ? searchName.toLowerCase() : null;

    const category = await dao.category10()
    // Gọi hàm category() và chờ kết quả trả về
    const product = await dao.searchByName(searchNamelower);
    // Render trang và truyền dữ liệu vào
    res.render('search.ejs', { product: product, category: category, searchName: searchName});
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};

  module.exports = searchByName;