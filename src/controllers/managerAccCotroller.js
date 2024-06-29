const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')
const moment = require('moment')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');

const editAccStatus = async (req, res) => {
    try {
        // const account = req.session.acc
        // const accountid = account[0].id
        // const username = account[0].username

        const {accid,status } = req.body;
        await dao.editAccStatus(accid, status)
        console.log(accid,status)
        res.redirect('/loadAllAccount')
    // Render trang và truyền dữ liệu vào
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  const addCustomer = async (req, res) => {
      try {
        const { email, name,phone, password,isSell,isAdmin } = req.body;

        const isSellValue = isSell || '0';
        const isAdminValue = isAdmin || '0';
         const accStatus = 1;
         const hashedPassword = await bcrypt.hash(password, 10)

        await dao.insertAcc(name,email,hashedPassword,phone,isSellValue,isAdminValue,accStatus)
        res.redirect('/addCustomer');
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error registering account:', error);
        res.status(500).send('Internal Server Error');
      }
  };

  module.exports = {editAccStatus,addCustomer}