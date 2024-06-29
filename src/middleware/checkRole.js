// middlewares/checkSession.js
const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')

const checkRole = async (req, res,next) => {
    const account = req.session.acc
    const role = account[0].isadmin
    if(role === 1) {
        // Thực hiện các hành động cho quyền admin ở đây
        console.log('Admin logged in');
        next(); // Chuyển hướng đến middleware hoặc router tiếp theo
    } else {
        // Nếu isadmin không phải là 1, trả về lỗi hoặc chuyển hướng người dùng
        console.log('User is not admin');
        res.redirect('/home'); // Chuyển hướng người dùng đến trang hiện tại
    }
  }
  
  module.exports = checkRole