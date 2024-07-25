const cells=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const restartbtn=document.getElementById('restartbtn');
const resetScorebtn = document.getElementById('resetScorebtn');
const gamemodediv=document.getElementById('game-mode');
const playerVSPlayerButton=document.getElementById('playerVSplayer');
const playerVsAIButton = document.getElementById('playerVSai');
const playerXScore = document.getElementById('playerX');
const playerOScore = document.getElementById('playerO');
const drawsScore = document.getElementById('draws');
let currentplayer="X";
let isplayerturn=true;
let isagainsrai=false;
let score = { X: 0, O: 0, draws: 0 };

const wincombo=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,5,8],
    [1,4,7],
    [0,3,6],
    [0,4,8],
    [2,4,6]];

    function handleClick(e)
    {
        if(isagainsrai && !isplayerturn)
            return;
        const cell=e.target;
        if(cell.textContent === '')
            {
                cell.textContent=currentplayer;
                if(checkwin(currentplayer))
                    {
                        setTimeout(()=>
                            {
                                alert(`${currentplayer} wins!`);
                                updateScore(currentplayer);
                                restartgame();
                            }, 10);
                    }
                    else if(isDraw())
                        {
                            setTimeout(()=>
                                {
                                    alert('Draw!');
                                    updateScore('draw');
                                    restartgame();
                                }, 10);
                        }
                        else{
                            currentplayer=currentplayer=='X'?'O':'X';
                            if(isagainsrai)
                                {
                                   isplayerturn=!isplayerturn;
                                   if(!isplayerturn)
                                    {
                                        setTimeout(aiMove,500);
                                    } 
                                }
                                
                        }
                    }
            }
            function checkwin(player)
            {
                return wincombo.some(combination=>{
                    return combination.every(index=>{
                        return cells[index].textContent===player;
                    });
                });
            }

            function isDraw()
            {
                return[...cells].every(cell=>{
                    return cell.textContent==='X'  || cell.textContent ==='O';

                });
            }
            function aiMove()
            {
                let emptyCells=[...cells].filter(cell=>cell.textContent==='');
                if(emptyCells.length===0)
                    return;
                let randomIndex=Math.floor(Math.random()*emptyCells.length);
                emptyCells[randomIndex].textContent=currentplayer;
                if(checkwin(currentplayer))
                    {
                        setTimeout(()=>
                            {
                                alert(`${currentplayer} wins!`);
                                updateScore(currentplayer);
                                restartgame();
                            }, 10);
                    }
                    else if(isDraw())
                        {
                            setTimeout(()=>
                                {
                                    alert('Draw!');
                                    updateScore('draw');
                                     restartgame();
                                }, 10);
                        }
                        else
                        {
                            currentplayer=currentplayer==='X'?'O':'X';
                            isplayerturn=true;
                        }
            }
            function updateScore(winner) 
            {
                if (winner === 'draw') {
                    score.draws++;
                } else {
                    score[winner]++;
                }
                displayScore();
            }
            function displayScore() 
            {
                playerXScore.textContent = `Player X: ${score.X}`;
                playerOScore.textContent = `Player O: ${score.O}`;
                drawsScore.textContent = `Draws: ${score.draws}`;
            }

            function refreshBoard() {
                cells.forEach(cell => cell.textContent = '');
                currentplayer = 'X';
                isplayerturn = true;
            }


            function restartgame()
            {
               refreshBoard();
                gamemodediv.style.display='block';
                board.style.display='none';
                restartbtn.style.display='none';
            }
            function initializegame()
            {
                gamemodediv.style.display='none';
                board.style.display='grid';
                restartbtn.style.display='block';
            }
            function resetScoreboard() {
                score = { X: 0, O: 0, draws: 0 };
                displayScore();
            }
            
            playerVSPlayerButton.addEventListener('click',()=>{
                isagainsrai=false;
                initializegame();

            });
            playerVsAIButton.addEventListener('click',()=>{
                isagainsrai=true;
                initializegame();
            });
            cells.forEach(cell=>{
                cell.addEventListener('click',handleClick);
            });
            restartbtn.addEventListener('click',()=>{
                restartgame();
                resetScoreboard();
            });
            resetScorebtn.addEventListener('click',resetScoreboard);







