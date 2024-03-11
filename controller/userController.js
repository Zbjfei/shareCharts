const userService = require("../service/userService");


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
    
                 res.json(user);
                // console.log(req.url)
                // console.log(user)
            }


        } catch (error) {
          res.render('login', { err: ' error ' })
          //console.log(error);
        }
      }

}


module.exports = userController;
