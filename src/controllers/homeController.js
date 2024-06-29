const bodyParser = require('body-parser')
const pool = require('../config/database')
const session = require('express-session')
const dao = require('../DAO/dao')

const getHomepage = async (req, res) => {
  try {
    const categories = await dao.category10();
    const categoriesAll = await dao.category();
    const hotdeals = await dao.hotdeals();
    const tagAll = await dao.getTagAll()
    const tagTV = await dao.getTagTelevison()
    const tagEC = await dao.getTagEC()
    const tagCooker = await dao.getTagCooker()
    const specialoffer = await dao.getSpecialOffer()

    const specialoffer1 = specialoffer.slice(0, 3)
    const specialoffer2 = specialoffer.slice(3, 6)
    const specialoffer3 = specialoffer.slice(6, 9)

    const hotdeal1 = specialoffer.slice(9, 12)
    const hotdeal2 = specialoffer.slice(12, 15)
    const hotdeal3 = specialoffer.slice(15, 18)

    const featureproduct = specialoffer.slice(12, 18)
    const newarrival = specialoffer.slice(6,12)



    // Render trang và truyền dữ liệu vào
    res.render('home1.ejs', { category: categories, categoriesAll: categoriesAll, 
      hotdeals: hotdeals,tagAll:tagAll, tagTV: tagTV, tagEC: tagEC, tagCooker: tagCooker,
      specialoffer1:specialoffer1,specialoffer2:specialoffer2, specialoffer3:specialoffer3,
      hotdeal1:hotdeal1, hotdeal2:hotdeal2, hotdeal3:hotdeal3,featureproduct:featureproduct,newarrival:newarrival});
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};
const getContact = async (req, res) => {
  try {
    const category = await dao.category10();

    res.render('contact.ejs', { category: category})
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).send('Internal Server Error');
  }
};
// Hàm để lấy danh sách category từ cơ sở dữ liệu


module.exports =    {getHomepage,getContact}
