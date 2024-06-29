const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')
const moment = require('moment')

const getInvoiceByAccid = async (req, res) => {
    try {
        const account = req.session.acc
        const accid = account[0].id
        const username = account[0].username
        const invoice1 =  await dao.getOrderByAccid(accid)
        const invoice = invoice1.map(item => {
          // Định dạng lại ngày tháng năm
          const date = moment(item.orderdate);
          const truedate = date.format("DD/MM/YYYY");
          // Trả về đối tượng mới với ngày tháng năm đã được định dạng lại
          return {
              ...item,
              ngay: truedate
          };
        });
      
    // Render trang và truyền dữ liệu vào
    res.render('orderlist.ejs',{invoice: invoice,username: username});
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = getInvoiceByAccid



