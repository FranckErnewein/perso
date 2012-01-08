
var model = {};
model.Base = Backbone.Model.extend({

    validate:function(json){

        if(json.webgl == true){
            return "only webgl";
        }

    }

});

model.Sketch = model.Base.extend({
	
});

model.Work = model.Base.extend({
	
})


