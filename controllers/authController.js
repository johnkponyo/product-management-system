const User = require('../models/userModel');
const Product = require('../models/productModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//---JWT---
const JWT_SECRET = process.env.JWT_SECRET;


//register page
const registerPage = (req, res) => {
    res.render('auth/signup', {title: 'Register'})
}


//register user
const registerUser = async (req, res) => {
    let { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const usernameExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });

        if (usernameExists) {
            const errMsg1 = 'Username is already taken!';
            return res.render('auth/signup', {title: 'Register', errMsg1});
        }

        if (emailExists) {
            const errMsg2 = 'Email is already registered!';
            return res.render('auth/signup', {title: 'Register', errMsg2});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;

        // Create new user
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();  // Save user to the database

    
        const msg = 'Registration successful! You can now login :)';
        return res.render('auth/login', {title: 'Login', msg});

    } catch (e) {
        console.error(e);  // Log the error for debugging purposes
        return res.status(500).send('Internal Server Error! :)');
    }
};



//login page
const loginPage = (req, res) => {
    if(req.user){
        return res.redirect('/manage-products')

    } else {
        return res.render('auth/login', {title: 'Log in'})
    }
    
}

//login logic
const logUserIn = async (req, res) => {
    let { credential, password } = req.body;

    try {
        // Checking if credential is an email or username
        let check;
        if (credential.includes('@') && credential.includes('.')) {
            check = await User.findOne({ email: credential });
        } else {
            check = await User.findOne({ username: credential });
        }

        // If user does not exist
        if (!check) {
            const msg = 'Invalid Credentials';
            return res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`);
        }

        // Comparing passwords
        const passwordVerify = await bcrypt.compare(password, check.password);
        if (!passwordVerify) {
            const msg = 'Invalid Credentials';
            return res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`);
        }

        const token = jwt.sign({userId: check._id, username: check.username, email: check.email, role: check.role}, process.env.JWT_SECRET, {expiresIn: '1h'})

        // Setting session
        req.session.token = token

        req.flash('success', 'Login successful!');
        return res.redirect('/manage-products');
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal Server Error! :)');
    }
};



//logout
const userLogout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            res.json({message: 'Could not log you out'})
        } else {
            res.json({message: 'Logout Successful!', redirect: '/'})
        }
    })
}




module.exports = {
    registerPage,
    registerUser,
    loginPage,
    logUserIn,
    userLogout,
}