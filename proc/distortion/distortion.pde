
PImage source;
PImage result;

void setup(){
  source = loadImage("../../img/media/novalis/1.png");
  size(round(source.width*1.5), round(source.height*1.5));
  source.loadPixels();
}

void setImage( String url, float w, float h ){
  source = loadImage(url);
  size(round(w), round(h));
  source.loadPixels(); 
}

int getLoc(float x, float y){
   int loc = round(y)*source.width+round(x);
   if(loc > source.pixels.length-1 ){
       loc = loc % (source.pixels.length-1);
       //println(loc);
       //println(source.pixels.length);
       // println("---");
   }
   return loc;
}

color getSourcePixel(float x, float y){
   return source.pixels[ getLoc(x, y) ];
   //return color(0);
}

void setPixel(float x, float y, color c){
   result.pixels[ getLoc(x, y)] = c;
}

void copyPixel(float x, float y){
    setPixel(x, y, getSourcePixel(x, y));
}

void copyImage(){
  for(int i=0; i<source.pixels.length; i++){
    result.pixels[i] = source.pixels[i];
  }
}

void ynoise( float ymin, float ymax){
  for(int y=round(ymin); y<ymax; y++){
     for(int x=0; x<source.width; x++){
       setPixel(x+round(random(10)), y, getSourcePixel(x, y));
     }
  }
}

void greyYnoise( float ymin, float ymax){
  for(int y=round(ymin); y<ymax; y++){
     for(int x=0; x<source.width; x++){
       setPixel(x+round(random(10)), y, color(brightness(getSourcePixel(x, y))));
     }
  }
}

void oblic( float x_, float y_, float w, float h ){
  float divider = round(random(-3, 3));
  if(divider == 0) divider = 1;
  for(int y=round(y_); y<y_+h; y++){
     for(int x=round(x_); x<source.width; x++){
       if(x < x_+w/divider){
         //setPixel(x+y/divider, y, getSourcePixel(x, y));
       }else{
         setPixel(x, y, getSourcePixel(x_+w, y));
       }       
     }
  }  
}

float oblicX=100;
float oblicW=100;
float oblicY=300;
float oblicH=100;

void draw(){
  
  //oblicX = max(0,min(oblicX + random(-1,1),width));
  //oblicY = max(0,min(oblicY + random(-1,1),height));
  oblicX += random(-1,1);
  oblicY += random(-1,1);
  oblicW += random(-1,1);
  oblicH += random(-1,1);


  result = createImage(source.width, source.height, RGB);
  result.loadPixels(); 
  copyImage();
  image(source, 0, 0);
  float h;
  h = random(height);
  ynoise( h , h+random(20));
  h = random(height);
  greyYnoise( h , h+random(50));
  h = random(height);
  ynoise( h , h+random(20));
  h = random(height);
  oblic( oblicX, oblicY, oblicW, oblicH );
  image(result, 0, 0, source.width*1.5, source.height*1.5);
  
}
