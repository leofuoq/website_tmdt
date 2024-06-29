const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')

const loadAddProduct = async (req, res) => {
  try {
    const categories = await dao.category10();
    const supplier = await dao.supplier()
    console.log(supplier,categories)
    res.render('admin/add_product.ejs',{categories: categories,supplier:supplier})
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};

const editProStatus = async (req, res) => {
    try {
        // const account = req.session.acc
        // const accountid = account[0].id
        // const username = account[0].username

        const {id,status } = req.body;
        await dao.editOrderStatus(id, status)
        console.log(id,status)
        res.redirect('/loadAllOrders')
    // Render trang và truyền dữ liệu vào
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports = {loadAddProduct,editProStatus}