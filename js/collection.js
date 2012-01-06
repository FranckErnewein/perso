
var collection = {};

collection.Base = Backbone.Collection.extend({
	url:function(){
		return 'data/'+this.name+'.json';
	}
});

collection.Sketchs = collection.Base.extend({
	model:model.Sketch,
	name:'sketch'
});

collection.Works = collection.Base.extend({
	model:model.Work,
	name:'work'
});