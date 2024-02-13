import {
  Modal,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Cell } from "./Cell";
import { iSample } from "types/sample";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { iFreezerlist } from "types/freezer";
import { useData } from "hooks/useData";
import { getFreezers } from "services/superAdmin";
import { mainBoxsType, subBoxsType } from "utils/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveSampleSchema } from "validation-schema/saveSample";
import { getEmptyCells, saveSample } from "services/technician";
import Snackbar from "@mui/material/Snackbar";
import { Loading } from "Components/Shared/Loading";
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
  const [isCellLoading, setIsCellLoading] = useState<boolean>(false);
  const [unavailableCells, setUnavailableCells] = useState<string[]>([]);
  const [chosenCells, setChosenCells] = useState<string[]>([]);
  const [submitErrorMassage, setSubmitErrorMassage] = useState<string>();
  const [openSubmitErrorMassage, setSubmitOpenErrorMassage] =
    useState<boolean>(false);
  function generateLargeMatrix() {
    const rows = 10;
    const cols = 9;
    const headerRow = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
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
  function generateSmallMatrix() {
    const rows = 9;
    const cols = 12;
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
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(saveSampleSchema),
    defaultValues: {
      freezerId: "",
      cells: "",
      numberOfSamples: "",
      mainBoxType: "",
      subBoxType: "Small Box",
      subBoxId: "",
      mainBoxId: "",
    },
    mode: "onChange",
  });
  const subBoxType = watch("subBoxType");
  const mainBoxType = watch("mainBoxType");
  const freezerId = watch("freezerId");
  const mainBoxId = watch("mainBoxId");
  const subBoxId = watch("subBoxId");
  const numberOfSamples = watch("numberOfSamples");
  const cellHandler = (value: string) => {
    if (Number.parseInt(getValues("numberOfSamples")) === chosenCells.length) {
      return;
    }
    setChosenCells((prevChosenCells) => [...prevChosenCells, value]);
    setValue("cells", [...chosenCells, value].join(","));
  };
  const removeCell = (value: string) => {
    setChosenCells((prevChosenCells) =>
      prevChosenCells.filter((item) => item !== value)
    );
    setValue("cells", chosenCells.filter((item) => item !== value).join(","));
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

  const getUnavailableCells = async () => {
    try {
      setIsCellLoading(true);
      const res = await getEmptyCells({
        subBoxType,
        mainBoxType,
        freezerId,
        mainBoxId,
        subBoxId,
      });
      setUnavailableCells(res.data.cells);
    } catch (err: any) {
      setSubmitOpenErrorMassage(true);
      setSubmitErrorMassage(err?.response.data?.message);
    } finally {
      setIsCellLoading(false);
    }
  };
  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const res = await saveSample(
        sample._id,
        sample.sampleType,
        data.freezerId,
        data.mainBoxType,
        data.subBoxType,
        data.mainBoxId,
        data.subBoxId,
        data.cells,
        sample.storageType,
        sample.containerType,
        sample.drawnAt,
        sample.numberOfSamples,
        sample.Study.studyName,
        sample.patient.patientName,
        sample.patient.mrn,
        sample.patient.ssn,
        sample.patient.birthDate,
        sample.patient.gender,
        sample.patient.sampleDrawing,
        sample.sampleSerial,
        sample.khccBioSampleCode
      );
    } catch (err: any) {
      setSubmitOpenErrorMassage(true);
      setSubmitErrorMassage(err?.response.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={chooseCell}
      onClose={closeModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="w-full h-[90%] flex justify-center  items-center px-4 xl:px-0 ">
        <div className="bg-white h-full overflow-y-scroll rounded-lg p-4">
          <div className="pb-2">
            <strong>Sample Serial : </strong>
            {sample.sampleSerial}
          </div>
          <div className="pb-2">
            <Controller
              name="freezerId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={errors.freezerId && true}>
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
                    {isLoading ? (
                      <MenuItem>Loading...</MenuItem>
                    ) : (
                      data.freezers?.map((freezer) => (
                        <MenuItem key={freezer._id} value={freezer._id}>
                          <div className="flex  gap-2">
                            <strong>{freezer.freezerName} / </strong>
                            <strong>{freezer.freezerLocation}</strong>
                          </div>
                        </MenuItem>
                      ))
                    )}
                  </Select>
                  <FormHelperText>
                    {errors.freezerId && errors.freezerId.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </div>
          <div className=" flex gap-2">
            <Controller
              name="mainBoxType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={errors.mainBoxType && true}>
                  <InputLabel id="Main Box Type">Main Box Type</InputLabel>
                  <Select
                    labelId="Main Box Type"
                    label="Main Box Type"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    disabled={isLoading}
                  >
                    {mainBoxsType.map((item) => (
                      <MenuItem key={item.id} value={item.boxType}>
                        <div className="flex  gap-2">
                          <strong>{item.boxType} </strong>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.mainBoxType && errors.mainBoxType.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Controller
              name="subBoxType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={errors.subBoxType && true}>
                  <InputLabel id="sub Box Type">Sub Box Type</InputLabel>
                  <Select
                    labelId="sub Box Type<"
                    label="Sub Box Type<"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    disabled={isLoading}
                  >
                    {subBoxsType.map((item) => (
                      <MenuItem key={item.id} value={item.boxType}>
                        <div className="flex  gap-2">
                          <strong>{item.boxType} </strong>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.subBoxType && errors.subBoxType.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </div>
          <div className="flex gap-2 py-2">
            <Controller
              name="mainBoxId"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.mainBoxId && true}
                  {...field}
                  label="Main Box ID"
                  className="input"
                  helperText={errors.mainBoxId && errors.mainBoxId.message}
                />
              )}
            />
            <Controller
              name="subBoxId"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.subBoxId && true}
                  {...field}
                  label="Sub Box ID"
                  className="input"
                  helperText={errors.subBoxId && errors.subBoxId.message}
                />
              )}
            />
          </div>
          <div className="py-2 flex gap-2">
            <Controller
              name="numberOfSamples"
              control={control}
              render={({ field }) => (
                <TextField
                  error={errors.numberOfSamples && true}
                  {...field}
                  type="number"
                  onChange={(e) => {
                    setChosenCells([]);
                    setValue("cells", "");
                    field.onChange(e.target.value);
                  }}
                  label="Number Of samples"
                  className="input"
                  helperText={
                    errors.numberOfSamples && errors.numberOfSamples.message
                  }
                />
              )}
            />
            <Button
              className="w-full"
              onClick={() => {
                setChosenCells([]);
                setValue("cells", "");
                setUnavailableCells([]);
                getUnavailableCells();
              }}
              disabled={
                subBoxType === "" ||
                mainBoxType === "" ||
                freezerId === "" ||
                mainBoxId === "" ||
                subBoxId === "" ||
                numberOfSamples === ""
              }
              variant="contained"
              color="info"
            >
              Check Available Cells
            </Button>
          </div>
          {isCellLoading ? (
            <Loading />
          ) : (
            subBoxType === "Large Box" &&
            numberOfSamples !== "" &&
            generateLargeMatrix().map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex ${
                  numberOfSamples === "" ||
                  Number.parseInt(numberOfSamples) === chosenCells.length
                    ? "bg-green-400 w-fit"
                    : undefined
                }`}
              >
                {row.map((value, colIndex) => (
                  <Cell
                    unavailableCells={unavailableCells}
                    removeCell={removeCell}
                    value={value}
                    chosenCells={chosenCells}
                    key={colIndex}
                    onCellPick={cellHandler}
                  />
                ))}
              </div>
            ))
          )}
          {isCellLoading ? (
            <Loading />
          ) : (
            subBoxType === "Small Box" &&
            numberOfSamples !== "" &&
            generateSmallMatrix().map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex ${
                  numberOfSamples === "" ||
                  Number.parseInt(numberOfSamples) === chosenCells.length
                    ? "bg-green-400 "
                    : undefined
                }`}
              >
                {row.map((value, colIndex) => (
                  <Cell
                    unavailableCells={unavailableCells}
                    removeCell={removeCell}
                    value={value}
                    chosenCells={chosenCells}
                    key={colIndex}
                    onCellPick={cellHandler}
                  />
                ))}
              </div>
            ))
          )}
          <div className="py-2">
            <Controller
              name="cells"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <span className="">
                    <strong>Chosen Cell</strong>
                  </span>
                  <textarea
                    className="border border-solid border-slate-400 rounded-lg p-2"
                    value={field.value}
                    disabled
                  />
                  {errors.cells && (
                    <span className="text-red-600">{errors.cells.message}</span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2">
              <Button
                className="w-1/2"
                onClick={() => {
                  setChosenCells([]);
                  setUnavailableCells([]);
                  reset();
                }}
                variant="outlined"
                color="secondary"
              >
                Clear
              </Button>
              <Button
                className="w-1/2"
                onClick={() => {
                  setChosenCells([]);
                  reset();
                  closeModel();
                }}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
            </div>
            <Button
              className="w-full"
              variant="outlined"
              // disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </div>
        <Snackbar
          open={openErrorMassage || openSubmitErrorMassage}
          autoHideDuration={3000}
          onClose={() => {
            setSubmitOpenErrorMassage(false);
          }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <Alert
            severity="error"
            onClose={() => {
              setSubmitOpenErrorMassage(false);
            }}
          >
            {errorMassage}
            {submitErrorMassage}
          </Alert>
        </Snackbar>
      </div>
    </Modal>
  );
};
