const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')

const dao = require('../DAO/dao')

const getPrByCate = async (req, res) => {
  try {
    const cateid = req.params.cateID
    const category = await dao.category10()
    // Gọi hàm category() và chờ kết quả trả về
    const product = await dao.getProductByCate(cateid);
    const cate = await dao.getCateName(cateid)
    const catename = cate[0].cname
        // Render trang và truyền dữ liệu vào
    res.render('category.ejs', { product: product, category: category, catename: catename, cateid: cateid});
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};

  module.exports = getPrByCate;