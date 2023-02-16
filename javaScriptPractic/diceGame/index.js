//player 1

let randomNumber1 = Math.floor(Math.random()*6) + 1; //random number from 1-6;
let randomImage1 = "images/dice" + randomNumber1 + ".png"; //random images resources
document.querySelector(".img1").setAttribute("src", randomImage1);//set random number to dice

//player 2

let randomNumber2 = Math.floor(Math.random()*6) + 1;
let randomImage2 ="images/dice" + randomNumber2 + ".png";
document.querySelector(".img2").setAttribute("src",randomImage2);

//change the title to display a winner


if(randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
} else if(randomNumber1 < randomNumber2){
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
} else {
    document.querySelector("h1").innerHTML = "Draw!";
}
