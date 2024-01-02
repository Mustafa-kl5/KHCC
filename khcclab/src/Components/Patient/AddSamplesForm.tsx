import {
    Add
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import { getStudyId } from "utils/getStudyId";

export const AddSamplesForm = ({
    control,
    errors,
    index,
    onClick,
    remove,
    formLength
}: {
    index: number;
    control: Control;
    errors: FieldErrors;
    onClick: () => void
    remove: (index: number) => void;
    formLength: number
}) => {

    return (
        <div className=" flex flex-col gap-2 p-3 rounded-lg even:bg-slate-100">
            <span className="text-base">
                <strong># Sample {index + 1}</strong>
            </span>
            <div className=" flex flex-col gap-3">
                <Controller
                    name={`samples[${index}].containerType`}
                    control={control}
                    render={({ field }) => (
                        <FormControl error={errors.study && true} >
                            <InputLabel id="Container-Type">Container Type</InputLabel>
                            <Select
                                labelId="Container-Type"
                                onChange={field.onChange}
                                value={field.value}
                                label="Container Type"
                            >
                                <MenuItem value={"asd"}>
                                    asd
                                </MenuItem>
                            </Select>
                            <FormHelperText>
                                {/* {errors.study && errors.study.message} */}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name={`samples[${index}].sampleType`}
                    control={control}
                    render={({ field }) => (
                        <FormControl error={errors.study && true} fullWidth>
                            <InputLabel id="sampleType">Sample Type</InputLabel>
                            <Select
                                labelId="sampleType"
                                onChange={field.onChange}
                                label="Sample Type"
                                value={field.value}
                            >
                                <MenuItem value={"csdds"}>
                                    csdds
                                </MenuItem>
                            </Select>
                            <FormHelperText>
                                {/* {errors.study && errors.study.message} */}
                            </FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name={`samples[${index}].drawnAt`}
                    control={control}
                    render={({ field }) => (
                        <FormControl error={errors.study && true} >
                            <DateTimePicker
                                label="Drawn At"
                                value={field.value || null}
                                onChange={field.onChange}
                            />
                        </FormControl>
                    )}
                />

                <Controller
                    name={`samples[${index}].numberOfSamples`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            error={errors.studyName && true}
                            label="Number Of Samples"
                            className="input"
                            value={field.value}
                            onChange={field.onChange}
                        // helperText={errors.studyName && errors.studyName.message}
                        />
                    )}
                />
                <TextField
                    label="Study Number"
                    value={getStudyId().studyNumber}
                    disabled={true}
                />
                <Controller
                    name={`samples[${index}].sampleSerial`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            error={errors.studyName && true}
                            {...field}
                            label="Sample Serial"
                            className="input"
                        // helperText={errors.studyName && errors.studyName.message}
                        />
                    )}
                />

            </div>
            <div className="w-full flex justify-end gap-2">
                {formLength === index + 1 && <Button
                    size="large"
                    variant="contained"
                    onClick={onClick}
                    startIcon={<Add />}
                >
                    add
                </Button>}
                {index !== 0 && <Button
                    size="large"
                    variant="contained"
                    onClick={() => remove(index)}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>}

            </div>
        </div>
    );
};
