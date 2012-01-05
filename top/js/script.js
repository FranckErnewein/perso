
var Main = Backbone.Router.extend({
   routes:{
       'dummy':'dummy',
	   'sketch':'sketchPrez',
	   'sketch/:name':'sketchName'
   },

   'dummy':function(){
       console.log('DUMMY')
   },

   'sketch':function(name){
		console.log(name);
   }


   setPage:function( view ){
	   this.page = view 
   }
   

});


var main = new Main();

main.bind(/sketch/, 'sketch', function(){
	//this.setPage( new page.Sketch() );
	console.log('sketch');
});

main.bind(/sketch\/(\w*)/, 'sketchByName', function(id){
	console.log(id);
});

//view
var page = {};
page.Sketch = Backbone.View.extend({
	showSketch(title, name){

	}
});

$(document).ready(function(){

	$('a').live('click', function(e){
		console.log('hey');
		return false;
		main.navigate($(this).attr('href'), true);
		return false;
	});

	$(document).click(function(e){
		console.log(this, e);	
	//	return false;
	});

	Backbone.history.start({
		pushState:true,
		root:'/franckernewein/top/'
	
	});

});


