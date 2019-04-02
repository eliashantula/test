const express = require("express");
const app = express();
var mongoose = require("mongoose");
const path = require("path");
const publicPath = path.join(__dirname, "views");
var expressHandlebars = require("express-handlebars");

app.use("/", express.static(publicPath));
var hbs = expressHandlebars.create({
	partialsDir: "views/partials",
	defaultLayout: "application"
});
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
	if (mongoose.connection.readyState) {
		next();
	} else {
		require("./mongo")().then(() => next());
	}
});
app.engine("handlebars", hbs.engine);
var models = require("./models");
var Post = mongoose.model("Post");
var Reply = mongoose.model("Reply");
app.set("view engine", "handlebars");
app.get("/", (req, res) => {
	res.render("welcome/welcome");
});
app.post("/comment", (req, res, next) => {
	res.send(req.body);
});

app.post("/reply", (req, res, next) => {
	let reply = new Reply({
		content: req.body.comments
	});

	reply.save().then(reply => {
		Post.findByIdAndUpdate(
			req.body.id,
			{ $push: { replies: reply._id } },
			{ new: true }
		).then(response => {
			Reply.find({})
				.populate({ path: "replies" })
				.exec((err, posts) => {
					res.redirect(`/${req.body.id}`);
				});
		});
	});
});
app.get("/delete", (req, res, next) => {
	Reply.remove({})
		.exec()
		.then(response => {
			console.log(response);
		});
});

app.post("/post", (req, res, next) => {
	let post = new Post({
		title: req.body.title,
		content: req.body.comment
	});
	console.log(post)
	post.save().then(post => {
		Post.find({})
			.populate({path: "replies"})
			.then(posts => {
				res.render("welcome/welcome", { posts });
			});
	});
});

app.post("/commentreply", (req, res, next) => {
	
	let reply = new Reply({ content: req.body.comments });
	
	reply.save().then(reply => {
		Reply.findByIdAndUpdate(
			req.body.id,
			{ $push: { replies: reply._id } },
			{ new: true }
		).then(response => {
		  
			res.redirect(`/${req.body.postid}`);
		});
	});
});
app.get("/posts", (req, res, next) => {
	Post.find({}).then(posts => {
		res.render("welcome/welcome", { posts });
	});
});

app.get("/:postid", (req, res, next) => {
	Post.findOne({ _id: req.params.postid }).populate({path: 'replies'}).lean()
		.then(post=>{ 
			console.log(post)
					res.render('welcome/post', {post})
		})
});

app.listen(3000, function() {
	// This function is run when the app starts up.
	console.log("Kemst þó hægt fari.");
});

module.exports = app;
