var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird


let models = {} 

models.newPost = require('./user')
models.Reply = require('./comment')




module.exports = models