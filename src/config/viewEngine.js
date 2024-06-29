const path = require('path')
const express = require('express')

const app = express()


const configViewEngine =(app) => {
    app.set('views','./views/')
    app.set('view engine','ejs')
    // app.use(express.static('public'))
    app.use(express.static(path.join('./src','/public')));
// app.set('views', path.join(__dirname, 'views'));
// //public 
// app.use(express.static(path.join(__dirname, 'public')));

}

app.set('view engine', 'ejs');
 
app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    next();
});
module.exports = configViewEngine