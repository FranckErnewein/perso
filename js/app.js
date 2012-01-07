
var app = {
	model:{},
	collection:{
		sketchs:new collection.Sketchs(),
		works:new collection.Works()
	},
	view:{},
	router:{
		main:new router.Main()
	}
}

$(document).ready(function(){
	
	app.view.menu = new view.Menu({el:$('#nav ul')});
	
	app.router.main.bind( 'changePage', function( pageName ){ app.view.menu.open(pageName) });
	
	app.view.menu.listen(app.collection.sketchs);
	app.view.menu.listen(app.collection.works);
	
	//app.collection.sketchs.fetch({add:true});
	//app.collection.works.fetch({add:true});
	
	Backbone.history.start();
	
});