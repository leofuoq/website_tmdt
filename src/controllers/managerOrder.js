const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')
const moment = require('moment')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');

const editOrderStatus = async (req, res) => {
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

module.exports = editOrderStatus