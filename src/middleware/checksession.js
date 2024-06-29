// middlewares/checkSession.js
const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')

const checkSession = async (req, res,next) => {
    const account = req.session.acc

    if (!account) {
      // Nếu session không tồn tại, chuyển hướng đến trang login
      return res.redirect('/loadLogin');
    }
    next();
  }
  
  module.exports = checkSession;