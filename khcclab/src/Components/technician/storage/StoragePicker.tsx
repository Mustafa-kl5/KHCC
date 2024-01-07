import React from 'react';
import { Cell } from './Cell';

export const StoragePicker = () => {
    const matrix = generateMatrix();

    function generateMatrix() {
        const rows = 14;
        const cols = 13;
        const headerRow = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
        const matrix = [headerRow];
        for (let i = 0; i < rows - 1; i++) {
            const row = [String.fromCharCode(65 + i)];
            for (let j = 0; j < cols; j++) {
                row.push(`${row[0]}${headerRow[j + 1]}`);
            }
            matrix.push(row);
        }

        return matrix;
    }
    const cellHandler = (value: string) => {
        console.log(value);

    }

    return (
        <div className="w-full">
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((value, colIndex) => (
                        <Cell value={value} key={colIndex} onCellPick={cellHandler} />
                    ))}
                </div>
            ))}
        </div>
    );
};
