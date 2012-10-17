
void setup(){
  size(500, 400, P3D);
  textureMode(IMAGE);
  changeImg("../../img/media/novalis/1.png");
}

PImage img;
int offset = 200;
boolean imgLoaded;

void disturb(){
   loop(); 
   imgLoaded = false;
}



void changeImg( String url){
   
   img = loadImage(url);
   //img.loadPixels();
   
}

void draw(){
  background(255);
  drawRandomPoly();
  
 
  
}

void drawRandomPoly(){

   beginShape();
   texture(img);
   fill(120);  
   for(int i=0; i<random(10,15);i++){
      
       vertex(random(-offset,width+offset),random(-offset,height+offset));
       
   }
   endShape();
   
}


