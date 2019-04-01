var mongoose = require('mongoose');

// Set the proper environment
var env = process.env.NODE_ENV || 'development';

// Get the enviroment settings from config
var config = require('./config/mongo')[env];


module.exports = () => {
  var envUrl = process.env[config.use_env_variable];
  var localUrl = `mongodb://${ config.host }/${ config.database }`;
  var mongoUrl =  envUrl ? envUrl : localUrl;
  return mongoose.connect(mongoUrl);
};

