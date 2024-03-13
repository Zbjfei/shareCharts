//引用http模块 2024年2月15日
const http=require('http')

//调用http.createServer的方法
const server = http.createServer();

//调用server实例的on方法绑定request事件s
server.on('request',(req,res)=>{
	//触发request事件则执行回调方法
	console.log("someone request");
	const url=req.url;
	const method=req.method;

	console.log(url);
	console.log(method);
	
})

//调用server.listen()方法启动服务器并监听端口

server.listen(80,()=>{
	console.log("http server is runing on port 80 .");
	
})





