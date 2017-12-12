exports.requireLogin = function(req,res,next){
    console.log('恭喜你');
  if(req.session.user){
      
        return next();
    }
    res.status(402);
    res.redirect('/signin');
}

// exports.requireLogin = function(req, res, next){
// 	// if(req.session.username){
// 	// 	return next();
//     // }
//     console.log(req.s);
// 	res.status(402);
// 	res.redirect('/signin');
// }