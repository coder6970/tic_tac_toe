import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Gameover from "./components/Gameover";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
    X : "Player 1",
    O : "Player 2",
}
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

function setActivePlayer(gameTurns){
    let currPlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X') currPlayer = 'O';
    return currPlayer;
}
function deriveGameboard(gameTurns){
    let gameboard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];
    for(const turn of gameTurns){
        const {square,player} = turn;
        const {row,column} = square;
        gameboard[row][column] = player;
    }
    return gameboard;
}
function deriveWinner(gameboard,players){
    let winner = undefined;
    for (const combi of WINNING_COMBINATIONS){
        const firstsym = gameboard[combi[0].row][combi[0].column];
        const secondsym = gameboard[combi[1].row][combi[1].column];
        const thirdsym = gameboard[combi[2].row][combi[2].column];
        
        if(firstsym && firstsym === secondsym && firstsym === thirdsym){winner = players[firstsym];
            break;
        }
    }
    return winner;
}

function App() {
    const [players,setPlayers] = useState(PLAYERS);
    const[gameTurns, setGameTurns] = useState([]);
    
    let activePlayer = setActivePlayer(gameTurns);
    function handleSelect(rowIdx,colIdx){
        setGameTurns((prevturn) =>{
            let currPlayer = setActivePlayer(prevturn);
            const updatedTurn = [{square:{row:rowIdx,column:colIdx},player:currPlayer},...prevturn,];
            return updatedTurn;
        });
    }
    function handleRestart(){
        setGameTurns([]);
    }
    function handlePlayerName(symbol,name){
        setPlayers(prev => {return {
            ...prev,
            [symbol] : name
        }})
    }

    const gameboard = deriveGameboard(gameTurns);
    const winner = deriveWinner(gameboard,players);
    let hasDraw = (gameTurns.length === 9 && !winner);

    
 return(
    <main>
    <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player intialName = {PLAYERS.X} symbol="X" isActive = {activePlayer === 'X'} handleName = {handlePlayerName}></Player>
                <Player intialName = {PLAYERS.O} symbol="O" isActive = {activePlayer === 'O'} handleName = {handlePlayerName}></Player>
            </ol>
    {(winner || hasDraw) && <Gameover winner={winner} onSelect = {handleRestart}></Gameover>}
    <Gameboard onSelect={handleSelect} board= {gameboard}></Gameboard>
    </div>
    <Log turns={gameTurns}></Log>
    </main>
 );
}
export default App
