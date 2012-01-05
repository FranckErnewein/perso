
var app = {
	model:{},
	collection:{
		sketch:new collection.Sketch()
	},
	view:{},
	router:{}
}

$(document).ready(function(){
	
	app.view.menu = new view.Menu({el:$('#nav ul')});
	
	app.view.menu.listen(app.collection.sketch, 'sketch');
	
	app.collection.sketch.fetch();
	
});