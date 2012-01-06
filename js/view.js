
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
			var ul = $(document.createElement('ul') )
			ul.appendTo( this );
			self.sub[ a.attr('href').replace('#','') ] = ul;
		});
	},

	listen:function( collection ){
		var self = this;
		var tag = collection.name;
		collection.bind('add', function(model){
			self.sub[ tag ].append( '<li><a href="#'+tag+'/'+model.id+'">'+model.get('title')+'</a></li>' )
		});
	},
	
	open:function( submenu ){
		$('ul.on', this.el).removeClass('on');
		this.sub[ submenu ].addClass('on');
	}
	
});


view.Page = view.TemplateView.extend({
	
	initialize:function(){
		this.el = $(document.createElement('div'));
		$('#content').empty().append( this.el );

	}
	
});






