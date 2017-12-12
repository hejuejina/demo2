const eventProxy = require('eventProxy');
// 引入数据库
const userData = require('../dataBase/user.js');
var express = require('express');
var app = express();
exports.showSignup = function(req,res){
  return res.render('singup/singup');
}

// 用户校验
exports.signup = function(req,res){
    var username = req.body.username ;
    var userpass = req.body.userpass ;
    var reUserPass = req.body.reuserpass ;
    var email = req.body.email ;
    var ep = new eventProxy();
    

    ep.on('info_error',function(msg){
       res.status(422);
      return res.render('singup/singup',{error:msg});
    })

   

    // 没有填注册信息
    var emptyFormData = [username,userpass,reUserPass,email].some(function(item){
        return item === '' ;
    })

    // 两次输入的密码不一样
    var passError = userpass !== reUserPass ;

     if(emptyFormData ){
        ep.emit('info_error','你不能提交空的信息');
        return ;
        
    }else if(passError ){
         ep.emit('info_error','两次的密码不一致');
          return ;
    } //注意不要出现两次render


    // // 获取数据库信息
    userData.getUserBySignupInfo(username,email,function(err,users){
        if(err){
            ep.emit('info_error','获取用户数据失败');
            return ;
        }

        var arrUsername = [] ;
        var arrEmail = [] ;
        
        users.map(function(item){
            arrUsername.push(item.username) ;
            arrEmail.push(item.email) ;
        })
    
        var haveUserName = arrUsername.includes(username);
        var haveEmail = arrEmail.includes(email);
        if( haveUserName == true || haveEmail == true ){
             ep.emit('info_error','用户名或邮箱被占用');
             return ;  
        }
        userData.addUser({username:username,email:email,userpass:userpass},function(err,result){
            if(result){
              return res.render('singup/singup',{success: '恭喜你，注册成功'});
            }else{
                ep.emit('info_error','注册失败!');
            }
        })
    })
   

};

exports.signin = function(req, res){
   
	var username = req.body.username;
	var userpass = req.body.userpass;

	if( !username || !userpass){
		res.status(422);
		return res.render('singup/singin', {error: '您填写的信息不完整'});
	}
	userData.getUser(username, userpass, function(err, user){
       
        if(user){ 
            res.locals.current_user = user ;
            req.session.user = user;
            res.render('singup/singin', {success: '登陆成功'});
        }else{      
            res.status(422);
			return res.render('singup/singin', {error: '用户名或者密码错误！'});
		}
    })	
   
    // console.log(app.locals.current_user);

};

// 登录页面的渲染
exports.showSignin = function(req,res){
   return res.render('singup/singin');
}


exports.signout = function(req, res){
	req.session.destroy();
	res.redirect('/signin');
}

