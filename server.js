
var express = require('express');
var fs = require('fs');


var file = fs.readFileSync( 'index.html' ).toString();
var temp = file.split('##');
for( var i=1; i<temp.length; i+=2 ){
	var fileName = temp[i];
	temp[i] = fs.readFileSync( 'www/'+fileName ).toString();
}

var index = temp.join(' ');

app = express();

app.use( express.static( __dirname + '/www' ) );
app.get( '/', function (req, res){
	res.send( index );
});


app.listen( 1983 );


