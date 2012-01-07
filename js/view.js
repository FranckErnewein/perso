





var view = {};


view.TemplateView = Backbone.View.extend({
	
	render:function(){
		var self = this;
		
		if( !this.templateList[this.template] ){
            if(!this.template){
                throw new Error('template is undefined');
            }
            $.ajax({
                cache:false,
                url:'template/' + this.template + '.html',
                async:false,
                success:function(xhr){
                    self.templateList[self.template] = _.template( xhr );
                }
            });
         
        }
        $(this.el).html(this.templateList[this.template].call( this , this.model ));
        if(typeof this.onRender == 'function'){
            this.onRender();
        }
        this.trigger('render');
        return this;
	}
	
});
view.TemplateView.prototype.templateList = {}

view.Menu = Backbone.View.extend({
	
	initialize:function(){
		this.sub = {};
		var self = this;
		$('li', this.el).each(function(){
			var a = $('a', this);
			var ul = $(document.createElement('ul') )
			ul.appendTo( this );
			//self.sub[ a.attr('href').replace('#','') ] = ul;
			self.sub[ a.attr('href').replace('#','') ] = $(this);
		});
	},

	listen:function( collection ){
		var self = this;
		var tag = collection.name;
		var ul = $('ul', self.sub[ tag ]); 
		collection.bind('add', function(model){
			ul.append( '<li><a href="#'+tag+'/'+model.id+'">'+model.get('title')+'</a></li>' );
		});
        collection.each(function(model){
			ul.append( '<li><a href="#'+tag+'/'+model.id+'">'+model.get('title')+'</a></li>' );
		});
	},
	
	open:function( submenu ){
		//console.log(submenu, this.sub)
		$('li.on', this.el).removeClass('on');
		this.sub[ submenu ].addClass('on');
	}
	
});


view.Page = view.TemplateView.extend({
	initialize:function(){
		var self = this;
		this.collection.bind('reset', function(col){
			self.render();
		});
        
	},
	
	render:function(){
		this.el.hide();
		view.TemplateView.prototype.render.call(this);
		this.el.fadeIn();
	}
	
});

view.Work = view.Page.extend({
	
	template:'work'
	
});

view.Sketch = view.Page.extend({
	template:'sketch',
    
    focus:function( id ){
        if(!this.content) this.content = $('#sketch-page');

        var model = this.collection.get(id);
        if(this.proc && this.proc.sketch){
            this.proc.sketch.noLoop();
        }
        this.proc = new view.Processing( {pde:'processing/'+id+'/'+id+'.pde'} );
        this.content.empty().append( this.proc.el );
        //$('#nav').hide();
    }

    
    
});

view.Processing = Backbone.View.extend({


    initialize:function(){
        var self = this;

        this.el = document.createElement('canvas');


        $.ajax({
            url:this.options.pde,
            success:function( pde ){
                
                var compiled = Processing.compile( pde );
                self.sketch = new Processing( self.el, compiled );
                
            }
        });
        

    }


});

view.About = view.Page.extend({
	template:'work'
});





