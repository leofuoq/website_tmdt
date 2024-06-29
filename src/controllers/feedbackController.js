const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')

const dao = require('../DAO/dao')

const insertFeedback = async (req, res) => {
  try {
    const account = req.session.acc
    const accountid = account[0].id   

    const name = req.body.name
    const summary = req.body.summary
    const content = req.body.content
    const productid = req.body.productid
    const quality = req.body.quality;
    const price = req.body.price;
    const value = req.body.value;
    await dao.insertFeedback(accountid, productid, name, content, quality, price, value,summary)
        // Render trang và truyền dữ liệu vào
        res.redirect('/getDetail/' + productid)
    // res.render('search.ejs', { product: product, category: category, searchName: searchName});
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};

  module.exports = insertFeedback;