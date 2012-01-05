

class Bitmap{

  PImage source;
  PImage result;
  
  int limitTop = 0;
  int limitBottom = 180;
  
  Bitmap(String url){
    source = loadImage( url );

    source.loadPixels();

    
  }
  
  void setLimit( float t, float b ){
     if(t < source.height && t>0){
       limitTop = round(t);
     }
     if(b < source.width && b>0){
       limitBottom = round(b); 
     }
  }
  
  void applyFilter(){
    translate( 5, 5 );
    for (int i = 0; i < source.width; i+=10) {
        for (int j = 0; j < source.height; j+=10) {
            //float c =  source.get( i, j ) ;
            color c =source.get( i, j );
            float d = dist(i,j, mouseX, mouseY);
            if(d<150){
              fill( red(c), green(c), blue(c), 255 );
            }else{
              fill(brightness(c));
            }
            
            /*
            if(d<60){
                ellipse( i, j, 6, 6 );
            }else{
                ellipse( i, j, 4, 4 );
            }
            */
            
            ellipse( i, j, d/source.width*6, d/source.width*6 );
        }
    }
    /*
    result = createImage(source.width, source.height, RGB);

    result.loadPixels();
    for (int x = 0; x < source.width; x++) {
      for (int y = 0; y < source.height; y++ ) {
        int loc = x + y*source.width;
        result.pixels[ loc ] = eachPixel( source.pixels[ loc ], x, y );
      }
    }
    */
  }
  
  color getSourcePixel(int x, int y){
    int i = x + y*source.width;
    if(i<source.pixels.length){
      return source.pixels[ i ];
    }else{
      return color(0);
    }
  }
  
  color eachPixel( color col , int x, int y){
    //println(col +"-"+ x +"-"+ y);
    
    if(y < limitTop)
      return getSourcePixel(x, y);
    if( y > limitTop && y< limitBottom){
      //float def =  (random(50) < 2) ? random(100,200) : random(100);
      //return color(red(getSourcePixel(x+round(random(1,5)), y))-def);
      
      return ( random(50) > -1 ) ? getSourcePixel(x, round(random(limitTop ,limitBottom))) : color(random(255));
      
    }else{
      return col;
    }
    
    
    
    //int delta = 100;
    //return color( min(255,red(col)+round(random(delta))), min(255,green(col)+round(random(delta))), min(255,blue(col)+round(random(delta))) );
    //return col;
  }
  
  void display(){
    //image(result, 0, 0);
  }
  
}

Bitmap bmp;

void setup(){
  size(800, 600);
  bmp = new Bitmap("../img/media/novalis/1.png");

}

float t=100;
float b=150;

void draw(){
  //t += random( -3,3 );
  //h += random( -3,3 );
  
  t = mouseY - 10 - random(30);
  b = mouseY + 10 + random(30);
  noStroke();
  background(0);
  bmp.setLimit( t, b );
  bmp.applyFilter();
  bmp.display();
  
  
}
