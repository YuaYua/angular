var http=require("http");
var url=require("url");
var mongoose=require('mongoose');

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
    // var cb=urlObj.query.callback;
    // var name=urlObj.query.name;
    if(urlObj.pathname=="/finduser"){
        var cb=urlObj.query.callback;
        var name=urlObj.query.name;
        var str=new RegExp(name);
        Model.find({name:str},function (err,docs) {
            if (err){
                console.log(err);
            }else {
                console.log(docs);
                var json=JSON.stringify(docs);
                res.end(cb+"("+json+")");
            }

        })
    }


})
server.listen(9090);


//nodejs后台接口文档
//用户jsonp请求说明：
//请求方式：get方式
//请求路径：http://localhost:9090/finduser?name=g&callback=success

// 请求参数说明：
// 参数           是否必须            说明
// name          否                  要进行模糊查询的关键字
// callback         是              获取到的数据返回给前端使用的接收回调函数的名称

// 返回说明：
// 正确时返回的json数据显示实例如下：
// success(
//      [
//          {"_id":"5878870b6c7942b0024d7e8a","name":"tangseng","gender":"man","goodslist":[{"price":"99","goodsname":"宝宝金水"}],"age":20},
//          {"_id":"5878872c6c7942b0024d7e8b","name":"wokong","gender":"man","age":20},
//          {"_id":"5878cbf75596693ea9991a01","name":"shaseng","age":20}])
//返回参数说明：
// 参数       说明      类型
// _id                  用户主键
