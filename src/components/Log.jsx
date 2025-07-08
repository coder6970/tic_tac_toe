export default function Log({turns}){
    return(
        <ol id="log">
           { turns.map((obj) =>{
                const {square,player} = obj;
                const {row,column} = square;
                return <li key={`${row}${column}`}>{player} played {row},{column}</li>
            })}
        </ol>
    );
}