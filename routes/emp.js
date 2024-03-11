/* eslint-disable consistent-return */
const express = require('express');

const chartSchema = require('../model/chartModel.js');

// import db connection 
const db = require('../db/config.js');

//load collection
const shareCharts = db.get('s_ShareCharts');

const router = express.Router();

// Get all  Charts

router.get('/charts/', async (req, res ) => {
  try {
    const allcharts = await shareCharts.find({});
    res.json(allcharts);
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
    });

    if (!chart) {      
      console.log(req.url +"no chart")
      res.end("no chart")

    }else{
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
      const { username, chartContent,createTime } = req.body;
      await chartSchema.validateAsync({ username, chartContent,createTime });
  
      
  
      const newChart = await shareCharts.insert({
        username, chartContent,createTime
      });
  
      res.status(200).json(newChart);
    } catch (error) {
      res.status(500).end("insert err ");
    }
  });
  




/* Get a specific employee */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employees.findOne({
      _id: id,
    });

    if (!employee) {
      const error = new Error('Employee does not exist');
      return next(error);
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});


/* Update a specific employee */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, job } = req.body;
    const result = await chartSchema.validateAsync({ name, job });
    const employee = await employees.findOne({
      _id: id,
    });

    // Employee does not exist
    if (!employee) {
      return next();
    }

    const updatedEmployee = await employees.update({
      _id: id,
    }, { $set: result },
    { upsert: true });

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

/* Delete a specific employee */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employees.findOne({
      _id: id,
    });

    // Employee does not exist
    if (!employee) {
      return next();
    }
    await employees.remove({
      _id: id,
    });

    res.json({
      message: 'Employee has been deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
