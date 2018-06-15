const express = require("express");
// const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

var db = mongoose.connection;
mongoose.connect( 'mongodb://user:A123456@ds159400.mlab.com:59400/blog' );
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   // we're connected!
   console.log('database connected');
});

var Schema   = mongoose.Schema;
var ArticleSche = new Schema({
   title    : String,
   content  : String,
   date     : String
});
var Article = mongoose.model( 'Article', ArticleSche );

// this is for testing the database connection
/*
// clear the database
Article.deleteMany({}, err => {});

// add the first article
var d = new Date();
d = d.toDateString();
console.log(d);
let paper = new Article ({
   title: 'First',
   content: 'This is the first article in our blog!',
   date: d
});
paper.save( err => {
   if(err) return handleError(err);
   console.log("saved first article");
});
*/

io.on("connection", client => {
   console.log("user connected.");

   // listening for addPaper event
   client.on("addPaper", (title, content, date) => {
      console.log("a paper added to server");

      let paper = new Article({title: title, content: content, date: date})
      paper.save( err => {
         if(err) return handleError(err);
      });

      io.emit("getPaper", title, content, date);
      console.log("a paper added to the UI");
   });

   // for initialization
   client.on("init", () => {
      console.log("Requesting for initial articles.");

      var artics;
      Article.find( (err, art) => {
         if(err) return handleError(err);
         artics = art;
         // console.log("get data", art);
      }).then( () => {
         io.emit("init", artics);
         console.log("Loaded initial articals to UI.");
      });
   });
   client.on("disconnect", () => {
      console.log("user disconnected.");
   });
});

var port = 3001;
http.listen(port, () => console.log("Listening on port", port));

