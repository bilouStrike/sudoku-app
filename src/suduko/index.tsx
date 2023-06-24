import { useEffect, useState } from "react";
import './style.css';

const Suduko = () => {
    const [grid, setGrid] = useState<number[][]>([
        [0,0,0,0,0,0,8,0,0],
        [0,0,4,0,0,0,0,5,0],
        [0,7,0,5,0,0,0,0,0],
        [0,1,0,0,0,5,0,0,8],
        [0,5,6,0,0,1,0,0,0],
        [7,8,0,0,0,0,0,0,5],
        [0,2,0,0,8,0,0,0,0],
        [0,0,0,0,3,0,0,1,0],
        [0,0,5,0,0,0,4,0,0]
    ]);
    const [selectCell, setSelectedCell] = useState<number[]>([]);
    const [defaultGrid, setDefaultGrid] = useState<boolean[][]>([]);
    const [cellFont, setCellFont] = useState<string[]>([]);

    const handleCellClick = (rowIndex: number, ColIndex: number, cellValue: number) => {
        setSelectedCell([rowIndex, ColIndex, cellValue]);
    }

    const checkArayEqual = (a:number[], b:number[]) => {
        return a.length === b.length
        && a.every((val, index) => val === b[index]);
    }

    const getCellBox = (rowIndex:number, colIndex: number) => {
        return 3 * Math.floor(rowIndex / 3) + Math.floor(colIndex / 3);
    }

    const handleNumberContol = (number: number) =>  {
        if (defaultGrid[selectCell[0]][selectCell[1]]) return;
        const newGrid = [...grid];
        newGrid[selectCell[0]][selectCell[1]] = number;
        setSelectedCell([selectCell[0], selectCell[1], number ])
        setGrid([...newGrid]);
        setCellFont([...cellFont, `${selectCell[0]}-${selectCell[1]}`]);
    };

    const numbersControl =  new Array(9).fill(0).map((_, i) => i + 1);

    useEffect(() => {
        if(!defaultGrid.length) {
            setDefaultGrid(grid.map((row) => row.map((col) => col !== 0)));
        }
    }, [defaultGrid, grid]);

    return (
        <>
            <h2>Sudoku app</h2>
            <h3>
                Sudoku is a logic-based game that involves filling a 9x9 grid with numbers from 1 to 9,<br/> with the objective of ensuring that each row, each column,<br/> and each of the nine 3x3 subgrids (called "boxes" or "regions") contains all the numbers from 1 to 9 without repetition.
            </h3>
            <div className="grid-container">
                <div className="grid">
                    {grid.map((row, rowIndex) =>
                        <div key={rowIndex} className={`row row-${rowIndex}`}>
                            {row.map((cell, ColIndex) => 
                                <div key={ColIndex}
                                    className={`col col-${ColIndex}
                                        ${checkArayEqual([selectCell[0], selectCell[1]], [rowIndex, ColIndex]) ? ' cell-selected' : ''}
                                        ${selectCell[2] === cell && selectCell[2] ? ' cell-highlight' : ''}
                                        ${cell && 
                                            selectCell[0] === rowIndex && 
                                            grid[selectCell[0]][ColIndex] === selectCell[2] &&
                                            selectCell[1] !== ColIndex
                                            ? 'cell-error' : ''}
                                        ${cell && 
                                            selectCell[1] === ColIndex &&
                                            grid[rowIndex][selectCell[1]] === selectCell[2] &&
                                            selectCell[0] !== rowIndex
                                            ? 'cell-error' : ''}
                                        ${cell && 
                                            getCellBox(rowIndex, ColIndex) === getCellBox(selectCell[0], selectCell[1]) &&
                                            grid[rowIndex][ColIndex] === grid[selectCell[0]][selectCell[1]] &&
                                            !checkArayEqual([rowIndex, ColIndex], [selectCell[0], selectCell[1]])
                                            ? 'cell-error' : ''
                                        }
                                        ${cellFont.includes(`${rowIndex}-${ColIndex}`) ? 'edited-font' : ''}`
                                    }
                                    onClick={() => handleCellClick(rowIndex, ColIndex, cell)}
                                    onKeyDown={(e) => console.log(e.key)}
                                >
                                    {cell !== 0 ? cell : ''}
                                </div> 
                            )}
                        </div>
                    )}
                </div>
                <div className="row number-control">
                    {numbersControl.map((number) => 
                        <div 
                            key={number}
                            className="col"
                            onClick={() => handleNumberContol(number)}
                            tabIndex={number}
                            > 
                            {number} 
                        </div>)
                    }
                </div>
            </div>
        </>
    )
}
export default Suduko;