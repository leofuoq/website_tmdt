const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')
const moment = require('moment')
const express = require('express')
const app = express()
const loadDashBoard = async (req, res) => {
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
    res.render('admin/dashboard_overview.ejs',{invoice: invoice,username: username}); 
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  const loadAllAccount = async (req, res) => {
    try {
        // const account = req.session.acc
        // const username = account[0].username
        const listAccount =  await dao.getAllAccount()
        const listStatus =await dao.getAccStatus()
        const listAccount1 = listAccount.map(item => {
        //Định dạng lại ngày tháng năm
            const date = moment(item.date);
            const truedate = date.format("DD/MM/YYYY");
         // Trả về đối tượng mới với ngày tháng năm đã được định dạng lại
        return {
            ...item,
              Created: truedate
          };
        });
    // Render trang và truyền dữ liệu vào
    res.render('admin/customers2.ejs',{listAccount1: listAccount1,listStatus:listStatus});
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  const updateAccStatus = async (req, res) => {
    try {
        const accId = req.params.accId;
        const sId = req.params.sId
        console.log(accId,sId);
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  const loadAllProducts = async (req, res) => {
    try {
        // const account = req.session.acc
        // const username = account[0].username
        const listProducts =  await dao.getProducts()
        const listStatus =await dao.getAccStatus()
        const categories = await dao.category10();

    // Render trang và truyền dữ liệu vào
    res.render('admin/products2.ejs',{listProducts: listProducts,listStatus:listStatus,categories:categories});
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  const loadAllOrders = async (req, res) => {
    try {
        const account = req.session.acc
        const username = account[0].username
        const listOrders =  await dao.getAllOrders()
        const listStatus =await dao.getOrderStatus()
        const listOrders1 = listOrders.map(item => {
          // Định dạng lại ngày tháng năm
          const date = moment(item.orderdate);
          const truedate = date.format("DD/MM/YYYY");
          // Trả về đối tượng mới với ngày tháng năm đã được định dạng lại
          return {
              ...item,
              order_date: truedate
          };
        });
    // Render trang và truyền dữ liệu vào
    res.render('admin/orders2.ejs',{username: username,listStatus:listStatus,
      listOrders1:listOrders1});
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };


  const loadDashboardPage =async (req, res) => {
    try {

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
      const year = currentDate.getFullYear();

      const SalesAnalytics = await dao.SalesAnalytics(year)
      // const account = req.session.acc
      // const username = account[0].username
      const OrdersAnalytics = await dao.OrdersAnalytics(year)

      const monthlyData = await dao.getMonthly(month,year)
      const Revenue = monthlyData[0].revenue

      const orders_month = await dao.ordersThisMonth(month,year)
      const orders = orders_month[0].count

      const cus_month = await dao.customersThisMonth(month,year)
      const customers = cus_month[0].count

      const pro_month = await dao.productsThismonth(month,year)
      const products = pro_month[0].count

  // Render trang và truyền dữ liệu vào
  res.render('admin/adminDashboard.ejs',{Revenue:Revenue,orders:orders,customers:customers,products:products  });
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
  }
  
  const loadSaleManager =async (req, res) => {
    try {

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
      const year = currentDate.getFullYear();

      const topCusByQuantity = await dao.topCusByQuantity(month,year)
      const topCusByAmount = await dao.topCusByAmount(month,year)
      // const account = req.session.acc
      // const username = account[0].username
      const topProByAmount = await dao.topProByAmount(month,year)
      const topProByQuantity = await dao.topProByQuantity(month,year)

      const topSupoByAmount = await dao.topSupByAmount(month,year)
      const topSupByQuantity = await dao.topSupByQuantity(month,year)

      const topCateByAmount = await dao.topCateByAmount(month,year)
      const topCateByQuantity = await dao.topCateByQuantity(month,year)

      const monthlyData = await dao.getMonthly(month,year)
      const Revenue = monthlyData[0].revenue

  // Render trang và truyền dữ liệu vào
  res.render('admin/saleManager.ejs',{Revenue:Revenue,topCusByQuantity:topCusByQuantity,topCusByAmount:topCusByAmount,
    topProByAmount:topProByAmount, topProByQuantity:topProByQuantity,
    topSupoByAmount:topSupoByAmount,topSupByQuantity:topSupByQuantity,topCateByAmount:topCateByAmount,topCateByQuantity:topCateByQuantity  });
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
  }

  module.exports = {loadDashBoard,loadAllAccount,updateAccStatus,loadAllProducts,loadAllOrders,loadDashboardPage,loadSaleManager}