const db = require('../db/config.js');

const shareUsers = db.get('s_ShareUsers');


const userService = {

    // list  alluser  
    getAllUser: () => {
        return shareUsers.find({});

    },

    // check one user by username 
    getUserByUserName: (username) => {

        console.log("sercice" + username)
        const user = shareUsers.findOne({
            username: username,
        });


        console.log(user)
        return user;

    }
    , userLogin: (username) => {
        console.log("userService28"+username)
        const user = shareUsers.findOne({
            username: username,
        });

       return user;
    }
}

module.exports = userService
