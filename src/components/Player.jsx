import { useState } from "react";

export default function Player({ intialName, symbol, isActive, handleName }) {
  const[name, setName] = useState(intialName);
  const[selected,setSelected] = useState(false);
  function handleClick(){
    setSelected((editing) => !editing);
     if(selected)handleName(symbol,name);
  }
  function handleChange(event){
      setName(event.target.value);
    }
    let buttonTriggerResult = <span className="player-name">{name}</span>;
    if(selected) buttonTriggerResult = <input type="text" required value={name} onChange={handleChange}/>
  return (
    <li className={isActive ? "active" : undefined}>
      <div className="player">
        {buttonTriggerResult}
        <span className="player-symbol">{symbol}</span>
      </div>
      <button onClick={handleClick}>{selected ? "Save": "Edit"}</button>
    </li>
  );
}
