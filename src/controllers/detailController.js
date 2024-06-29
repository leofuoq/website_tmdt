const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')

const dao = require('../DAO/dao')

const getDetail = async (req, res) => {
  try {
    const productid = req.params.productID
    const category = await dao.category10()
    // Gọi hàm category() và chờ kết quả trả về
    const detail = await dao.getDetail(productid);
    const feedback = await dao.getFeedbackByProductid(productid)
    const cate = await dao.getCateOnDetail(productid)
    const productname = detail[0].name

    const specialoffer = await dao.getSpecialOffer()
    const upsale = specialoffer.slice(12, 18)

    if (feedback.length > 0) {
    const count_feedback = feedback.length;
    res.render('detail.ejs', { detail: detail, category: category,upsale:upsale,
      feedback : feedback,count_feedback:count_feedback, cate: cate, productname:productname});

    }else{
    const count_feedback = 0
    res.render('detail.ejs', { detail: detail, category: category,upsale:upsale,
      feedback : feedback,count_feedback:count_feedback, cate: cate,productname:productname});
}
    // Render trang và truyền dữ liệu vào
    // res.render('detail.ejs', { detail: detail, category: category,feedback : feedback,count_feedback:count_feedback});
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};

  module.exports = getDetail;