
var collection = {};

collection.Base = Backbone.Collection.extend({
	url:function(){
		return 'data/'+this.name+'.json';
	}
});

collection.Sketch = collection.Base.extend({
	model:model.Sketch,
	name:'sketch'
});