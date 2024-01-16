import {
    Modal, MenuItem,
    Select,
    FormControl,
    FormHelperText,
    InputLabel,
    TextField,

} from "@mui/material";
import { Cell } from "./Cell";
import { iSample } from "types/sample";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { iFreezerlist } from "types/freezer";
import { useData } from "hooks/useData";
import { getFreezers } from "services/superAdmin";

export const StoragePicker = ({
    chooseCell,
    closeModel,
    sample,
}: {
    sample: iSample;
    chooseCell: boolean;
    closeModel: () => void;
}) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [chosenCells, steChosenCells] = useState<string[]>([]);

    const matrix = generateMatrix();

    function generateMatrix() {
        const rows = 14;
        const cols = 13;
        const headerRow = [
            "",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
        ];
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

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue
        , getValues
    } = useForm({
        defaultValues: {
            freezer: "",
            cells: "",
            numberOfSamples: ""
        },
        mode: "onChange",
    });
    const cellHandler = (value: string) => {
        if (Number.parseInt(getValues("numberOfSamples")) === chosenCells.length) {
            return
        }
        steChosenCells(prevChosenCells => [...prevChosenCells, value]);
        setValue("cells", [...chosenCells, value].join(" , "));
    };
    const removeCell = (value: string) => {
        steChosenCells(prevChosenCells => prevChosenCells.filter(item => item !== value));
        setValue("cells", chosenCells.filter(item => item !== value).join(" , "));
    };

    const {
        errorMassage,
        data,
        isLoading,
        openErrorMassage,
        fetchData,
    }: {
        errorMassage: any;
        data: iFreezerlist;
        isLoading: any;
        openErrorMassage: any;
        fetchData: any;
    } = useData(getFreezers);
    return (
        <Modal
            open={chooseCell}
            onClose={closeModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="w-full h-full flex justify-center items-center px-4 xl:px-0">
                <div className="bg-white overflow-auto xl:overflow-hidden rounded-lg p-4">
                    <div className="pb-2"><strong>Sample Serial : </strong>{sample.sampleSerial}</div>
                    <div className="pb-2">
                        <Controller
                            name="freezer"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Freezer</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        label="Freezer"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        disabled={isLoading}
                                    >
                                        {data.freezers?.map((freezer) => (
                                            <MenuItem key={freezer._id} value={freezer._id}>
                                                <div className="flex  gap-2">
                                                    <strong>{freezer.freezerName} / </strong>
                                                    <strong>{freezer.freezerLocation}</strong>
                                                </div>
                                            </MenuItem>
                                        ))
                                        }
                                    </Select>
                                    <FormHelperText>
                                        {/* {errors.study && errors.study.message} */}
                                    </FormHelperText>
                                </FormControl>
                            )}
                        />

                    </div>
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} className={`flex ${getValues("numberOfSamples") === "" || Number.parseInt(getValues("numberOfSamples")) === chosenCells.length ? "bg-red-300" : undefined}`}>
                            {row.map((value, colIndex) => (
                                <Cell removeCell={removeCell} value={value} chosenCells={chosenCells} key={colIndex} onCellPick={cellHandler} />
                            ))}
                        </div>
                    ))}
                    <div className="pt-4">
                        <Controller
                            name="numberOfSamples"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    //   error={errors.password && true}
                                    {...field}
                                    label="Number Of samples"
                                    className="input"
                                //   helperText={errors.password && errors.password.message}
                                />

                            )}
                        />

                    </div>
                    <div className="py-2">
                        <Controller
                            name="cells"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    //   error={errors.password && true}
                                    {...field}
                                    disabled={true}
                                    label="Chosen Cells"
                                    className="input"
                                //   helperText={errors.password && errors.password.message}
                                />

                            )}
                        />

                    </div>
                </div>
            </div>
        </Modal>
    );
};
