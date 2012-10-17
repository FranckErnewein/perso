

(function($){

    var CHARS = "aazertyuiopqsdfghjklmwxcvbn|azertyuiopqsdfghjklmwxcvbn__--01010234567890{()}][//%=+*°&";

    $.fn.randomize = function( text_ , time_, callback ){



                
        var time = time_ || 500;
     


        return $(this).each(function(){
            var $this = $(this);
            var text = text_ || $this.html();

            var node = $(this);
            var index = 0;

            var ct = window.setInterval(function(){
               index++;

               if(index == text.length){
                   window.clearInterval(rand);
                   window.clearInterval(ct);
                   node.html(text);
                   if( typeof callback == 'function'){
                       callback.call($this);
                   }
                   
               }

            }, Math.round(time/text.length));

            var underscore=true;
            
            var rand = window.setInterval(function(){

                var start = text.substr( 0 , index );
                var end = '';

               
            end += CHARS.charAt( Math.round(Math.random()*CHARS.length) );
            end += (underscore)? '_' : '';
            underscore = !underscore;
                
                

                node.html(start+end);

            }, 20);


        });

    };


})(jQuery);

