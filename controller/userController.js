const userService = require("../service/userService");
//const uploadAvatar = require('../multer/upload')


// const myModule = require('./myModule.js');
// const method = myModule.method;
// const otherMethod = myModule.otherMethod;
// // OR:
const {uploadAvatar, getFiles,deleteFile} = require('../multer/upload');



//export obj  
const userController = {

    // list  alluser  
    getAllUser: async (req, res) => {
        try {
            const allUsers = await userService.getAllUser();
            console.log(allUsers)
            res.render('main', { allUsers })
            // res.json(allUsers);
        } catch (error) {
            console.log(error);
        }
    },

// check one user by username 
    getUserByUserName: async (req, res) => {
        try {
           const  { username } = req.params
           console.log (username)
            const user =    await userService.getUserByUserName(username)
            res.json(user);
        } catch (error) {
          console.log(error);
        }
      }

,
      //userLogin
      userLogin: async (req, res) => {
        try {
            const  { username } = req.body
            console.log("controller" + username)
            const user  = await userService.userLogin(username)
            console.log (user)
            if (!user) {
                // console.log(req.url +"user does not exist")
                // res.end("user does not exist")
                //res.render('login', { err: 'user not exist' })
                 res.json("user not exist")
            } else {
                // res.render('main', { user: user })
               // return user
                          //设置session
              req.session.userinfo=user;
              //res.send("登陆成功！");
               //res.render('main', { user })
               res.redirect('/main');
               //  res.json(user);
                // console.log(req.url)
                // console.log(user)
            }


        } catch (error) {
          res.render('login', { err: ' error ' })
          //console.log(error);
        }
      }
      ,



      // 用户的逻辑控制器
      upload:async (req, res) => {
        // 图片上传        
        console.log("req71")
          try {
            const uploadRes = await uploadAvatar(req, res)
            res.send({
              meta: { code: 200, msg: 'success' },
              data: { img_url: uploadRes}
            })
          } catch (error) {
           console.log(error)
          }
        }
      ,
        getDirfiles:async (req, res) => {
          // 图片列表        
          //console.log("req 85 userController")
            try {
            //  console.log("req 87 userController")
              const Files = await getFiles("files")
              res.send({
                meta: { code: 200, msg: 'success' },
                data: { files: Files}
              })
            } catch (error) {
              //console.log("req 94 userController")
              console.log(error)
              res.send(error)
            }
          }
        
          ,
          deleteFile:async (req, res)=>{
            const  { filename } = req.params
            console.log(filename)
           // console.log(req.params)
            await deleteFile(filename)
           
              res.send({
                meta: { code: 200, msg: 'success' },
              })
            
            
          }
}


module.exports = userController;
