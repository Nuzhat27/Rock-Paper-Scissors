/*Default operator is used. if the score is truthy the first value gets saved into it but if the score is falsy then the second value is stored into it.*/
let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
}; 


/*    
if (!score)
{
score={
    wins:0,
    losses:0,
    ties:0
};
}
*/

updateScoreElement(); 

function updateScoreElement()
{
    document.querySelector('.js-score')
.innerHTML=`Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties}`;
}

document.querySelector('.js-reset-button').addEventListener('click' , () => {
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScoreElement();
});


function pickComputerMove(){
const randomNumber=Math.random( );
let computerMove='';

if(randomNumber>=0 && randomNumber< 1/3){
    computerMove='rock';
}

else if(randomNumber>=1/3 && randomNumber< 2/3){
    computerMove='paper';
} 

else if(randomNumber>=2/3 && randomNumber< 1){
    computerMove='scissors';
}

return computerMove;
}

let isAutoPlaying=false;
let  intervalId;

//const autoPlay = () => {};

const autoPlay = function autoPlay(){

    if(!isAutoPlaying){

        intervalId = setInterval(() =>{
            const playerMove=pickComputerMove();
            playGame(playerMove);
        } , 1000);

        isAutoPlaying=true;
    }

    else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }

   
}

document.querySelector('.js-auto-button').addEventListener
('click' , autoPlay);


 document.querySelector('.js-rock-button').addEventListener('click' , () => {
    playGame('rock');
 });


 document.querySelector('.js-paper-button').addEventListener('click' , () => {
    playGame('paper');
 });

 document.querySelector('.js-scissors-button').addEventListener('click' , () => {
    playGame('scissors');
 });

document.body.addEventListener('keydown' , (event) =>{
    if (event.key ==='r'){
        playGame('rock');
    }
    else if(event.key==='p'){
        playGame('paper');
    }
    else if(event.key==='s'){
        playGame('scissors');
    }
});

function playGame(playerMove)
{
const computerMove = pickComputerMove();
let result='';

if(playerMove==='rock')
{
    if(computerMove==='rock'){
        result='Tie.';
    }
    else if(computerMove==='paper'){
        result='You lose.';
    }
    else if(computerMove==='scissors'){
        result='You win.';
    }
}

if (playerMove==='paper')
{
    if(computerMove==='rock'){
       result='You win.';
    }
    else if(computerMove==='paper'){
        result='Tie.';
    }
     else if(computerMove==='scissors'){
        result='You lose.';
     }

}

if(playerMove==='scissors')
{
    if(computerMove==='rock'){
        result='You lose.';
    }
    else if(computerMove==='paper'){
        result='You win.';
    }
    else if(computerMove==='scissors'){
        result='Tie.';
    }
}

if(result==='You win.'){
    score.wins+=1;
}
else if(result==='You lose.'){
    score.losses+=1;
}
else if(result==='Tie.'){
    score.ties+=1;
}

localStorage.setItem('score' , JSON.stringify(score ));

updateScoreElement(); 





document.querySelector('.js-result').innerHTML = `${result}`;


document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon" alt="">
<img src="images/${computerMove}-emoji.png" class="move-icon" alt="">Computer`;

}

