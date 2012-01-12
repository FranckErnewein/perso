





var view = {};


view.TemplateView = Backbone.View.extend({
	
	render:function(){
		var self = this;
		
		if( !this.templateList[this.template] ){
            if(!this.template){
                throw new Error('template is undefined');
            }
            /*
            $.ajax({
                cache:false,
                url:'template/' + this.template + '.html',
                async:false,
                success:function(xhr){
                    self.templateList[self.template] = _.template( xhr );
                }
            });
            */
            self.templateList[self.template] = _.template($('#tpl-' + self.template ).html());
         
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
			var ul = $(document.createElement('ul') ).hide();
			ul.appendTo( this );
			//self.sub[ a.attr('href').replace('#','') ] = ul;
			self.sub[ a.attr('href').replace('#','') ] = $(this);
		});

        //fix fixed
        

	},


	listen:function( collection ){
		var self = this;
		var tag = collection.name;
		var ul = $('ul', self.sub[ tag ]); 
		collection.bind('add', function(model){
            self.addItem(ul, model, tag);
		});
        collection.each(function(model){
            self.addItem(ul, model, tag);
		});
	},

    addItem:function(ul, model, tag){
        //ul.append( '<li class="'+tag+'"><a title="'+model.get('title')+'" href="#'+tag+'/'+model.id+'">'+( (tag != 'sketch') ? model.get('title') : '<img src="img/sketch/'+model.id+'.png"/>' )+'</a></li>' );
        ul.append( '<li><a title="'+model.get('title')+'" href="#'+tag+'/'+model.id+'">'+model.get('title')+'</a></li>' );
        
    },
	
	open:function( submenu, item ){
		//console.log(submenu, this.sub)

        if(this.currentSubmenu != submenu){
            $('li.on', this.el).removeClass('on').find('ul').slideUp();
            if(this.sub[ submenu ]){            	
            	this.sub[ submenu ].addClass('on').find('ul').slideDown();
            }
            this.currentSubmenu = submenu;
        }
		
	}
	
});


view.Page = view.TemplateView.extend({

   
	
});

view.Work = view.Page.extend({
	
	template:'work',
	
	abbr:{
		'HTML':'HyperText Markup Language',
		'CSS':'Cascading Style Sheet',
		'PHP':'Preprocesseur HyperText'
	},

    onRender:function(){
        var self = this;
        var h1 = $('h1', this.el);
        var p = $('p', this.el);
        var fade = $('.fadein', this.el);
        var tags = $('.tags li');

        tags.hide();
        fade.hide();
        if(!self.model.get('desc')) p.hide();
        
        
        
        h1.randomize( null, 500, function(){
            if(self.model.get('desc')) p.randomize();
            fade.fadeIn();
            tags.each(function(i, tag){
               var tag = $(tag);
               var txt = tag.text();
               if( self.abbr[txt] ){
            	   var abbr = $(document.createElement('abbr')).text(txt).attr('title' ,  self.abbr[txt] );
            	   tag.html( abbr );
               }
               
               window.setTimeout(function(){
                  tag.fadeIn();
               }, i*320);
            });
        });

        $('.imac a', this.el).hover(function(){
           $(this).animate({opacity:1}).randomize( self.model.get('url') );
        },function(){
           $(this).animate({opacity:0}).text('_');
        });



    }
    
	
});

view.Works = view.Page.extend({

	template:'works',
     onRender:function(){
        var self = this;
        var h1 = $('h1', this.el);
        var p = $('p', this.el);
        var fade = $('.fadein', this.el);
        
        fade.hide();
        

        h1.randomize( null, 500, function(){
            fade.fadeIn();
            $('.thumbs-works a').randomize(null, 1500);
        });



    }

});

view.Sketch = view.Page.extend({
	template:'sketch',

    onRender:function(){
        var self = this;
        
        if(this.proc && this.proc.sketch){
            this.proc.sketch.noLoop();
        }
        this.proc = new view.Processing( { pde:'processing/'+this.model.id+'/'+this.model.id+'.pde'} );
        var canvas = $(this.proc.el);
        var canvasContent = $('.canvas-content', this.el);
        canvasContent.hide();
        var h1 = $('h1', this.el);
        var p = $('.help', this.el);
        h1.randomize( this.model.get('title')+' >_' , null, function(){
            if(self.model.get('help')){
                p.randomize( self.model.get('help'));
            }
            

            canvasContent.append( canvas ).fadeIn();
        });
    }
    
});

view.Sketchs = view.Page.extend({
    template:'sketchs',
    onRender:function(){
        var content = $('.fadein');
        var h1 = $('h1', this.el);
        var p = $('.help', this.el);

        content.hide();
        
        h1.randomize( h1.html()+' >_' , null, function(){
            content.fadeIn();
        });
        
        $('.thumbs a', this.el).each(function(i, a){
        	var span = $('span', a);
        	var text = span.text();
        	$(a).mouseenter(function(e){
        		span.randomize(text)
        	});
        });
        
    }
});




view.Processing = Backbone.View.extend({

    cache:{},
    tagName:'canvas',
    isReady:false,

    initialize:function(){
        var self = this;

        if(self.cache[this.options.pde]){
            self.sketch = new Processing( self.el, self.cache[this.options.pde] );
        }else{
            $.ajax({
                url:this.options.pde,
                success:function( pde ){
                    self.cache[self.options.pde] = Processing.compile( pde );
                    self.sketch = new Processing( self.el, self.cache[self.options.pde] );
                    self.trigger('ready');
                    self.isReady=true;
                }
            });
        }

        
        

    }


});

view.Abouts = view.Page.extend({
	template:'abouts',
	
	onRender:function(){
		
		$('h1', this.el).randomize();
		
		$('#about-me div').each(function(i){
			var div = $(this);
			div.hide();
			window.setTimeout(function(){div.slideDown();}, i*300)
			var h2 = $('h2', this);
			var tit = h2.html();
			div.mouseenter(function(){ h2.randomize(tit) })
		});
		
		var a = $('#email');
		var email = a.html().replace('(at)', '@').replace(/\(dot\)/g, '.');
		a.attr('href',  'mailto:'+email).text(email)
		
	}
});

view.Home = view.Page.extend({
	
	template:'home',
	
	onRender:function(){
		var boxes = $('.home-box');
		boxes.hide();
		
		$('h1', this.el).randomize(null, null, function(){
			boxes.each(function(i){
				var box = $(this).hide();
				var h3 = $('h3', this);
				var tit = h3.text();
				window.setTimeout(function(){box.slideDown()}, i*200);
				$('a', this).mouseenter(function(){
					h3.randomize(tit);
				});
				
				
			});
		});
	}
	
});





