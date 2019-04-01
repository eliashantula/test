const mongoose = require('mongoose')
let Schema = mongoose.Schema
var PostSchema = new Schema({
	title: String,
	content: String,
	replies:[{type: Schema.Types.ObjectId, ref: 'Reply'}]

})


var Post = mongoose.model('Post',PostSchema)
module.exports = Post