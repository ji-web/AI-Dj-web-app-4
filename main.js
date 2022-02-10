var song1="";
var song2="";
left_wristX=0;
left_wristY=0;
right_wristX=0;
right_wristY=0;
score_left_wrist=0;
song1_status="";
song2_status="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
    
}

function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on("pose",gotPoses);

}

function draw(){
    image(video,0,0,500,500);
    song1_status=song1.isplaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(score_left_wrist>0.2){
    circle(left_wristX,left_wristY,20);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="Playing-Peter Pan Song";
    }
}
}

function modalLoaded(){
    console.log("poseNet is loaded"); 
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[9].score;
        console.log("score_left_wrist"+score_left_wrist);
        left_wristX=results[0].pose.leftWrist.x;
        left_wristY=results[0].pose.leftWrist.y;
        console.log("left wrist X="+left_wristX+"left wrist Y="+left_wristY);
        right_wristX=results[0].pose.rightWrist.x;
        right_wristY=results[0].pose.rightWrist.y;
        console.log("right wrist X="+right_wristX+"right wrist Y="+right_wristY);
        
    }
}



