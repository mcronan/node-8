var express = require('express');
var bodyParser = require('body-parser');
// requiring mongoose
var mongoose = require('mongoose')

// part II
mongoose.connect('mongodb://localhost/jobs')

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){

	Worker.find(function(err, data) { 

		if(err) {
			console.log('No workers here!')
		} else {
			// must add data as an object here,
			// Jade will only take objects, not arrays.
			// which is what find() will give
			res.render('applicants', {data : data})
		}
	})

});

// when 'delete' button is clicked remove item from database
app.get('/applicants/:id/delete', function(req, res) {
	console.log('Delete route', req.params.id)
	Worker.remove({_id : req.params.id}, function(err) {
		if (error) {
			console.log("Could not remove worker")
		} else {
		res.redirect('/applicants')
		}
	})
})




app.get('/success', function(req, res) {
	res.render('success')
})

// part II - create a mongoose model
var Worker = mongoose.model('worker', {
	name    : {type : String},
	bio     : {type : Number},
	skills  : {type : Array},
	years   : {type : Number},
	reason  : {type : String}
})

// stores data into database
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database

	console.log(req.body)
	// console.log(req.body)
	res.redirect('/success')

	// document 
		var employee = new Worker ({ 
		name     :  req.body.name, 
		bio      :  req.body.bio,
		skills   :  req.body.skills,
		years    :  req.body.years,
		reason   :  req.body.reason
	})

	employee.save()

});



var server = app.listen(3000, function() {
	console.log('Express server listening on port ' + server.address().port);
});
