import React from "react";

export const Cell = ({
    value,
    onCellPick,
}: {
    value: string;
    onCellPick: (value: string) => void;
}) => {
    return (
        <div
            className={`p-1 w-10 flex justify-center items-center border border-solid border-gray-300
        ${value.length === 1 ||
                    value === "10" ||
                    value === "11" ||
                    value === "12" ||
                    value === "13"
                    ? "bg-slate-100"
                    : "hover:bg-slate-300 cursor-pointer"
                }`}
            onClick={() => {
                if (
                    value.length === 1 ||
                    value === "10" ||
                    value === "11" ||
                    value === "12" ||
                    value === "13"
                ) {
                    return;
                }
                onCellPick(value);
            }}
        >
            <span className="font-bold">{value}</span>
        </div>
    );
};
