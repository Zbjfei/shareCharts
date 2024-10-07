FROM node:16.20.2
 
COPY . .
 
# 设置工作目录
WORKDIR /var/www

#安装依赖包
RUN npm install
# 暴露容器端口
EXPOSE 27016

# 启动应用程序
CMD ["npm", "run", "start"]
