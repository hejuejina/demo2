exports.index = function(req,res){
    var page = req.query.page || 1 ;
    page = page > 0 ? page : 1 ;
}