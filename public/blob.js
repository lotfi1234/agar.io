function Blob(i,x,y,r) {
    this.pos=createVector(x,y);
    this.r=r;
    this.color=i;
    this.vel=createVector(0,0);
    this.show=function () {
        fill(colors[this.color]);
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
    };
    this.update=function () {
      var newvel=createVector(mouseX-width/2,mouseY-height/2);
      newvel.setMag(3);
        this.vel.lerp(newvel,0.04);
        this.pos.add(this.vel);
    };
    this.constrains=function () {
      blob.pos.x=constrain(blob.pos.x,-width,width);
      blob.pos.y=constrain(blob.pos.y,-height,height)
    };
    this.eat=function (other) {
      var dis=p5.Vector.dist(this.pos,other.pos);
      if(dis <this.r+other.r-50){
          var sum=PI*this.r*this.r+PI*other.r*other.r;
          this.r+=1;
          return true;
      }else
          return false;
    };
    this.eat_anotherplayer=function (player) {
        var dis=dist(this.pos.x,this.pos.y,player.x,player.y);
        console.log(dis);
        if(dis<this.r+player.r-50){
            this.r+=5;
            return true;
        }
        else return false;
    }
}