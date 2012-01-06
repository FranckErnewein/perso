
var router = {};

router.Main = Backbone.Router.extend({
	
	currentPageName:null,
	currentPage:null,
	contentNode:null,
	
	routes:{
		":page" : "switchPage",
		":page/:id" : "gotoItem"
	},
	
	switchPage:function( pageName ){
		if( pageName != this.currentPageName ){
			this.currentPageName = pageName;
			var viewName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
			var domNode = $(document.createElement('div'));
			this.getContentNode().empty().append( domNode );
			this.currentView = new view[ viewName ]({el:domNode, collection:app.collection[pageName+'s'] });
			this.currentView.render();
			this.trigger('changePage', pageName);
			
		}
	},
	
	gotoItem:function( pageName, itemId ){
		this.switchPage( pageName );
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