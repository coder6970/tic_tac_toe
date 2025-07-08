export default function Gameover({winner,onSelect}){
    return(
        <div id="game-over">
            <h2>Game Over</h2>
            <p>{winner ? `${winner} has won!` : "It's a draw"}</p>
            <button onClick={onSelect}>Rematch</button>
        </div>
    );
}