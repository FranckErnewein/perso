
var router = {};

router.Main = Backbone.Router.extend({
	
	currentPageName:null,
	currentPage:null,
	contentNode:null,
	
	getFx:function(){
		if(!this.fx) this.fx = $('fx-mask');
		return this.fx;
	},
	
	routes:{
		":page" : "switchPage",
		":page/:id" : "switchPage"
	},

    
	
	switchPage:function( pageName, itemId ){

            
		
		
			var self = this;
		
            if(this.currentPage && this.currentPage.proc && this.currentPage.proc && this.currentPage.proc.sketch ){
                this.currentPage.proc.sketch.noLoop();
                this.currentPage.proc.sketch.exit();
                
            }


            $('.currentLink').removeClass('currentLink');
            $('#nav a').each(function(i, a){
            	if(
                     ( itemId && $(this).attr('href') ==  '#'+pageName+'/'+itemId ) ||
                     ( !itemId && $(this).attr('href') ==  '#'+pageName )
                  ){
            		$(this).addClass('currentLink');
            	}
            });

            var domNode = $(document.createElement('div'));
            
            this.getContentNode().empty();

            var viewName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

            

            if(itemId){
                this.currentPage = new view[ viewName ]({el:domNode, model:app.collection[pageName + 's'].get( itemId) });
            }else{
                viewName += 's';
                this.currentPage = new view[ viewName ]({el:domNode, collection:app.collection[pageName + 's'] });
            }


            


            this.getContentNode().append(domNode)
			this.currentPage.render();
			this.trigger('changePage', pageName);
	},
	
	gotoItem:function( pageName, itemId ){

		if( this.currentPage && typeof this.currentPage.focus == 'function'){
			this.currentPage.focus( itemId );
		}else if(console && console.warn){
			console.warn( this.currentPage, 'does not implement focus( itemId )' );
		}
	},
	
	getContentNode:function(){
		if(!this.contentNode) this.contentNode = $(document.getElementById('page'));
		return this.contentNode;
	}
	
});