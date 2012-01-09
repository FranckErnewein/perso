
var model = {};
model.Base = Backbone.Model.extend({

    

});

model.Sketch = model.Base.extend({
	validate:function(json){

        if(json.webgl == true){
            return "only webgl";
        }

    }
});

model.Work = model.Base.extend({
	defaults:{
        'img':1,
        'mobile':false
    }
})


