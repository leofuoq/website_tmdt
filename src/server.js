
const express = require('express')
const app = express()
const path = require('path')
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
require('dotenv').config();
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport');
require('./auth')
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const flash = require('connect-flash');

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

app.get('/cf-fonts/*', (req, res) => {
  const url = `https://kanakku.dreamstechnologies.com${req.originalUrl}`;
  req.pipe(request(url)).pipe(res);
});


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
            secure: false,
            httpOnly: true,
            maxAge: 60*60*1000,
            store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 })}
}))
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
app.get('/get-ss',(req, res) => {
  res.send(req.session)
});

app.use(flash());




// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//
configViewEngine(app)
//config static files
app.use('/',webRoutes);

function isLoggedIn(req, res,next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/loadLogin',
    successRedirect: '/home'
  }))

app.get('/auth/google/failure',(req, res) => {
  res.send("wrong")
})


app.get('/auth/protected',isLoggedIn,(req, res) => {
  res.send("hello")
})
// Thiết lập middleware flash

//   const { Pool } = require('pg');

//   // Database connection configuration
//   const db = {
//   user: 'postgres',
//   password: '123456',
//   host: 'localhost',
//   port: '5432',
//   database: 'TMDT',
//   };


//   const pool = new Pool(db);
  
//   pool.query('SELECT * FROM account', (err, result) => {
//   if (err) {
//   console.error('Error executing query', err);
//   } else {
//   console.log('Query result:', result.rows);
//   }
// })


app.use(bodyParser.json());

app.post('/update-acc-status', (req, res) => {
    const { accId, newStatus } = req.body;
    
    const query = 'UPDATE account SET status = ? WHERE id = ?';
    connection.query(query, [newStatus, accId], (error, results, fields) => {
        if (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu.' });
            return;
        }
        res.json({ success: true });
    });
});


app.listen(port,hostname,() => {
  console.log(`Example app listening on port ${port}`)
})