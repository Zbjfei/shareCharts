// 引入配置好的 multerConfig
const multerConfig = require('./multerConfig')

// 上传到服务器地址
const BaseURL = 'http://127.0.0.1:8080' 
// 上传到服务器的目录
const imgPath = '/files/'
const fs=require('fs')
const path=require('path')



// 封装上传图片的接口
// function uploadAvatar(req, res) {
//   return new Promise((resolve, reject) => {
//     multerConfig.single('file')(req, res, function (err) {
//       if (err) {
//         // 传递的图片格式错误或者超出文件限制大小，就会reject出去
//         reject(err)
//       } else {
//         // 拼接成完整的服务器静态资源图片路径
//         resolve(BaseURL + imgPath + req.file.filename)
//       }
//     })
//   })
// }


module.exports = {
    uploadAvatar: function(req, res) {
        return new Promise((resolve, reject) => {
        multerConfig.single('file')(req, res, function (err) {
          if (err) {
            // 传递的图片格式错误或者超出文件限制大小，就会reject出去
            reject(err)
          } else {
            // 拼接成完整的服务器静态资源图片路径
            resolve(BaseURL + imgPath + req.file.filename)
          }
        })
      })},

    getFiles: function(dir) {

      let arrFiles = [];
        //console.log("30  dir multer/upload.js")
        fs.readdirSync(dir).forEach(file => {
            //console.log(file);
            arrFiles.push(file);
          });
          return arrFiles;
      },

      deleteFile:function(filename){
          fs.unlink('files/'+filename, (err) => {
          if (err) {
            console.error(err);
            return 0;
          }
          return 1;
          console.log('文件删除成功');
        });
      }
};



// const fs=require('fs')
// const path=require('path')
// function getFiles(dir){
//     console.log("30  dir multer/upload.js")
//     const stat=fs.statSync(dir)
//     if(stat.isDirectory()){
//       //判断是不是目录
//       const dirs=fs.readdirSync(dir)
//       dirs.forEach(value=>{
//          // console.log('路径',path.resolve(dir,value));
//           getFiles(path.join(dir,value))
//       })
//     }else if(stat.isFile()){
//       //判断是不是文件
//       console.log('文件名称',dir);
//     }
// }


//module.exports = uploadAvatar