
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
	name:'work',
    getMobiles:function(){
        return this.select(function(model){
            return model.get('mobile');
        });
    },
    getWebsites:function(){
        return this.select(function(model){
            return !model.get('mobile');
        });
    }
});