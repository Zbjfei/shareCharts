/* eslint-disable consistent-return */
const express = require('express');
const moment = require('moment')
// import db connection 
const db = require('../db/config.js');

const chartSchema = require('../model/chartModel.js');
const { func } = require('joi');


//load collection
const shareCharts = db.get('s_ShareCharts');

const router = express.Router();

// Get all  Charts

router.get('/charts/', async (req, res) => {
  try {
    //若charts超过此记录 则index_right页面会bug不再刷新  					if(oldstr.length != res.length){
   /*
    await shareCharts.find({}, { limit: 10000, skip: 0, sort: { createTime: -1 }, fields: { _id: 0 } },
      function (err, data) {
        res.json(data);
      });
*/

    await  shareCharts.aggregate([
                  
        {
          $sort:
          {
            "createTime":-1
          }
        }
      
      ]).then((data) => {
  
       // console.log(data);
          // console.log(req.session.userinfo.username)
        
        res.json(data);

  
      });
  


  } catch (error) {
    console.log(error);
  }
});

// get all charts  by username 
router.get('/charts/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const chart = await shareCharts.find({
      username: username,
    }, { limit: 200, skip: 0, sort: { createTime: -1 } });

    if (!chart) {
      console.log(req.url + "no chart")
      res.end("no chart")

    } else {
      res.json(chart);
      console.log(req.url)
      console.log(chart)
    }
  } catch (error) {
    console.log(error);
  }
});


// insert chart message
router.post('/charts/', async (req, res) => {
  try {
   // const { username, chartContent, createTime } = req.body;
    const {  chartContent } = req.body;
    console.log(req.body)
   let chartContentHtml=chartContent.toString();
   chartContentHtml = chartContentHtml.replace(/\n/g, '<br>');
    console.log("85" + chartContentHtml)

    //get seesion username
    //let username="userinfo.username"
    let username=req.session.userinfo[0].username
    let usernameCN=req.session.userinfo[0].usernameCN
    console.log("row90  "+req.session.userinfo[0].username)
    
    let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    console.log("row95   " +createTime)
    // validate
    await chartSchema.validateAsync({ username,usernameCN, chartContentHtml, createTime });
    const newChart = await shareCharts.insert({
      username,usernameCN, chartContentHtml, createTime
    });
    console.log("row103 send ok ")
    console.log(newChart)

    res.status(200).json({ok:"1"});
  } catch (error) {
    res.status(500).end("insert err ");
  }
});



// aggregate
router.get('/chartsAggr/', async (req, res) => {
  try {
    console.log(req.body)

    const { username } = req.params;
    const chart = await shareCharts.aggregate([
      {
        $match: {
          "createTime": { $gt: "2024-02-25 00:00:00" }
        }
      },
      {
        $group:
        {
          _id: "$username"
          , total: { $sum: 1 }
        }
      }
    ]).then((data) => {

      res.json(data);

    });


  } catch (error) {
    console.log(error);
  }

});



module.exports = router;
