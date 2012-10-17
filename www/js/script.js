

var Trame = Backbone.View.extend({

    initialize:function(){
        this.canvas = document.createElement('canvas');

        var $canvas = $(this.canvas);
        var $el = $(this.el);
        this.width = $(document).width();
        this.height = $(document).height();
        $canvas.attr('width' , this.width);
        $canvas.attr('height',  this.height);
        $canvas.appendTo(this.el);

        this.context = this.canvas.getContext('2d');

        
       this.size = 4;
       this.draw(2, 0.4);
        

        
    },
    
    draw:function(radius, opacity){

        this.context.fillStyle = 'rgba(0,0,0,'+opacity+')';

        this.context.clearRect( 0, 0, this.width, this.height );

        for( var x=0; x<this.width; x+=this.size){

            for( var y=0; y<this.height; y+=this.size){

                this.context.beginPath();
                this.context.arc(x, y, radius, 0, Math.PI*2, true);
                this.context.closePath();
                this.context.fill();


            }

        }
    }


});


$(document).ready(function(){

   new Trame({el:$('#content .trame')});

   $(document.body).addClass('js');
   

});