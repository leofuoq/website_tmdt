const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')

const insertCart = async (req, res) => {
    try {
      
      const productId = req.params.productID
      const account = req.session.acc
      const accountId = account[0].id
      const amount = 1

      const cartExisted = await dao.checkCartExist(accountId, productId);

      if (cartExisted) {
          const amountExisted = cartExisted.amount;
          const newamount = amountExisted + amount;
          await dao.editAmountCart(accountId, productId, newamount );
          res.redirect('/getCart/:accid')
          
      } else {
          await dao.insertCart(accountId, productId, amount);
          res.redirect('/getCart/:accid')
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
      }

  const deleteCart = async (req, res) => {
    try {
      const productId = req.params.productID
      const account = req.session.acc
      const accountId = account[0].id
      console.log(productId, accountId)
      await dao.deleteCart(accountId, productId);

      res.redirect('/getCart/:accid')
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
      };
const getCartByAccId = async (req, res) => {
  try {
    const account = req.session.acc
    const accid = account[0].id    
    const category = await dao.category10()
    const cart =  await dao.getCart(accid)
    if ( cart.length > 0) {
    const  subtotal = cart[0].subtotal
    res.render('cart.ejs',{cart: cart, category:category, subtotal: subtotal});
    }else{
    const subtotal = 0
    res.render('cart.ejs',{cart: cart, category:category, subtotal: subtotal});
    }
    
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error registering account:', error);
    res.status(500).send('Internal Server Error');
  }
    }

module.exports = {insertCart,getCartByAccId,deleteCart}