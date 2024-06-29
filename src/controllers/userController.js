const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')
const moment = require('moment')
const bcrypt = require('bcrypt');
const flash = require('connect-flash');


// app.set('trust proxy', 1) // trust first proxy

const loadLogin = async (req, res,next) => {
  try {
    const category = await dao.category10();
    const ms = req.flash('message')
    console.log(ms)
    res.render('sign-in1.ejs', { category: category,ms:ms })
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};
const signIn = async (req, res,next) => {
  try {
    const { email, name,phone, password,repassword } = req.body;
  
    const isSell = 0;
    const isAdmin = 0;
    const accStatus = 1;
    const hashedPassword = await bcrypt.hash(password, 10)

    await dao.insertAcc(name,email,hashedPassword,phone,isSell,isAdmin,accStatus)
    req.flash('message', 'Form submitted successfully!');
    res.redirect('/loadLogin')
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error registering account:', error);
    res.status(500).send('Internal Server Error');
  }
    }

const logIn = async (req, res) => {
  try {
  const {email,password} = req.body;
  const emailExisted = await dao.checkAccountExist(email);
  if (!emailExisted) {
    res.status(401).send('Tên người dùng không tồn tại!');
    return;
  }else{ 
    
    const hashedPassword = emailExisted[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
  
      if (passwordMatch) {
        const account = await dao.getAccount(email)
        req.session.acc = account
        res.redirect('/home' )}
          
        else{
          res.redirect('/loadLogin')
        }  }
 
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error registering account:', error);
    res.status(500).send('Internal Server Error');
  }
  
}
const logOut = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.send('Error logging out');
      }
      res.redirect('/loadLogin');
    });
 
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error registering account:', error);
    res.status(500).send('Internal Server Error');
  }
  
}

const getProfile = async (req, res) => {
  const account =  req.session.acc
  const accid = account[0].id

  const account1 = account.map(item => {
    // Định dạng lại ngày tháng năm
    const date = moment(item.created_at);
    const truedate = date.format("DD/MM/YYYY");
    // Trả về đối tượng mới với ngày tháng năm đã được định dạng lại
    return {
        ...item,
        ngay: truedate
    };
});

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


const id=account1[0].id
const username=account1[0].username
const email=account1[0].email
const phonenumber=account1[0].phonenumber
const ngay=account1[0].ngay
console.log(id, username, email, phonenumber, ngay)

  res.render('myAccount.ejs',{id: id, username: username, email: email, phonenumber: phonenumber,ngay:ngay,invoice:invoice})
  }
module.exports = {signIn, logIn,loadLogin,getProfile,logOut};