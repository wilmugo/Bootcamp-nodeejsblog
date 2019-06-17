const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const content = require("./content");
const posts = [];


const app = express();
const port = process.env.PORT || 3000;

//set ejs like view engine
app.set('view engine', 'ejs');


// settings midleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan('dev'));



// routes settings
app.get('/', (req, res) => {
  res.render("home", { homeInfo: content.homeStartingContent, posts: posts });
});

app.get('/about', (req, res) => {
  res.render("about", { aboutInfo: content.aboutContent });
});


app.get('/contact', (req, res) => {
  res.render("contact", { contactInfo: content.contactContent });
});

app.get('/compose', (req, res) => {
  res.render("compose");
});

app.post('/compose', (req, res) => {
  const post = {
    titlePost : req.body.title,
    postBody : req.body.post
  }
  posts.push(post);
  res.redirect('/');
})




app.listen(port, function() {
  console.log("Server started on port 3000");
});
