### 基于node.js与MongoDB重写文件共享服务

* ##### 基本需求

  1. 登录功能，检索用户表【s_shareUser】的信息，使用SESSION校验用户身份进行登录，用户信息在数据库中手工添加。
  2. 实现已登录用户的在线聊天功能，要求保存用户的聊天内容至MongoDB数据库聊天记录表【s_shareCharts】，聊天主界面显示当前聊天系统的前100条聊天内容，后续实现数据的缓加载服务。
  3. 实现文件上传、下载功能，上传文件保存在集合【s_ShareFile】，支持多种文件格式

  

* ##### 数据表结构

  用户表【shareUser】

  聊天日志表【shareCharts】

* ##### 开发环境与开发工具

  mongoDB、Visual Studio Code、Git、ejs
  
  ```ejs
  nodejs的模板引擎有很多， ejs是比较简单和容易上手的。常用的一些语法:
  
  用<%...%>包含js代码
  用<%=...%>输出变量 变量若包含 '<' '>' '&'等字符 会被转义
  用<%-...%>输出变量 不转义
  用<%- include('user/show') %>引入其他模板 包含 ./user/show.ejs
  用<%# some comments %>来注释，不执行不输出
  <%% 转义为 '<%'
  <% ... -%> 删除新的空白行模式?
  <%_ ... _%> 删除空白符模式
  进阶：
  
  在script标签中给变量赋值：
  
  　　1.单一变量：var ss= “<%= param.username %>”;
  
  　　2.数组和json：var data =<%- JSON.stringify(DATA) %>
  
  　　　　注：避免编辑器报错可以这么写：var data =JSON.parse('<%- JSON.stringify(todayStatistics.DATA)%>')
  ```
  
  ```ejs
    <div class="wrap"></div>
      <!--  1. 创建一个Script标签， 给改标签命名id 作为模板标识 -->
      <script id="ejs">
          <% if(0) {%> 
              <p > 这是ejs模板的标签 <%= name%> </p>
          <% }else{ %>
              <h2 > 这是else </h2>
          <% } %>
  
          <ul>
              <% for(let i = 0; i < arr.length; i++){%> 
                  <li > <%= arr[i] %> </li>
          <% } %> 
          </ul>
  
          <ul >
              <% arr.forEach(function(item, index){%> 
                  <li > <%= item %><%= index %> </li>
          <% }) %>
          </ul>
      </script>
  
      <!-- 2. 引入ejs 文件 -->
  
      <script>
          //   2. 获取模板HTML字符串
          let temp = document.querySelector('#ejs').innerHTML;
          //  3. 渲染模板，得到渲染后的模板字符串
          //     ejs.render(template, data) 第一个参数template 是ejs的模板，就是 上边创建的script标签
          let html = ejs.render(temp, {
              name: 'tom',
              arr: [1, 3, 4, 5]
          });
          //  4. 把渲染后的模板字符串添加到页面 
          document.querySelector('.wrap').innerHTML = html;
      </script>
  
  ```
  
  ```ejs
  ejs的语法：
              流程控制语句： <% %>  可以使用一些简单的js语法
                  if语句： <% if( ) {%>  内容 <% } %>
                  for循环语句： <% for(let i = 0; i < num, i++) {%>  内容 <% } %>
              插值语法：
                  <%= value %>
  
  ```
  
  





* ##### 开发流程





* ##### 系统调试与部署





```cmd
echo "# shareCharts" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Zbjfei/shareCharts.git
git push -u origin main
```










