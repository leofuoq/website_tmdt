const express  = require('express');
const router = express.Router();
const {getHomepage,getContact} = require('../controllers/homeController')
const test = require('../controllers/test')
const {signIn,logIn,loadLogin,getProfile,logOut} = require('../controllers/userController')
const getPrByCate = require('../controllers/loadPrByCategory')
const {insertCart,getCartByAccId,deleteCart} = require('../controllers/cartController')
const checkOut = require('../controllers/checkoutController')
const getInvoiceByAccid = require('../controllers/invoiceController')
const getDetail = require('../controllers/detailController')
const searchByName =require('../controllers/searchController')
const insertFeedback = require('../controllers/feedbackController')
const {loadDashBoard,loadAllAccount,updateAccStatus,loadAllProducts,loadAllOrders,
  loadDashboardPage,loadSaleManager} = require('../controllers/dashboardController')
const {chartData_Column,chartData_Donut,chartData_linecol,chartData_line,
  chartData_Donut_RBC,chartData_Donut_QBC,chartData_Retention,chartData_Donut_QBS} = require('../controllers/chartdata')
const {editAccStatus,addCustomer} = require('../controllers/managerAccCotroller')
const checkSession = require('../middleware/checksession')
router.get('/home', getHomepage);
const checkRole = require('../middleware/checkRole')
const {loadAddProduct,editProStatus} = require('../controllers/managerProduct')
const editOrderStatus = require('../controllers/managerOrder')


  router.get('/loadCate',function(req, res) {
    res.render('category.ejs',)
  });
  router.get('/loadCart',function(req, res) {
    res.render('cart.ejs',)
  });
  router.get('/loadCheckout',checkSession,function(req, res) {
    res.render('checkout.ejs',)
  });
  router.get('/forgotPassword',function(req, res) {
    res.render('forgotPassword.ejs',)
  });
  router.get('/addCustomer',checkSession,checkRole,function(req, res) {
    res.render('admin/add_customer.ejs',)
  });
  router.get('/addProduct',checkSession,checkRole,function(req, res) {
    res.render('admin/add_product.ejs',)
  });
  router.get('/test2',function(req, res) {
    res.render('myAccount.ejs',)
  });
//them du lieu
    router.post('/them',test)
    router.post('/signIn',signIn)
    router.post('/insertCart/:productID',checkSession,insertCart)
    router.post('/logIn',logIn)
    router.post('/checkOut',checkSession,checkOut)
    router.post('/searchByName',searchByName)
    router.post('/insertFeedback',insertFeedback)
    router.post('/updateAccStatus/:accId/:sId',checkSession,checkRole,updateAccStatus)
    router.post('/editAccStatus',checkSession,checkRole,editAccStatus)
    router.post('/addCustomer',checkSession,checkRole,addCustomer)
    router.post('/editOrderStatus',checkSession,checkRole,editOrderStatus)
    router.post('/editProStatus',checkSession,checkRole,editProStatus)

    router.get('/loadLogin',loadLogin)
    router.get('/deleteCart/:productID',checkSession,deleteCart)
    router.get('/getPrByCate/:cateID',getPrByCate)
    router.get('/getCart/:accid',checkSession,getCartByAccId)  
    router.get('/getInvoiceByAccid/:accid',checkSession,getInvoiceByAccid)
    router.get('/getDetail/:productID',getDetail)
    router.get('/getContact',getContact)
    router.get('/getProfile',checkSession,getProfile)
    router.get('/loadDashBoard',checkSession,checkRole,loadDashBoard)
    router.get('/loadAllAccount',checkSession,checkRole,loadAllAccount)
    router.get('/loadAllProducts',loadAllProducts)
    router.get('/loadAllOrders',checkSession,checkRole,loadAllOrders)
    router.get('/logOut',logOut)
    router.get('/loadAddProduct',checkSession,checkRole,loadAddProduct)

    router.get('/loadDashboardPage',checkSession,checkRole,loadDashboardPage)
    router.get('/loadSaleManager',checkSession,checkRole,loadSaleManager)
    router.get('/SAChart',chartData_Column)
    router.get('/OAChart',chartData_Donut)
    router.get('/linecolChart',chartData_linecol)
    router.get('/lineChart',chartData_line)
    router.get('/chartData_Donut_RBC',chartData_Donut_RBC)
    router.get('/chartData_Donut_QBC',chartData_Donut_QBC)
    router.get('/chartData_Retention',chartData_Retention)
    router.get('/chartData_Donut_QBS',chartData_Donut_QBS)
  module.exports = router; 