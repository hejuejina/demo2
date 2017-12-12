// const express =require('express');
// const router = express.Router();
const author = require('../middleware/author');

const topic = require('../controllers/create');
var sign = require('../controllers/sign.js');

// 注册页面
exports.signup = sign.showSignup;

// 提交注册信息
// router.post('/signup', sign.signup);
exports.dlSignup = sign.signup ;
// router.get('./')

// 登录界面
// router.get('/signin',sign.showSignin) ;
exports.signin = sign.showSignin ;


// router.post('/signin',sign.signin) ;
exports.dlSignin = sign.signin ;

exports.signout = sign.signout;
// router.get('/signout', sign.signout);

// exports.create = 
// router.get('/topic/create',author.requireLogin,topic.showCreate);

// router.post('/topic/create',author.requireLogin,topic.create);

// module.exports = router ;