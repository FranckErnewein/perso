
var view = {};

view.TemplateView = Backbone.View.extend({
	
	render:function(){
		this.el.empty();
		if( !this._template ){
			this._template = $( document.getElementById( this.template ) ).html();
		}
		this.el.html( _.template( this._template, this ) );
		if( typeof this.onRender == 'function'){
			this.onRender();
		}
		this.trigger( 'render', this );
	}
	
});


view.Menu = Backbone.View.extend({
	
	initialize:function(){
		this.sub = {};
		var self = this;
		$('li', this.el).each(function(){
			var a = $('a', this);
			self.sub[ a.attr('href').replace('#','') ] = $(document.createElement('ul') );
		});
	},

	listen:function( collection, tag ){
		var self = this;
		collection.bind('add', function(model){
			console.log('??')
			self.sub[ tag ].append( '<li><a href="#'+tag+'/'+model.id+'">'+model.title+'</a></li>' )
		});
		
	}
});






