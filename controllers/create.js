var validator = require('validator');

var topicData = require('../dataBase/topic');

exports.showCreate = function (req,res) {
    // console.log(req.session.user);
    res.render('topic/create');
}

exports.create = function(req,res){
    
    var title = validator.trim(req.body.title);
	var tab = validator.trim(req.body.tab);
    var content = validator.trim(req.body.t_content);
    
    var haveEmpty = [title,tab,content].some(function(item){
        return item == '' ;
    })

    if( haveEmpty ) {
        res.status(422);
        res.render('topic/create',{error:"你填写的信息不完整，请认真检查"});
    }

    var data = {
        title:title ,
        content:content,
        tab:tab,
        username:req.session.user.username,
        insertTime:Date.now()
    }
    topicData.addTopic( data, function(err,result){
        if(err) throw err ;
        return res.render('topic/create',{success:'发表话题成功'});
    })
}