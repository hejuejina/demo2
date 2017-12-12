const express =require('express');
const router = express.Router();
const author = require('../middleware/author');

const topic = require('../controllers/create');
var sign = require('../controllers/sign.js');

// 注册页面
router.get('/signup',sign.showSignup );

// 提交注册信息
router.post('/signup', sign.signup);

// router.get('./')
// 登录界面
router.get('/signin',sign.showSignin) ;


router.post('/signin',sign.signin) ;

router.get('/signout', sign.signout);

router.get('/topic/create',author.requireLogin,topic.showCreate);

router.post('/topic/create',author.requireLogin,topic.create);

// 显示主页
router.get('/',function(req,res){
    res.render('index');
})

module.exports = router ;