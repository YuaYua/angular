var http=require("http");
var url=require('url');
var mongoose=require("mongoose");
var fs=require("fs");

var db = mongoose.connect("mongodb://127.0.0.1:27017/user");

var PersonSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    gender:{type:String}
},{
    collection:'child'
});

var Model = db.model("child",PersonSchema);

var server=http.createServer(function (req,res) {



    var urlObj=url.parse(req.url,true);
    if(urlObj.pathname=="/userList"){
        Model.find({},function (err,docs) {
            if(err){
                console.log(err);
            }else {
                console.log(docs);
                var json=JSON.stringify(docs);
                res.end(json);
            }
        })
    }else if(urlObj.pathname=="/15_orderby.html"){
        fs.createReadStream("."+urlObj.pathname).pipe(res);
    }else {
        if(urlObj.pathname!="/favicon.ico"&&urlObj.pathname!="/angular.min.js.map"){
            fs.createReadStream("."+urlObj.pathname).pipe(res);
        }
    }


}).listen(9090)