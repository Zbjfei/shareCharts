const express = require('express');

const router = express.Router();

// Get all shareUsers
router.get('/main', async (req, res) => {
    //获取session  其实在app中间件中已经过滤了全局非授权的跳转，这里可以不用再判断  
      res.render('main', { userinfo: req.session.userinfo })
  });
  

  router.get('/index_left', async (req, res) => { res.render('index_left') });
  router.get('/index_right', async (req, res) => { res.render('index_right') });
  router.get('/index_down', async (req, res) => { res.render('index_down') });
 
  
  
  
  
  module.exports = router;
