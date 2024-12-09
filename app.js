//---IMPORTS---
require('dotenv').config()
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
var flash = require('connect-flash');
const port = 3000;

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');




//---EXPRESS APP---
const app = express();



//---DB CONNECT---
const connect = mongoose.connect(process.env.dbURI);

connect.then(() => {
    console.log("Database connected successfully!")
})
.catch(() => {
    console.log("Error connecting to DB")
})



//---SESSION STORE---
const store = new MongoDBStore({
    uri: process.env.dbURI,
    collection: 'sessions'
})

store.on('error', function(error){
    console.log(error)
})



// SESSION MIDDLEWARE
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1, // 1 hour
    },
}));

app.use(flash());




app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});


//---VIEW ENGINE---
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');


//---STATIC FILES---
app.use(express.static(__dirname +'/assets'));



//---MIDDLEWARES---
app.use(express.urlencoded({extended: true})) //for form data
app.use(express.json());



//---ROUTING---

//index
app.get('/', (req, res) => {
    if(req.session.token)
        return res.redirect('/manage-products')
    res.render('auth/login', {title: 'Welcome'})
})

//auth routes
app.use('/auth', authRoutes)

//product routes
app.use(productRoutes)

//404
app.use((req, res) => {
    const sessionData = req.session
    res.status(404).render('404', {title: '404', sessionData})
})




//---SERVER PORT---
app.listen(port, () => console.log(`Server spinning on port ${port} @ http://localhost:${port}`));