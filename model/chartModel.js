const Joi = require('joi');

const chartSchema = Joi.object({
    username: Joi.string()
    .min(3)
    .max(30)
    .required(),
    usernameCN:Joi.string(),
    chartContentHtml:Joi.string(),
    createTime:Joi.date(),
});

module.exports = chartSchema;
