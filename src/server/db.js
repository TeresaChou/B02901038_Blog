var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Article = new Schema({
   title    : String,
   content  : String,
   date     : Date
});
 
mongoose.model( 'Article', Article );
mongoose.connect( 'mongodb://localhost/express-blog' );
