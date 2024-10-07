const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get all shareUsers
router.get('/main', async (req, res) => {
  //获取session  其实在app中间件中已经过滤了全局非授权的跳转，这里可以不用再判断  
  res.render('main', { userinfo: req.session.userinfo })
});


router.get('/index_left', async (req, res) => {



  let productApi;

  try {
    productApi = await axios.get("http://127.0.0.1:8080/api/upload/getfiles")
  } catch (err) {
    //console.error(err);
    /*
            {
      meta: { code: 200, msg: 'success' },
      data: {
        files: [
          '1710251553375.PNG',
          '5082999_115135021778_2 - å\x89¯æ\x9C¬.png',
          '5082999_115135021778_2 - 副本.png',
          'queries.rar'
        ]
      }
    }
    */
    return res.end(err);
  }

 // console.log(productApi.data.data.files)
  files = productApi.data.data.files
  //res.render('produtos2', {product: productApi.data });
  res.render('index_left', { files })






});



router.get('/index_left2', async (req, res) => {

 


  let productApi;
  try {
    console.log(1);
    productApi = await axios.get("http://127.0.0.1:8080/api/upload/getfiles")
  } catch (err) {  
    return res.end(err);
  }
  files = productApi.data.data.files
  //var obj = {"files":files};
  res.render('index_left2', { files })
});


router.get('/index_right', async (req, res) => { 

  let usernameen = req.session.userinfo[0].username;
  res.render('index_right',{ LoginUser: usernameen })

});
router.get('/index_down', async (req, res) => { res.render('index_down') });





module.exports = router;
