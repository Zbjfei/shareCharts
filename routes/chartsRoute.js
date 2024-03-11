/* eslint-disable consistent-return */
const express = require('express');

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
    await shareCharts.find({}, { limit: 3, skip: 0, sort: { createTime: -1 }, fields: { _id: 0 } },
      function (err, data) {
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
    const { username, chartContent, createTime } = req.body;
    console.log(req.body)

    // validate
    await chartSchema.validateAsync({ username, chartContent, createTime });
    const newChart = await shareCharts.insert({
      username, chartContent, createTime
    });
    console.log(newChart)
    res.status(200).json(newChart);
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