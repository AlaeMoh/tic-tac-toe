import { Dispatch, SetStateAction } from "react";

type cellProps={
    id:number;
    go: string;
    setGo: Dispatch<SetStateAction<string>>;
    cells:string[];
    setCells:Dispatch<SetStateAction<string[]>>
    cell:string;
    winner:string | null
}

const Cell= ({go, setGo, id, cells, setCells, cell, winner }: cellProps)=>{
  const  handleClick= (e: React.MouseEvent<HTMLButtonElement>)=>{
    console.log(e.target);
    if(winner){
        return
    }
    const notTaken= !cells[id];
    if(notTaken){
        if(go === "circle"){
            handleCellChange("circle")
            setGo("cross")
        }else if(go === "cross"){
           handleCellChange("cross")
           setGo("circle")
        }
    }
    
  }

  const handleCellChange= (cellChange:string)=>{
    const copyCells= [...cells]
    copyCells[id]= cellChange
    setCells(copyCells)
  }
 return <button className={`tile ${cell ? (cell === "circle" ? "o" : "x") : ""}`} type="button" data-cell="0" aria-label="Cell 1" onClick={handleClick}>{cell? (cell === "circle" ? "o" : "x"): ""}</button>
               
            

  
}
export default Cell;