
// express实例后的应用级别中间件的use注册顺序需要注意
const conn = require('./db/conn.js');
const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();



//console.log(conn)
// 0. 配置ejs模板引擎
app.set("views", "./views")
app.set("view engine", "ejs")


app.use(function(req, res, next) {
  res.locals.globalUrl = 'http://127.0.0.1/';
  next();
});


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
app.use('/static', express.static("static"))
app.use('/lib', express.static("lib"))
app.use('/files', express.static("files"))



// app use 启用session校验
//配置中间件
//session会自带一个httpOnly
app.use(
  session({
    name: 'session_share',
    secret: "sessionkeycode", // 服务器生成 session 的签名
    resave: true,     //每次是否都刷新到期时间
    saveUninitialized: true, //强制将为初始化的 session 存储(该session_id是没有用的)
    cookie: {
      maxAge: 1000 * 60 * 10,// 过期时间
      secure: false, // 为 true 时候表示只有 https 协议才能访问cookie
    },
    //自动在mongodb中创建一个数据库存储session，并且过期时间也会同步刷新
    store: MongoStore.create({
      mongoUrl: conn,
      ttl: 1000 * 60 * 10 // 过期时间
    }),
  })
);


// app.use  2.配置应用级别中间件，可以配置校验token等
/*
app.use((req,res,next)=>{
    console.log("session or token check" );
    if (true){
      next()
    } else{
      res.send("session or token is error")
    }
    
})
*/

// 授权中间件，在这个之后的路由，除了错误处理，都是需要授权的。
app.use((req, res, next) => {
  //排除login相关的路由和接口（因为login就不需要重定向到login了）
  if (req.url.includes("login")) {
    next()
    return
  }

  //next()


  if (req.session.userinfo) {
    //重新设置以下sesssion
    req.session.mydate = Date.now()//加这个设置才能访问刷新过期时间
    next()
  } else {
    //是接口, 就返回错误码
    //不是接口，就重定向（因为ajax请求是不能重定向的，只能前端接收错误码做处理）
    if(req.url.includes("upload")){
      //剔除upload的api了 不安全 但是axios请求又会拦截
      next();


    }else{

      req.url.includes("api")
      ? res.status(401).json({ ok: "reqsession distory" }) : res.redirect("/login")

    }


  }

  
})

// 通过ejs模板引擎跳转到login.ejs
app.use('/login', async (req, res) => {
  res.render('login', { err: '' })
});


//注册主页面路由
const mainRoute = require('./routes/mainRoute.js');
app.use('/', mainRoute);





// app.use  3.配置应用级别中间件，注册路由中间件，http://127.0.0.1:8080/api/***/
const userRoute = require('./routes/usersRoute.js');
app.use('/api/', userRoute);

// charts route
const chartRoute = require('./routes/chartsRoute.js');
const { resolveInclude } = require('ejs');
app.use('/api', chartRoute);


// app.use    4.配置错误级别中间件， 用于无法匹配进行错误拦截
app.use('/', (err, res) => {
  res.status(404).send("page not found")
})

// app.listen 5.配置监听服务端口并启动服务
app.listen(8080, () => {
  console.log(`Listening on port 8080`);
});
