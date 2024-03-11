
// express实例后的应用级别中间件的use注册顺序需要注意

const express = require('express');
const app = express();


// 0. 配置ejs模板引擎
app.set("views","./views")
app.set("view engine","ejs")


// 以下2行等价的，让express支持解析json格式的post参数,4.16版本后，bodyParser已集成到express.json()
//const bodyParser = require('body-parser');
//app.use(bodyParser.json());
app.use(express.json()); 

// 配置express支持解析form表单类型数据，A=1&B=2
app.use(express.urlencoded({ extended: false }));


// app.use  1.配置静态资源  http://127.0.0.1:8080/login.html  
/*
  ·静态资源目录中有重名的login.html ，则以首次注册为准 ，注册无需加目录
  ·可以使用app.use('/static',express.static("static"))  为增加访问虚拟路径 http://127.0.0.1:8080/static/login.html  
      
*/
app.use('/static',express.static("static"))
app.use('/lib',express.static("lib"))


// app.use  2.配置应用级别中间件，可以配置校验token等
app.use((req,res,next)=>{
    console.log("token check" );
    if (true){
      next()
    } else{
      res.send("token is error")
    }
    
})

// app.use  3.配置应用级别中间件，注册路由中间件，http://127.0.0.1:8080/api/***/
const userRoute = require('./routes/usersRoute.js');
app.use('/', userRoute);

// charts route
const chartRoute = require('./routes/chartsRoute.js');
app.use('/api', chartRoute);


// app.use    4.配置错误级别中间件， 用于无法匹配进行错误拦截
app.use('/',(err,res)=>{
    res.status(404).send("page not found")
})

// app.listen 5.配置监听服务端口并启动服务
app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
