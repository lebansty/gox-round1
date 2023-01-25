
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var score=0;

function fire(ball, ballCoOrds, targetX, targetY) {

    let  xDistance = ballCoOrds.x - targetX;
    let  yDistance = ballCoOrds.y - targetY;

   let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance),
        time = distance; 


    let start = {
        x: ballCoOrds.x,
        y: ballCoOrds.y,
        t: Date.now()
    }
    let difference = {
        x: targetX - ballCoOrds.x,
        y: targetY - ballCoOrds.y,
        t: time
    };






    let fireAction = setInterval(function (curTime = Date.now()) {

        let  elapsed = curTime - start.t, ratio = elapsed / difference.t;

        ball.style.left = start.x + difference.x * ratio;
        ball.style.top = start.y + difference.y * ratio;

//burger
        let burger1 = document.getElementById("burger1");
        let burger2 = document.getElementById("burger2");
        let burger3 = document.getElementById("burger3");  

     let cordBurger1=   burger1.getBoundingClientRect();
     let cordBurger2=   burger2.getBoundingClientRect()
     let cordBurger3=   burger3.getBoundingClientRect()
     
     //ball
     let cannonBall = document.getElementById("cannonBall");
     let cannonBallCoOrds = cannonBall.getBoundingClientRect();



    const isOverlapping1=!(cordBurger1.right < cannonBallCoOrds.left || cordBurger1.left>cannonBallCoOrds.right || cordBurger1.bottom < cannonBallCoOrds.top || cordBurger1.top>cannonBallCoOrds.bottom)
    const isOverlapping2=!(cordBurger2.right < cannonBallCoOrds.left || cordBurger2.left>cannonBallCoOrds.right || cordBurger2.bottom < cannonBallCoOrds.top || cordBurger2.top>cannonBallCoOrds.bottom)
    const isOverlapping3=!(cordBurger3.right < cannonBallCoOrds.left || cordBurger3.left>cannonBallCoOrds.right || cordBurger3.bottom < cannonBallCoOrds.top || cordBurger3.top>cannonBallCoOrds.bottom)



     if(isOverlapping1){
        score++
        alert("you hit...")
        document.getElementById("dynaScore").innerHTML=score;

     }
     if(isOverlapping2){
        score++
        alert("you hit...")
        document.getElementById("dynaScore").innerHTML=score;
             }
             if(isOverlapping3){
                score++
                alert("you hit...")
                document.getElementById("dynaScore").innerHTML=score;
                
                     }

        if (elapsed >= 1500) {
            clearInterval(fireAction);
          }




    }, 60)



}


const dropBurger = (burger)=>{


    let movingDownwards = true;

    const speed = getRandomInt(50,200)

    interval = setInterval(function () {   

        let burgertCoOrds = burger.getBoundingClientRect();
        pos1 = burgertCoOrds.top


        if (pos1 >650){
            movingDownwards = false
        }
        if (pos1 <100){
            movingDownwards = true
        }

        if (movingDownwards==true) { 
            pos1=pos1+10;
            burger.style.top = pos1
        } else {
            pos1=pos1-10;
            burger.style.top = pos1
      } 
    },speed);
}


function initializePosition(burger){

    burger.style.left =  getRandomInt(300,1200) 

}




function hanldeMouse() {

    let cannonBall = document.getElementById("cannonBall");
    let cannonBallCoOrds = cannonBall.getBoundingClientRect();

    let cannon = document.getElementById("cannon");
    let cannonCoOrds = cannon.getBoundingClientRect();

    document.addEventListener("mousemove", e => {

        let angle = Math.atan2(e.pageX - cannonCoOrds.x, - (e.pageY - cannonCoOrds.y)) * (180 / Math.PI);
        angle = angle - 13
        cannon.style.transform = `rotate(${angle}deg)`;

        document.addEventListener('click', function (event) {
            // Don't follow the link
            event.preventDefault();
            fire(cannonBall, cannonBallCoOrds, event.pageX, event.pageY)

        }, false);
    });

}



document.addEventListener('DOMContentLoaded', function () {
    hanldeMouse();

    let burger1 = document.getElementById("burger1");
    let burger2 = document.getElementById("burger2");
    let burger3 = document.getElementById("burger3");    
    initializePosition(burger1)
    initializePosition(burger2)
    initializePosition(burger3)
    dropBurger(burger1)
    dropBurger(burger2)
    dropBurger(burger3)

});