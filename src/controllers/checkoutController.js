const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')

const checkOut = async (req, res) => {
    try {
        const account = req.session.acc
        const accid = account[0].id
        const cart =  await dao.getCart(accid)   
        const total = cart[0].subtotal    
        const { name,email,phoneNumber,deliveryAddress } = req.body;
        // Gửi mail đơn hàng
            // Tạo nội dung email từ kết quả truy vấn
            var emailContent = '';
            for (var i = 0; i < cart.length; i++) {
                emailContent += `
                    <p>${cart[i].name} | Price: ${cart[i].price}$ | Amount: ${cart[i].quantity}</p>
                `;
            }
        var nodemailer = require('nodemailer');
        
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'dienmayfin@gmail.com',
        pass: 'dqsvlscrzltpsdkj'
        }
        });
        
        var mailOptions = {
        from: 'dienmayfin@gmail.com',
        to: email,
        subject: 'Successful order from Điện máy Fin',
        html: `
            <p>Dear ${name},</p>
            <p>You just ordered from Điện máy Fin.</p>
            <p>Your delivery address is: <b>${deliveryAddress}</b></p>
            <p>Your phone number is: <b>${phoneNumber}</b></p>
            <p>Products you have ordered: 
            ${emailContent}</p>
            <p>Shipping charges: Free ship</p>
            <p>Total money: ${total}$</p>
            <p>Thank you for shopping at Điện máy Fin</p>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
        });

    //Nhập đơn hàng vào orders
    for (var i = 0; i < cart.length; i++) {
        const accountid = cart[i].accountid
        const productid = cart[i].productid
        const quantity = cart[i].quantity
        const grandtotal = cart[i].total_price
        const totalcost = cart[i].totalcost
        const status = 4
        await dao.insertOrder(accountid, productid, quantity,status,grandtotal,totalcost)
    }
    await dao.deleteAllCart(accid)

    // Render trang và truyền dữ liệu vào
    res.redirect('/getProfile');
    } catch (error) {
      console.error('Error retrieving category:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  module.exports = checkOut