import React from "react";

export const Cell = ({
    value,
    onCellPick,
    chosenCells,
    removeCell
}: {
    value: string;
    onCellPick: (value: string) => void;
    chosenCells: string[];
    removeCell: (value: string) => void;
}) => {
    return (
        <div
            className={`p-1 min-w-10 flex justify-center items-center border border-solid border-gray-300
        ${value.length === 1 ||
                    value === "10" ||
                    value === "11" ||
                    value === "12" ||
                    value === "13" ||
                    value == ""
                    ? "bg-slate-100"
                    : " cursor-pointer"
                } ${chosenCells.includes(value) ? "bg-slate-600" : undefined}`}
            onClick={() => {
                if (
                    value.length === 1 ||
                    value === "10" ||
                    value === "11" ||
                    value === "12" ||
                    value === "13" ||
                    chosenCells.includes(value) ||
                    value == ""
                ) {
                    return;
                }
                onCellPick(value);
            }}
            onDoubleClick={() => {
                if (chosenCells.includes(value)) {
                    removeCell(value);
                }
            }}
        >
            <span className="font-bold">{value}</span>
        </div>
    );
};
