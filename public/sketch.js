var blob;
var blobs=[];
var food=[];
var colors=[];
var zoom=1;
var socket;
function setup() {
    colors=["red","black","yellow","blue","green"];
 createCanvas(1200,600);
    socket=io.connect('http://localhost:3000');
 blob=new Blob(int(random(0,colors.length)),random(width), random(height), 64);
 for (var i=0;i<100;i++){
     food[i]=new Blob(int(random(0,colors.length)),random(-width,width),random(-height,height),16);
 }
var data={
    x:blob.pos.x,
    y:blob.pos.y,
    r:blob.r
};
socket.emit('start',data);
socket.on('heartbeat',
    function (data) {
        blobs=data;
    }
    );
}

function draw() {
background("white");
translate(width/2,height/2);
var newzoom=64/blob.r;
zoom=lerp(zoom,newzoom,0.2);
scale(zoom);
translate(-blob.pos.x,-blob.pos.y);
for (var i=blobs.length-1;i>=0;i--){
    if(socket.id!==blobs[i].id) {
        fill(0, 0, 255);
        ellipse(blobs[i].x, blobs[i].y, blobs[i].r, blobs[i].r);
        if(blob.eat_anotherplayer(blobs[i]) && blob.r>blobs[i].r+20){
            blobs.splice(i,1);
        }
    }}
    for(i=food.length-1;i>=0;i--){
    food[i].show();
    if(blob.eat(food[i])){
       food.splice(i,1);
    }
}
    blob.show();
    blob.update();
    blob.constrains();
    var data={
        x:blob.pos.x,
        y:blob.pos.y,
        r:blob.r
    };
    socket.emit('update',data);
}