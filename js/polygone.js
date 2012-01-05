

var drawPoly, canvas, context, H, W, offset;

offset = 350;

var sketch = new Processing.Sketch();
//sketch.imageCache.add('img/media/generali/1.png');

sketch.attachFunction = function(p){

    p.setup = function(){
        p.size(W, H);
        drawPoly();
    }

    

    drawPoly = function(){

        W = $(document).width();
        H = $(document).height();

        p.background(255);

        //var image = p.loadImage('img/media/generali/1.png');
        //p.image(image,0,0,W, H);

        p.stroke(245,245,p.random(200, 245));

        

        var y = p.random(235,250);

        p.fill(y, y, 235);

        p.beginShape();
        //p.texture(image);

        var coor = "";

        var lm = p.round(p.random(6, 11));
        for(var i=0;i<lm;i++){

            

            var _x = p.random(-offset, W+offset);
            var _y = p.random(-offset, H+offset);

            p.vertex(_x, _y);

            coor += "[ "+p.round(_x)+", "+p.round(_y)+" ] /////// \n";

        }

        p.endShape();

        p.fill(0,0,0);
        p.textSize(40);
        p.text('pt.'+lm, W-300, H-200);

        p.textSize(10);
        p.text(coor, W-300, H-170);
        p.noStroke();
        p.fill(0,0,0);
        p.rect(W-210, H-230, 400, 30);

        //p.beginShape();


    }

    //p.mouseMoved = function(){ drawPoly();}

}

var int,to;
function changePoly(){
    var ct = $('#content .box')
    ct.animate({
        top:H*2
    });

    offset = 50;
    
    window.clearInterval(int);
    window.clearTimeout(to);
    $(canvas).css({opacity:0.4});
    int = window.setInterval(drawPoly, 20);
    to = window.setTimeout(function(){

        window.clearInterval(int);
        offset = 350;
        drawPoly();
        $(canvas).css({opacity:1});
        window.setTimeout(function(){

            ct.css({left:W+400, top:100}).animate({left:230});
        }, 100);
    },350);

}


$(document).ready(function(){



     canvas = document.getElementById('bg');
     context = canvas.getContext('2d');

     W = $(document).width();
     H = $(document).height();

     $(canvas).attr('width', W).attr('height', H);

     var proc = new Processing(canvas, sketch);

     $(document).click(function(){
        changePoly();
        //drawPoly();
     });

});