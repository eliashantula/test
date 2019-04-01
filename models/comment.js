let mongoose = require('mongoose')

let Schema = mongoose.Schema 

let ReplySchema = new Schema({
	content: String,
	title: String,
	replies: [{type: Schema.Types.ObjectId, ref: "Reply"}]
})




let Reply = mongoose.model('Reply', ReplySchema)

module.exports = Reply