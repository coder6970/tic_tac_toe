export default function Gameboard({onSelect,board}){
    return(
        <ol id="game-board">
            {board.map((row, rowIdx) => <li key = {rowIdx}>
                <ol>
                   { row.map((playerSymbol,colidx) => <li key={colidx}><button onClick={()=>onSelect(rowIdx,colidx)}  disabled = {playerSymbol !== null}>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    );
}