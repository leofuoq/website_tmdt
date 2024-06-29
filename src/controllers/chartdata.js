const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')
const moment = require('moment')
const express = require('express')
const app = express()
const chartData_Column = async (req, res) => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();
    const SalesAnalytics = await dao.SalesAnalytics(year)
    const SalesAnalytics_yearly = await dao.SalesAnalytics_yearly()
    const SalesAnalytics_daily = await dao.SalesAnalytics_daily(month, year)
    let updatedSA = SalesAnalytics.map(item => {
      return {
        revenue: (parseFloat(item.revenue) / 1000).toFixed(2),
        net_profit: (parseFloat(item.net_profit) / 1000).toFixed(2)
      };
    });

    let updatedSA_yearly = SalesAnalytics_yearly.map(item => {
      return {
        revenue_yearly: (parseFloat(item.revenue) / 1000).toFixed(2),
        net_profit_yearly: (parseFloat(item.net_profit) / 1000).toFixed(2)
      };
    });

    let updatedSA_daily = SalesAnalytics_daily.map(item => {
      return {
        day : (parseFloat(item.day) / 1).toFixed(0),
        revenue_daily: (parseFloat(item.revenue) / 1000).toFixed(2),
        net_profit_daily: (parseFloat(item.net_profit) / 1000).toFixed(2)
      };
    });
    // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu
    const revenueData = updatedSA.map(item => parseFloat(item.revenue));
    const netProfitData = updatedSA.map(item => parseFloat(item.net_profit));

    const revenueData_yearly = updatedSA_yearly.map(item => parseFloat(item.revenue_yearly));
    const netProfitData_yearly = updatedSA_yearly.map(item => parseFloat(item.net_profit_yearly));

    const day1 = updatedSA_daily.map(item => parseFloat(item.day));
    const revenueData_daily= updatedSA_daily.map(item => parseFloat(item.revenue_daily));
    const netProfitData_daily = updatedSA_daily.map(item => parseFloat(item.net_profit_daily));


      res.json({ revenueData :revenueData,netProfitData:netProfitData,
        revenueData_yearly:revenueData_yearly,netProfitData_yearly:netProfitData_yearly,
        day1:day1, revenueData_daily:revenueData_daily, netProfitData_daily:netProfitData_daily })
  }


  const chartData_Donut = async (req, res) => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();

    const OrdersAnalytics = await dao.OrdersAnalytics(year)
    const OrdersAnalytics_year = await dao.OrdersAnalytics_year()

    const OAData = OrdersAnalytics.map(item => parseFloat(item.count));
    const OAData_year = OrdersAnalytics_year.map(item => parseFloat(item.count));


    // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu
    res.json({OAData:OAData,OAData_year:OAData_year })
  }

  const chartData_linecol = async (req, res) => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();

    const lineCol = await dao.linecoldata(month, year)
    const linecol_monthly = await dao.linecoldata_monthly(year)
    const linecoldata_yearly = await dao.linecoldata_yearly()


    let updatedLC_daily = lineCol.map(item => {
      return {
        day:(parseFloat(item.day)/1).toFixed(0),
        net_revenue: (parseFloat(item.net_revenue) / 1000).toFixed(2),
        gross_profit: (parseFloat(item.gross_profit) / 1000).toFixed(2)
      };
    });

    let updatedLC_monthly = linecol_monthly.map(item => {
      return {
        net_revenue_monthly: (parseFloat(item.net_revenue) / 1000).toFixed(2),
        gross_profit_monthly: (parseFloat(item.gross_profit) / 1000).toFixed(2)
      };
    });

    let updatedLC_yearly= linecoldata_yearly.map(item => {
      return {
        day : (parseFloat(item.day) / 1).toFixed(0),
        net_revenue_yearly: (parseFloat(item.net_revenue) / 1000).toFixed(2),
        gross_profit_yearly: (parseFloat(item.gross_profit) / 1000).toFixed(2)
      };
    });


    // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu
  const day1 = updatedLC_daily.map(item => parseFloat(item.day));
  const net_revenue = updatedLC_daily.map(item => parseFloat(item.net_revenue));
  const gross_profit = updatedLC_daily.map(item => parseFloat(item.gross_profit));

  const net_revenue_monthly = updatedLC_monthly.map(item => parseFloat(item.net_revenue_monthly));
  const gross_profit_monthly = updatedLC_monthly.map(item => parseFloat(item.gross_profit_monthly));

  const net_revenue_yearly = updatedLC_yearly.map(item => parseFloat(item.net_revenue_yearly));
  const gross_profit_yearly= updatedLC_yearly.map(item => parseFloat(item.gross_profit_yearly));

    res.json({day1:day1,net_revenue:net_revenue,gross_profit:gross_profit,
      net_revenue_monthly:net_revenue_monthly, gross_profit_monthly:gross_profit_monthly,
      net_revenue_yearly:net_revenue_yearly,gross_profit_yearly:gross_profit_yearly})
  }

  const chartData_line = async (req, res) => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();

    const line = await dao.line()
    const line_monthly = await dao.line_monthly(year)
    const lineData = line.map(item => {
      return {
        revenue_growth_rate: item.revenue_growth_rate === null ? '0' : item.revenue_growth_rate
      };
    });

    const lineData_monthly = line_monthly.map(item => {return {
      revenue_growth_rate: item.revenue_growth_rate === null ? '0' : item.revenue_growth_rate
    };
  });
    const revenue_growth_rate = lineData.map(item => parseFloat(item.revenue_growth_rate));
    const revenue_growth_rate_monthly = lineData_monthly.map(item => parseFloat(item.revenue_growth_rate));
    // const OAData = OrdersAnalytics.map(item => parseFloat(item.count));

    // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu
    // console.log(OrdersAnalytics)

      res.json({revenue_growth_rate:revenue_growth_rate,revenue_growth_rate_monthly:revenue_growth_rate_monthly })
     

  }

  const chartData_Donut_RBC = async (req, res) => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();

    const data = await dao.donutData_RBC(month,year)
    const data_year = await dao.donutData_RBC_year(year)

    const catename = data.map(item => item.cname);
    const revenue = data.map(item => parseFloat(item.revenue));

    const catename_year = data_year.map(item => item.cname);
    const revenue_year = data_year.map(item => parseFloat(item.revenue));

    // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu

    res.json({catename:catename,revenue:revenue,catename_year:catename_year,revenue_year:revenue_year  })
  }

  const chartData_Donut_QBC = async (req, res) => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();

    const data = await dao.donutData_QBC(month,year)
    const data_year = await dao.donutData_QBC_year(year)
    
    const catename = data.map(item => item.cname);
    const quantity = data.map(item => parseFloat(item.quantity));

    const catename_year = data_year.map(item => item.cname);
    const quantity_year = data_year.map(item => parseFloat(item.quantity));
    // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu

    res.json({catename:catename,quantity:quantity, catename_year:catename_year,quantity_year:quantity_year  })
  }
  const chartData_Donut_QBS = async (req, res) => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();

    const data = await dao.donutData_QBS(month,year)
    const sname = data.map(item => item.sname);
    const quantity = data.map(item => parseFloat(item.quantity));

    // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu

    res.json({sname:sname,quantity:quantity })
  }
  const chartData_Retention= async (req, res) => {

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0-11
    const year = currentDate.getFullYear();

    const data = await dao.retention(year)
    let updatedSA = data.map(item => {
      return {
        num_new_customers: (parseFloat(item.num_new_customers) / 100).toFixed(2),
        num_returning_customers: (parseFloat(item.num_returning_customers) / 100).toFixed(2),
        retention_rate : (parseFloat(item.retention_rate) / 1),
      };
    });
    const num_new_customers = updatedSA.map(item => parseFloat(item.num_new_customers));
    const num_returning_customers = updatedSA.map(item => parseFloat(item.num_returning_customers));
    const retention_rate = updatedSA.map(item => parseFloat(item.retention_rate));



        // const account = req.session.acc
    // const username = account[0].username
// Chuyển đổi giá trị revenue và net_profit từ chuỗi sang số và tạo mảng cho mỗi loại dữ liệu

    res.json({num_new_customers:num_new_customers,num_returning_customers:num_returning_customers,retention_rate:retention_rate})
  }

  module.exports = {chartData_Column,chartData_Donut,chartData_linecol,chartData_line,chartData_Donut_RBC,chartData_Donut_QBC,
    chartData_Retention,chartData_Donut_QBS}