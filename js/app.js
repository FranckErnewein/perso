
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
	
	_.each(app.collection, function(col){
		col.each(function(item, i){
			item.next = (i < col.size()-1)? col.at(i+1) : col.at(0);
			item.prev = (i > 0)? col.at(i-1) : col.at(col.size()-1);
		});
	});
	
	app.view.menu = new view.Menu({el:$('#nav ul')});
	
	app.router.main.bind( 'changePage', function( pageName ){ app.view.menu.open(pageName) });
	
	app.view.menu.listen(app.collection.sketchs);
	app.view.menu.listen(app.collection.works);
	
	//app.collection.sketchs.fetch({add:true});
	//app.collection.works.fetch({add:true});
	
	Backbone.history.start();
	
});