let mongoose = require('mongoose')

let Schema = mongoose.Schema 

let ReplySchema = new Schema({
	content: String,
	title: String,
	replies: [{type: Schema.Types.ObjectId, ref: "Reply"}]
})


const autoPopulateCreator = function(next){
	this.populate({
		path: 'replies'
	})
	next()
}

ReplySchema.pre('find', autoPopulateCreator )
.pre('findOne', autoPopulateCreator)


let Reply = mongoose.model('Reply', ReplySchema)

module.exports = Reply